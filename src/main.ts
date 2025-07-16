import { createApp } from "vue";
import App from "./App.vue";
import "@/global.css";
import "@/styles/main.scss";
import router from "./router/Router";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/authStore";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");

const authStore = useAuthStore();
authStore.initAuth();
