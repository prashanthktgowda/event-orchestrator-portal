
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Save, Users, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function NotificationRules() {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    // Email notification preferences
    emailNotifications: true,
    // Event notifications
    eventCreated: true,
    eventUpdated: true,
    eventReminder: true,
    reminderHours: 24,
    // Staff notifications
    staffAssigned: true,
    staffReminder: true,
    staffReminderHours: 12,
    // Checklist notifications
    checklistItemAdded: false,
    checklistCompleted: true,
    checklistReminder: true,
    checklistReminderHours: 48,
    // Recipients
    additionalRecipients: "",
  });

  const handleToggleChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: name.includes('Hours') ? parseInt(value) || 0 : value
    });
  };

  const handleSaveSettings = () => {
    // In a real app, save to backend
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-6 w-6 text-orange-500" />
        <h1 className="text-2xl font-bold">Notification Rules</h1>
      </div>

      <div className="max-w-3xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>General Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={() => handleToggleChange('emailNotifications')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalRecipients">Additional Recipients</Label>
              <Input
                id="additionalRecipients"
                name="additionalRecipients"
                placeholder="Enter email addresses separated by commas"
                value={notificationSettings.additionalRecipients}
                onChange={handleInputChange}
                disabled={!notificationSettings.emailNotifications}
              />
              <p className="text-xs text-muted-foreground">Add additional email addresses to receive notifications</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <CardTitle>Event Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="eventCreated">Event Created</Label>
                <Switch
                  id="eventCreated"
                  checked={notificationSettings.eventCreated}
                  onCheckedChange={() => handleToggleChange('eventCreated')}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="eventUpdated">Event Updated</Label>
                <Switch
                  id="eventUpdated"
                  checked={notificationSettings.eventUpdated}
                  onCheckedChange={() => handleToggleChange('eventUpdated')}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="eventReminder">Event Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders before events</p>
                </div>
                <Switch
                  id="eventReminder"
                  checked={notificationSettings.eventReminder}
                  onCheckedChange={() => handleToggleChange('eventReminder')}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              {notificationSettings.eventReminder && notificationSettings.emailNotifications && (
                <div className="flex items-center gap-4 pl-6">
                  <Label htmlFor="reminderHours" className="text-sm">Send reminder</Label>
                  <Input
                    id="reminderHours"
                    name="reminderHours"
                    type="number"
                    min="1"
                    max="72"
                    className="w-20"
                    value={notificationSettings.reminderHours}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm">hours before event</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-violet-500" />
              <CardTitle>Staff Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="staffAssigned">Staff Assignment</Label>
                <Switch
                  id="staffAssigned"
                  checked={notificationSettings.staffAssigned}
                  onCheckedChange={() => handleToggleChange('staffAssigned')}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="staffReminder">Staff Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminders to staff before events</p>
                </div>
                <Switch
                  id="staffReminder"
                  checked={notificationSettings.staffReminder}
                  onCheckedChange={() => handleToggleChange('staffReminder')}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              {notificationSettings.staffReminder && notificationSettings.emailNotifications && (
                <div className="flex items-center gap-4 pl-6">
                  <Label htmlFor="staffReminderHours" className="text-sm">Send reminder</Label>
                  <Input
                    id="staffReminderHours"
                    name="staffReminderHours"
                    type="number"
                    min="1"
                    max="72"
                    className="w-20"
                    value={notificationSettings.staffReminderHours}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm">hours before event</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <CardTitle>Checklist Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="checklistItemAdded">Item Added to Checklist</Label>
                <Switch
                  id="checklistItemAdded"
                  checked={notificationSettings.checklistItemAdded}
                  onCheckedChange={() => handleToggleChange('checklistItemAdded')}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="checklistCompleted">Checklist Completed</Label>
                <Switch
                  id="checklistCompleted"
                  checked={notificationSettings.checklistCompleted}
                  onCheckedChange={() => handleToggleChange('checklistCompleted')}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="checklistReminder">Checklist Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders for incomplete checklists</p>
                </div>
                <Switch
                  id="checklistReminder"
                  checked={notificationSettings.checklistReminder}
                  onCheckedChange={() => handleToggleChange('checklistReminder')}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              {notificationSettings.checklistReminder && notificationSettings.emailNotifications && (
                <div className="flex items-center gap-4 pl-6">
                  <Label htmlFor="checklistReminderHours" className="text-sm">Send reminder</Label>
                  <Input
                    id="checklistReminderHours"
                    name="checklistReminderHours"
                    type="number"
                    min="1"
                    max="72"
                    className="w-20"
                    value={notificationSettings.checklistReminderHours}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm">hours before event</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} className="gap-2">
            <Save className="h-4 w-4" />
            Save Notification Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
