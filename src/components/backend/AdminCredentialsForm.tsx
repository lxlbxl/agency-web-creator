import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminCredentialsFormProps {
  adminEmail: string;
  adminPassword: string;
  onAdminEmailChange: (value: string) => void;
  onAdminPasswordChange: (value: string) => void;
}

const AdminCredentialsForm = ({
  adminEmail,
  adminPassword,
  onAdminEmailChange,
  onAdminPasswordChange
}: AdminCredentialsFormProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateCredentials = async () => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUpdating(false);
    
    toast({
      title: "Credentials Updated",
      description: "Admin credentials have been updated successfully.",
    });
  };

  return (
    <Card className="bg-gray-900/80 border border-gray-800 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <User className="mr-2 text-green-400" />
          Admin Credentials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="adminEmail" className="text-white">
            Admin Email
          </Label>
          <Input
            id="adminEmail"
            type="email"
            placeholder="admin@example.com"
            value={adminEmail}
            onChange={(e) => onAdminEmailChange(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:border-green-400"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="adminPassword" className="text-white">
            Admin Password
          </Label>
          <Input
            id="adminPassword"
            type="password"
            placeholder="Enter new password"
            value={adminPassword}
            onChange={(e) => onAdminPasswordChange(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:border-green-400"
          />
        </div>
        
        <Button 
          onClick={handleUpdateCredentials}
          disabled={isUpdating}
          className="w-full bg-green-400 text-black hover:bg-green-400/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/50"
        >
          {isUpdating ? "Updating..." : "Update Credentials"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminCredentialsForm;