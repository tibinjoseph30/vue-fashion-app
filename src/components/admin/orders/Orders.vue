<script setup lang="ts">
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db } from "../../../firebase/firebase.config";
import { formatDateTime } from "../../../constants/utils/formatDateTime";
import { AgGridVue } from "ag-grid-vue3";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

interface OrderRow {
  id: string;
  customer: string;
  product: string;
  address: string;
  contact: string;
  transactionId: string;
  createdAt: string;
  status?: string;
}

const rowData = ref<OrderRow[]>([]);
const allOrders = ref<OrderRow[]>([]);
const isLoading = ref(true);
const gridApi = ref<any>(null);
const showConfirmBtn = ref(false);
const selectedStatus = ref("");

const onGridReady = (params: any) => {
  params.api.sizeColumnsToFit();
  gridApi.value = params.api;
};

const onSelectionChanged = () => {
  const selectedRows = gridApi.value?.getSelectedNodes() || [];
  showConfirmBtn.value =
    selectedStatus.value === "" &&
    selectedRows.some((row: any) => !row.data.status);
};

const confirmSelectedOrders = async () => {
  const selectedNodes = gridApi.value?.getSelectedNodes();
  if (!selectedNodes || selectedNodes.length === 0) {
    alert("No rows selected");
    return;
  }

  const updates = selectedNodes.map(async (node: any) => {
    const orderId = node.data.id;
    const orderRef = doc(db, "orders", orderId);

    try {
      await updateDoc(orderRef, { status: "confirmed" });
      node.data.status = "confirmed";
      gridApi.value.refreshCells({
        rowNodes: [node],
        columns: ["transactionId"],
      });
    } catch (error) {
      console.log("error confirming order:", error);
    }
  });

  await Promise.all(updates);
  alert("Selected orders confirmed.");
};

const filterOrders = () => {
  rowData.value = allOrders.value.filter((order) => {
    return (order.status || "") === selectedStatus.value;
  });
};

const columnDefs = [
  {
    headerName: "",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    filter: false,
  },
  { headerName: "Customer", field: "customer" },
  { headerName: "Product", field: "product" },
  { headerName: "Address", field: "address" },
  { headerName: "Contact", field: "contact" },
  {
    headerName: "Transaction ID",
    field: "transactionId",
    cellRenderer: (params: any) => {
      const status = params.data.status;
      const statusTag =
        status === "confirmed"
          ? `<span class="bg-green-100 text-green-600 font-medium text-xs px-3 py-1 rounded-full">Confirmed</span>`
          : "";
      return `${params.value || "-"} ${statusTag}`;
    },
  },
  { headerName: "Date", field: "createdAt" },
];

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

const fetchOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const data: OrderRow[] = querySnapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        customer: `${d.delivery?.firstName} ${d.delivery?.lastName}`,
        product: `${d.order?.productCode} / ${d.order?.productSize}`,
        address: `${d.delivery?.address}`,
        contact: `${d.delivery?.phone}, ${d.delivery?.email}`,
        transactionId: d.payment?.transactionId || "-",
        createdAt: formatDateTime(d.createdAt),
        status: d.status || "",
      };
    });
    allOrders.value = data;
    filterOrders();
    console.log(data);
  } catch (error) {
    console.log("error in data fetching:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchOrders);
</script>

<template>
  <div v-if="isLoading">Loading..</div>
  <div v-else>
    <div class="flex gap-3 mb-3">
      <select
        v-model="selectedStatus"
        @change="filterOrders"
        class="border rounded px-3 py-2"
      >
        <option value="">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="delivered">Delivered</option>
        <option value="returned">Returned</option>
      </select>
      <button
        v-if="selectedStatus === '' && showConfirmBtn"
        class="bg-green-600 text-white px-4 uppercase py-2 rounded-md font-semibold"
        @click="confirmSelectedOrders"
      >
        Confirm Order
      </button>
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
