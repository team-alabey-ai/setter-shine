export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      metrics_daily: {
        Row: {
          id: string
          tenant_id: string
          day: string
          meetings_booked: number
          whop_checkouts: number
          inbound_dms: number
          follow_ups: number
          outbounds: number
          outbounds_answered: number
          source: string
          total_messages_sent: number
          meeting_links_sent: number
          checkout_links_sent: number
        }
        Insert: {
          id?: string
          tenant_id: string
          day: string
          meetings_booked: number
          whop_checkouts?: number
          inbound_dms: number
          follow_ups: number
          outbounds: number
          outbounds_answered?: number
          source?: string
          total_messages_sent?: number
          meeting_links_sent?: number
          checkout_links_sent?: number
        }
        Update: {
          id?: string
          tenant_id?: string
          day?: string
          meetings_booked?: number
          whop_checkouts?: number
          inbound_dms?: number
          follow_ups?: number
          outbounds?: number
          outbounds_answered?: number
          source?: string
          total_messages_sent?: number
          meeting_links_sent?: number
          checkout_links_sent?: number
        }
      }
    }
  }
}

export type MetricsDailyRow = Database['public']['Tables']['metrics_daily']['Row'];
