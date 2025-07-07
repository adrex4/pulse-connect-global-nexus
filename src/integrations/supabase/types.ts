export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          category: string
          created_at: string | null
          creator_id: string | null
          description: string | null
          id: string
          is_public: boolean | null
          location_id: string | null
          member_count: number | null
          name: string
          scope: string
        }
        Insert: {
          category: string
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          location_id?: string | null
          member_count?: number | null
          name: string
          scope: string
        }
        Update: {
          category?: string
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          location_id?: string | null
          member_count?: number | null
          name?: string
          scope?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          country_code: string | null
          created_at: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          parent_id: string | null
          state_code: string | null
          type: string
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          parent_id?: string | null
          state_code?: string | null
          type: string
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          parent_id?: string | null
          state_code?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string
          created_at: string | null
          id: string
          is_online_capable: boolean | null
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          is_online_capable?: boolean | null
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          is_online_capable?: boolean | null
          name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          bio: string | null
          business_type: string | null
          created_at: string | null
          detailed_address: string | null
          email: string | null
          experience_level: string | null
          hourly_rate: number | null
          id: string
          is_verified: boolean | null
          location_id: string | null
          name: string
          occupation: string | null
          phone: string | null
          primary_skill: string | null
          profile_image_url: string | null
          rating: number | null
          service_type: Database["public"]["Enums"]["service_type"] | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          visibility: Database["public"]["Enums"]["profile_visibility"] | null
          website: string | null
        }
        Insert: {
          bio?: string | null
          business_type?: string | null
          created_at?: string | null
          detailed_address?: string | null
          email?: string | null
          experience_level?: string | null
          hourly_rate?: number | null
          id?: string
          is_verified?: boolean | null
          location_id?: string | null
          name: string
          occupation?: string | null
          phone?: string | null
          primary_skill?: string | null
          profile_image_url?: string | null
          rating?: number | null
          service_type?: Database["public"]["Enums"]["service_type"] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          visibility?: Database["public"]["Enums"]["profile_visibility"] | null
          website?: string | null
        }
        Update: {
          bio?: string | null
          business_type?: string | null
          created_at?: string | null
          detailed_address?: string | null
          email?: string | null
          experience_level?: string | null
          hourly_rate?: number | null
          id?: string
          is_verified?: boolean | null
          location_id?: string | null
          name?: string
          occupation?: string | null
          phone?: string | null
          primary_skill?: string | null
          profile_image_url?: string | null
          rating?: number | null
          service_type?: Database["public"]["Enums"]["service_type"] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_type?: Database["public"]["Enums"]["user_type"]
          visibility?: Database["public"]["Enums"]["profile_visibility"] | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_services: {
        Row: {
          description: string | null
          id: string
          price: number | null
          service_id: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          user_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          price?: number | null
          service_id?: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          user_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          price?: number | null
          service_id?: string | null
          service_type?: Database["public"]["Enums"]["service_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_services_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
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
      profile_visibility: "public" | "private" | "groups_only"
      service_type: "online" | "in_person" | "both"
      user_type:
        | "business"
        | "freelancer"
        | "occupation_provider"
        | "social_media_influencer"
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
      profile_visibility: ["public", "private", "groups_only"],
      service_type: ["online", "in_person", "both"],
      user_type: [
        "business",
        "freelancer",
        "occupation_provider",
        "social_media_influencer",
      ],
    },
  },
} as const
