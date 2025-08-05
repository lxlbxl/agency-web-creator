import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple authentication - in a real app, this would validate against a backend
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, any non-empty email and password works
      if (email && password) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
        toast({
          title: "Login Successful",
          description: "Welcome back to your dashboard!",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter both email and password",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-gray-900 border border-gray-800 shadow-2xl shadow-gold/20 hover:shadow-gold/30 transition-all duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Agency Login</CardTitle>
          <CardDescription className="text-gray-400">Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gold text-black font-bold py-6 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/50 hover:scale-105 hover:bg-gold/90"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-gray-500 text-center">
            Demo credentials: any email and password
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;