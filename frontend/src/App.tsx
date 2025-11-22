import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ChatApp from "./pages/ChatApp";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster richColors position='top-right' />
      {/* Dùng render pop-up thông báo */}
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Private routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<ChatApp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
