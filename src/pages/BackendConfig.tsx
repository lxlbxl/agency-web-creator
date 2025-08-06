import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveConfig } from "@/services/configService";
import { useToast } from "@/hooks/use-toast";

export default function BackendConfig() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-4");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [domainFormat, setDomainFormat] = useState("");
  const [emailFormat, setEmailFormat] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const { toast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await saveConfig({
      apiKey,
      model,
      systemPrompt,
      domainFormat,
      emailFormat,
      adminEmail
    });

    if (success) {
      toast({
        title: "Configuration Saved",
        description: "Your settings have been saved successfully",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Card className="max-w-3xl mx-auto bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Backend Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-white">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter your API key"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="text-white">Model</Label>
              <Input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="gpt-4"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemPrompt" className="text-white">System Prompt</Label>
              <textarea
                id="systemPrompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 min-h-[100px]"
                placeholder="Enter system prompt"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="domainFormat" className="text-white">Domain Format</Label>
                <Input
                  id="domainFormat"
                  value={domainFormat}
                  onChange={(e) => setDomainFormat(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailFormat" className="text-white">Email Format</Label>
                <Input
                  id="emailFormat"
                  value={emailFormat}
                  onChange={(e) => setEmailFormat(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="user@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-white">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="admin@example.com"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-black hover:bg-gold/90 mt-6"
            >
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}