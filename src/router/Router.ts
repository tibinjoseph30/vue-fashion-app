import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ProductViewPage from "../pages/ProductViewPage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";
import OrderViewPage from "../pages/OrderViewPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import DashboardPage from "../pages/admin/DashboardPage.vue";
import OrderListPage from "../pages/admin/OrderListPage.vue";
import { requireAdmin } from "../utils/authGuard";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/men",
    component: ProductViewPage,
    props: { collectionId: "men" },
  },
  {
    path: "/women",
    component: ProductViewPage,
    props: { collectionId: "women" },
  },
  {
    path: "/collections/:productCode",
    component: ProductDetailPage,
  },
  {
    path: "/order/:productCode",
    component: OrderViewPage,
  },
  {
    path: "/admin",
    component: SignInPage,
  },
  {
    path: "/admin/dashboard",
    component: DashboardPage,
    beforeEnter: requireAdmin,
  },
  {
    path: "/admin/orders",
    component: OrderListPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
