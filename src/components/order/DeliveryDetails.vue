<script setup lang="ts">
import { Field, Form } from "vee-validate";
import { ref } from "vue";

const props = defineProps(["data"]);
const emit = defineEmits(["update", "next", "back"]);

const localData = ref({ ...props.data });

const handleNext = () => {
  emit("update", localData.value);
  emit("next");
};
</script>
<template>
  <Form @submit="handleNext" class="grid gap-y-6">
    <div>
      <label for="firstName" class="form-label">First Name</label>
      <Field
        name="firstName"
        v-model="localData.firstName"
        id="firstName"
        class="form-control"
      />
    </div>
    <div>
      <label for="lastName" class="form-label">Last Name</label>
      <Field
        name="lastName"
        v-model="localData.lastName"
        id="lastName"
        class="form-control"
      />
    </div>
    <div class="flex justify-end gap-3">
      <button
        @click="$emit('back')"
        class="border border-black-500 px-10 py-3 rounded-md uppercase font-bold"
      >
        Back
      </button>
      <button
        type="submit"
        class="btn-primary px-10 py-3 rounded-md uppercase font-bold"
      >
        Next
      </button>
    </div>
  </Form>
</template>
