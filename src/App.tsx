import  { Netease } from './provider/netease'
import axios from 'axios';
import Platform from './components/Platform';
import Filter from './components/Filter';

import { getChannelById, getAllChannel } from './provider/provider'

import './static/css/common.css'
import './static/css/icon.css'
import './static/css/iparanoid.css'

import Playlist from './components/Playlist';
import { Channel } from './provider/channel';

async function initProfile() {
  axios.get('/feather-sprite.svg').then((res) => {
    let html = document.getElementById("feather-container") as HTMLElement;
    html.innerHTML = res.data;
    
  });
}


 function App() {
  initProfile();

  // 变量
  let platform = 'qq'

  const sourceList = getAllChannel();
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

  let channel: Channel = getChannelById(platform);

  const {recommend, all} = channel.get_playlist_filters();

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

  // 切换平台
  const onTogglePlatform: TogglePlatform = (id: string) => {
    platform = id;
  }


  return (
    <div className='body' >
       <div
        id="feather-container"
        style={{visibility: "hidden", position: "absolute", width: "0px", height: "0px"}}
      ></div>
    
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
            {/* 顶部导航 start */}
            <div className="navigation">
              <div className="backfront">
              <svg  fill="currentColor" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" className="svg-inline--fa fa-angle-left fa-w-8 icon li-back" ng-click="popWindow()" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>
              <svg fill="currentColor" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" className="svg-inline--fa fa-angle-right fa-w-8 icon li-advance" ng-click="forwardWindow()" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
              </div>
              {/* 搜索栏start */}
              <div className="search">
                <svg fill="currentColor"  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                
                  <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  <style type="text/css">
                    opacity: 0.28;margin-right: 4px;width: 15px;height: 15px;cursor: default;
                  </style>
                </svg>

                <input className="form-control search-input" id="search-input" type="text" ng-model="keywords" placeholder="搜索" ng-model-options="{debounce: 500}" ng-keyup="enterEvent($event)"></input>
              </div>
              {/* 搜索栏end */}
              <div ng-className="{ 'active': (current_tag==4) &amp;&amp; (window_url_stack.length ==0)}" ng-click="showTag(5)" className="settings">
                <span className="icon">
                  <svg className="feather">
                    <use href="#users"></use>
                  </svg>
                </span>
              </div>
              <div ng-className="{ 'active': (current_tag==4) &amp;&amp; (window_url_stack.length ==0)}" ng-click="showTag(4)" className="settings">
                <span className="icon li-setting"></span>
              </div>
            </div>
            {/* 顶部导航 end */}
            {/* 顶部过滤器 satrt */}
            <div
                style= {{ overflowY: "scroll"}}
                className="browser flex-scroll-wrapper"
                infinite-scroll="scrolling()"
                content-selector="'#playlist-content'">
              
              {/* <div style={{ height: "64px" }}></div> */}
              {/* hot playlist window */}
              <div
                  className="page page-hot-playlist"
                  ng-show="current_tag==2 && is_window_hidden==1"
                  ng-controller="PlayListController"
                  ng-init="loadPlaylist();"
                >

                {/* 平台list */}
                <Platform sourceList={sourceList} onTogglePlatform={onTogglePlatform} 
                  activeTab={platform}/>
        
                {/* 标签过滤器 */}
                <Filter filterList={recommend}></Filter>

                {/* hot playlist */}
                <Playlist covers={covers} />

              </div>
            
            </div>

          </div>
        </div>
        <div className="footer">

          <div className="left-control">
            <span className="icon li-previous" prev-track=""></span>
            <span
              className="icon li-play play"
              ng-class="isPlaying? 'li-pause': 'li-play'"
              play-pause-toggle=""></span>
            <span className="icon li-next" next-track=""></span>
          </div>

          <div className="main-info">
            <div className="logo-banner" ng-if="playlist.length == 0">
              <svg
                className="logo"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#666666"
                stroke="#666666"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon
                  points="7 4 7 19 16 19 16 16 10 16 10 4"
                ></polygon>
                <polygon points="13 4 13 13 16 13 16 4"></polygon>
              </svg>
            </div>
            <div
              className="cover"
              ng-if="playlist.length > 0"
              ng-click="toggleNowPlaying()"
            >
              <img
                ng-src="{{ currentPlaying.img_url }}"
                err-src="https://y.gtimg.cn/mediastyle/global/img/album_300.png"
              />
              <div className="mask">
                <svg className="feather" ng-if="getCurrentUrl() != '/now_playing'">
                  <use href="#chevrons-up"></use>
                </svg>
                <svg className="feather" ng-if="getCurrentUrl() === '/now_playing'">
                  <use href="#chevrons-down"></use>
                </svg>
              </div>
            </div>
            <div className="detail" ng-if="playlist.length > 0">
              <div className="ctrl">
                <a
                  ng-click="showDialog(0, currentPlaying)"
                  title="{{_ADD_TO_PLAYLIST}}">
                  <span className="icon li-songlist"></span>
                </a>
                <a
                  title="{{ settings.playmode | playmode_title }}(s)"
                  ng-click="changePlaymode()"
                >
                  <span
                    ng-show="settings.playmode == 0"
                    className="icon li-loop"
                  ></span>
                  <span
                    ng-show="settings.playmode == 1"
                    className="icon li-random-loop"
                  ></span>
                  <span
                    ng-show="settings.playmode == 2"
                    className="icon li-single-cycle"
                  ></span>
                </a>
              </div>

              <div className="title">
                <span
                  ng-if="currentPlaying.source === 'xiami'"
                  style={{color: "orange", fontSize: "medium"}}>
                    ⚠️ 
                </span>
                  { currentPlaying.title }
              </div>
              <div className="more-info">
                <div className="current">
                  {/* { currentPosition } */}
                  currentPosition
                </div>
                <div className="singer">
                  <a ng-click="showPlaylist(currentPlaying.artist_id)">
                    { currentPlaying.artist }
                  </a>
                  -
                  <a ng-click="showPlaylist(currentPlaying.album_id)" >
                    { currentPlaying.album }
                  </a>
                </div>
                <div className="total">
                  {/* { currentDuration } */}
                  05:11
                </div>
              </div>
              <div className="playbar">
                <div className="playbar-clickable">
                  <div
                    className="barbg"
                    id="progressbar"
                    mode="play"
                    draggable-bar="">
                    <div
                      className="cur"
                      ng-style="{width : myProgress + '%' }">
                      <span className="btn"><i></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-control">
            <div className="playlist-toggle">
              <span
                ng-click="togglePlaylist()"
                className="icon li-list">
              </span>
            </div>
            <div className="volume-ctrl" volume-wheel="">
              <span
                className="icon"
                ng-class="mute? 'li-mute': 'li-volume'"
                ng-click="toggleMuteStatus()">
              </span>
              <div className="m-pbar volume">
                <div
                  className="barbg"
                  id="volumebar"
                  mode="volume"
                  draggable-bar="">
                  <div className="cur" ng-style="{width : volume + '%' }">
                    <span className="btn"><i></i></span>
                  </div>
                </div>
              </div>
            </div>
            <div ng-if="!isChrome" className="lyric-toggle">
              <div
                ng-click="openLyricFloatingWindow(true)"
                className="lyric-icon"
                ng-class="{'selected': enableLyricFloatingWindow}">
                词
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
