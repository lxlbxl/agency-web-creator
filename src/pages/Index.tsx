import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Sparkles, 
  Globe, 
  Palette, 
  Wrench, 
  Rocket,
  Shield,
  Lock
} from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4 bg-gold/10 text-gold border-gold/30">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Automation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gold to-green-400 bg-clip-text text-transparent">
              Automation Agency
            </span>
            <br />
            Landing Page Generator
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Create stunning single-page websites for automation agencies with AI assistance. 
            Generate professional landing pages in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-gold to-green-500 hover:from-gold/90 hover:to-green-500/90 text-black font-bold py-6 px-8 text-lg transition-all duration-300 hover:scale-[1.05]">
              <Link to="/login">
                <Rocket className="mr-2" />
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white py-6 px-8 text-lg">
              <Link to="#features">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to create professional automation agency websites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Generation",
              description: "Leverage cutting-edge AI to create compelling content and layouts tailored to your business.",
              icon: <Sparkles className="w-8 h-8 text-gold" />
            },
            {
              title: "Customizable Design",
              description: "Choose from multiple color schemes and layouts to match your brand identity.",
              icon: <Palette className="w-8 h-8 text-green-400" />
            },
            {
              title: "Global Reach",
              description: "Create landing pages optimized for different regions and target audiences.",
              icon: <Globe className="w-8 h-8 text-gold" />
            },
            {
              title: "Easy Configuration",
              description: "Set up your landing page with just a few clicks using our intuitive dashboard.",
              icon: <Wrench className="w-8 h-8 text-green-400" />
            },
            {
              title: "Secure & Reliable",
              description: "Enterprise-grade security to protect your data and your clients' information.",
              icon: <Lock className="w-8 h-8 text-gold" />
            },
            {
              title: "Instant Deployment",
              description: "Publish your landing pages instantly with our one-click deployment system.",
              icon: <Rocket className="w-8 h-8 text-green-400" />
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="bg-black/50 border-gray-800 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 group"
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors duration-300">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create professional landing pages in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Configure",
              description: "Set your business parameters, region, verticals, and color preferences."
            },
            {
              step: "02",
              title: "Generate",
              description: "Our AI creates a custom landing page tailored to your specifications."
            },
            {
              step: "03",
              title: "Deploy",
              description: "Publish instantly with your branding and start converting visitors."
            }
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gold">{step.step}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to create stunning landing pages?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of automation agencies using our AI-powered platform to generate high-converting landing pages.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-gold to-green-500 hover:from-gold/90 hover:to-green-500/90 text-black font-bold py-6 px-8 text-lg transition-all duration-300 hover:scale-[1.05]">
            <Link to="/login">
              <Zap className="mr-2" />
              Start Generating
            </Link>
          </Button>
        </div>
      </div>

      <MadeWithDyad />
    </div>
  );
};

export default Index;