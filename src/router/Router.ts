import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue';
import ProductViewPage from '../pages/ProductViewPage.vue';
import ProductDetailPage from '../pages/ProductDetailPage.vue';

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/men',
        component: ProductViewPage,
        props: { collectionId: "men" }
    },
    {
        path: '/women',
        component: ProductViewPage,
        props: { collectionId: "women" }
    },
    {
        path: '/collections/:productId',
        component: ProductDetailPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;