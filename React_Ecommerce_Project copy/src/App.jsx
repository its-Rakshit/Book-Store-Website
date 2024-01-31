import { BrowserRouter, Route, Routes } from "react-router-dom";
import Display from "./Components/Display";
import Registor_User from "./Components/RegisterUser";
import Login from "./Components/Login";
import Discription from "./Components/Discription";
import Trail from "./Components/trail";
import { UserProvider } from "./UserContext/UserContext";
import CartPage from "./Components/CartPage";
import BoughtPage from "./Components/BoughtPage";
import PaymentPage from "./Components/PaymentPage";
import AdminAddProduct from "./Components/AdminAddProduct";
import AdminDisplayProducts from "./Components/AdminDisplayProducts";
import AdminEditProduct from "./Components/AdminEditProduct";
import AdminDisplayAllUsers from "./Components/AdminDisplayAllUsers";
import AdminEditUser from "./Components/AdminUpdateUser";
import AdminUpdateUser from "./Components/AdminUpdateUser";
import UserEdit from "./Components/UserEdit";
import AdminLogin from "./Components/AdminLogin";
import AdminInterface from "./Components/AdminInterface";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="RegistorUser" element={<Registor_User />} />
          <Route path="/" element={<Login />} />
          <Route path="Display" element={<Display />} />
          <Route path="Discription/:id" element={<Discription />} />
          {/* Other routes go here */}
          <Route path="trail" element={<Trail />} />
          <Route path="Cartpage" element={<CartPage />} />
          <Route path="Bought" element={<BoughtPage />} />
          <Route path="Payment" element={<PaymentPage />} />
          <Route path="UserEdit" element={<UserEdit/>} />

          <Route path="adminAddProduct" element={<AdminAddProduct />} />
          <Route path="adminDisplayProducts" element={<AdminDisplayProducts />} />
          <Route path="/admin-edit-product/:productId" element={<AdminEditProduct />} />
          <Route path="AdminDisplayAllUsers" element={<AdminDisplayAllUsers/>} />
          <Route path="AdminUpdateUser/:userId" element={<AdminUpdateUser />} />
          <Route path="AdminLogin" element={<AdminLogin />} />
          <Route path="AdminInterface" element={<AdminInterface />} />

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
