import { Routes, Route } from "react-router-dom";
import Layout from "./components/header/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Bidding from "./pages/Bidding";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import Listings from "./pages/Listing";
import { Toaster } from "./components/ui/toaster";
import AgentDashboard from "./pages/AgentDashboard";
import Profile from "./pages/Profile";
import ViewBids from "./pages/ViewBids";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/frontend-real-estate-ledger" element={<Home />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="properties" element={<Properties />} />
          <Route path="listings" element={<Listings />} />
          <Route path="bidding" element={<Bidding />} />
          <Route path="agent-dashboard" element={<AgentDashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
