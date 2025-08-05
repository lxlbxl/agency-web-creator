import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Settings, 
  Sparkles, 
  Rocket
} from "lucide-react";

const HowItWorks = () => {
  return (
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
  );
};

export default HowItWorks;