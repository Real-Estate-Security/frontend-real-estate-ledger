import { Outlet } from "react-router-dom";
import NavHeader from "./NavHeader";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
