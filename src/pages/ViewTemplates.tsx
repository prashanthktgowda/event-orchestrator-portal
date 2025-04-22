
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  FileCheck, 
  Plus, 
  Search, 
  Calendar,
  Users,
  MapPin,
  MoreHorizontal,
  Copy,
  Trash
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface EventTemplate {
  id: string;
  name: string;
  category: string;
  itemCount: number;
  staffCount: number;
  location: string;
  lastUsed: string;
}

export default function ViewTemplates() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock templates data
  const [templates, setTemplates] = useState<EventTemplate[]>([
    {
      id: "1",
      name: "Wedding Reception",
      category: "Wedding",
      itemCount: 15,
      staffCount: 8,
      location: "Various",
      lastUsed: "2024-04-01",
    },
    {
      id: "2",
      name: "Corporate Lunch",
      category: "Corporate",
      itemCount: 8,
      staffCount: 4,
      location: "Office Buildings",
      lastUsed: "2024-03-28",
    },
    {
      id: "3",
      name: "Birthday Party",
      category: "Private",
      itemCount: 10,
      staffCount: 3,
      location: "Residential",
      lastUsed: "2024-03-15",
    },
    {
      id: "4",
      name: "Conference Catering",
      category: "Corporate",
      itemCount: 12,
      staffCount: 6,
      location: "Convention Centers",
      lastUsed: "2024-02-20",
    },
  ]);

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTemplate = (id: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      setTemplates(templates.filter(template => template.id !== id));
      
      toast({
        title: "Template deleted",
        description: "The template has been successfully removed."
      });
    }
  };

  const handleDuplicateTemplate = (template: EventTemplate) => {
    const newTemplate = {
      ...template,
      id: `copy-${Date.now()}`,
      name: `${template.name} (Copy)`,
    };
    
    setTemplates([...templates, newTemplate]);
    
    toast({
      title: "Template duplicated",
      description: `"${template.name}" has been duplicated.`
    });
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FileCheck className="mr-2 h-6 w-6 text-blue-500" />
          Event Templates
        </h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link to="/create-template">
              <Plus className="mr-1 h-4 w-4" /> New Template
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="truncate">{template.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/create-template?edit=${template.id}`} className="cursor-pointer">
                          Edit Template
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleDuplicateTemplate(template)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-500 focus:text-red-500" 
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
                <Badge className="mt-1 w-fit">{template.category}</Badge>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <FileCheck className="mr-2 h-4 w-4" />
                    <span>{template.itemCount} items in checklist</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{template.staffCount} staff required</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{template.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between items-center">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>Last used: {new Date(template.lastUsed).toLocaleDateString()}</span>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/events?template=${template.id}`}>
                    Use Template
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 border rounded-lg bg-gray-50">
            <FileCheck className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-1">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "No templates match your search" : "Create your first event template"}
            </p>
            <Button asChild>
              <Link to="/create-template">
                <Plus className="mr-1 h-4 w-4" /> Create Template
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
