import { useEffect, useState } from "react";
import Albumlist from "./Albumlist";
import Header from "./Header";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom"
import Playlist from "./Playlist";
import Album from "../components/Album";


const Content = () => {
     
      return (
            <div className="content">
                  <Header />
                  {/* <Albumlist /> */}
                  <Routes>
                        <Route index element={<Albumlist/>} />
                        <Route path="/albumlist" element={<Albumlist/>} />
                        <Route path="/playlist/:id" element={ <Playlist /> } />
                  </Routes>
                  <Outlet></Outlet>
            </div>
      );
}

export default Content;