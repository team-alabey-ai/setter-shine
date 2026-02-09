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
      episodes: {
        Row: {
          created_at: string
          id: string
          key_facts: string[] | null
          lead_id: number
          source: string | null
          summary: string | null
          window_end_at: string
          window_start_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_facts?: string[] | null
          lead_id: number
          source?: string | null
          summary?: string | null
          window_end_at: string
          window_start_at: string
        }
        Update: {
          created_at?: string
          id?: string
          key_facts?: string[] | null
          lead_id?: number
          source?: string | null
          summary?: string | null
          window_end_at?: string
          window_start_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "episodes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "instagram_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      episodes_whatsapp_dialler: {
        Row: {
          created_at: string
          id: string
          key_facts: string[] | null
          lead_id: number
          source: string | null
          summary: string | null
          window_end_at: string
          window_start_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_facts?: string[] | null
          lead_id: number
          source?: string | null
          summary?: string | null
          window_end_at: string
          window_start_at: string
        }
        Update: {
          created_at?: string
          id?: string
          key_facts?: string[] | null
          lead_id?: number
          source?: string | null
          summary?: string | null
          window_end_at?: string
          window_start_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "episodes_whatsapp_dialler_lead_id_fkey1"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "landing_page_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_chat_histories_duplicate: {
        Row: {
          audio_transcript: string | null
          audio_url: string | null
          content: string | null
          created_at: string | null
          id: number
          role: string | null
          session_id: number
          tenant_id: string
        }
        Insert: {
          audio_transcript?: string | null
          audio_url?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          role?: string | null
          session_id: number
          tenant_id: string
        }
        Update: {
          audio_transcript?: string | null
          audio_url?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          role?: string | null
          session_id?: number
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_chat_histories_duplicate_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "instagram_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram_leads: {
        Row: {
          close_crm_lead_id: string | null
          close_crm_opportunity_id: string | null
          contact_id: string | null
          created_at: string
          first_name: string | null
          follow_ups_sent: number
          id: number
          is_last_messsage_followup: boolean | null
          last_message_time: string
          last_name: string | null
          sid: string
          source: string | null
          stage: Database["public"]["Enums"]["stage"] | null
          tenant_id: string | null
        }
        Insert: {
          close_crm_lead_id?: string | null
          close_crm_opportunity_id?: string | null
          contact_id?: string | null
          created_at?: string
          first_name?: string | null
          follow_ups_sent?: number
          id?: number
          is_last_messsage_followup?: boolean | null
          last_message_time?: string
          last_name?: string | null
          sid: string
          source?: string | null
          stage?: Database["public"]["Enums"]["stage"] | null
          tenant_id?: string | null
        }
        Update: {
          close_crm_lead_id?: string | null
          close_crm_opportunity_id?: string | null
          contact_id?: string | null
          created_at?: string
          first_name?: string | null
          follow_ups_sent?: number
          id?: number
          is_last_messsage_followup?: boolean | null
          last_message_time?: string
          last_name?: string | null
          sid?: string
          source?: string | null
          stage?: Database["public"]["Enums"]["stage"] | null
          tenant_id?: string | null
        }
        Relationships: []
      }
      landing_page_leads: {
        Row: {
          call_transcript: string | null
          close_crm_lead_id: string | null
          close_crm_opportunity_id: string | null
          country_code: string | null
          created_at: string | null
          email: string | null
          experience_with_clothing_brands: string | null
          follow_ups_sent: number | null
          ghl_contact_id: string | null
          id: number
          investment_amount: string | null
          is_last_message_followup: boolean | null
          last_message_time: string | null
          name: string | null
          phone: string | null
          stage: Database["public"]["Enums"]["stage_landing_page"] | null
          target_monthly_profit_goal: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          call_transcript?: string | null
          close_crm_lead_id?: string | null
          close_crm_opportunity_id?: string | null
          country_code?: string | null
          created_at?: string | null
          email?: string | null
          experience_with_clothing_brands?: string | null
          follow_ups_sent?: number | null
          ghl_contact_id?: string | null
          id?: number
          investment_amount?: string | null
          is_last_message_followup?: boolean | null
          last_message_time?: string | null
          name?: string | null
          phone?: string | null
          stage?: Database["public"]["Enums"]["stage_landing_page"] | null
          target_monthly_profit_goal?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          call_transcript?: string | null
          close_crm_lead_id?: string | null
          close_crm_opportunity_id?: string | null
          country_code?: string | null
          created_at?: string | null
          email?: string | null
          experience_with_clothing_brands?: string | null
          follow_ups_sent?: number | null
          ghl_contact_id?: string | null
          id?: number
          investment_amount?: string | null
          is_last_message_followup?: boolean | null
          last_message_time?: string | null
          name?: string | null
          phone?: string | null
          stage?: Database["public"]["Enums"]["stage_landing_page"] | null
          target_monthly_profit_goal?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      message_queue: {
        Row: {
          id: string
          lead_id: number
          message_text: string | null
          processed: boolean | null
          tenant_id: string | null
          timestamp: string | null
        }
        Insert: {
          id?: string
          lead_id: number
          message_text?: string | null
          processed?: boolean | null
          tenant_id?: string | null
          timestamp?: string | null
        }
        Update: {
          id?: string
          lead_id?: number
          message_text?: string | null
          processed?: boolean | null
          tenant_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_queue_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "instagram_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics_daily: {
        Row: {
          checkout_links_sent: number | null
          day: string | null
          follow_ups: number | null
          id: string
          inbound_dms: number | null
          meeting_links_sent: number | null
          meetings_booked: number | null
          outbounds: number | null
          outbounds_answered: number | null
          source: string | null
          tenant_id: string
          total_messages_sent: number | null
          whop_checkouts: number | null
        }
        Insert: {
          checkout_links_sent?: number | null
          day?: string | null
          follow_ups?: number | null
          id?: string
          inbound_dms?: number | null
          meeting_links_sent?: number | null
          meetings_booked?: number | null
          outbounds?: number | null
          outbounds_answered?: number | null
          source?: string | null
          tenant_id: string
          total_messages_sent?: number | null
          whop_checkouts?: number | null
        }
        Update: {
          checkout_links_sent?: number | null
          day?: string | null
          follow_ups?: number | null
          id?: string
          inbound_dms?: number | null
          meeting_links_sent?: number | null
          meetings_booked?: number | null
          outbounds?: number | null
          outbounds_answered?: number | null
          source?: string | null
          tenant_id?: string
          total_messages_sent?: number | null
          whop_checkouts?: number | null
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          created_at: string | null
          id: number
          message: Json
          session_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message: Json
          session_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: Json
          session_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "n8n_chat_histories_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "instagram_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          tenant_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          tenant_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          tenant_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      voice_memos: {
        Row: {
          audio_url: string
          enabled: boolean | null
          id: number
          intent: string
          mood: string
          source: string | null
          tenant_id: string | null
          transcript: string
        }
        Insert: {
          audio_url: string
          enabled?: boolean | null
          id?: number
          intent: string
          mood: string
          source?: string | null
          tenant_id?: string | null
          transcript: string
        }
        Update: {
          audio_url?: string
          enabled?: boolean | null
          id?: number
          intent?: string
          mood?: string
          source?: string | null
          tenant_id?: string | null
          transcript?: string
        }
        Relationships: []
      }
      whatsapp_chat_histories: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          role: string | null
          session_id: number | null
          tenant_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          role?: string | null
          session_id?: number | null
          tenant_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          role?: string | null
          session_id?: number | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_chat_histories_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "landing_page_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_dialler_metrics_daily: {
        Row: {
          called_not_interested: number
          day: string | null
          dialler_checkout_links_sent: number
          dialler_meeting_links_sent: number
          dialler_meetings_booked: number
          fake_number: number | null
          follow_ups: number
          id: string
          outbounds_answered: number
          sms_meetings_booked: number | null
          sms_outbounds: number | null
          tenant_id: string
          total_calls_made: number
          total_messages_sent: number
          total_opt_ins: number
          total_typeforms_full: number
          total_typeforms_partial: number
          whatsapp_checkout_links_sent: number
          whatsapp_meeting_links_sent: number
          whatsapp_meetings_booked: number
          whatsapp_outbounds: number
          whop_checkouts: number
        }
        Insert: {
          called_not_interested?: number
          day?: string | null
          dialler_checkout_links_sent?: number
          dialler_meeting_links_sent?: number
          dialler_meetings_booked?: number
          fake_number?: number | null
          follow_ups?: number
          id?: string
          outbounds_answered?: number
          sms_meetings_booked?: number | null
          sms_outbounds?: number | null
          tenant_id: string
          total_calls_made?: number
          total_messages_sent?: number
          total_opt_ins?: number
          total_typeforms_full?: number
          total_typeforms_partial?: number
          whatsapp_checkout_links_sent?: number
          whatsapp_meeting_links_sent?: number
          whatsapp_meetings_booked?: number
          whatsapp_outbounds?: number
          whop_checkouts?: number
        }
        Update: {
          called_not_interested?: number
          day?: string | null
          dialler_checkout_links_sent?: number
          dialler_meeting_links_sent?: number
          dialler_meetings_booked?: number
          fake_number?: number | null
          follow_ups?: number
          id?: string
          outbounds_answered?: number
          sms_meetings_booked?: number | null
          sms_outbounds?: number | null
          tenant_id?: string
          total_calls_made?: number
          total_messages_sent?: number
          total_opt_ins?: number
          total_typeforms_full?: number
          total_typeforms_partial?: number
          whatsapp_checkout_links_sent?: number
          whatsapp_meeting_links_sent?: number
          whatsapp_meetings_booked?: number
          whatsapp_outbounds?: number
          whop_checkouts?: number
        }
        Relationships: []
      }
      whatsapp_message_queue: {
        Row: {
          id: string
          lead_id: number
          message_text: string | null
          processed: boolean | null
          tenant_id: string | null
          timestamp: string | null
        }
        Insert: {
          id?: string
          lead_id: number
          message_text?: string | null
          processed?: boolean | null
          tenant_id?: string | null
          timestamp?: string | null
        }
        Update: {
          id?: string
          lead_id?: number
          message_text?: string | null
          processed?: boolean | null
          tenant_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_message_queue_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "landing_page_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_n8n_chat_histories: {
        Row: {
          created_at: string | null
          id: number
          message: Json
          session_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message: Json
          session_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: Json
          session_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_n8n_chat_histories_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "landing_page_leads"
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
      stage:
        | "Inbound Opt-in"
        | "Outbound DM"
        | "Rapport Building"
        | "Qualification"
        | "Meeting Link Sent"
        | "Check Out Link Sent"
        | "Pending Action"
        | "Conversation Ended"
        | "Disqualified"
        | "Meeting Booked"
      stage_landing_page:
        | "Opted In"
        | "Typeform Partial"
        | "Typeform Submitted"
        | "Called & Not Interested"
        | "Rapport Building"
        | "Qualification"
        | "Pending Action"
        | "Meeting Link Sent"
        | "Check Out Link Sent"
        | "Meeting Booked"
        | "Purchased"
        | "Do Not Call"
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
      stage: [
        "Inbound Opt-in",
        "Outbound DM",
        "Rapport Building",
        "Qualification",
        "Meeting Link Sent",
        "Check Out Link Sent",
        "Pending Action",
        "Conversation Ended",
        "Disqualified",
        "Meeting Booked",
      ],
      stage_landing_page: [
        "Opted In",
        "Typeform Partial",
        "Typeform Submitted",
        "Called & Not Interested",
        "Rapport Building",
        "Qualification",
        "Pending Action",
        "Meeting Link Sent",
        "Check Out Link Sent",
        "Meeting Booked",
        "Purchased",
        "Do Not Call",
      ],
    },
  },
} as const
