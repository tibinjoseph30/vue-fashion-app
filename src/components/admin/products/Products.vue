<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { onMounted, ref } from "vue";
import { supabase } from "../../../config/supabaseClient";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const isLoading = ref(false);

const columnDefs = [
  { headerName: "Product", field: "product" },
  { headerName: "Code", field: "code" },
  { headerName: "Price", field: "price" },
  { headerName: "Category", field: "category" },
  { headerName: "Quantity", field: "quantity" },
  { headerName: "Sizes", field: "sizes" },
  { headerName: "Date", field: "date" },
];

const defaultColumnDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return;
    }

    console.log("fetched data:", data);
  } catch (error) {
    console.log("error in product fetching:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchProducts();
});
</script>

<template>
  <div class="ag-grid">
    <AgGridVue
      style="width: 100%; height: 100%"
      :columnDefs="columnDefs"
      :defaultColumnDefs="defaultColumnDef"
      row-selection="multiple"
      :pagination="true"
      :paginationPageSize="10"
      :animateRows="true"
    />
  </div>
</template>
