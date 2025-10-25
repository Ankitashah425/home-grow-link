import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, User, Tractor } from "lucide-react";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-2xl shadow-elevated animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center float">
              <Sprout className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl">Welcome to AgriConnect</CardTitle>
          <CardDescription className="text-lg">
            Choose your role to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/join/consumer">
              <Button
                className="w-full h-auto py-8 flex flex-col items-center gap-4 text-lg hover-scale"
                variant="outline"
              >
                <User className="h-12 w-12" />
                <div>
                  <div className="font-semibold">Join as Consumer</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    Browse and order fresh produce
                  </div>
                </div>
              </Button>
            </Link>

            <Link to="/join/farmer">
              <Button
                className="w-full h-auto py-8 flex flex-col items-center gap-4 text-lg hover-scale"
                variant="outline"
              >
                <Tractor className="h-12 w-12" />
                <div>
                  <div className="font-semibold">Join as Farmer</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    Manage your farm and products
                  </div>
                </div>
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Already have an account?
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/join/consumer">
                <Button variant="link" size="sm">
                  Consumer Login
                </Button>
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link to="/join/farmer">
                <Button variant="link" size="sm">
                  Farmer Login
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
