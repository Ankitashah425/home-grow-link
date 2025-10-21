export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      consumer_details: {
        Row: {
          city: string | null
          consumer_id: string
          created_at: string
          delivery_address: string | null
          id: string
          postal_code: string | null
          preferences: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          consumer_id: string
          created_at?: string
          delivery_address?: string | null
          id?: string
          postal_code?: string | null
          preferences?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          consumer_id?: string
          created_at?: string
          delivery_address?: string | null
          id?: string
          postal_code?: string | null
          preferences?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consumer_details_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_tracking: {
        Row: {
          actual_delivery: string | null
          created_at: string
          delivery_partner_name: string | null
          delivery_partner_phone: string | null
          estimated_delivery: string | null
          id: string
          notes: string | null
          order_id: string
          status: Database["public"]["Enums"]["delivery_status"]
          updated_at: string
        }
        Insert: {
          actual_delivery?: string | null
          created_at?: string
          delivery_partner_name?: string | null
          delivery_partner_phone?: string | null
          estimated_delivery?: string | null
          id?: string
          notes?: string | null
          order_id: string
          status?: Database["public"]["Enums"]["delivery_status"]
          updated_at?: string
        }
        Update: {
          actual_delivery?: string | null
          created_at?: string
          delivery_partner_name?: string | null
          delivery_partner_phone?: string | null
          estimated_delivery?: string | null
          id?: string
          notes?: string | null
          order_id?: string
          status?: Database["public"]["Enums"]["delivery_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_tracking_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      farmer_details: {
        Row: {
          created_at: string
          farm_address: string
          farm_description: string | null
          farm_name: string
          farm_size: string | null
          farmer_id: string
          id: string
          organic_certified: boolean | null
          rating: number | null
          total_ratings: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          farm_address: string
          farm_description?: string | null
          farm_name: string
          farm_size?: string | null
          farmer_id: string
          id?: string
          organic_certified?: boolean | null
          rating?: number | null
          total_ratings?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          farm_address?: string
          farm_description?: string | null
          farm_name?: string
          farm_size?: string | null
          farmer_id?: string
          id?: string
          organic_certified?: boolean | null
          rating?: number | null
          total_ratings?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "farmer_details_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          farmer_id: string
          id: string
          order_id: string
          price_per_unit: number
          product_id: string
          quantity: number
          subtotal: number
        }
        Insert: {
          created_at?: string
          farmer_id: string
          id?: string
          order_id: string
          price_per_unit: number
          product_id: string
          quantity: number
          subtotal: number
        }
        Update: {
          created_at?: string
          farmer_id?: string
          id?: string
          order_id?: string
          price_per_unit?: number
          product_id?: string
          quantity?: number
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          consumer_id: string
          created_at: string
          delivery_address: string
          delivery_city: string
          delivery_postal_code: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number
          updated_at: string
        }
        Insert: {
          consumer_id: string
          created_at?: string
          delivery_address: string
          delivery_city: string
          delivery_postal_code: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount: number
          updated_at?: string
        }
        Update: {
          consumer_id?: string
          created_at?: string
          delivery_address?: string
          delivery_city?: string
          delivery_postal_code?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          farmer_id: string
          freshness_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          organic: boolean | null
          price: number
          quantity_available: number
          unit: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          farmer_id: string
          freshness_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          organic?: boolean | null
          price: number
          quantity_available?: number
          unit?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          farmer_id?: string
          freshness_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          organic?: boolean | null
          price?: number
          quantity_available?: number
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      ratings: {
        Row: {
          consumer_id: string
          created_at: string
          delivery_rating: number | null
          farmer_id: string
          id: string
          order_id: string
          rating: number
          review: string | null
        }
        Insert: {
          consumer_id: string
          created_at?: string
          delivery_rating?: number | null
          farmer_id: string
          id?: string
          order_id: string
          rating: number
          review?: string | null
        }
        Update: {
          consumer_id?: string
          created_at?: string
          delivery_rating?: number | null
          farmer_id?: string
          id?: string
          order_id?: string
          rating?: number
          review?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      delivery_status: "assigned" | "picked_up" | "in_transit" | "delivered"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "out_for_delivery"
        | "delivered"
        | "cancelled"
      user_role: "farmer" | "consumer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      delivery_status: ["assigned", "picked_up", "in_transit", "delivered"],
      order_status: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      user_role: ["farmer", "consumer", "admin"],
    },
  },
} as const
