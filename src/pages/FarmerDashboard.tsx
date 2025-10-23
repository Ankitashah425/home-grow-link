import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

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

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    fetchProducts();
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">My Products</h1>
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
        </div>
      </div>
    </>
  );
};

export default FarmerDashboard;
