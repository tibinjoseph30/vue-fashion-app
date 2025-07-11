<script setup lang="ts">
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { onMounted, ref, watch } from "vue";
import { db } from "../../../firebase/firebase.config";
import { formatDateTime } from "../../../constants/utils/formatDateTime";
import { AgGridVue } from "ag-grid-vue3";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";

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

const confirmSelectedOrders = async () => {
  isConfirming.value = true;
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
      const index = allOrders.value.findIndex((o) => o.id === orderId);
      if (index !== -1) {
        allOrders.value[index].status = "confirmed";
      }
    } catch (error) {
      console.log("error confirming order:", error);
    } finally {
      isConfirming.value = false;
    }
  });

  await Promise.all(updates);
  alert("Selected orders confirmed.");
  filterOrders();
};

const deliverdSelectedOrders = async () => {
  isDelivered.value = true;
  const selectedNodes = gridApi.value?.getSelectedNodes();
  if (!selectedNodes || selectedNodes.length === 0) {
    alert("No rows selected");
    return;
  }

  const updates = selectedNodes.map(async (node: any) => {
    const orderId = node.data.id;
    const orderRef = doc(db, "orders", orderId);

    try {
      await updateDoc(orderRef, { status: "delivered" });
      const index = allOrders.value.findIndex((o) => o.id === orderId);
      if (index !== -1) {
        allOrders.value[index].status = "delivered";
      }
    } catch (error) {
      console.log("error confirming order:", error);
    } finally {
      isDelivered.value = false;
    }
  });

  await Promise.all(updates);
  alert("Selected orders confirmed.");
  filterOrders();
};

const returnedSelectedOrders = async () => {
  isReturned.value = true;
  const selectedNodes = gridApi.value?.getSelectedNodes();
  if (!selectedNodes || selectedNodes.length === 0) {
    alert("No rows selected");
    return;
  }

  const updates = selectedNodes.map(async (node: any) => {
    const orderId = node.data.id;
    const orderRef = doc(db, "orders", orderId);

    try {
      await updateDoc(orderRef, { status: "returned" });
      const index = allOrders.value.findIndex((o) => o.id === orderId);
      if (index !== -1) {
        allOrders.value[index].status = "returned";
      }
    } catch (error) {
      console.log("error confirming order:", error);
    } finally {
      isDelivered.value = false;
    }
  });

  await Promise.all(updates);
  alert("Selected orders confirmed.");
  filterOrders();
};

const refundedSelectedOrders = async () => {
  isRefunded.value = true;
  const selectedNodes = gridApi.value?.getSelectedNodes();
  if (!selectedNodes || selectedNodes.length === 0) {
    alert("No rows selected");
    return;
  }

  const updates = selectedNodes.map(async (node: any) => {
    const orderId = node.data.id;
    const orderRef = doc(db, "orders", orderId);

    try {
      await updateDoc(orderRef, { status: "refunded" });
      const index = allOrders.value.findIndex((o) => o.id === orderId);
      if (index !== -1) {
        allOrders.value[index].status = "refunded";
      }
    } catch (error) {
      console.log("error confirming order:", error);
    } finally {
      isDelivered.value = false;
    }
  });

  await Promise.all(updates);
  alert("Selected orders confirmed.");
  filterOrders();
};

const filterOrders = () => {
  const selected = (selectedStatus.value || "").toLowerCase().trim();

  if (selected === "all") {
    rowData.value = allOrders.value;
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
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(ordersQuery);

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
        status: d.status ? d.status.toLowerCase().trim() : "pending",
      };
    });

    allOrders.value = data;
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
      <button
        v-if="showConfirmBtn"
        class="bg-green-600 text-white px-4 uppercase py-2 rounded-md font-semibold disabled:opacity-75"
        @click="confirmSelectedOrders"
        :disabled="isConfirming"
      >
        {{ isConfirming ? "Confirming Order..." : "Confirm Order" }}
      </button>
      <button
        v-if="showDeliverBtn"
        class="bg-blue-500 text-white px-4 uppercase py-2 rounded-md font-semibold disabled:opacity-75"
        @click="deliverdSelectedOrders"
        :disabled="isDelivered"
      >
        {{ isDelivered ? "Marking as Delivered..." : "Mark as Delivered" }}
      </button>
      <button
        v-if="showReturnBtn"
        class="bg-amber-500 text-white px-4 uppercase py-2 rounded-md font-semibold disabled:opacity-75"
        @click="returnedSelectedOrders"
        :disabled="isReturned"
      >
        {{ isReturned ? "Marking as Returned..." : "Mark as Returned" }}
      </button>
      <button
        v-if="showRefundBtn"
        class="bg-red-600 text-white px-4 uppercase py-2 rounded-md font-semibold disabled:opacity-75"
        @click="refundedSelectedOrders"
        :disabled="isRefunded"
      >
        {{ isRefunded ? "Marking as Refunded..." : "Mark as Refunded" }}
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
