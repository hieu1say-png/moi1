/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - Supabase Configuration & Client Connector
 */

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConnected: boolean;
  lastTestedAt?: string;
  environment: 'mock_local' | 'supabase_cloud';
}

const SUPABASE_STORAGE_KEY = 'geometry_lab_supabase_config';

export const getStoredSupabaseConfig = (): SupabaseConfig => {
  try {
    const raw = localStorage.getItem(SUPABASE_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read Supabase config from storage', e);
  }

  return {
    supabaseUrl: (import.meta as any).env?.VITE_SUPABASE_URL || '',
    supabaseAnonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
    isConnected: false,
    environment: 'mock_local'
  };
};

export const saveSupabaseConfig = (config: Partial<SupabaseConfig>): SupabaseConfig => {
  const current = getStoredSupabaseConfig();
  const updated: SupabaseConfig = {
    ...current,
    ...config,
    environment: config.supabaseUrl && config.supabaseAnonKey ? 'supabase_cloud' : 'mock_local'
  };

  try {
    localStorage.setItem(SUPABASE_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Could not save Supabase config', e);
  }

  return updated;
};

export const testSupabaseConnection = async (
  url: string,
  key: string
): Promise<{ success: boolean; message: string; latencyMs?: number }> => {
  if (!url || !key) {
    return {
      success: false,
      message: 'Vui lòng cung cấp đầy đủ Supabase URL và Anon Public Key.'
    };
  }

  const cleanUrl = url.replace(/\/+$/, '');
  const start = performance.now();

  try {
    const response = await fetch(`${cleanUrl}/rest/v1/classes?select=count`, {
      method: 'HEAD',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`
      }
    });

    const latencyMs = Math.round(performance.now() - start);

    if (response.ok || response.status === 404 || response.status === 200) {
      saveSupabaseConfig({
        supabaseUrl: cleanUrl,
        supabaseAnonKey: key,
        isConnected: true,
        lastTestedAt: new Date().toISOString()
      });

      return {
        success: true,
        message: 'Kết nối thành công tới cơ sở dữ liệu Supabase Cloud!',
        latencyMs
      };
    } else {
      return {
        success: false,
        message: `Lỗi kết nối (${response.status}): ${response.statusText}. Vui lòng kiểm tra lại Key hoặc chạy schema.sql trong Supabase SQL Editor.`
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Không thể gửi request tới Supabase: ${error?.message || 'Network error'}`
    };
  }
};
