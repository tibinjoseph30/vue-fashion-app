import { reactive } from "vue";
import type { LoginForm } from "../interfaces/AuthFormInterface";

export const useAuthFormData = () => {
  const formData = reactive<LoginForm>({
    email: "",
    password: "",
  });

  return { formData };
};
