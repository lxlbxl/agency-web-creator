import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Key, 
  Bot, 
  Settings, 
  Save, 
  RefreshCw,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiConfigFormProps {
  apiKey: string;
  model: string;
  systemPrompt: string;
  onApiKeyChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onSystemPromptChange: (value: string) => void;
  onSave: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ApiConfigForm = ({
  apiKey,
  model,
  systemPrompt,
  onApiKeyChange,
  onModelChange,
  onSystemPromptChange,
  onSave,
  isLoading
}: ApiConfigFormProps) => {
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenRouter API key before testing the connection.",
        variant: "destructive"
      });
      return;
    }

    setIsTesting(true);
    
    try {
      // Test the API key with a simple request to OpenRouter
      const response = await fetch("https://openrouter.ai/api/v1/auth/key", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        toast({
          title: "Connection Successful",
          description: "Successfully connected to the OpenRouter API.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }
    } catch (error: any) {
      console.error("Connection test failed:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect to the OpenRouter API. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="bg-gray-900/80 border border-gray-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
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
        <form onSubmit={onSave} className="space-y-6">
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
              onChange={(e) => onApiKeyChange(e.target.value)}
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
              onChange={(e) => onModelChange(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="systemPrompt" className="text-white flex items-center">
              <Info className="w-4 h-4 mr-2 text-gold" />
              System Prompt
            </Label>
            <Textarea
              id="systemPrompt"
              placeholder="Enter the system prompt for the AI..."
              value={systemPrompt}
              onChange={(e) => onSystemPromptChange(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold min-h-[200px]"
            />
            <p className="text-sm text-gray-400">
              This prompt defines the AI's role and instructions. The dashboard inputs will be sent as user prompts.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting || isLoading}
              className="bg-gold text-black hover:bg-gold/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
            >
              {isTesting ? (
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
              className="bg-gold text-black hover:bg-gold/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
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
  );
};

export default ApiConfigForm;