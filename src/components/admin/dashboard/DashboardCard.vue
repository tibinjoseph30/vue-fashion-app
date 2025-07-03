<script setup lang="ts">
import { ArrowUpRightIcon } from "@heroicons/vue/24/solid";
import { RouterLink } from "vue-router";

defineProps<{
  to: string;
  icon: any;
  iconColor: string;
  title: string;
  count: number;
  color: string;
}>();
</script>

<template>
  <RouterLink :to="to">
    <div
      class="border border-gray-200 rounded-xl p-6 relative hover:shadow-lg/5"
    >
      <component :is="icon" :class="`w-10 h-10 mb-4 ${iconColor}`" />
      <h3 class="font-semibold mb-1">{{ title }}</h3>
      <div class="text-gray-500 text-sm">
        <span :class="`text-2xl font-bold me-2 text-${color}`">{{ count }}</span
        >Items
      </div>
      <ArrowUpRightIcon class="w-5 h-5 absolute top-3 end-3" />
    </div>
  </RouterLink>
</template>
