<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from "vue";
import { formatDateTime } from "../../../constants/utils/formatDateTime";
import { AgGridVue } from "ag-grid-vue3";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import { supabase } from "../../../config/supabaseClient";
import type { OrderRow } from "../../../constants/interfaces/OrderListInterface";

const rowData = ref<OrderRow[]>([]);
const allOrders = ref<OrderRow[]>([]);
const isLoading = ref(true);
const isConfirming = ref(false);
const isDelivered = ref(false);
const isReturned = ref(false);
const isRefunded = ref(false);
const gridApi = ref<any>(null);
const showConfirmBtn = ref(false);
const showDeliverBtn = ref(false);
const showReturnBtn = ref(false);
const showRefundBtn = ref(false);
const selectedStatus = ref("pending");

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Delivered", value: "delivered" },
  { label: "Returned", value: "returned" },
];

const onGridReady = (params: any) => {
  params.api.sizeColumnsToFit();
  gridApi.value = params.api;
};

const onSelectionChanged = () => {
  const selectedRows = gridApi.value?.getSelectedNodes() || [];
  showConfirmBtn.value = selectedRows.some(
    (row: any) => row.data.status === "pending"
  );
  showDeliverBtn.value = selectedRows.some(
    (row: any) => row.data.status === "confirmed"
  );
  showReturnBtn.value = selectedRows.some(
    (row: any) => row.data.status === "delivered"
  );
  showRefundBtn.value = selectedRows.some(
    (row: any) => row.data.status === "returned"
  );
};

const updateSelectedOrders = async (
  newStatus: string,
  loadingFlag: Ref<boolean>
) => {
  loadingFlag.value = true;
  const selectedNodes = gridApi.value?.getSelectedNodes();
  if (!selectedNodes?.length) {
    alert("No rows selected");
    loadingFlag.value = false;
    return;
  }

  const updates = selectedNodes.map(async (node: any) => {
    const orderId = node.data.id;

    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (!error) {
        const index = allOrders.value.findIndex((o) => o.id === orderId);
        if (index !== -1) {
          allOrders.value[index].status = newStatus;
        }
      } else {
        console.error("Update error:", error);
      }
    } catch (error) {
      console.log("error confirming order:", error);
    }
  });

  await Promise.all(updates);
  loadingFlag.value = false;
  alert(`Selected orders marked as ${newStatus}.`);
  filterOrders();
};

const filterOrders = () => {
  const selected = (selectedStatus.value || "").toLowerCase().trim();

  if (selected === "all") {
    rowData.value = allOrders.value;
    console.log("Final Row Data:", rowData.value);
    return;
  }

  rowData.value = allOrders.value.filter((order) => {
    const status = (order.status || "").toLowerCase().trim();
    if (selected === "returned") {
      return status === "returned" || status === "refunded";
    }
    return status === selected;
  });
};

watch(selectedStatus, () => {
  filterOrders();
});

const statusActions = [
  {
    label: "Confirm Order",
    nextStatus: "confirmed",
    show: showConfirmBtn,
    loading: isConfirming,
    color: "green-600",
  },
  {
    label: "Mark as Delivered",
    nextStatus: "delivered",
    show: showDeliverBtn,
    loading: isDelivered,
    color: "blue-500",
  },
  {
    label: "Mark as Returned",
    nextStatus: "returned",
    show: showReturnBtn,
    loading: isReturned,
    color: "amber-500",
  },
  {
    label: "Mark as Refunded",
    nextStatus: "refunded",
    show: showRefundBtn,
    loading: isRefunded,
    color: "red-600",
  },
];

const columnDefs = [
  {
    headerName: "",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    filter: false,
  },
  {
    headerName: "Customer",
    field: "customer",
    cellClass: "capitalize",
    cellRenderer: (params: any) => {
      const status = params.data.status;
      const statusTag =
        status === "confirmed"
          ? `<span class="bg-green-600 text-white text-xs font-medium px-1 rounded-full">CF</span>`
          : status === "delivered"
          ? `<span class="bg-blue-500 text-white text-xs font-medium px-1 rounded-full">DL</span>`
          : status === "returned"
          ? `<span class="bg-amber-500 text-white text-xs font-medium px-1 rounded-full">RT</span>`
          : status === "refunded"
          ? `<span class="bg-red-600 text-white text-xs font-medium px-1 rounded-full">RF</span>`
          : "";
      return `${params.value || "-"} ${statusTag}`;
    },
  },
  { headerName: "Product", field: "product" },
  { headerName: "Address", field: "address" },
  { headerName: "Contact", field: "contact" },
  { headerName: "Transaction ID", field: "transactionId" },
  { headerName: "Date", field: "createdAt" },
];

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

const fetchOrders = async () => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return;
    }

    console.log("Fetched data:", data);

    const orders: OrderRow[] = (data || []).map((d: any) => {
      const delivery = d.delivery || {};
      const order = d.order || {};
      const payment = d.payment || {};

      return {
        id: d.id,
        customer: `${delivery.firstName || ""} ${
          delivery.lastName || ""
        }`.trim(),
        product: `${order.productCode || "-"} / ${order.productSize || "-"}`,
        address: delivery.address || "-",
        contact: `${delivery.phone || "-"}, ${delivery.email || "-"}`,
        transactionId: payment.transactionId || "-",
        createdAt: formatDateTime(d.createdAt),
        status: d.status ? d.status.toLowerCase().trim() : "pending",
      };
    });

    allOrders.value = orders;
    filterOrders();
  } catch (error) {
    console.log("error in data fetching:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchOrders();
  filterOrders();
});
</script>

<template>
  <div v-if="isLoading">Loading..</div>
  <div v-else>
    <div class="flex gap-3 mb-3">
      <Vue3Select
        v-model="selectedStatus"
        :options="statusOptions"
        option-label="label"
        option-value="value"
        :reduce="(option: any) => option.value"
        placeholder="Filter by status"
        class="border-gray-300 border rounded-md px-3 py-1 min-w-[200px]"
        :searchable="false"
        :clearable="false"
      />
      <template v-for="(action, index) in statusActions" :key="index">
        <button
          v-if="action.show.value"
          class="px-4 py-2 rounded-md font-semibold text-white uppercase"
          :class="[
            `bg-${action.color}`,
            { 'opacity-75': action.loading.value },
          ]"
          @click="() => updateSelectedOrders(action.nextStatus, action.loading)"
          :disabled="action.loading.value"
        >
          {{ action.label }}
        </button>
      </template>
    </div>
    <div class="ag-grid">
      <AgGridVue
        style="width: 100%; height: 100%"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        row-selection="multiple"
        :pagination="true"
        :paginationPageSize="10"
        :animateRows="true"
        @grid-ready="onGridReady"
        @selection-changed="onSelectionChanged"
      />
    </div>
  </div>
</template>
