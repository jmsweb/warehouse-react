import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes, Outlet } from 'react-router-dom';
import './App.scss';

const Home = lazy(() => import('./view/home'));
const About = lazy(() => import('./view/about'));
const Contact = lazy(() => import('./view/contact'));
const Register = lazy(() => import('./view/register'));
const TermOfUse = lazy(() => import('./view/term-of-use'));
const PrivacyPolicy = lazy(() => import('./view/privacy-policy'));
const SignIn = lazy(() => import('./view/sign-in'));
const ForgotPassword = lazy(() => import('./view/forgot-password'));
const CartReview = lazy(() => import('./view/cart-review'));
const Deal = lazy(() => import('./view/deal'));
const Menu = lazy(() => import('./component/menu'));
const Footer = lazy(() => import('./component/footer'));
const ShowProducts = lazy(() => import('./view/catalog/show-products'));
const AddProduct = lazy(() => import('./view/catalog/add-product'));

const App = () => {

    document.title = `Warehouse - React (${process.env.SITE_BUILD})`;

    const routes = useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: '/about-us', element: <About /> },
                { path: '/contact-warehouse', element: <Contact /> },
                { path: '/register', element: <Register /> },
                { path: '/term-of-use', element: <TermOfUse /> },
                { path: '/privacy-policy', element: <PrivacyPolicy /> },
                { path: '/sign-in', element: <SignIn /> },
                { path: '/deal', element: <Deal /> },
                { path: '/forgot-password', element: <ForgotPassword /> },
                { path: '/cart-review', element: <CartReview /> },
                { path: '/catalog/add', element: <AddProduct /> },
                { path: '/catalog/:category', element: <ShowProducts /> },
                { path: '*', element: <Navigate replace to='/' /> }
            ]
        }
    ]);

    return routes;
}

const Layout = () => (
    <Suspense fallback={<h1>Hold on, it's loading...</h1>}>
        <Menu />
        <Outlet />
        <Footer />
    </Suspense>
);

export default App;