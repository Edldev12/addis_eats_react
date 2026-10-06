import { useState } from "react";
import { AdminAuthContext } from "./adminAuthContext";
export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("addisEats_admin") === "true";
  });

  function login(username, password) {
    if (
      username === "owner" &&
      password === "edl123"
    ) {
      sessionStorage.setItem(
        "addisEats_admin",
        "true"
      );

      setIsAdmin(true);

      return true;
    }

    return false;
  }

  function logout() {
    sessionStorage.removeItem(
      "addisEats_admin"
    );

    setIsAdmin(false);
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}