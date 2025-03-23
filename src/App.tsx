import { Routes, Route } from "react-router-dom";

import Layout from "@/components/header/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Bidding from "./pages/Bidding";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/frontend-real-estate-ledger" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="bidding" element={<Bidding />} />
          <Route path="register" element={<Register />} />
          <Route path="properties" element={<Properties />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
