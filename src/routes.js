// element pages
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Products from "./pages/products";
import Product from "./pages/ProductInfo";
import Dashboard from "./pages/dashboard";
import Category from "./pages/category";
import FAQ from './pages/FAQs'
import About from './pages/About'
import Search from './pages/search'
import ShoppingCart from "./components/template/Shopping/shoppingCart"


// title pages
const pageTitle = 'Adidas';

// routes pages
const routers = [
  {
    path: "*",
    element: NotFound,
    title: `${pageTitle} | Not Page`,
  },
  {
    path: "/",
    element: Home,
    title: `${pageTitle} | Home`,
  },
  {
    path: "/login",
    element: Login,
    title: `${pageTitle} | Login`,
  },
  {
    path: "/signup",
    element: Signup,
    title: `${pageTitle} | Signup`,
  },
  {
    path: "/products",
    element: Products,
    title: `${pageTitle} | Products`,
  },
  {
    path: "/category",
    element: Category,
    title: `${pageTitle} | Category`,
  },
  {
    path: "/product/:productName",
    element: Product,
    title: `${pageTitle} | Product`,
  },
  {
    path: "/dashboard",
    element: Dashboard,
    title: `${pageTitle} | Dashbord`,
  },
  {
    path: "/shopping-cart",
    element: ShoppingCart,
    title: `${pageTitle} | Shopping Cart`,
  },
  {
    path: "/FAQs",
    element: FAQ,
    title: `${pageTitle} | FAQs`,
  },
  {
    path: "/About",
    element: About,
    title: `${pageTitle} | About`,
  },
  {
    path: "/products/:search",
    element: Search,
    title: `${pageTitle} | Search`,
  }
];


export default routers;
