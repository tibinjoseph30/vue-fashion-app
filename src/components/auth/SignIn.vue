<script setup lang="ts">
import { ErrorMessage, Field, Form } from "vee-validate";
import { loginSchema } from "../../constants/validations/AuthFormValidation";
import { useAuthFormData } from "../../constants/composables/AuthFormData";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getLoginErrorMessages } from "../../constants/errors/LoginErrors";

const { formData } = useAuthFormData();
const router = useRouter();
const loginError = ref("");

const onSubmit = async (values: any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log("logged in user:", userCredential.user);

    router.push("/admin/dashboard");
  } catch (error: any) {
    loginError.value = getLoginErrorMessages(error.code);
    console.log("login error:", error);
  }
};
</script>

<template>
  <div class="max-w-md mx-auto">
    <div class="font-bold text-xl mb-6">Admin Login</div>
    <Form
      :validation-schema="loginSchema"
      :initial-values="formData"
      @submit="onSubmit"
      class="grid gap-y-6"
    >
      <div>
        <label class="form-label">Email</label>
        <Field name="email" type="email" class="form-control"></Field>
        <ErrorMessage name="email" class="text-red-600 text-sm mt-1" />
      </div>
      <div>
        <label class="form-label">Password</label>
        <Field name="password" type="password" class="form-control"></Field>
        <ErrorMessage name="password" class="text-red-600 text-sm mt-1" />
      </div>
      <button type="submit" class="btn-primary rounded-md p-3 w-full">
        Login
      </button>
      <div
        v-if="loginError"
        class="text-sm text-center text-red-700 bg-red-100 rounded-md p-3"
      >
        {{ loginError }}
      </div>
    </Form>
  </div>
</template>
