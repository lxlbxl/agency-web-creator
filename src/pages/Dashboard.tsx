import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Cog, 
  LogOut,
  Sparkles,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { configService, UserSettings } from "@/services/configService";
import { useAuth } from "../contexts/AuthContext";
import ConfigurationForm from "@/components/dashboard/ConfigurationForm";
import FeaturesCard from "@/components/dashboard/FeaturesCard";
import HowItWorks from "@/components/dashboard/HowItWorks";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [region, setRegion] = useState("");
  const [verticals, setVerticals] = useState("");
  const [webhook, setWebhook] = useState("");
  const [colorScheme, setColorScheme] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message || "Failed to logout",
        variant: "destructive"
      });
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-gold mx-auto" />
          <p className="text-white mt-4">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gold w-10 h-10 rounded-lg flex items-center justify-center">
              <Zap className="text-black" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gold to-green-400 bg-clip-text text-transparent">
              Automation Agency
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/30">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => navigate("/backend-config")}
              className="bg-gold text-black hover:bg-gold/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
            >
              <Cog className="w-4 h-4 mr-2" />
              Backend Config
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleLogout}
              className="bg-gold text-black hover:bg-gold/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">AI Landing Page Generator</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create stunning single-page websites for automation agencies with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Card */}
          <div className="lg:col-span-2">
            <ConfigurationForm
              region={region}
              verticals={verticals}
              webhook={webhook}
              colorScheme={colorScheme}
              onRegionChange={setRegion}
              onVerticalsChange={setVerticals}
              onWebhookChange={setWebhook}
              onColorSchemeChange={setColorScheme}
              onSubmit={() => {}}
              isLoading={isLoading}
            />
          </div>
          
          {/* Features Card */}
          <FeaturesCard />
        </div>
        
        <Separator className="my-12 bg-gray-800" />
        
        {/* Preview Section */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 text-white">How It Works</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our AI generates stunning landing pages in seconds
          </p>
        </div>
        
        <HowItWorks />
      </main>
    </div>
  );
};

export default Dashboard;