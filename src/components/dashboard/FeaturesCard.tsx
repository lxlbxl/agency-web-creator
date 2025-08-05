import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Palette, 
  Shield,
  Sparkles, 
  Globe,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturesCard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      <Card className="bg-gray-900/80 border border-gray-800 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Palette className="mr-2 text-green-400" />
            Design Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-green-400/10 p-2 rounded-full mt-1">
              <Shield className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Responsive Design</h3>
              <p className="text-sm text-gray-400">Mobile-first approach for all devices</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-green-400/10 p-2 rounded-full mt-1">
              <Sparkles className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">AI-Powered Content</h3>
              <p className="text-sm text-gray-400">Generated copy optimized for conversions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-green-400/10 p-2 rounded-full mt-1">
              <Globe className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">SEO Optimized</h3>
              <p className="text-sm text-gray-400">Built with search engines in mind</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900/80 border border-gray-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Settings className="mr-2 text-gold" />
            Backend Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            Configure your AI settings in the backend:
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
              System Prompt
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
              API Keys
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
              LLM Model Selection
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
              Domain & Email Formats
            </li>
          </ul>
          <Button 
            onClick={() => navigate("/backend-config")}
            className="w-full mt-4 bg-gold text-black hover:bg-gold/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
          >
            Configure Backend
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesCard;