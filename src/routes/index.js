import Home from '~/pages/Home';
import CategoryPage from '~/pages/CategoryPage';
import ProductDetailPage from '~/pages/ProductDetailPage';
import Cart from '~/pages/Cart';
import LoginPage from '~/pages/LoginPage';
import Register from '~/pages/RegisterPage';
import { Dashboard, Customers, ProductsAdmin, Categories, Orders, ProfileAdmin } from '~/pages/adminPages';
import { ProductFormPage, CategoryFormPage, ProfileFormPage } from '~/pages/forms';

export const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/category/:slug',
        component: CategoryPage,
    },
    {
        path: '/:productId',
        component: ProductDetailPage,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/profile',
        component: ProfileFormPage,
    },
];

export const privateRoutes = [
    {
        path: '/admin/dashboard',
        component: Dashboard,
    },
    {
        path: '/admin/customers',
        component: Customers,
    },
    {
        path: '/admin/products',
        component: ProductsAdmin,
    },
    {
        path: '/admin/products/form/',
        component: ProductFormPage,
    },
    {
        path: '/admin/products/form/:productId',
        component: ProductFormPage,
    },
    {
        path: '/admin/categories',
        component: Categories,
    },
    {
        path: '/admin/categories/form/',
        component: CategoryFormPage,
    },
    {
        path: '/admin/categories/form/:categoryId',
        component: CategoryFormPage,
    },
    {
        path: '/admin/orders',
        component: Orders,
    },
    {
        path: '/admin/profile',
        component: ProfileAdmin,
    },
];
