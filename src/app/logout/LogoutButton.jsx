"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("fable_token");
    router.push("/login");
  };

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}