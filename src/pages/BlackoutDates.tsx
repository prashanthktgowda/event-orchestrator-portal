
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarX, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface BlackoutDate {
  id: string;
  date: Date;
  reason: string;
}

export default function BlackoutDates() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState("");
  const [blackoutDates, setBlackoutDates] = useState<BlackoutDate[]>([
    { id: "1", date: new Date(2024, 5, 5), reason: "Company Retreat" },
    { id: "2", date: new Date(2024, 5, 15), reason: "Annual Maintenance" },
    { id: "3", date: new Date(2024, 6, 4), reason: "Independence Day" },
  ]);

  // Define dates that are disabled (already blackout)
  const disabledDates = blackoutDates.map(bd => bd.date);

  const handleAddBlackoutDate = () => {
    if (!selectedDate) {
      toast({
        title: "Error",
        description: "Please select a date",
        variant: "destructive"
      });
      return;
    }
    
    if (!reason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for the blackout date",
        variant: "destructive"
      });
      return;
    }

    // Check if date already exists in blackout dates
    if (disabledDates.some(date => date.toDateString() === selectedDate.toDateString())) {
      toast({
        title: "Error",
        description: "This date is already blocked out",
        variant: "destructive"
      });
      return;
    }

    const newBlackoutDate: BlackoutDate = {
      id: Date.now().toString(),
      date: selectedDate,
      reason
    };

    setBlackoutDates([...blackoutDates, newBlackoutDate]);
    setSelectedDate(undefined);
    setReason("");

    toast({
      title: "Blackout date added",
      description: `${format(selectedDate, "MMMM d, yyyy")} has been added to blackout dates.`
    });
  };

  const handleRemoveBlackoutDate = (id: string) => {
    setBlackoutDates(blackoutDates.filter(bd => bd.id !== id));
    
    toast({
      title: "Blackout date removed",
      description: "The date has been removed from blackout dates."
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <CalendarX className="h-6 w-6 text-yellow-600" />
        <h1 className="text-2xl font-bold">Blackout Dates</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Blackout Date</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={[
                  { before: new Date() }, // Disable past dates
                  ...disabledDates
                ]}
                className="mx-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Blackout</Label>
              <Textarea 
                id="reason"
                placeholder="Enter reason for blackout date..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleAddBlackoutDate}
              disabled={!selectedDate || !reason.trim()}
            >
              Add Blackout Date
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Blackout Dates</CardTitle>
          </CardHeader>
          <CardContent>
            {blackoutDates.length > 0 ? (
              <div className="space-y-2">
                {blackoutDates
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((bd) => (
                    <div 
                      key={bd.id}
                      className="flex items-center justify-between p-3 rounded-md border"
                    >
                      <div>
                        <p className="font-medium">{format(bd.date, "MMMM d, yyyy")}</p>
                        <p className="text-sm text-muted-foreground">{bd.reason}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => handleRemoveBlackoutDate(bd.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No blackout dates have been added yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
