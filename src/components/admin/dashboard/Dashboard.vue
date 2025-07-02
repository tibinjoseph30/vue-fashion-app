<script setup lang="ts">
import {
  ArrowUpRightIcon,
  CubeIcon,
  FolderArrowDownIcon,
} from "@heroicons/vue/24/solid";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="grid grid-cols-4 gap-6">
    <RouterLink to="/admin/orders">
      <div
        class="border border-gray-200 rounded-xl p-6 relative hover:shadow-lg/5"
      >
        <FolderArrowDownIcon class="w-10 h-10 text-green-600 mb-4" />
        <h3 class="font-semibold mb-1">Todays Order</h3>
        <div class="text-gray-500 text-sm">
          <span class="text-green-600 text-2xl font-bold me-2">2</span>Items
        </div>
        <ArrowUpRightIcon class="w-5 h-5 absolute top-3 end-3" />
      </div>
    </RouterLink>
    <RouterLink to="/admin/orders">
      <div
        class="border border-gray-200 rounded-xl p-6 relative hover:shadow-lg/5"
      >
        <FolderArrowDownIcon class="w-10 h-10 text-blue-500 mb-4" />
        <h3 class="font-semibold mb-1">Total Orders</h3>
        <div class="text-gray-500 text-sm">
          <span class="text-blue-500 text-2xl font-bold me-2">14</span>Items
        </div>
        <ArrowUpRightIcon class="w-5 h-5 absolute top-3 end-3" />
      </div>
    </RouterLink>
    <RouterLink to="/admin/products">
      <div
        class="border border-gray-200 rounded-xl p-6 relative hover:shadow-lg/5"
      >
        <CubeIcon class="w-10 h-10 text-amber-600 mb-4" />
        <h3 class="font-semibold mb-1">Total Products</h3>
        <div class="text-gray-500 text-sm">
          <span class="text-amber-600 text-2xl font-bold me-2">24</span>Items
        </div>
        <ArrowUpRightIcon class="w-5 h-5 absolute top-3 end-3" />
      </div>
    </RouterLink>
  </div>
</template>
