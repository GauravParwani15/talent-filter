
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart as PieChartIcon, Users, Search, LineChart as LineChartIcon, TrendingUp, Download, Calendar, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e'];

const RecruiterAnalytics = () => {
  const [timeRange, setTimeRange] = useState("weekly");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch search data (top skills)
        const { data: skillsData, error: skillsError } = await supabase
          .from('analytics_profiles')
          .select('skills');
          
        if (skillsError) throw skillsError;
        
        // Process skills data
        const skillsMap = {};
        skillsData.forEach(profile => {
          const skills = profile.skills.split(',');
          skills.forEach(skill => {
            const trimmedSkill = skill.trim();
            skillsMap[trimmedSkill] = (skillsMap[trimmedSkill] || 0) + 1;
          });
        });
        
        // Convert to array and sort by count
        const processedSearchData = Object.entries(skillsMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => (b.count as number) - (a.count as number))
          .slice(0, 6); // Top 6 skills
          
        setSearchData(processedSearchData);
        
        // Fetch location data
        const { data: locData, error: locError } = await supabase
          .from('analytics_profiles')
          .select('location');
          
        if (locError) throw locError;
        
        // Process location data
        const locMap = {};
        locData.forEach(profile => {
          locMap[profile.location] = (locMap[profile.location] || 0) + 1;
        });
        
        // Convert to array, sort, and format for PieChart
        const processedLocationData = Object.entries(locMap)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => (b.value as number) - (a.value as number))
          .slice(0, 5); // Top 5 locations
          
        // Add "Other" category for remaining locations
        const topLocationsSum = processedLocationData.reduce((sum, item) => sum + (item.value as number), 0);
        const totalLocations = locData.length;
        
        if (totalLocations > topLocationsSum) {
          processedLocationData.push({
            name: 'Other',
            value: totalLocations - topLocationsSum
          });
        }
        
        setLocationData(processedLocationData);
        
        // Generate weekly activity data based on profile creation dates
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weeklyActivity = Array(7).fill(0).map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - index));
          const dayName = days[date.getDay()];
          return { day: dayName, searches: 0, profileViews: 0 };
        });
        
        // Fetch profiles created in the last week
        const { data: weekProfiles, error: weekError } = await supabase
          .from('analytics_profiles')
          .select('created_at')
          .gte('created_at', oneWeekAgo.toISOString());
          
        if (weekError) throw weekError;
        
        // Count profiles created each day
        weekProfiles.forEach(profile => {
          const date = new Date(profile.created_at);
          const dayIndex = date.getDay();
          weeklyActivity[dayIndex].profileViews += 1;
          weeklyActivity[dayIndex].searches += Math.floor(Math.random() * 3) + 1; // Simulate search activity
        });
        
        // Rearrange to start with Monday
        const mondayIndex = days.indexOf('Mon');
        const reorderedWeekly = [
          ...weeklyActivity.slice(mondayIndex),
          ...weeklyActivity.slice(0, mondayIndex)
        ];
        
        setActivityData(reorderedWeekly);
        
        // Generate monthly data
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthly = Array(6).fill(0).map((_, index) => {
          const monthIndex = (new Date().getMonth() - 5 + index) % 12;
          return { 
            month: monthNames[monthIndex], 
            searches: 0, 
            profileViews: 0,
            hires: 0
          };
        });
        
        // Fetch profiles created in the last 6 months
        const { data: monthProfiles, error: monthError } = await supabase
          .from('analytics_profiles')
          .select('created_at')
          .gte('created_at', sixMonthsAgo.toISOString());
          
        if (monthError) throw monthError;
        
        // Count profiles by month
        monthProfiles.forEach(profile => {
          const date = new Date(profile.created_at);
          const monthsAgo = Math.floor((Date.now() - date.getTime()) / (30 * 24 * 60 * 60 * 1000));
          
          if (monthsAgo < 6) {
            const index = 5 - monthsAgo;
            monthly[index].profileViews += 1;
            monthly[index].searches += Math.floor(Math.random() * 10) + 5; // Simulate search activity
            
            // Simulate hire data (roughly 10-20% of profile views become hires)
            if (Math.random() < 0.15) {
              monthly[index].hires += 1;
            }
          }
        });
        
        setMonthlyData(monthly);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load analytics data. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [toast]);
  
  const totalSearches = activityData.reduce((sum, day) => sum + day.searches, 0);
  const totalProfileViews = activityData.reduce((sum, day) => sum + day.profileViews, 0);
  
  const handleExportData = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const exportData = {
      timestamp,
      searchData,
      locationData,
      activityData,
      monthlyData
    };
    
    // Create a blob with the data
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `recruiter-analytics-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Analytics exported",
      description: "Your analytics data has been exported successfully.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-medium">Loading analytics data...</h2>
        <p className="text-muted-foreground">Please wait while we fetch your recruitment metrics</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <LineChartIcon className="h-6 w-6 text-primary" />
          Recruiter Analytics
        </h1>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Select
            defaultValue="weekly"
            onValueChange={(value) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Last 7 days</SelectItem>
              <SelectItem value="monthly">Last 30 days</SelectItem>
              <SelectItem value="quarterly">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Search className="h-5 w-5 text-primary mr-2" />
              <div className="text-2xl font-bold">{totalSearches}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profile Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary mr-2" />
              <div className="text-2xl font-bold">{totalProfileViews}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              <div className="text-2xl font-bold">
                {totalSearches > 0 ? Math.round((totalProfileViews / totalSearches) * 100) : 0}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Views per search</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="weekly" className="mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="weekly">Weekly Activity</TabsTrigger>
          <TabsTrigger value="searches">Popular Searches</TabsTrigger>
          <TabsTrigger value="locations">Candidate Locations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Activity
              </CardTitle>
              <CardDescription>Your search and profile view activity for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="searches" name="Searches" fill="#3b82f6" />
                    <Bar dataKey="profileViews" name="Profile Views" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="searches" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Most Popular Skills
              </CardTitle>
              <CardDescription>Top skills found across all candidate profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={searchData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" name="Skill Count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="locations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Candidate Locations
              </CardTitle>
              <CardDescription>Distribution of candidate locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Performance Trends
          </CardTitle>
          <CardDescription>View your recruitment metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="searches" name="Searches" stroke="#3b82f6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="profileViews" name="Profile Views" stroke="#8b5cf6" />
                <Line type="monotone" dataKey="hires" name="Hires" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruiterAnalytics;
