import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ProductViewPage from "../pages/ProductViewPage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";
import OrderViewPage from "../pages/OrderViewPage.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
