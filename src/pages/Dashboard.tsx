import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getConfig } from "@/services/configService";

export default function Dashboard() {
  const { logout, isLoading } = useAuth();
  const [hasConfig, setHasConfig] = useState(false);

  useEffect(() => {
    const config = getConfig();
    setHasConfig(!!config?.apiKey); // Only consider configured if API key exists
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gold to-green-400 bg-clip-text text-transparent">
            Agency Dashboard
          </h1>
          <Button 
            onClick={logout} 
            className="bg-gold text-black hover:bg-gold/90"
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border border-gray-800 hover:border-gold transition-all">
            <CardHeader>
              <CardTitle className="text-white">
                Backend Configuration {hasConfig && (
                  <span className="ml-2 text-xs bg-green-400 text-black px-2 py-1 rounded-full">
                    Configured
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Configure your API settings and system parameters
              </p>
              <Button asChild className="bg-gold text-black">
                <Link to="/backend-config">
                  {hasConfig ? 'Edit Configuration' : 'Configure'}
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border border-gray-800 hover:border-green-400 transition-all">
            <CardHeader>
              <CardTitle className="text-white">Generate Landing Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Create a new landing page for your clients
              </p>
              <Button 
                className="bg-green-400 text-black" 
                disabled={!hasConfig}
              >
                {hasConfig ? 'Create Landing Page' : 'Configure API First'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}