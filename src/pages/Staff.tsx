
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockEvents } from "@/data/mock-events";

const Staff = () => {
  // Get unique staff members from all events
  const allStaff = Array.from(new Set(mockEvents.flatMap(event => event.staff)));

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allStaff.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <p className="text-sm mt-2">{member.contact}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Staff;
