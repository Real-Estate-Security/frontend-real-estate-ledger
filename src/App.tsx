import { Routes, Route } from "react-router-dom";
import Layout from "./components/header/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Bidding from "./pages/Bidding";
import Register from "./pages/Register";
import { Toaster } from "./components/ui/toaster";
import AgentDashboard from "./pages/AgentDashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/frontend-real-estate-ledger" element={<Home />} />
        <Route path="/frontend-real-estate-ledger/login" element={<Login />} />
        <Route
          path="/frontend-real-estate-ledger/register"
          element={<Register />}
        />
          <Route path="/frontend-real-estate-ledger/bidding" element={<Bidding />} />
        <Route
          path="/frontend-real-estate-ledger/agent-dashboard"
          element={<AgentDashboard />}
        />
        <Route
          path="/frontend-real-estate-ledger/profile"
          element={<Profile />}
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
