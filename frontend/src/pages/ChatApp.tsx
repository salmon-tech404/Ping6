import Logout from "@/components/auth/logout-form";
import { useAuthStore } from "@/stores/useAuthStore";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ChatAppPage = () => {
  const user = useAuthStore((s) => s.user);

  const handleOnClick = async () => {
    try {
      await api.get("/users/test", { withCredentials: true });
      toast.success("OK!");
    } catch (error) {
      toast.error("Thất bại!");
      console.error(error);
    }
  };
  return (
    <div className=''>
      {user?.username}
      <Logout />
      <Button
        className='text-red-500 bg-white border border-black p-4 m-4'
        onClick={handleOnClick}
      >
        Test
      </Button>
    </div>
  );
};

export default ChatAppPage;
