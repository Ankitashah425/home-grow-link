import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sprout } from "lucide-react";

const JoinFarmer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/farmer-dashboard`
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        await supabase.from("profiles").insert({ id: authData.user.id, email, full_name: fullName });
        await supabase.from("user_roles").insert({ user_id: authData.user.id, role: 'farmer' });
        await supabase.from("farmer_details").insert({ farmer_id: authData.user.id, farm_name: farmName, farm_address: "To be updated" });
        
        toast({ title: "Account created! Redirecting..." });
        navigate("/farmer-dashboard");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 card-3d">
        <div className="text-center mb-8">
          <Sprout className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold gradient-text">Join as Farmer</h1>
          <p className="text-muted-foreground mt-2">Start selling your harvest</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <Input placeholder="Farm Name" value={farmName} onChange={(e) => setFarmName(e.target.value)} required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Account..." : "Create Farmer Account"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default JoinFarmer;