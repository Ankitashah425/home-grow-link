import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Sprout, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { user, profile } = useAuth();

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Sprout className="h-8 w-8" />
          AgriConnect
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/marketplace" className="text-foreground hover:text-primary transition-colors">
            Marketplace
          </Link>
          <Link to="/farmers" className="text-foreground hover:text-primary transition-colors">
            Our Farmers
          </Link>
          <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to={profile?.role === "farmer" ? "/farmer-dashboard" : "/consumer-dashboard"}>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
