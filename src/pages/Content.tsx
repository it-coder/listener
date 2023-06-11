import { useEffect } from "react";
import Albumlist from "./Albumlist";
import Header from "./Header";
import { Route, Routes, useNavigate } from "react-router-dom"
import Container from "./Container";


const Content = () => {
      const navigate = useNavigate()
      
      useEffect(() => {
            navigate('/container')
      })
      
      
      return (
            <div className="content">
                  <Header />
                  <Routes>
                        <Route path="/container" element={<Container/>} >
                              <Route index element={<Albumlist/>} />
                        </Route>
                  </Routes>
            </div>
      );
}

export default Content;