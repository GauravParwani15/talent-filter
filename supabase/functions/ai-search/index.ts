
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1';
import OpenAI from "https://esm.sh/openai@4.43.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Search query is required' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing search query:', query);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || req.headers.get('Authorization')?.split('Bearer ')[1] || '';
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return new Response(
        JSON.stringify({ error: 'Missing Supabase credentials' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Fetch all profiles to process with OpenAI
    const { data: allProfiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, title, location, skills, about, experience, education')
      .order('created_at', { ascending: false });
      
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return new Response(
        JSON.stringify({ error: `Error fetching profiles: ${profilesError.message}` }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Also fetch analytics profiles
    const { data: analyticsProfiles, error: analyticsError } = await supabase
      .from('analytics_profiles')
      .select('id, title, location, skills, about, experience, education')
      .order('created_at', { ascending: false });
      
    if (analyticsError) {
      console.error('Error fetching analytics profiles:', analyticsError);
      return new Response(
        JSON.stringify({ error: `Error fetching analytics profiles: ${analyticsError.message}` }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Combine profiles
    const allProfilesData = [...(allProfiles || []), ...(analyticsProfiles || [])];
    
    if (allProfilesData.length === 0) {
      return new Response(
        JSON.stringify({ profiles: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Initialize OpenAI
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY') || '';
    if (!openaiApiKey) {
      console.error('OpenAI API key is missing');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is missing' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    try {
      const openai = new OpenAI({
        apiKey: openaiApiKey,
      });

      // Create a context with profile information
      const profilesContext = allProfilesData.map((profile, index) => {
        return `Profile ${index + 1}:
ID: ${profile.id}
Title: ${profile.title || 'N/A'}
Location: ${profile.location || 'N/A'}
Skills: ${profile.skills || 'N/A'}
About: ${profile.about || "N/A"}
Experience: ${profile.experience || "N/A"}
Education: ${profile.education || "N/A"}
`;
      }).join('\n\n');

      // Create prompt for OpenAI
      const systemPrompt = `You are a talent search assistant. Given a user's search query and a database of talent profiles, 
identify which profiles best match the search criteria. Consider all aspects of the profile including skills, experience, 
education, location, and job title. Return ONLY the profile IDs that match, as a JSON array, with no explanations.
For example: ["profile-id-1", "profile-id-2"]`;

      const userPrompt = `Search Query: "${query}"\n\nAvailable Profiles:\n${profilesContext}\n\nReturn the IDs of matching profiles as a JSON array:`;

      console.log('Sending request to OpenAI');
      
      // Use OpenAI to process the query
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2,
        response_format: { type: "json_object" }
      });

      // Extract the matching profile IDs from the response
      const responseContent = completion.choices[0].message.content || '{"profileIds": []}';
      
      try {
        const parsedResponse = JSON.parse(responseContent);
        
        if (!parsedResponse.profileIds || !Array.isArray(parsedResponse.profileIds)) {
          console.error('Invalid response format from OpenAI:', responseContent);
          return new Response(
            JSON.stringify({ 
              error: 'Invalid response format from AI',
              profiles: [],
              rawAiResponse: responseContent
            }),
            { 
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
        
        const profileIds = parsedResponse.profileIds;
        console.log('Matched profile IDs:', profileIds);
        
        // Find the full profile objects for the matched IDs
        const matchedProfiles = allProfilesData.filter(profile => 
          profileIds.includes(profile.id)
        );
        
        return new Response(
          JSON.stringify({ 
            profiles: matchedProfiles,
            rawAiResponse: responseContent,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError, 'Response:', responseContent);
        return new Response(
          JSON.stringify({ 
            error: `Error parsing OpenAI response: ${parseError.message}`,
            rawResponse: responseContent
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    } catch (openAIError) {
      // Handle OpenAI-specific errors
      console.error('OpenAI API error:', openAIError);
      
      // Check if it's a quota exceeded error
      const errorMessage = openAIError.message || '';
      if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
        return new Response(
          JSON.stringify({ 
            error: 'OpenAI API quota exceeded. Please try again later or contact support.',
            quotaExceeded: true,
            openAIError: errorMessage
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: `OpenAI API error: ${errorMessage}`,
          openAIError: errorMessage
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
  } catch (error) {
    console.error('Error in AI search function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
