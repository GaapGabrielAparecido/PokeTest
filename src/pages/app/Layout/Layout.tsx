import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="relative overflow-x-hidden">
      <Header />

      <div className="h-[85vh] bg-zinc-800 overflow-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
