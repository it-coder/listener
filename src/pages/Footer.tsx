
const Footer = () => {

      const currentPlaying = {
            title:'海阔天空',
            album:'专辑',
            artist:'艺素'
        
          }
      return (
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
      );
}

export default Footer;