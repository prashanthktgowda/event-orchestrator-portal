import { useState } from "react";
import { CateringEvent, CateringItem, SubItem, StaffMember } from "@/data/mock-events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, Calendar, Clock, User, Users, Plus, Trash, Edit, File, List, ListCheck } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventDetailsProps {
  event: CateringEvent;
  onUpdateEvent: (updatedEvent: CateringEvent) => void;
}

export function EventDetails({ event, onUpdateEvent }: EventDetailsProps) {
  const [activeTab, setActiveTab] = useState<string>("checklist");
  const eventDate = new Date(event.eventTime);

  const handleOpenGoogleMaps = () => {
    const address = `${event.deliveryAddress.street}, ${event.deliveryAddress.city}, ${event.deliveryAddress.state} ${event.deliveryAddress.zipCode}`;
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };
  
  // Handler for updating item status
  const handleItemStatusChange = (itemId: string, status: CateringItem['status']) => {
    const updatedEvent = { 
      ...event,
      items: event.items.map(item => 
        item.id === itemId ? { ...item, status } : item
      )
    };
    onUpdateEvent(updatedEvent);
  };

  // Handler for updating subitem status
  const handleSubItemStatusChange = (itemId: string, subItemId: string, status: SubItem['status']) => {
    const updatedEvent = { 
      ...event,
      items: event.items.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              subItems: item.subItems.map(subItem => 
                subItem.id === subItemId ? { ...subItem, status } : subItem
              )
            } 
          : item
      )
    };
    onUpdateEvent(updatedEvent);
  };

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{event.clientName}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{format(eventDate, 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{format(eventDate, 'h:mm a')}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Edit className="h-4 w-4" />
          Edit Event
        </Button>
      </div>

      {/* Address Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Delivery Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="font-medium">{event.deliveryAddress.street}</p>
              <p className="text-muted-foreground">
                {event.deliveryAddress.city}, {event.deliveryAddress.state} {event.deliveryAddress.zipCode}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 gap-1.5"
                onClick={handleOpenGoogleMaps}
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Rest of the component */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList>
          <TabsTrigger value="checklist" className="flex gap-1.5">
            <ListCheck className="h-4 w-4" /> 
            Checklist
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex gap-1.5">
            <Users className="h-4 w-4" /> 
            Staff
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex gap-1.5">
            <File className="h-4 w-4" /> 
            Notes
          </TabsTrigger>
        </TabsList>
        
        {/* Checklist Tab */}
        <TabsContent value="checklist" className="flex-1 space-y-4 mt-4">
          {event.items.map((item) => (
            <ChecklistItem 
              key={item.id} 
              item={item} 
              onStatusChange={(status) => handleItemStatusChange(item.id, status)}
              onSubItemStatusChange={(subItemId, status) => handleSubItemStatusChange(item.id, subItemId, status)}
            />
          ))}
          <Button variant="outline" className="w-full mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </TabsContent>
        
        {/* Staff Tab */}
        <TabsContent value="staff" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Assigned Staff</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.staff.map((member) => (
                  <StaffCard key={member.id} member={member} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4 mt-4">
          {/* Notes Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{event.notes}</p>
              <Button variant="ghost" size="sm" className="mt-2 gap-1">
                <Edit className="h-4 w-4" />
                Edit Notes
              </Button>
            </CardContent>
          </Card>
          
          {/* Special Equipment Section */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Special Equipment</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {event.specialEquipment.map((item, index) => (
                  <li key={index} className="flex items-center justify-between group">
                    <span>• {item}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ChecklistItemProps {
  item: CateringItem;
  onStatusChange: (status: CateringItem['status']) => void;
  onSubItemStatusChange: (subItemId: string, status: SubItem['status']) => void;
}

function ChecklistItem({ item, onStatusChange, onSubItemStatusChange }: ChecklistItemProps) {
  const [expanded, setExpanded] = useState(true);
  
  const getStatusOptions = () => [
    { value: "pending", label: "Pending" },
    { value: "prepared", label: "Prepared" },
    { value: "packed", label: "Packed" },
    { value: "loaded", label: "Loaded" }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium">{
                item.subItems.filter(sub => sub.status !== "pending").length
              }/{item.subItems.length}</span>
            </div>
            <CardTitle className="text-lg">{item.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={item.status}
              onChange={(e) => onStatusChange(e.target.value as CateringItem['status'])}
              className="text-xs bg-background border rounded px-2 py-1"
            >
              {getStatusOptions().map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-8 w-8"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "-" : "+"}
            </Button>
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent>
          <div className="space-y-2">
            {item.subItems.map((subItem) => (
              <div key={subItem.id} className="flex items-center justify-between py-1 px-1 rounded-sm hover:bg-muted/50 group">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id={`checkbox-${subItem.id}`}
                    checked={subItem.status !== "pending"}
                    onCheckedChange={(checked) => {
                      onSubItemStatusChange(subItem.id, checked ? "packed" : "pending");
                    }}
                  />
                  <label 
                    htmlFor={`checkbox-${subItem.id}`}
                    className={cn(
                      "text-sm cursor-pointer",
                      subItem.status !== "pending" && "line-through text-muted-foreground"
                    )}
                  >
                    {subItem.name}
                  </label>
                  {subItem.isFoodItem && (
                    <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary-foreground/70 rounded-full">
                      Food
                    </span>
                  )}
                </div>
                <select
                  value={subItem.status}
                  onChange={(e) => onSubItemStatusChange(subItem.id, e.target.value as SubItem['status'])}
                  className="text-xs bg-background border rounded px-2 py-1 opacity-0 group-hover:opacity-100"
                >
                  {getStatusOptions().map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            ))}
            
            <Button variant="ghost" size="sm" className="mt-2 w-full justify-start gap-1.5 text-muted-foreground">
              <Plus className="h-3.5 w-3.5" />
              Add Sub-Item
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

interface StaffCardProps {
  member: StaffMember;
}

function StaffCard({ member }: StaffCardProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-md border">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <User className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium">{member.name}</p>
          <p className="text-xs text-muted-foreground">{member.role}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{member.contact}</p>
    </div>
  );
}
