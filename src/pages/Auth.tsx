import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sprout } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100).optional(),
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"farmer" | "consumer">("consumer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const validation = authSchema.parse({ email, password, fullName });
        
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: validation.email,
          password: validation.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: validation.fullName,
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
              email: validation.email,
              full_name: validation.fullName || "",
              role: role,
            });

          if (profileError) throw profileError;

          if (role === "farmer") {
            const { error: farmerError } = await supabase
              .from("farmer_details")
              .insert({
                farmer_id: authData.user.id,
                farm_name: "My Farm",
                farm_address: "Update your farm address",
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
          title: "Account created!",
          description: "Welcome to AgriConnect",
        });
        navigate("/");
      } else {
        const validation = authSchema.parse({ email, password });
        
        const { error } = await supabase.auth.signInWithPassword({
          email: validation.email,
          password: validation.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
        });
        navigate("/");
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
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Sprout className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {mode === "login" ? "Welcome Back" : "Join AgriConnect"}
          </CardTitle>
          <CardDescription>
            {mode === "login" 
              ? "Sign in to access your account" 
              : "Connect farmers with consumers"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleAuth} className="space-y-4 mt-4">
              {mode === "signup" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={role === "consumer" ? "default" : "outline"}
                        onClick={() => setRole("consumer")}
                        className="w-full"
                      >
                        Consumer
                      </Button>
                      <Button
                        type="button"
                        variant={role === "farmer" ? "default" : "outline"}
                        onClick={() => setRole("farmer")}
                        className="w-full"
                      >
                        Farmer
                      </Button>
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  maxLength={100}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
