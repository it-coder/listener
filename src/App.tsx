import React from 'react';
import './style/common.css'
import  { Netease } from './provider/netease'

function App() {
  

  function cl() {
    // Netease.ne_playlist_api("neplaylist_2075587022");
    // Netease.custom_album_list_api();
    Netease.test();
  }
  return (
    <div className="wrapper">
      <div className="main">
        <div className="sidebar"></div>
        <div className="content"></div>
      </div>
      <div className="footer">
        <button onClick={cl} >点我</button>
      </div>
    </div>
  );
}

export default App;
