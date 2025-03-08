
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { UserCircle, Mail, Lock, Bell, Shield, LogOut } from "lucide-react";

const UserProfile = () => {
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    fullName: "Alex Johnson",
    email: "alex@example.com",
    company: "Tech Recruiters Inc.",
    jobTitle: "Senior Talent Acquisition Specialist"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    newCandidates: true,
    profileUpdates: false,
    weeklyDigest: true
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    });
  };
  
  const handleNotificationChange = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings]
    });
    
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        <UserCircle className="h-6 w-6 text-primary" />
        User Profile
      </h1>
      
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal information and company details
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      value={profileForm.company}
                      onChange={(e) => setProfileForm({...profileForm, company: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                      id="jobTitle" 
                      value={profileForm.jobTitle}
                      onChange={(e) => setProfileForm({...profileForm, jobTitle: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordChange}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Separator />
                <div className="pt-4">
                  <h3 className="font-medium mb-4">Account Actions</h3>
                  <Button variant="destructive" className="w-full sm:w-auto" type="button">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out from All Devices
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Update Password</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control which notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Alerts</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={() => handleNotificationChange('emailAlerts')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Candidates</h4>
                    <p className="text-sm text-muted-foreground">Get notified when new candidates match your saved searches</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.newCandidates}
                    onCheckedChange={() => handleNotificationChange('newCandidates')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Profile Updates</h4>
                    <p className="text-sm text-muted-foreground">Get notified when bookmarked profiles are updated</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.profileUpdates}
                    onCheckedChange={() => handleNotificationChange('profileUpdates')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Weekly Digest</h4>
                    <p className="text-sm text-muted-foreground">Receive a weekly summary of your recruitment activity</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.weeklyDigest}
                    onCheckedChange={() => handleNotificationChange('weeklyDigest')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
