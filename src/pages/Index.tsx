import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Leaf, TruckIcon, ShieldCheck, Star, Sprout } from "lucide-react";
import { FloatingElements } from "@/components/FloatingElements";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const howItWorksSection = useScrollAnimation();
  const whyChooseSection = useScrollAnimation();
  const farmersSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  return (
    <div className="min-h-screen relative">
      {/* Smooth pastel gradient background inspired by nature */}
      <div className="fixed inset-0" style={{
        background: 'var(--gradient-nature)'
      }}>
        {/* Subtle texture overlay for depth */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(142, 202, 150, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 245, 220, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(142, 202, 150, 0.08) 0%, transparent 50%)`
        }} />
        <FloatingElements />
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .dark .fixed.inset-0 {
          background: var(--gradient-nature-dark) !important;
        }
      `}} />

      {/* Content wrapper */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section - Enhanced */}
        <section className="relative min-h-[650px] flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm mb-6 animate-fade-in">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Sustainable • Organic • Fresh</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary via-emerald-600 to-green-600 bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Fresh From Farm to Home
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-foreground/80 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Experience authentic, farm-fresh produce delivered directly to your doorstep. Supporting sustainable agriculture and empowering rural communities.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Link to="/marketplace">
                  <Button size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                    Browse Marketplace
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/join/consumer">
                  <Button size="lg" variant="outline" className="backdrop-blur-sm hover:bg-primary/10 transition-all hover:scale-105">
                    Join as Consumer
                  </Button>
                </Link>
                <Link to="/join/farmer">
                  <Button size="lg" variant="outline" className="backdrop-blur-sm hover:bg-primary/10 transition-all hover:scale-105">
                    Join as Farmer
                  </Button>
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>100% Verified Farmers</span>
                </div>
                <div className="flex items-center gap-2">
                  <TruckIcon className="h-5 w-5 text-primary" />
                  <span>24-48hr Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                  <span>5000+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-20 bg-background/80 backdrop-blur-sm scroll-mt-20" ref={howItWorksSection.elementRef}>
          <div className="container mx-auto px-4">
            <div className={`text-center mb-16 animate-on-scroll ${howItWorksSection.isVisible ? 'in-view' : ''}`}>
              <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Simple steps to get fresh farm produce delivered to your doorstep
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className={`text-center p-6 animate-on-scroll ${howItWorksSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.1s" }}>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary transition-transform hover:scale-110">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Browse Products</h3>
                <p className="text-muted-foreground">
                  Explore fresh produce from local farmers in your area
                </p>
              </div>

              <div className={`text-center p-6 animate-on-scroll ${howItWorksSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.2s" }}>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary transition-transform hover:scale-110">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Place Your Order</h3>
                <p className="text-muted-foreground">
                  Add items to cart and checkout securely with multiple payment options
                </p>
              </div>

              <div className={`text-center p-6 animate-on-scroll ${howItWorksSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.3s" }}>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary transition-transform hover:scale-110">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Fresh Delivery</h3>
                <p className="text-muted-foreground">
                  Receive your farm-fresh produce within 24-48 hours
                </p>
              </div>
            </div>

            <div className={`text-center mb-16 animate-on-scroll ${whyChooseSection.isVisible ? 'in-view' : ''}`} ref={whyChooseSection.elementRef}>
              <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose AgriConnect?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We bridge the gap between local farmers and urban consumers with transparency and quality.
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`text-center p-6 rounded-lg bg-card card-hover animate-on-scroll ${whyChooseSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:rotate-12">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Fresh</h3>
              <p className="text-muted-foreground">
                Harvested and delivered within 24-48 hours for maximum freshness.
              </p>
            </div>

            <div className={`text-center p-6 rounded-lg bg-card card-hover animate-on-scroll ${whyChooseSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:rotate-12">
                <TruckIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Track your orders in real-time from farm to your doorstep.
              </p>
            </div>

            <div className={`text-center p-6 rounded-lg bg-card card-hover animate-on-scroll ${whyChooseSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:rotate-12">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">
                Every product is verified for quality and organic certification.
              </p>
            </div>

            <div className={`text-center p-6 rounded-lg bg-card card-hover animate-on-scroll ${whyChooseSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:rotate-12">
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
        <section className="py-20 bg-background/90 backdrop-blur-sm" ref={ctaSection.elementRef}>
        <div className={`container mx-auto px-4 text-center animate-on-scroll ${ctaSection.isVisible ? 'in-view' : ''}`}>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Experience Farm-Fresh Living?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of consumers enjoying fresh, organic produce while supporting local farmers.
          </p>
          <Link to="/auth">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          </div>
        </section>

        {/* Farmers Section */}
        <section id="farmers" className="py-20 bg-muted/50 backdrop-blur-sm scroll-mt-20" ref={farmersSection.elementRef}>
          <div className="container mx-auto px-4">
            <div className={`text-center mb-16 animate-on-scroll ${farmersSection.isVisible ? 'in-view' : ''}`}>
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Trusted Farmers</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated farmers who grow your food with care and passion
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`text-center p-6 rounded-lg bg-card card-hover animate-on-scroll-left ${farmersSection.isVisible ? 'in-view' : ''}`}>
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:rotate-12">
                  <Sprout className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Profiles</h3>
                <p className="text-muted-foreground">
                  All farmers are verified with authentic farm details and certifications
                </p>
              </div>

              <div className={`text-center p-6 rounded-lg bg-card card-hover animate-on-scroll ${farmersSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.1s" }}>
                <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:rotate-12">
                  <Star className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rated & Reviewed</h3>
                <p className="text-muted-foreground">
                  Check ratings and reviews from other consumers before ordering
                </p>
              </div>

              <div className={`text-center p-6 rounded-lg bg-card card-hover animate-on-scroll-right ${farmersSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.2s" }}>
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:rotate-12">
                  <Leaf className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainable Farming</h3>
                <p className="text-muted-foreground">
                  Supporting eco-friendly and organic farming practices
                </p>
              </div>
            </div>

            <div className={`text-center mt-12 animate-on-scroll ${farmersSection.isVisible ? 'in-view' : ''}`} style={{ animationDelay: "0.3s" }}>
              <Link to="/marketplace">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                  Meet Our Farmers
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
