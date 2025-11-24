import Logout from "@/components/auth/logout-form";
import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";

const ChatAppPage = () => {
  const user = useAuthStore((s) => s.user);
  return (
    <div className=''>
      {user?.username}
      <Logout />
    </div>
  );
};

export default ChatAppPage;
