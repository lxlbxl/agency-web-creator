import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Wrench, 
  Rocket,
  Loader2
} from "lucide-react";

interface ConfigurationFormProps {
  region: string;
  verticals: string;
  webhook: string;
  colorScheme: string;
  onRegionChange: (value: string) => void;
  onVerticalsChange: (value: string) => void;
  onWebhookChange: (value: string) => void;
  onColorSchemeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ConfigurationForm = ({
  region,
  verticals,
  webhook,
  colorScheme,
  onRegionChange,
  onVerticalsChange,
  onWebhookChange,
  onColorSchemeChange,
  onSubmit,
  isLoading
}: ConfigurationFormProps) => {
  return (
    <Card className="bg-gray-900/80 border border-gray-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
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
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="region" className="text-white">Region</Label>
              <Input
                id="region"
                placeholder="e.g., Global, North America, Europe"
                value={region}
                onChange={(e) => onRegionChange(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="colorScheme" className="text-white">Color Scheme</Label>
              <Input
                id="colorScheme"
                placeholder="e.g., Gold, Black & Lemon Green"
                value={colorScheme}
                onChange={(e) => onColorSchemeChange(e.target.value)}
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
              onChange={(e) => onVerticalsChange(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="webhook" className="text-white">Webhook URL</Label>
            <Input
              id="webhook"
              placeholder="https://your-webhook-url.com"
              value={webhook}
              onChange={(e) => onWebhookChange(e.target.value)}
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
  );
};

export default ConfigurationForm;