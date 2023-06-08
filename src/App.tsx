import React, { useState, useRef,useEffect  } from 'react';
import axios from 'axios';
import Platform from './components/Platform';
import Filter from './components/Filter';
import Sidebar from './pages/Sidebar'

import { getDefaultChannel } from './provider/channelProvider'

import './static/css/common.css'
import './static/css/icon.css'
import './static/css/iparanoid.css'

import Playlist from './components/Playlist';
import { AbsChannel } from './provider/absChannel';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Content from './pages/Albumlist';
import Main from './pages/Main';

async function initProfile() {
  axios.get('/feather-sprite.svg').then((res) => {
    let html = document.getElementById("feather-container") as HTMLElement;
    html.innerHTML = res.data;
    
  });
}


function App() {
  // initProfile();

// [
  //   {
  //     name: 'netease',
  //     displayId: '_NETEASE_MUSIC',
  //     displayText: '网易云音乐',
  //   },
  //   {
  //     name: 'qq',
  //     displayId: '_QQ_MUSIC',
  //     displayText: 'QQ音乐',
  //   },
  // ];

  

  const currentPlaying = {
    title:'海阔天空',
    album:'专辑',
    artist:'艺素'

  }

  const covers = [{
    id:'1',
    title:'my music',
    cover_img_url:'http://p2.music.126.net/oFp3oKUuNNpoyyL1Tq0Sfw==/109951168637076947.jpg?param=512y512'
  }]

  // 变量
  let channelId = ""
  const filterRef = useRef()
  const playlistRef = useRef()
  let filterId = ""


  // 切换平台
  const onTogglePlatform: TogglePlatform = (id: string) => {
    channelId = id;
    filterRef.current?.changeChannel(channelId)
  }
 
  // 筛选歌曲分类
  const onToggleFilter: ToggleFilter = (id:string) => {
    filterId = id
    playlistRef.current?.init(channelId, filterId)
  }


  return (
    <div className='body' >
        <div
          id="feather-container"
          style={{visibility: "hidden", position: "absolute", width: "0px", height: "0px"}}>
        </div>
    
      <div className="wrapper">
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
