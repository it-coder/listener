import React from 'react';
import './style/common.css'
import  { Netease } from './provider/netease'

import client from './server/index'

  

function App() {
  console.log("ddd:");

  async function test_http() {
    
    client.get("https://baidu.com").then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    })
  }

  function test_netease() {
    Netease.test_netease();
  }
  return (
    <div className="wrapper">
      <div className="main">
        <div className="sidebar">
          <div className="flex-scroll-wrapper"></div>
          <div className="menu-control"></div>
          <div className="menu-title">
            <div className="title">平台聚合</div>
          </div>
          <ul className="nav masthead-nav">
            <li>
              <div className="sidebar-block">
                <span className="icon li-featured-list"></span>
                <a>精选歌单</a>
              </div>
            </li>
          </ul>

        </div>
        <div className="content"></div>
      </div>
      <div className="footer">
        <button onClick={test_http} >点我</button>
      </div>
    </div>
  );
}

export default App;
