import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Plus, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

interface TicketResponse {
  id: string;
  message: string;
  created_at: string;
  is_admin: boolean;
}

export const SupportTickets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [responses, setResponses] = useState<TicketResponse[]>([]);
  const [newResponse, setNewResponse] = useState("");
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });

  const fetchTickets = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading tickets", variant: "destructive" });
    } else {
      setTickets(data || []);
    }
  };

  const fetchResponses = async (ticketId: string) => {
    const { data, error } = await supabase
      .from("ticket_responses")
      .select("*")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true });

    if (error) {
      toast({ title: "Error loading responses", variant: "destructive" });
    } else {
      setResponses(data || []);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  useEffect(() => {
    if (selectedTicket) {
      fetchResponses(selectedTicket);
    }
  }, [selectedTicket]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from("support_tickets").insert({
      user_id: user.id,
      subject: formData.subject,
      message: formData.message,
      priority: formData.priority,
    });

    if (error) {
      toast({ title: "Error creating ticket", variant: "destructive" });
    } else {
      toast({ title: "Support ticket created successfully" });
      setShowNewTicket(false);
      setFormData({ subject: "", message: "", priority: "medium" });
      fetchTickets();
    }
  };

  const handleAddResponse = async () => {
    if (!user || !selectedTicket || !newResponse.trim()) return;

    const { error } = await supabase.from("ticket_responses").insert({
      ticket_id: selectedTicket,
      user_id: user.id,
      message: newResponse,
      is_admin: false,
    });

    if (error) {
      toast({ title: "Error sending message", variant: "destructive" });
    } else {
      setNewResponse("");
      fetchResponses(selectedTicket);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/10 text-blue-500";
      case "in_progress":
        return "bg-yellow-500/10 text-yellow-500";
      case "resolved":
        return "bg-green-500/10 text-green-500";
      case "closed":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Customer Support
        </h2>
        <Dialog open={showNewTicket} onOpenChange={setShowNewTicket}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your issue in detail"
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full">Submit Ticket</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {tickets.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No support tickets yet. Create one if you need help!</p>
          </Card>
        ) : (
          tickets.map((ticket) => (
            <Card key={ticket.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{ticket.priority.toUpperCase()}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{ticket.message}</p>
                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(ticket.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTicket(ticket.id)}
                    className="mt-3"
                  >
                    View Messages
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{ticket.subject}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="max-h-96 overflow-y-auto space-y-3 p-4 bg-muted/30 rounded-lg">
                      <div className="bg-card p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">You</p>
                        <p className="text-sm">{ticket.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(ticket.created_at).toLocaleString()}
                        </p>
                      </div>
                      {responses.map((response) => (
                        <div
                          key={response.id}
                          className={`p-3 rounded-lg ${
                            response.is_admin ? "bg-primary/10" : "bg-card"
                          }`}
                        >
                          <p className="text-sm font-medium mb-1">
                            {response.is_admin ? "Support Team" : "You"}
                          </p>
                          <p className="text-sm">{response.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(response.created_at).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                    {ticket.status !== "closed" && ticket.status !== "resolved" && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={newResponse}
                          onChange={(e) => setNewResponse(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleAddResponse()}
                        />
                        <Button onClick={handleAddResponse} size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
