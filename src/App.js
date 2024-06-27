import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import UserDasboard from './pages/user-routes/UserDasboard';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';
import UpdatePost from './components/UpdatePost';
import React from 'react';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from './keycloak';

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
    <UserProvider>
      <BrowserRouter>

        <ToastContainer position="bottom-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categoryId" element={<Categories />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:postId" element={<PostPage />} />
          
          
            <Route path="/user" element={<PrivateRoute />}>
            <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<UserDasboard />} />
              <Route path="profile" element={<ProfileInfo />} />
              <Route path="updatepost/:postId" element={<UpdatePost />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
    </ReactKeycloakProvider>
  );
}

export default App;
