export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'user' | 'admin' | null
          name: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          email: string
          role?: 'user' | 'admin' | null
          name?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: 'user' | 'admin' | null
          name?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string | null
          type: 'monthly' | 'yearly' | null
          status: 'active' | 'inactive' | null
          renewal_date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          type?: 'monthly' | 'yearly' | null
          status?: 'active' | 'inactive' | null
          renewal_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          type?: 'monthly' | 'yearly' | null
          status?: 'active' | 'inactive' | null
          renewal_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      scores: {
        Row: {
          id: string
          user_id: string | null
          value: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          value?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          value?: number | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      charities: {
        Row: {
          id: string
          name: string
          description: string | null
          total_raised: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          total_raised?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          total_raised?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      draws: {
        Row: {
          id: string
          draw_date: string | null
          winning_numbers: number[] | null
          status: 'pending' | 'completed' | null
          type: 'random' | 'algorithm' | null
          jackpot_rolled_over: boolean | null
          is_published: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          draw_date?: string | null
          winning_numbers?: number[] | null
          status?: 'pending' | 'completed' | null
          type?: 'random' | 'algorithm' | null
          jackpot_rolled_over?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          draw_date?: string | null
          winning_numbers?: number[] | null
          status?: 'pending' | 'completed' | null
          type?: 'random' | 'algorithm' | null
          jackpot_rolled_over?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      winners: {
        Row: {
          id: string
          draw_id: string | null
          user_id: string | null
          match_count: number | null
          prize_amount: number
          proof_url: string | null
          status: 'pending' | 'approved' | 'rejected' | null
          created_at: string | null
        }
        Insert: {
          id?: string
          draw_id?: string | null
          user_id?: string | null
          match_count?: number | null
          prize_amount: number
          proof_url?: string | null
          status?: 'pending' | 'approved' | 'rejected' | null
          created_at?: string | null
        }
        Update: {
          id?: string
          draw_id?: string | null
          user_id?: string | null
          match_count?: number | null
          prize_amount?: number
          proof_url?: string | null
          status?: 'pending' | 'approved' | 'rejected' | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "winners_draw_id_fkey"
            columns: ["draw_id"]
            isOneToOne: false
            referencedRelation: "draws"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "winners_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      donations: {
        Row: {
          id: string
          user_id: string | null
          charity_id: string | null
          percentage: number | null
          amount: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          charity_id?: string | null
          percentage?: number | null
          amount?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          charity_id?: string | null
          percentage?: number | null
          amount?: number | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
