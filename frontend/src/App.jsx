import { Routes, Route } from "react-router-dom";
import Navbar from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";
import Landing from "./pages/LandingPage";
import Historia from "./pages/HistoriaPage";
import Tienda from "./pages/TiendaPage"
import Novedades from "./pages/NovedadesPage";
import Blog from "./pages/novedades/BlogPage";
import Login from "./pages/LoginPage";
import AuthContextProvider from './context/Authcontext';
import SignUp from "./pages/authPages/SignUpPage";
import BlogUploadForm from "./pages/BlogUploadForm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="overflow-x-auto">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/historia" element={<Historia />}></Route>
          <Route path="/tienda" element={<Tienda />}></Route>
          <Route path="/novedades" element={<Novedades />}></Route>
          <Route path="/novedades/:slug" element={<Blog />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/añadirBlog/:title?" element={
            <ProtectedRoute >
              <BlogUploadForm />
            </ProtectedRoute>
          }></Route>

        </Routes>
        <Footer />

      </AuthContextProvider>
    </div>
  );
};