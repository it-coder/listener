import { useEffect } from "react";
import Albumlist from "./Albumlist";
import Header from "./Header";
import { Route, Routes, useNavigate } from "react-router-dom"
import Container from "./Container";
import Playlist from "./Playlist";


const Content = () => {
      const navigate = useNavigate()
      
      // useEffect(() => {
      //       navigate('/container/Albumlist')
      // })
      
      const go = () => {
            navigate('/container/Albumlist')
      }

      const go2 = () => {
            navigate('/container/playlist')
      }
      
      return (
            <div className="content">
                  <Header />
                  <button onClick={go}>back</button>
                  <button onClick={go2}>back2</button>
                  <Routes>
                        <Route path="/container" element={<Container/>} >
                              <Route index path="/container/Albumlist" element={<Albumlist/>} />
                              <Route path="/container/playlist" element={ <Playlist /> } />
                        </Route>
                  </Routes>
            </div>
      );
}

export default Content;