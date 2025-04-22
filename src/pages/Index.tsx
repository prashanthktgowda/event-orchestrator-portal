
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ClipboardCheck, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80')] 
        bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CaterFlow
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Streamline your catering operations with our comprehensive event management solution
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/events" className="inline-flex items-center">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-none text-white">
            <Calendar className="h-12 w-12 mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold mb-2">Event Management</h3>
            <p className="text-gray-300">
              Efficiently organize and track multiple catering events with our intuitive dashboard
            </p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-none text-white">
            <ClipboardCheck className="h-12 w-12 mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold mb-2">Smart Checklists</h3>
            <p className="text-gray-300">
              Create and manage detailed checklists for each event to ensure nothing is missed
            </p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-none text-white">
            <Users className="h-12 w-12 mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold mb-2">Staff Coordination</h3>
            <p className="text-gray-300">
              Easily assign and manage staff for each event with our team management tools
            </p>
          </Card>
        </div>

        {/* Credentials Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Trusted by leading catering companies</p>
          <div className="flex justify-center space-x-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-32 h-12 bg-white/10 rounded-lg backdrop-blur-sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
