import React, { useState, useRef,useEffect  } from 'react';


import Platform from '../components/Platform';
import Filter from '../components/Filter';
import Album from '../components/Album';

const Albumlist = () => {
  // 变量
  let channelId = ""
  const filterRef = useRef()
  const albumRef = useRef()
  let filterId = ""

  // 切换平台
  const onTogglePlatform: TogglePlatform = (id: string) => {
    channelId = id;
    filterRef.current?.init(channelId)
  }
 
  // 筛选歌曲分类
  const onToggleFilter: ToggleFilter = (id:string) => {
    filterId = id
    albumRef.current?.init(channelId, filterId)
  }

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
            <Platform onTogglePlatform={onTogglePlatform} />
    
            {/* 标签过滤器 */}
            <Filter ref= {filterRef} onToggleFilter={onToggleFilter} />

            {/* hot playlist */}
            <Album ref={albumRef} />

          </div>
        
        </div>
  );
}

export default Albumlist;