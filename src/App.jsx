import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Dish from "./pages/Dish/Dish";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorite/Favorites";
import Orders from "./pages/Order/Orders";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import Checkout from "./pages/Checkout/Checkout";
import CustomerSignIn from "./components/CustomerSignIn/CustomerSignIn";
import AdminLogin from "./admin/AdminLogin";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminDishes from "./admin/AdminDishes";
import AdminOrders from "./admin/AdminOrders";
import AdminLayout from "./admin/AdminLayout";

function App() {
  return (
    <Routes>

      {/* Pages WITH Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<Dish />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* Standalone Pages - NO Layout */}
      <Route
        path="/signin"
        element={<CustomerSignIn />}
      />
      <Route
        path="/order-confirmation"
        element={<OrderConfirmation />}
      />
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />
      <Route element={<ProtectedAdminRoute />}>
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="dishes"
            element={<AdminDishes />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;