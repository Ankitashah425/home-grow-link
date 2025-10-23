import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Leaf, TruckIcon, ShieldCheck, Star } from "lucide-react";
import heroImage from "@/assets/bg-farm-field.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Fresh From Farm to Your Home
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Connect directly with local farmers and enjoy the freshest organic produce delivered to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/marketplace">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                  Browse Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                  Join as Farmer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose AgriConnect?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We bridge the gap between local farmers and urban consumers with transparency and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-card shadow-soft hover:shadow-elevated transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Fresh</h3>
              <p className="text-muted-foreground">
                Harvested and delivered within 24-48 hours for maximum freshness.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card shadow-soft hover:shadow-elevated transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Track your orders in real-time from farm to your doorstep.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card shadow-soft hover:shadow-elevated transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">
                Every product is verified for quality and organic certification.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card shadow-soft hover:shadow-elevated transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Farmers</h3>
              <p className="text-muted-foreground">
                Connect with rated and reviewed local farmers in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Experience Farm-Fresh Living?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of consumers enjoying fresh, organic produce while supporting local farmers.
          </p>
          <Link to="/auth">
            <Button size="lg" className="shadow-lg">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AgriConnect</h3>
              <p className="text-muted-foreground text-sm">
                Connecting farmers with consumers for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</Link></li>
                <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Join Now</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 AgriConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
