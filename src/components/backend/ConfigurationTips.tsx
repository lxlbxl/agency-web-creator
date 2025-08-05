import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bot, 
  Settings, 
  Globe, 
  RefreshCw
} from "lucide-react";

const ConfigurationTips = () => {
  const tips = [
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
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tips.map((tip, index) => (
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
  );
};

export default ConfigurationTips;