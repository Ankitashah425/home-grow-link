import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
    category: string;
    image_url: string;
    organic: boolean;
    farmer_id: string;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 group card-3d">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground">Fresh from local farm</p>
          </div>
          {product.organic && (
            <Badge variant="secondary" className="ml-2">Organic</Badge>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          <span className="text-muted-foreground">/ {product.unit}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
