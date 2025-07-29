<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { onMounted, ref } from "vue";
import { supabase } from "../../../config/supabaseClient";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { ProductRow } from "../../../constants/interfaces/product/ProductFormInterface";
ModuleRegistry.registerModules([AllCommunityModule]);

const isLoading = ref(false);
const AllProducts = ref<ProductRow[]>([]);

const columnDefs = [
  {
    headerName: "Product",
    field: "thumbnail",
    autoHeight: true,
    cellClass: "py-1",
    width: 100,
    cellRenderer: (params: any) => {
      const thumbnailPath = params.data.thumbnail;
      return thumbnailPath
        ? `<div style="width:60px; height:60px;"><img src="${thumbnailPath}" style="width:100%; height: 100%; object-fit:cover; border-radius: 4px;" alt="${thumbnailPath}"/></div>`
        : null;
    },
  },
  { headerName: "Code", field: "productCode", width: 150 },
  { headerName: "Name", field: "productName" },
  { headerName: "Price", field: "price", width: 100 },
  { headerName: "Quantity", field: "quantity", width: 100 },
  { headerName: "Sizes", field: "sizes" },
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

    const product: ProductRow[] = (data || []).map((d: any) => ({
      thumbnail: d.thumbnail,
      productCode: d.product_code,
      productName: d.product_name,
      price: d.price,
      category: d.category,
      subCategory: d.sub_category,
      quantity: d.quantity,
      sizes: d.sizes,
      images: d.images,
      description: d.description,
    }));

    AllProducts.value = product;
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
      :row-data="AllProducts"
      :columnDefs="columnDefs"
      :defaultColumnDefs="defaultColumnDef"
      :pagination="true"
      :paginationPageSize="10"
      :animateRows="true"
    />
  </div>
</template>
