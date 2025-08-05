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
import { useAuth } from "../contexts/AuthContext";

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
    if (!session && !isSettingsLoading) {
      navigate("/login");
    }
  }, [session, navigate, isSettingsLoading]);

  // Load user settings on component mount
  useEffect(() => {
    const loadUserSettings = async () => {
      if (!session) return;
      
      setIsSettingsLoading(true);
      try {
        const settings = await configService.getUserSettings();
        if (settings) {
          setRegion(settings.region || "");
          setVerticals(settings.verticals || "");
          setWebhook(settings.webhook_url || "");
          setColorScheme(settings.color_scheme || "");
        }
      } catch (error: any) {
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

    if (session) {
      loadUserSettings();
    }
  }, [session, toast]);

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
    } catch (error: any) {
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
      
    } catch (error: any) {
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
            <h1 className="text-2xl font<dyad-problem-report summary="5 problems">
<problem file="src/pages/Login.tsx" line="8" column="25" code="2307">Cannot find module '../contexts/AuthContext' or its corresponding type declarations.</problem>
<problem file="src/pages/Dashboard.tsx" line="25" column="25" code="2307">Cannot find module '@/contexts/AuthContext' or its corresponding type declarations.</problem>
<problem file="src/pages/BackendConfig.tsx" line="25" column="25" code="2307">Cannot find module '@/contexts/AuthContext' or its corresponding type declarations.</problem>
<problem file="src/App.tsx" line="11" column="30" code="2307">Cannot find module './contexts/AuthContext' or its corresponding type declarations.</problem>
<problem file="src/components/ProtectedRoute.tsx" line="3" column="25" code="2307">Cannot find module '@/contexts/AuthContext' or its corresponding type declarations.</problem>
</dyad-problem-report>I'll fix these import errors by correcting the paths to the AuthContext module:

<dyad-write path="src/pages/Login.tsx" description="Fixing AuthContext import path">
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      navigate("/dashboard");
      toast({
        title: "Login Successful",
        description: "Welcome back to your dashboard!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-gray-900 border border-gray-800 shadow-2xl shadow-gold/20 hover:shadow-gold/30 transition-all duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Agency Login</CardTitle>
          <CardDescription className="text-gray-400">Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gold text-black font-bold py-6 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/50 hover:scale-105 hover:bg-gold/90"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-gray-500 text-center">
            Contact your administrator for login credentials
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;