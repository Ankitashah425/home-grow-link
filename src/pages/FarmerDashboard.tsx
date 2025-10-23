import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  quantity_available: number;
  organic: boolean;
  image_url: string;
  is_active: boolean;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  products: {
    name: string;
  };
  orders: {
    created_at: string;
    status: string;
    delivery_address: string;
  };
}

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    unit: "kg",
    category: "",
    quantity_available: "",
    organic: false,
    image_url: "",
  });

  const fetchProducts = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("farmer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading products", variant: "destructive" });
    } else {
      setProducts(data || []);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("order_items")
      .select(`
        id,
        order_id,
        product_id,
        quantity,
        price_per_unit,
        subtotal,
        products(name),
        orders(created_at, status, delivery_address)
      `)
      .eq("farmer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading orders:", error);
    } else {
      setOrders(data || []);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity_available: parseInt(formData.quantity_available),
      farmer_id: user.id,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);

      if (error) {
        toast({ title: "Error updating product", variant: "destructive" });
      } else {
        toast({ title: "Product updated successfully" });
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
      }
    } else {
      const { error } = await supabase.from("products").insert(productData);

      if (error) {
        toast({ title: "Error adding product", variant: "destructive" });
      } else {
        toast({ title: "Product added successfully" });
        setShowForm(false);
        fetchProducts();
      }
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      unit: "kg",
      category: "",
      quantity_available: "",
      organic: false,
      image_url: "",
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      unit: product.unit,
      category: product.category,
      quantity_available: product.quantity_available.toString(),
      organic: product.organic,
      image_url: product.image_url || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting product", variant: "destructive" });
    } else {
      toast({ title: "Product deleted successfully" });
      fetchProducts();
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-subtle pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Farmer Dashboard</h1>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Product Management</h2>
                <Button onClick={() => { setShowForm(!showForm); setEditingProduct(null); }}>
                  <Plus className="h-5 w-5 mr-2" />
                  Add Product
                </Button>
              </div>

          {showForm && (
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit *</Label>
                    <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="dozen">dozen</SelectItem>
                        <SelectItem value="litre">litre</SelectItem>
                        <SelectItem value="piece">piece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity Available *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      required
                      value={formData.quantity_available}
                      onChange={(e) => setFormData({ ...formData, quantity_available: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="organic"
                    checked={formData.organic}
                    onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                  />
                  <Label htmlFor="organic">Organic Certified</Label>
                </div>
                <div className="flex gap-3">
                  <Button type="submit">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingProduct(null); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="p-4">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-primary font-bold text-lg">₹{product.price}/{product.unit}</span>
                  <span className="text-sm">Stock: {product.quantity_available}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <h2 className="text-2xl font-semibold mb-6">Incoming Orders</h2>
          {orders.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No orders yet. Orders for your products will appear here.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={
                          item.orders.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                          item.orders.status === "confirmed" ? "bg-blue-500/10 text-blue-500" :
                          item.orders.status === "delivered" ? "bg-green-500/10 text-green-500" :
                          "bg-gray-500/10 text-gray-500"
                        }>
                          {item.orders.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.orders.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{item.products.name}</h3>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      <p className="text-sm text-muted-foreground">{item.orders.delivery_address}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{item.subtotal.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price_per_unit} per unit
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
        </div>
      </div>
    </>
  );
};

export default FarmerDashboard;
