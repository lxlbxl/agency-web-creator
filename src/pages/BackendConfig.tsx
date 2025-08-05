import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { configService, BackendConfig as BackendConfigType } from "@/services/configService";
import { useAuth } from "../contexts/AuthContext";
import ApiConfigForm from "../components/backend-config/ApiConfigForm";
import AdminCredentialsForm from "../components/backend-config/AdminCredentialsForm";
import DomainEmailForm from "../components/backend-config/DomainEmailForm";
import SecurityGuidelines from "../components/backend-config/SecurityGuidelines";
import ConfigurationTips from "../components/backend-config/ConfigurationTips";

const BackendConfig = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigLoading, setIsConfigLoading] = useState(true);
  
  // Form states
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("openai/gpt-4");
  const [systemPrompt, setSystemPrompt] = useState(`You are an expert web designer specializing in creating stunning single-page websites for automation agencies. Create modern, responsive HTML/CSS/JS landing pages with the following specifications:
  
1. Modern, responsive design that works on all devices
2. Use a color scheme of Gold, Black & Lemon Green throughout
3. Include sections for:
   - Hero section with compelling headline and call-to-action
   - Services offered
   - About the agency
   - Testimonials (if applicable)
   - Contact form that submits to a webhook URL
4. Optimize for conversions with clear CTAs
5. Include appropriate animations and interactive elements
6. Ensure fast loading and clean code
7. Return only valid HTML/CSS/JS code without any additional explanations`);
  const [domainFormat, setDomainFormat] = useState("");
  const [emailFormat, setEmailFormat] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Save backend configuration
      const backendConfig: Omit<BackendConfigType, 'id' | 'updated_at'> = {
        api_key: apiKey,
        model: model,
        system_prompt: systemPrompt,
        domain_format: domainFormat,
        email_format: emailFormat,
        admin_email: adminEmail
      };
      
      await configService.saveBackendConfig(backendConfig);
      
      toast({
        title: "Configuration Saved",
        description: "Your backend settings have been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error saving configuration:", error);
      toast({
        title: "Save Failed",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
              variant="default" 
              size="sm" 
              onClick={() => navigate("/")}
              className="bg-gold text-black hover:bg-gold/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
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
          <div className="lg:col-span-2">
            <ApiConfigForm
              apiKey={apiKey}
              model={model}
              systemPrompt={systemPrompt}
              onApiKeyChange={setApiKey}
              onModelChange={setModel}
              onSystemPromptChange={setSystemPrompt}
              onSave={handleSave}
              isLoading={isLoading}
            />
          </div>
          
          {/* Additional Settings Card */}
          <div className="space-y-8">
            <AdminCredentialsForm
              adminEmail={adminEmail}
              adminPassword={adminPassword}
              onAdminEmailChange={setAdminEmail}
              onAdminPasswordChange={setAdminPassword}
            />
            
            <DomainEmailForm
              domainFormat={domainFormat}
              emailFormat={emailFormat}
              onDomainFormatChange={setDomainFormat}
              onEmailFormatChange={setEmailFormat}
            />
            
            <SecurityGuidelines />
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
        
        <ConfigurationTips />
      </main>
    </div>
  );
};

export default BackendConfig;