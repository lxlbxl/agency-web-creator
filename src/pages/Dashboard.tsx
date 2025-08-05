import { useState, useEffect } from "react";
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
  Cog,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { configService, UserSettings } from "@/services/configService";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [region, setRegion] = useState("");
  const [verticals, setVerticals] = useState("");
  const [webhook, setWebhook] = useState("");
  const [colorScheme, setColorScheme] = useState("");

  // Load user settings on component mount
  useEffect(() => {
    const loadUserSettings = async () => {
      setIsSettingsLoading(true);
      try {
        const settings = await configService.getUserSettings();
        if (settings) {
          setRegion(settings.region || "");
          setVerticals(settings.verticals || "");
          setWebhook(settings.webhook_url || "");
          setColorScheme(settings.color_scheme || "");
        }
      } catch (error) {
        console.error("Error loading user settings:", error);
        toast({
          title: "Error",
          description: "Failed to load your settings. Using default values.",
          variant: "destructive"
        });
      } finally {
        setIsSettingsLoading(false);
      }
    };

    loadUserSettings();
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  // Function to get backend configuration from localStorage or API
  const getBackendConfig = async () => {
    // In a real app, this would fetch from an API or localStorage
    // For now, we'll use mock data
    return {
      apiKey: "sk-or-...", // This should come from secure storage
      model: "openai/gpt-4", // Default model
      systemPrompt: "You are an expert web designer specializing in creating stunning single-page websites for automation agencies. Create modern, responsive HTML/CSS/JS landing pages with the following specifications."
    };
  };

  // Function to call OpenRouter API
  const generateLandingPage = async (userPrompt: string, systemPrompt: string) => {
    const config = await getBackendConfig();
    
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: config.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating landing page:", error);
      throw error;
    }
  };

  // Function to save generated website
  const saveGeneratedWebsite = async (htmlContent: string) => {
    // In a real app, this would save to a database or file system
    // For now, we'll just log to console and create a blob
    const timestamp = new Date().toISOString();
    const filename = `landing-page-${timestamp.replace(/[:.]/g, '-')}.html`;
    
    // Log to backend (in a real app, this would be an API call)
    console.log("Generated website URL:", `${window.location.origin}/${filename}`);
    
    // Create a downloadable file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return `${window.location.origin}/${filename}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Save user settings
      const userSettings: Omit<UserSettings, 'id' | 'updated_at'> = {
        region: region || "",
        verticals: verticals || "",
        color_scheme: colorScheme || "",
        webhook_url: webhook || ""
      };
      
      await configService.saveUserSettings(userSettings);
      
      // Get backend configuration
      const config = await getBackendConfig();
      
      // Create user prompt from form data
      const userPrompt = `Create a stunning single-page website/landing page for an automation agency with the following specifications:
      
      Region: ${region || 'Not specified'}
      Business Verticals: ${verticals || 'Not specified'}
      Color Scheme: ${colorScheme || 'Gold, Black & Lemon Green (default)'}
      Webhook URL for form submissions: ${webhook || 'Not specified'}
      
      Requirements:
      1. Modern, responsive design that works on all devices
      2. Use the specified color scheme (Gold, Black & Lemon Green) throughout
      3. Include sections for:
         - Hero section with compelling headline and call-to-action
         - Services offered
         - About the agency
         - Testimonials (if applicable)
         - Contact form that submits to the provided webhook URL
      4. Optimize for conversions with clear CTAs
      5. Include appropriate animations and interactive elements
      6. Ensure fast loading and clean code
      7. Return only valid HTML/CSS/JS code without any additional explanations
      
      Please generate the complete HTML code for this landing page.`;
      
      // Generate landing page using LLM
      toast({
        title: "Generating Landing Page",
        description: "Creating your custom landing page with AI...",
      });
      
      const generatedCode = await generateLandingPage(userPrompt, config.systemPrompt);
      
      // Save the generated website
      const websiteUrl = await saveGeneratedWebsite(generatedCode);
      
      toast({
        title: "Landing Page Generated!",
        description: `Your landing page has been created successfully. URL: ${websiteUrl}`,
      });
      
      // Log to backend (in a real implementation, this would be an API call)
      console.log("Landing page generated and saved at:", websiteUrl);
      
    } catch (error) {
      console.error("Error generating landing page:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate landing page. Please check your configuration and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSettingsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-gold mx-auto" />
          <p className="text-white mt-4">Loading your settings...</p>
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
          <Card className="lg:col-span-2 bg-gray-900/80 border border-gray-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Wrench className="mr-2 text-gold" />
                Configuration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Set up your landing page parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-white">Region</Label>
                    <Input
                      id="region"
                      placeholder="e.g., Global, North America, Europe"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="colorScheme" className="text-white">Color Scheme</Label>
                    <Input
                      id="colorScheme"
                      placeholder="e.g., Gold, Black & Lemon Green"
                      value={colorScheme}
                      onChange={(e) => setColorScheme(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="verticals" className="text-white">Business Verticals</Label>
                  <Input
                    id="verticals"
                    placeholder="e.g., E-commerce, SaaS, Healthcare"
                    value={verticals}
                    onChange={(e) => setVerticals(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook" className="text-white">Webhook URL</Label>
                  <Input
                    id="webhook"
                    placeholder="https://your-webhook-url.com"
                    value={webhook}
                    onChange={(e) => setWebhook(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gold text-black hover:bg-gold/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2" />
                      Generate Landing Page
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Features Card */}
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
        </div>
        
        <Separator className="my-12 bg-gray-800" />
        
        {/* Preview Section */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 text-white">How It Works</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
              className="bg-gray-900/80 border border-gray-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 group"
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors duration-300">
                  {item.icon}
                </div>
                <CardTitle className="text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;