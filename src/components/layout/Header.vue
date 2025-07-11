<script setup lang="ts">
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { auth } from "../../firebase/firebase.config";

const isAdmin = ref(false);
const showDropdown = ref(false);
const router = useRouter();
const dropdownRef = ref<HTMLElement | null>(null);

const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    showDropdown.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(target)
  ) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const closeDropdown = () => {
  showDropdown.value = false;
};

onAuthStateChanged(auth, (user) => {
  isAdmin.value = !!user;
});

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push("/admin");
  } catch (error) {
    console.log("logout error:", error);
  }
};
</script>

<template>
  <header
    class="fixed top-0 start-0 w-full grid items-center border-b border-gray-200 bg-white"
  >
    <div class="container">
      <div class="flex">
        <a href="">logo</a>
        <nav class="ms-auto flex gap-6">
          <li>
            <RouterLink to="/">Sale</RouterLink>
          </li>
          <li>
            <RouterLink to="/men">Men</RouterLink>
          </li>
          <li>
            <RouterLink to="/women">Women</RouterLink>
          </li>
          <li v-if="isAdmin" class="relative" ref="dropdownRef">
            <button @click="showDropdown = !showDropdown">Admin</button>
            <ul
              v-if="showDropdown"
              @click.stop="closeDropdown"
              class="dropdown-menu absolute end-0 border border-gray-200 rounded-lg shadow-xl/5 p-2 bg-white"
            >
              <li>
                <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
              </li>
              <li>
                <RouterLink to="/admin/dashboard">Manage Products</RouterLink>
              </li>
              <li>
                <RouterLink to="/admin/dashboard">Track Orders</RouterLink>
              </li>
              <li>
                <RouterLink to="/admin/dashboard">Settings</RouterLink>
              </li>
              <li class="border-t border-slate-200 mt-2 pt-2">
                <button @click="handleLogout" class="w-full text-start">
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </nav>
      </div>
    </div>
  </header>
</template>
