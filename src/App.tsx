import React from 'react';
import './style/common.css'
import  { Netease } from './provider/netease'

// import axios from 'axios';
// import axiosTauriApiAdapter from './adapter';

import { getClient } from '@tauri-apps/api/http';
  

function App() {
  console.log("ddd:");

  console.log("ddd:", getClient);

  async function test_http() {
    
    // await getClient().catch(e => {
    //   console.log(e);
    // })
    // client.get("http://baidu.com").then((resp) => {
    //   console.log(resp);
    // }).catch((err) => {
    //   console.log(err);
    // })
  }

  function test_netease() {
    // Netease.ne_playlist_api("neplaylist_2075587022");
    // Netease.custom_album_list_api();
    // Netease.ne_bootstrap_track({id:"netrack_5308068"});
    Netease.test_netease();
  }
  return (
    <div className="wrapper">
      <div className="main">
        <div className="sidebar"></div>
        <div className="content"></div>
      </div>
      <div className="footer">
        <button onClick={test_http} >点我</button>
      </div>
    </div>
  );
}

export default App;
