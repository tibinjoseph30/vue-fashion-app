<script setup lang="ts">
import { ErrorMessage, Field, Form } from "vee-validate";
import { loginSchema } from "../../constants/validations/AuthFormValidation";
import { useAuthFormData } from "../../constants/composables/AuthFormData";

const { formData } = useAuthFormData();

const onSubmit = (values: any) => {
  formData.email = values.email;
  formData.password = values.password;
};
</script>

<template>
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
  </Form>
</template>
