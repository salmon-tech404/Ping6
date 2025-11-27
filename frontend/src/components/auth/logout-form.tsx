import React from "react";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  //   logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        className='text-red-500 bg-white border border-black p-4 m-4'
        onClick={handleLogout}
      >
        LogOut
      </Button>
    </>
  );
};

export default Logout;
