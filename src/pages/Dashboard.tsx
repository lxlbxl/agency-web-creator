import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  Palette, 
  Wrench, 
  Zap, 
  Settings, 
  LogOut,
  Sparkles,
  Rocket,
  Shield,
  Cog
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("");
  const [verticals, setVerticals] = useState("");
  const [webhook, setWebhook] = useState("");
  const [colorScheme, setColorScheme] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call the OpenRouter API
    console.log({ region, verticals, webhook, colorScheme });
    alert("Landing page generation started! In a real implementation, this would call the OpenRouter API.");
  };

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
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/backend-config")}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Cog className="w-4 h-4 mr-2" />
              Backend Config
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">AI Landing Page Generator</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create stunning single-page websites for automation agencies with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Card */}
          <Card className="lg:col-span-2 bg-black/50 border-gray-800 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2 text-gold" />
                Configuration
              </CardTitle>
              <CardDescription>
                Set up your landing page parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-gray-200">Region</Label>
                    <Input
                      id="region"
                      placeholder="e.g., Global, North America, Europe"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white focus:ring-gold"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="colorScheme" className="text-gray-200">Color Scheme</Label>
                    <Input
                      id="colorScheme"
                      placeholder="e.g., Gold, Black & Lemon Green"
                      value={colorScheme}
                      onChange={(e) => setColorScheme(e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white focus:ring-gold"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="verticals" className="text-gray-200">Business Verticals</Label>
                  <Input
                    id="verticals"
                    placeholder="e.g., E-commerce, SaaS, Healthcare"
                    value={verticals}
                    onChange={(e) => setVerticals(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white focus:ring-gold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook" className="text-gray-200">Webhook URL</Label>
                  <Input
                    id="webhook"
                    placeholder="https://your-webhook-url.com"
                    value={webhook}
                    onChange={(e) => setWebhook(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white focus:ring-gold"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-gold to-green-500 hover:from-gold/90 hover:to-green-500/90 text-black font-bold py-6 text-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <Rocket className="mr-2" />
                  Generate Landing Page
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Features Card */}
          <div className="space-y-8">
            <Card className="bg-black/50 border-gray-800 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10">
              <CardHeader>
                <CardTitle className="flex items-center">
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
                    <h3 className="font-semibold">Responsive Design</h3>
                    <p className="text-sm text-gray-400">Mobile-first approach for all devices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-400/10 p-2 rounded-full mt-1">
                    <Sparkles className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI-Powered Content</h3>
                    <p className="text-sm text-gray-400">Generated copy optimized for conversions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-400/10 p-2 rounded-full mt-1">
                    <Globe className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">SEO Optimized</h3>
                    <p className="text-sm text-gray-400">Built with search engines in mind</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-gray-800 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 text-gold" />
                  Backend Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Configure your AI settings in the backend:
                </p>
                <ul className="space-y-2 text-sm">
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
                  className="w-full mt-4 bg-gradient-to-r from-gold to-green-500 hover:from-gold/90 hover:to-green-500/90 text-black font-bold transition-all duration-300"
                >
                  Configure Backend
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-12 bg-gray-800" />
        
        {/* Preview Section */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">How It Works</h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our AI generates stunning landing pages in seconds
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Configure",
              description: "Set your business parameters and preferences",
              icon: <Settings className="w-8 h-8 text-gold" />
            },
            {
              title: "Generate",
              description: "AI creates a custom landing page for your agency",
              icon: <Sparkles className="w-8 h-8 text-green-400" />
            },
            {
              title: "Deploy",
              description: "Publish instantly with your branding",
              icon: <Rocket className="w-8 h-8 text-gold" />
            }
          ].map((item, index) => (
            <Card 
              key={index} 
              className="bg-black/50 border-gray-800 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 group"
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors duration-300">
                  {item.icon}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;