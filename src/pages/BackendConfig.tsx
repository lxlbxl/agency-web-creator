import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Key, 
  Bot, 
  Settings, 
  Save, 
  RefreshCw,
  Shield,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BackendConfig = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [domainFormat, setDomainFormat] = useState("");
  const [emailFormat, setEmailFormat] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate saving configuration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configuration Saved",
        description: "Your backend settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleTestConnection = () => {
    setIsLoading(true);
    
    // Simulate testing connection
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Connection Successful",
        description: "Successfully connected to the OpenRouter API.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gold w-10 h-10 rounded-lg flex items-center justify-center">
              <Settings className="text-black" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gold to-green-400 bg-clip-text text-transparent">
              Automation Agency
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/30">
              <Shield className="w-3 h-3 mr-1" />
              Backend Configuration
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/")}
              className="border-gray-700 text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Backend Configuration</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Configure your AI settings, API keys, and system parameters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration Card */}
          <Card className="lg:col-span-2 bg-gray-900/80 border border-gray-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Settings className="mr-2 text-gold" />
                API Configuration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Set up your OpenRouter API connection and system parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-white flex items-center">
                    <Key className="w-4 h-4 mr-2 text-gold" />
                    OpenRouter API Key
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="sk-or-...your-api-key..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                  <p className="text-sm text-gray-400">
                    Get your API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">OpenRouter</a>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-white flex items-center">
                    <Bot className="w-4 h-4 mr-2 text-gold" />
                    LLM Model
                  </Label>
                  <Input
                    id="model"
                    placeholder="e.g., openai/gpt-4, anthropic/claude-3-opus"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="systemPrompt" className="text-white">
                    System Prompt
                  </Label>
                  <Textarea
                    id="systemPrompt"
                    placeholder="Enter the system prompt for the AI..."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold min-h-[200px]"
                  />
                  <p className="text-sm text-gray-400">
                    This prompt will guide the AI when generating landing pages
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isLoading}
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Test Connection
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-gold text-black font-bold py-6 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/50 hover:scale-105 hover:bg-gold/90"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Configuration
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Additional Settings Card */}
          <div className="space-y-8">
            <Card className="bg-gray-900/80 border border-gray-800 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Globe className="mr-2 text-green-400" />
                  Domain & Email Formats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="domainFormat" className="text-white">
                    Domain Format
                  </Label>
                  <Input
                    id="domainFormat"
                    placeholder="e.g., {business}-{region}.com"
                    value={domainFormat}
                    onChange={(e) => setDomainFormat(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  />
                  <p className="text-sm text-gray-400">
                    Format for generated domains
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailFormat" className="text-white">
                    Email Format
                  </Label>
                  <Input
                    id="emailFormat"
                    placeholder="e.g., contact@{domain}"
                    value={emailFormat}
                    onChange={(e) => setEmailFormat(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  />
                  <p className="text-sm text-gray-400">
                    Format for contact emails
                  </p>
                </div>
                
                <Button 
                  onClick={() => {
                    toast({
                      title: "Formats Saved",
                      description: "Domain and email formats updated successfully.",
                    });
                  }}
                  className="w-full bg-green-400 text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-green-400/50 hover:scale-105 hover:bg-green-400/90"
                >
                  Save Formats
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/80 border border-gray-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Shield className="mr-2 text-gold" />
                  Security Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Store API keys securely and never expose them in client-side code</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Use environment variables for sensitive configuration</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Regularly rotate API keys for enhanced security</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Monitor API usage to detect unusual activity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-12 bg-gray-800" />
        
        {/* Configuration Tips */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 text-white">Configuration Tips</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Best practices for optimizing your AI landing page generation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Crafting Effective System Prompts",
              description: "Provide clear instructions about your brand voice, target audience, and key messaging to ensure consistent output.",
              icon: <Bot className="w-6 h-6 text-gold" />
            },
            {
              title: "Choosing the Right Model",
              description: "Select models based on your needs - GPT-4 for complex content, Claude for nuanced understanding, or Llama for cost efficiency.",
              icon: <Settings className="w-6 h-6 text-green-400" />
            },
            {
              title: "Optimizing Domain Formats",
              description: "Use descriptive domain formats that clearly indicate the business type and region for better SEO and user recognition.",
              icon: <Globe className="w-6 h-6 text-gold" />
            },
            {
              title: "Testing API Connections",
              description: "Regularly test your API connections to ensure uninterrupted service and catch configuration issues early.",
              icon: <RefreshCw className="w-6 h-6 text-green-400" />
            }
          ].map((tip, index) => (
            <Card 
              key={index} 
              className="bg-gray-900/80 border border-gray-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              <CardHeader>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    {tip.icon}
                  </div>
                  <CardTitle className="text-white">{tip.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BackendConfig;