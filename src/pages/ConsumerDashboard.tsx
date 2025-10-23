import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Package, ShoppingBag, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  delivery_address: string;
}

const ConsumerDashboard = () => {
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("orders")
        .select("id, created_at, total_amount, status, delivery_address")
        .eq("consumer_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setOrders(data);
        setStats({
          totalOrders: data.length,
          activeOrders: data.filter((o) => o.status === "pending" || o.status === "confirmed").length,
        });
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "confirmed":
        return "bg-blue-500/10 text-blue-500";
      case "delivered":
        return "bg-green-500/10 text-green-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

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

          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Recent Orders
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  Your order history will appear here once you make your first purchase.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-sm">{order.delivery_address}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{order.total_amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default ConsumerDashboard;
