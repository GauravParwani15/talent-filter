
import { useState } from "react";
import { Bell, Check, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  type: "profile_view" | "search_match" | "message";
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
};

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "profile_view",
    title: "Profile Viewed",
    description: "A recruiter from TechCorp viewed your profile",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: "2",
    type: "search_match",
    title: "New Search Match",
    description: "Your profile matched a search for 'React Developer'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    description: "You received a message from Jane at InnovateTech",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: "4",
    type: "profile_view",
    title: "Profile Viewed",
    description: "A recruiter from DataSystems viewed your profile",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
    read: true,
  },
  {
    id: "5",
    type: "search_match",
    title: "New Search Match",
    description: "Your profile matched a search for 'Frontend Developer with 3+ years experience'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => 
        n.id === id ? { ...n, read: true } : n
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          Notifications
        </h1>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={markAllAsRead}
          disabled={!notifications.some(n => !n.read)}
        >
          <Check className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setActiveTab(value as "all" | "unread")}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {renderNotificationList(filteredNotifications, markAsRead, formatTime)}
        </TabsContent>
        
        <TabsContent value="unread" className="mt-4">
          {renderNotificationList(filteredNotifications, markAsRead, formatTime)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

function renderNotificationList(
  notifications: Notification[], 
  markAsRead: (id: string) => void, 
  formatTime: (date: Date) => string
) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-1">No notifications</h3>
        <p className="text-muted-foreground">You don't have any notifications at the moment.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className={cn(
            "flex items-start p-4 rounded-lg border transition-colors",
            !notification.read 
              ? "bg-accent/5 border-accent/10" 
              : "bg-card border-border hover:bg-accent/5"
          )}
          onClick={() => markAsRead(notification.id)}
        >
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">
                {notification.title}
                {!notification.read && (
                  <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full" />
                )}
              </h3>
              <span className="text-xs text-muted-foreground">
                {formatTime(notification.timestamp)}
              </span>
            </div>
            <p className="text-muted-foreground mt-1">{notification.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
