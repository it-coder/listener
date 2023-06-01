import  { Netease } from './provider/netease'
//import client from './server';
import axios from 'axios';



import './static/css/common.css'
import './static/css/icon.css'
import './static/css/iparanoid.css'
debugger
import { getClient as mine } from '@tauri-apps/api/http';
// import './style/common.css'

async function initProfile() {
  axios.get('/feather-sprite.svg').then((res) => {
    let html = document.getElementById("feather-container") as HTMLElement;
    html.innerHTML = res.data;
    
  });
} 

function test_tauri_api() {
  async () => {
    debugger
    const client = await mine({});

  }
}

function App() {
  initProfile();

  //client.get("https://baidu.com");
  

  function test_netease() {
    Netease.test_netease();
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
              
              <div style={{ height: "64px" }}></div>
              {/* hot playlist window */}
              <div
                  className="page page-hot-playlist"
                  ng-show="current_tag==2 && is_window_hidden==1"
                  ng-controller="PlayListController"
                  ng-init="loadPlaylist();"
                >
                  {/* 平台list */}
                <div className="source-list" ng-show="is_window_hidden==1">
                  <div
                    ng-repeat-start="source in ::sourceList"
                    className="source-button"
                    ng-class="{'active':tab === source.name}"
                    ng-click="changeTab(source.name)"
                  >
                  <div className="buttontext">
                    网易云
                  </div>
                  </div>
                  <div
                    ng-repeat-end
                    ng-if="!$last"
                    className="splitter"
                  ></div>
                </div>
                {/* 标签过滤器 */}
                <div className="playlist-filter">
                  <div
                    className="l1-button filter-item"
                    ng-repeat="filter in playlistFilters[tab] || []"
                    ng-click="changeFilter(filter.id)"
                    ng-class="{'active':filter.id === currentFilterId}"
                  >
                    全部
                  </div>
                  <div
                    className="l1-button filter-item"
                    ng-show="playlistFilters[tab] && playlistFilters[tab].length > 0"
                    ng-click="toggleMorePlaylists()"
                    ng-class="{'active':showMore}"
                  >
                  <svg fill="currentColor" aria-hidden="true" focusable="false" data-prefix="far" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-ellipsis-h fa-w-16 fa-9x">
                    <path fill="currentColor" d="M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" className="">
                    </path>
                  </svg>
                  </div>
                </div>

                {/* hot playlist */}
                <div className="site-wrapper-innerd" id="hotplaylist">
                  <div className="cover-container" id="playlist-content">
                    <ul  ng-style="{'padding-bottom':playlist.length == 0?'0px':'120px'}" className="playlist-covers">
                      <li ng-repeat="i in result ">
                        <div className="u-cover">
                          <img
                          err-src="https://y.gtimg.cn/mediastyle/global/img/playlist_300.png"
                            ng-src="{{i.cover_img_url}}"
                            ng-click="showPlaylist(i.id)"
                          />
                          <div
                              className="covershadow"
                              style={{ backgroundImage: `url("")` }}
                            ></div>
                          <div
                            className="bottom"
                            ng-click="directplaylist(i.id)"
                          >  
                          <svg  fill="currentColor" style={{ height: "44%", width:"44%", marginLeft: "4px" }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">
                            </path>
                          </svg>
                          </div>
                        </div>
                        <div className="desc">
                          <span
                            className="title"
                            ng-click="showPlaylist(i.id)"
                            ><a href="">我的歌</a></span
                          >
                        </div>
                      </li>
                  
                    </ul>
                  </div>
                </div>

              </div>
            
            </div>

          </div>
        </div>
        <div className="footer">
          <button onClick={test_tauri_api} >点我</button>
        </div>
      </div>
    </div>
  );
}

export default App;
