<script setup lang="ts">
import { CubeIcon, FolderArrowDownIcon } from "@heroicons/vue/24/solid";
import DashboardCard from "./DashboardCard.vue";
</script>

<template>
  <div class="grid grid-cols-4 gap-6">
    <DashboardCard
      to="/admin/orders"
      :icon="FolderArrowDownIcon"
      iconColor="text-blue-500"
      title="Total Orders"
      :count="14"
      color="blue-500"
    />
    <DashboardCard
      to="/admin/products"
      :icon="CubeIcon"
      iconColor="text-amber-500"
      title="Total Products"
      :count="24"
      color="amber-500"
    />
  </div>
</template>
