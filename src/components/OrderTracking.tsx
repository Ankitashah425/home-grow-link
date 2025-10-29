import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle, Truck, Clock, XCircle } from "lucide-react";

interface OrderTrackingProps {
  status: string;
  createdAt: string;
}

export const OrderTracking = ({ status, createdAt }: OrderTrackingProps) => {
  const steps = [
    { key: "pending", label: "Order Placed", icon: Clock },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle },
    { key: "preparing", label: "Preparing", icon: Package },
    { key: "ready", label: "Ready", icon: CheckCircle },
    { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === status);
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-500/10 rounded-lg">
        <XCircle className="h-6 w-6 text-red-500" />
        <div>
          <p className="font-semibold text-red-500">Order Cancelled</p>
          <p className="text-sm text-muted-foreground">This order has been cancelled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Order Status</h3>
        <Badge className={
          status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
          status === "confirmed" ? "bg-blue-500/10 text-blue-500" :
          status === "preparing" ? "bg-purple-500/10 text-purple-500" :
          status === "ready" ? "bg-cyan-500/10 text-cyan-500" :
          status === "out_for_delivery" ? "bg-orange-500/10 text-orange-500" :
          status === "delivered" ? "bg-green-500/10 text-green-500" :
          "bg-gray-500/10 text-gray-500"
        }>
          {status.replace(/_/g, ' ').toUpperCase()}
        </Badge>
      </div>
      
      <div className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isComplete = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.key} className="flex items-center gap-4 mb-6 last:mb-0">
              <div className="relative">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  isComplete ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute left-5 top-10 w-0.5 h-6 ${
                    isComplete ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${isCurrent ? "text-primary" : ""}`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-sm text-muted-foreground">
                    {new Date(createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
