import { supabase } from "../config/supabaseClient";

export const requireAdmin = async (to: any, from: any, next: any) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.user_metadata?.is_admin;

  if (user && isAdmin) {
    next();
  } else {
    next("/admin");
  }
};
