<script setup lang="ts">
import { Field, Form } from "vee-validate";
import { ref } from "vue";

const props = defineProps(["data"]);
const emit = defineEmits(["update", "submit", "back"]);

const localData = ref({ ...props.data });

const handleSubmit = () => {
  emit("update", localData.value);
  emit("submit");
};
</script>
<template>
  <Form @submit="handleSubmit" class="grid gap-y-6">
    <div>
      <label for="referenceID" class="form-label">Reference ID</label>
      <Field
        name="referenceID"
        v-model="localData.referenceID"
        id="referenceID"
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
        Place Order
      </button>
    </div>
  </Form>
</template>
