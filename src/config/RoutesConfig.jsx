import React from "react";
import { Routes, Route} from "react-router-dom";
import CateDetails from "../pages/CateDetails/CateDetails";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import CreatePost from "../pages/CreatePost/CreatePost";
import Post from "../pages/Post/Post";
import Register from "../pages/Register/Register";
import ChooseTopics from "../pages/ChooseTopics/ChooseTopics";
const RoutesConfig = () => {
  return (
    <Routes>
        <Route path="/category/:slug" element={<CateDetails />} />
        <Route path="/category" element={<ChooseTopics />} />
        <Route path="/post/create" element={<CreatePost/>} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/register" element={<Register/>} ></Route>
        <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default RoutesConfig;
