import { ReactNode } from "react";
import NavHeader from "./NavHeader";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
