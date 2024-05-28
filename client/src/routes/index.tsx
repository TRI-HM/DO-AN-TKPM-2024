import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "../providers/AuthContext";

import Login from "../components/Login";
import ChatGPTInterface from "../components/ChatUI";

import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" Component={ChatGPTInterface} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;