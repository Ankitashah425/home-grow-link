import { Leaf, Sprout, Flower } from "lucide-react";

export const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating leaves and elements */}
      <div className="absolute top-[10%] left-[5%] text-primary/20 animate-float" style={{ animationDelay: "0s" }}>
        <Leaf size={40} />
      </div>
      <div className="absolute top-[20%] right-[10%] text-secondary/20 animate-float-slow" style={{ animationDelay: "1s" }}>
        <Sprout size={35} />
      </div>
      <div className="absolute top-[40%] left-[15%] text-primary/15 animate-float" style={{ animationDelay: "2s" }}>
        <Flower size={30} />
      </div>
      <div className="absolute top-[60%] right-[20%] text-secondary/15 animate-float-slow" style={{ animationDelay: "3s" }}>
        <Leaf size={45} className="rotate-45" />
      </div>
      <div className="absolute top-[80%] left-[25%] text-primary/20 animate-float" style={{ animationDelay: "4s" }}>
        <Sprout size={32} />
      </div>
      <div className="absolute top-[30%] right-[5%] text-secondary/20 animate-float-slow" style={{ animationDelay: "2.5s" }}>
        <Flower size={38} />
      </div>
      <div className="absolute top-[50%] left-[8%] text-primary/15 animate-float" style={{ animationDelay: "1.5s" }}>
        <Leaf size={28} className="-rotate-12" />
      </div>
      <div className="absolute top-[70%] right-[15%] text-secondary/20 animate-float-slow" style={{ animationDelay: "3.5s" }}>
        <Sprout size={42} />
      </div>
    </div>
  );
};
