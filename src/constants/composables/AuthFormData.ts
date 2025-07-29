import { reactive } from "vue";
import type { LoginForm } from "../interfaces/auth/AuthInterface";

export const useAuthFormData = () => {
  const formData = reactive<LoginForm>({
    email: "",
    password: "",
  });

  return { formData };
};
