import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Sprout, User, Tractor } from "lucide-react";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoLogin = async (role: "farmer" | "consumer") => {
    setLoading(true);

    try {
      const timestamp = Date.now();
      const email = `demo-${role}-${timestamp}@agriconnect.demo`;
      const password = "demo123456";
      const fullName = role === "farmer" ? "Demo Farmer" : "Demo Consumer";

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            role: role,
          }
        }
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: authData.user.id,
            email,
            full_name: fullName,
            role: role,
          });

        if (profileError) throw profileError;

        if (role === "farmer") {
          const { error: farmerError } = await supabase
            .from("farmer_details")
            .insert({
              farmer_id: authData.user.id,
              farm_name: "Demo Farm",
              farm_address: "123 Farm Road, Green Valley",
              farm_description: "Organic produce from our sustainable farm",
            });

          if (farmerError) throw farmerError;
        } else {
          const { error: consumerError } = await supabase
            .from("consumer_details")
            .insert({
              consumer_id: authData.user.id,
            });

          if (consumerError) throw consumerError;
        }
      }

      toast({
        title: "Welcome to AgriConnect!",
        description: `Logged in as demo ${role}`,
      });
      
      // Redirect to appropriate dashboard based on role
      if (role === "farmer") {
        navigate("/farmer-dashboard");
      } else {
        navigate("/consumer-dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-2xl shadow-elevated">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Sprout className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl">Welcome to AgriConnect</CardTitle>
          <CardDescription className="text-lg">
            Choose your role to explore the demo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              onClick={() => handleDemoLogin("consumer")}
              disabled={loading}
              className="h-auto py-8 flex flex-col items-center gap-4 text-lg"
              variant="outline"
            >
              <User className="h-12 w-12" />
              <div>
                <div className="font-semibold">Continue as Consumer</div>
                <div className="text-sm text-muted-foreground font-normal">
                  Browse and order fresh produce
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleDemoLogin("farmer")}
              disabled={loading}
              className="h-auto py-8 flex flex-col items-center gap-4 text-lg"
              variant="outline"
            >
              <Tractor className="h-12 w-12" />
              <div>
                <div className="font-semibold">Continue as Farmer</div>
                <div className="text-sm text-muted-foreground font-normal">
                  Manage your farm and products
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
