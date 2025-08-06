import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Button onClick={logout} className="bg-gold text-black">
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;