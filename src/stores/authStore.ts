import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../config/supabaseClient";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<any>(null);
  const isAdmin = ref(false);
  const loading = ref(true);

  const initAuth = async () => {
    const { data } = await supabase.auth.getUser();
    user.value = data.user;
    isAdmin.value = data.user?.user_metadata?.isAdmin || false;
    loading.value = false;
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    user.value = data.user;
    isAdmin.value = data.user?.user_metadata?.is_admin || false;
    return isAdmin.value;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    user.value = null;
    isAdmin.value = false;
  };

  return {
    user,
    isAdmin,
    loading,
    initAuth,
    login,
    logout,
  };
});
