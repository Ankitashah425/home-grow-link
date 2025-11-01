import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Sprout, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { user, userRole, signOut, profile } = useAuth();

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
          <a href="/#farmers" className="text-foreground hover:text-primary transition-colors">
            Our Farmers
          </a>
          <a href="/#how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </a>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/marketplace">
                <Button variant="ghost">Marketplace</Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {profile?.full_name || "User"}
                  </div>
                  <Link to={userRole === "farmer" ? "/farmer-dashboard" : "/consumer-dashboard"}>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/marketplace">
                <Button variant="ghost">Marketplace</Button>
              </Link>
              <Link to="/auth">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
