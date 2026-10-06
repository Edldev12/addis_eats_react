import { useContext } from "react";
import { AdminAuthContext } from "./adminAuthContext";

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}