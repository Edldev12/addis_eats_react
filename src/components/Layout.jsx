import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useEffect } from "react";
import { useThemeStore } from "../Store/themeStore";

function Layout() {
  const theme = useThemeStore(
    (state) => state.theme
  );

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;