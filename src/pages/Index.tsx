import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Leaf, TruckIcon, ShieldCheck, Star, Sprout } from "lucide-react";
import { Scene3D } from "@/components/Scene3D";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Full-page dynamic background with farm pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 dark:from-emerald-950 dark:via-green-950 dark:to-lime-950">
        {/* Farm field pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            rgba(16, 185, 129, 0.1) 50px,
            rgba(16, 185, 129, 0.1) 52px
          )`
        }} />
        <div className="absolute inset-0 opacity-30">
          <Scene3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary via-emerald-600 to-green-600 bg-clip-text text-transparent">
                Fresh From Farm to Home
              </h1>
              <p className="text-xl mb-8 text-foreground/80">
                Experience authentic, farm-fresh produce delivered directly to your doorstep. Supporting sustainable agriculture and empowering rural communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/marketplace">
                  <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                    Browse Marketplace
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/join/consumer">
                  <Button size="lg" variant="outline" className="backdrop-blur-sm hover:bg-primary/10">
                    Join as Consumer
                  </Button>
                </Link>
                <Link to="/join/farmer">
                  <Button size="lg" variant="outline" className="backdrop-blur-sm hover:bg-primary/10">
                    Join as Farmer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-20 bg-background/80 backdrop-blur-sm scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Simple steps to get fresh farm produce delivered to your doorstep
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Browse Products</h3>
                <p className="text-muted-foreground">
                  Explore fresh produce from local farmers in your area
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Place Your Order</h3>
                <p className="text-muted-foreground">
                  Add items to cart and checkout securely with multiple payment options
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Fresh Delivery</h3>
                <p className="text-muted-foreground">
                  Receive your farm-fresh produce within 24-48 hours
                </p>
              </div>
            </div>

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
        <section className="py-20 bg-background/90 backdrop-blur-sm">
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

        {/* Farmers Section */}
        <section id="farmers" className="py-20 bg-muted/50 backdrop-blur-sm scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Trusted Farmers</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated farmers who grow your food with care and passion
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-card shadow-soft">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Profiles</h3>
                <p className="text-muted-foreground">
                  All farmers are verified with authentic farm details and certifications
                </p>
              </div>

              <div className="text-center p-6 rounded-lg bg-card shadow-soft">
                <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rated & Reviewed</h3>
                <p className="text-muted-foreground">
                  Check ratings and reviews from other consumers before ordering
                </p>
              </div>

              <div className="text-center p-6 rounded-lg bg-card shadow-soft">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainable Farming</h3>
                <p className="text-muted-foreground">
                  Supporting eco-friendly and organic farming practices
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link to="/marketplace">
                <Button size="lg" className="shadow-lg">
                  Meet Our Farmers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card/95 backdrop-blur-sm border-t border-border py-12">
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
                <li><a href="#help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#faqs" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 AgriConnect. All rights reserved.</p>
          </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
