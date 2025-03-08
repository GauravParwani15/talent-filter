
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart as PieChartIcon, Users, Search, LineChart, TrendingUp } from "lucide-react";

// Sample data for analytics
const searchData = [
  { name: 'React', count: 124 },
  { name: 'Node.js', count: 87 },
  { name: 'TypeScript', count: 65 },
  { name: 'Full Stack', count: 53 },
  { name: 'Python', count: 40 },
  { name: 'UI/UX', count: 32 },
];

const locationData = [
  { name: 'Remote', value: 45 },
  { name: 'New York', value: 20 },
  { name: 'San Francisco', value: 15 },
  { name: 'London', value: 12 },
  { name: 'Other', value: 8 },
];

const weeklyActivity = [
  { day: 'Mon', searches: 15, profileViews: 23 },
  { day: 'Tue', searches: 20, profileViews: 25 },
  { day: 'Wed', searches: 18, profileViews: 30 },
  { day: 'Thu', searches: 25, profileViews: 35 },
  { day: 'Fri', searches: 22, profileViews: 28 },
  { day: 'Sat', searches: 10, profileViews: 15 },
  { day: 'Sun', searches: 8, profileViews: 13 },
];

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e'];

const RecruiterAnalytics = () => {
  const totalSearches = weeklyActivity.reduce((sum, day) => sum + day.searches, 0);
  const totalProfileViews = weeklyActivity.reduce((sum, day) => sum + day.profileViews, 0);
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
        <LineChart className="h-6 w-6 text-primary" />
        Recruiter Analytics
      </h1>
      
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
                {Math.round((totalProfileViews / totalSearches) * 100)}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Views per search</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="weekly" className="mb-8">
        <TabsList>
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
                    data={weeklyActivity}
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
                Most Popular Searches
              </CardTitle>
              <CardDescription>Top search queries across all recruiters</CardDescription>
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
                    <Bar dataKey="count" name="Search Count" fill="#3b82f6" />
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
    </div>
  );
};

export default RecruiterAnalytics;
