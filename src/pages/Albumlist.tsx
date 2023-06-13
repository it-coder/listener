import React, { useState, useRef,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

import Platform from '../components/Platform';
import Filter from '../components/Filter';
import Album from '../components/Album';

const Albumlist = () => {
  // 变量
  const filterRef = useRef()
  const albumRef = useRef()

  return (
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
            <Platform filterRef={filterRef} />
    
            {/* 标签过滤器 */}
            <Filter ref= {filterRef}  albumRef={albumRef}/>

            {/* hot playlist */}
            <Album ref={albumRef} />

          </div>
        
        </div>
  );
}

export default Albumlist;