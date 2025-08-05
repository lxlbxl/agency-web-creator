import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const SecurityGuidelines = () => {
  return (
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
  );
};

export default SecurityGuidelines;