import { Routes, Route } from "react-router-dom";

import Layout from "@/components/header/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import Biddings from "./pages/Bids";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/frontend-real-estate-ledger" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="properties" element={<Properties />} />
          <Route path="bidding" element={<Biddings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
