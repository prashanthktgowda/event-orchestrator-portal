
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Plus } from "lucide-react";

const staffMembers = [
  { id: 1, name: "John Doe", role: "Event Manager", email: "john@example.com" },
  { id: 2, name: "Jane Smith", role: "Catering Lead", email: "jane@example.com" },
  { id: 3, name: "Mike Johnson", role: "Staff Coordinator", email: "mike@example.com" },
];

const Staff = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMembers.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Staff;
