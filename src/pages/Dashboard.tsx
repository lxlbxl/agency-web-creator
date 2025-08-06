import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getConfig } from "@/services/configService";

export default function Dashboard() {
  const { logout, isLoading } = useAuth();
  const [hasConfig, setHasConfig] = useState(false);

  useEffect(() => {
    const config = getConfig();
    setHasConfig(!!config);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
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
        </Card>
      </div>
    </div>
  );
}