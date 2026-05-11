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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          tenant_id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tenant_id: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tenant_id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["ai_message_role"]
          tenant_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["ai_message_role"]
          tenant_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["ai_message_role"]
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_messages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          metadata: Json | null
          tenant_id: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          metadata?: Json | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bi_metrics_mock: {
        Row: {
          avg_ticket: number
          category: string | null
          created_at: string
          customers: number
          date: string
          id: string
          orders: number
          sales: number
          tenant_id: string
        }
        Insert: {
          avg_ticket?: number
          category?: string | null
          created_at?: string
          customers?: number
          date: string
          id?: string
          orders?: number
          sales?: number
          tenant_id: string
        }
        Update: {
          avg_ticket?: number
          category?: string | null
          created_at?: string
          customers?: number
          date?: string
          id?: string
          orders?: number
          sales?: number
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bi_metrics_mock_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bling_credentials: {
        Row: {
          access_token_enc: string
          connected_at: string
          connected_by: string | null
          expires_at: string
          last_refresh_at: string | null
          refresh_token_enc: string
          scope: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          access_token_enc: string
          connected_at?: string
          connected_by?: string | null
          expires_at: string
          last_refresh_at?: string | null
          refresh_token_enc: string
          scope?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          access_token_enc?: string
          connected_at?: string
          connected_by?: string | null
          expires_at?: string
          last_refresh_at?: string | null
          refresh_token_enc?: string
          scope?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bling_credentials_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bling_deposits: {
        Row: {
          bling_id: number
          desconsiderar_saldo: boolean | null
          descricao: string | null
          nome: string | null
          padrao: boolean | null
          raw: Json
          situacao: string | null
          synced_at: string
          tenant_id: string
        }
        Insert: {
          bling_id: number
          desconsiderar_saldo?: boolean | null
          descricao?: string | null
          nome?: string | null
          padrao?: boolean | null
          raw?: Json
          situacao?: string | null
          synced_at?: string
          tenant_id: string
        }
        Update: {
          bling_id?: number
          desconsiderar_saldo?: boolean | null
          descricao?: string | null
          nome?: string | null
          padrao?: boolean | null
          raw?: Json
          situacao?: string | null
          synced_at?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bling_deposits_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bling_oauth_states: {
        Row: {
          created_at: string
          expires_at: string
          redirect_uri: string
          state: string
          tenant_id: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          expires_at: string
          redirect_uri: string
          state: string
          tenant_id: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          redirect_uri?: string
          state?: string
          tenant_id?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bling_oauth_states_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bling_orders: {
        Row: {
          bling_id: number
          bling_updated_at: string | null
          cliente_documento: string | null
          cliente_id: number | null
          cliente_nome: string | null
          data: string | null
          data_saida: string | null
          loja_id: number | null
          numero: string | null
          numero_loja: string | null
          raw: Json
          situacao_id: number | null
          situacao_nome: string | null
          situacao_valor: number | null
          synced_at: string
          tenant_id: string
          valor_total: number
        }
        Insert: {
          bling_id: number
          bling_updated_at?: string | null
          cliente_documento?: string | null
          cliente_id?: number | null
          cliente_nome?: string | null
          data?: string | null
          data_saida?: string | null
          loja_id?: number | null
          numero?: string | null
          numero_loja?: string | null
          raw?: Json
          situacao_id?: number | null
          situacao_nome?: string | null
          situacao_valor?: number | null
          synced_at?: string
          tenant_id: string
          valor_total?: number
        }
        Update: {
          bling_id?: number
          bling_updated_at?: string | null
          cliente_documento?: string | null
          cliente_id?: number | null
          cliente_nome?: string | null
          data?: string | null
          data_saida?: string | null
          loja_id?: number | null
          numero?: string | null
          numero_loja?: string | null
          raw?: Json
          situacao_id?: number | null
          situacao_nome?: string | null
          situacao_valor?: number | null
          synced_at?: string
          tenant_id?: string
          valor_total?: number
        }
        Relationships: []
      }
      bling_products: {
        Row: {
          bling_id: number
          bling_updated_at: string | null
          categoria_id: number | null
          codigo: string | null
          formato: string | null
          gtin: string | null
          imagem_url: string | null
          nome: string | null
          parent_id: number | null
          peso_liquido: number | null
          preco: number | null
          raw: Json
          situacao: string | null
          synced_at: string
          tenant_id: string
          tipo: string | null
          unidade: string | null
        }
        Insert: {
          bling_id: number
          bling_updated_at?: string | null
          categoria_id?: number | null
          codigo?: string | null
          formato?: string | null
          gtin?: string | null
          imagem_url?: string | null
          nome?: string | null
          parent_id?: number | null
          peso_liquido?: number | null
          preco?: number | null
          raw?: Json
          situacao?: string | null
          synced_at?: string
          tenant_id: string
          tipo?: string | null
          unidade?: string | null
        }
        Update: {
          bling_id?: number
          bling_updated_at?: string | null
          categoria_id?: number | null
          codigo?: string | null
          formato?: string | null
          gtin?: string | null
          imagem_url?: string | null
          nome?: string | null
          parent_id?: number | null
          peso_liquido?: number | null
          preco?: number | null
          raw?: Json
          situacao?: string | null
          synced_at?: string
          tenant_id?: string
          tipo?: string | null
          unidade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bling_products_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bling_stock_balances: {
        Row: {
          deposito_id: number
          produto_id: number
          raw: Json
          saldo_fisico: number
          saldo_virtual: number
          synced_at: string
          tenant_id: string
        }
        Insert: {
          deposito_id: number
          produto_id: number
          raw?: Json
          saldo_fisico?: number
          saldo_virtual?: number
          synced_at?: string
          tenant_id: string
        }
        Update: {
          deposito_id?: number
          produto_id?: number
          raw?: Json
          saldo_fisico?: number
          saldo_virtual?: number
          synced_at?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bling_stock_balances_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bling_sync_runs: {
        Row: {
          error_message: string | null
          finished_at: string | null
          id: string
          items_processed: number
          meta: Json | null
          mode: string | null
          resource: string
          started_at: string
          status: Database["public"]["Enums"]["bling_sync_status"]
          tenant_id: string
        }
        Insert: {
          error_message?: string | null
          finished_at?: string | null
          id?: string
          items_processed?: number
          meta?: Json | null
          mode?: string | null
          resource: string
          started_at?: string
          status?: Database["public"]["Enums"]["bling_sync_status"]
          tenant_id: string
        }
        Update: {
          error_message?: string | null
          finished_at?: string | null
          id?: string
          items_processed?: number
          meta?: Json | null
          mode?: string | null
          resource?: string
          started_at?: string
          status?: Database["public"]["Enums"]["bling_sync_status"]
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bling_sync_runs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
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
          is_blocked: boolean
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_blocked?: boolean
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_blocked?: boolean
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_settings: {
        Row: {
          bling_client_id: string | null
          bling_client_secret: string | null
          id: string
          minimax_api_key: string | null
          resend_api_key: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          bling_client_id?: string | null
          bling_client_secret?: string | null
          id?: string
          minimax_api_key?: string | null
          resend_api_key?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          bling_client_id?: string | null
          bling_client_secret?: string | null
          id?: string
          minimax_api_key?: string | null
          resend_api_key?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          status: Database["public"]["Enums"]["tenant_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          status?: Database["public"]["Enums"]["tenant_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["tenant_status"]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_tenant: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_superadmin: { Args: never; Returns: boolean }
    }
    Enums: {
      ai_message_role: "user" | "assistant" | "system"
      app_role: "superadmin" | "cliente"
      bling_sync_status: "running" | "ok" | "error"
      tenant_status: "active" | "suspended" | "blocked"
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
      ai_message_role: ["user", "assistant", "system"],
      app_role: ["superadmin", "cliente"],
      bling_sync_status: ["running", "ok", "error"],
      tenant_status: ["active", "suspended", "blocked"],
    },
  },
} as const
