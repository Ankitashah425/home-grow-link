import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Package, ShoppingBag, User } from "lucide-react";

const ConsumerDashboard = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const { data: orders } = await supabase
        .from("orders")
        .select("id, status")
        .eq("consumer_id", user.id);

      if (orders) {
        setStats({
          totalOrders: orders.length,
          activeOrders: orders.filter((o) => o.status === "pending" || o.status === "confirmed").length,
        });
      }
    };

    fetchStats();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-subtle pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Welcome</p>
                  <h3 className="text-2xl font-bold">{profile?.full_name}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <ShoppingBag className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Package className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                  <h3 className="text-2xl font-bold">{stats.activeOrders}</h3>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Your Orders</h2>
            <p className="text-muted-foreground mb-4">
              Your order history will appear here once you make your first purchase.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ConsumerDashboard;
