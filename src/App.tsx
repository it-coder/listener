import React from 'react';
import  { Netease } from './provider/netease'

import './static/css/common.css'
import './static/css/icon.css'
import './static/css/iparanoid.css'
// import './style/common.css'

  

function App() {
  console.log("ddd:");

  async function test_http() {
    
    
  }

  function test_netease() {
    Netease.test_netease();
  }
  return (
    <div className="wrapper">
      <div className="main">
        <div className="sidebar">
          <div className="flex-scroll-wrapper">
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
        </div>
        <div className="content">
          

        </div>
      </div>
      <div className="footer">
        <button onClick={test_http} >点我</button>
      </div>
    </div>
  );
}

export default App;
