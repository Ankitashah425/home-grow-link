import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Package, ShoppingBag, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderTracking } from "@/components/OrderTracking";
import { SupportTickets } from "@/components/SupportTickets";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  delivery_city: string;
  delivery_postal_code: string;
  notes: string | null;
}

interface OrderItem {
  id: string;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  products: {
    name: string;
    image_url: string | null;
  };
}

const ConsumerDashboard = () => {
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("consumer_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setOrders(data);
        setStats({
          totalOrders: data.length,
          activeOrders: data.filter((o) => 
            o.status !== "delivered" && o.status !== "cancelled"
          ).length,
        });
      }
    };

    fetchOrders();
  }, [user]);

  const fetchOrderItems = async (orderId: string) => {
    const { data, error } = await supabase
      .from("order_items")
      .select(`
        id,
        quantity,
        price_per_unit,
        subtotal,
        products(name, image_url)
      `)
      .eq("order_id", orderId);

    if (error) {
      console.error("Error loading order items:", error);
    } else {
      setOrderItems(data || []);
    }
  };

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

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card className="p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  Order History
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
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.replace(/_/g, ' ').toUpperCase()}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Order #{order.id.slice(0, 8)}
                            </p>
                            <p className="text-sm">{order.delivery_address}, {order.delivery_city}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg mb-2">₹{order.total_amount.toFixed(2)}</p>
                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    fetchOrderItems(order.id);
                                  }}
                                  className="text-sm text-primary hover:underline"
                                >
                                  Track Order
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Order Details - #{order.id.slice(0, 8)}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div>
                                    <h3 className="font-semibold mb-3">Order Items</h3>
                                    <div className="space-y-2">
                                      {orderItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                          <div className="flex items-center gap-3">
                                            <img
                                              src={item.products.image_url || "/placeholder.svg"}
                                              alt={item.products.name}
                                              className="w-12 h-12 object-cover rounded"
                                            />
                                            <div>
                                              <p className="font-medium">{item.products.name}</p>
                                              <p className="text-sm text-muted-foreground">
                                                Qty: {item.quantity} × ₹{item.price_per_unit.toFixed(2)}
                                              </p>
                                            </div>
                                          </div>
                                          <p className="font-semibold">₹{item.subtotal.toFixed(2)}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-semibold mb-3">Delivery Address</h3>
                                    <p className="text-sm">{order.delivery_address}</p>
                                    <p className="text-sm">{order.delivery_city}, {order.delivery_postal_code}</p>
                                    {order.notes && (
                                      <p className="text-sm text-muted-foreground mt-2">Note: {order.notes}</p>
                                    )}
                                  </div>

                                  <OrderTracking status={order.status} createdAt={order.created_at} />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="support">
              <Card className="p-8">
                <SupportTickets />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ConsumerDashboard;
