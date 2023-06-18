import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getChannelInstanceById } from "../provider/channelProvider"
import { AbsChannel } from "../provider/absChannel"
import { channel } from "diagnostics_channel"

const Playlist = () => {
    const params:any = useParams()
    const list_id = params.id


    const [playlist, setPlaylist] = useState<any>()

    useEffect(() => {
        const channelId = localStorage.getItem('channelId')
        const channel: AbsChannel = getChannelInstanceById(channelId)

        

        channel.get_playlist(`?list_id=${list_id}`).success((resp:any) => {
            console.log('get_playlist', resp)
            
            setPlaylist(resp)
        })
    }, [list_id])

    return (
        <div className="page">
            <div
                className="playlist-detail"
                ng-show="is_window_hidden!=1 && window_type=='list'">
                <div className="detail-head">
                    <div className="detail-head-cover">
                        <img
                            src={ playlist?.info?.cover_img_url }
                            err-src="https://y.gtimg.cn/mediastyle/global/img/singer_300.png"/>
                    </div>
                    <div className="detail-head-title">
                        <h2>{ playlist?.info?.title }</h2>
                        <div className="playlist-button-list">
                            <div className="playlist-button playadd-button">
                                <div
                                    className="play-list"
                                    ng-click="playMylist(list_id)">
                                    <span className="icon li-play-s"></span>
                                    播放全部
                                </div>
                                <div
                                    className="add-list"
                                    ng-click="addMylist(list_id)">
                                    <span className="icon li-add"></span>
                                </div>
                            </div>
                            
                            <div
                                className="playlist-button clone-button"
                                ng-show="!is_mine && !is_local"
                                ng-click="clonePlaylist(list_id)"
                                >
                                <div className="play-list">
                                    <span className="icon li-songlist"></span>
                                    <span>添加到我的歌单</span>
                                </div>
                            </div>
                            <div
                                className="playlist-button fav-button"
                                ng-show="!is_mine && !is_local"
                                ng-click="favoritePlaylist(list_id)"
                                >
                                <div
                                    className="play-list"
                                    ng-className="{'favorited':is_favorite,'notfavorite':!is_favorite}"
                                >
                                    <svg className="feather">
                                        <use href="#star"></use>
                                    </svg>
                                    <span>收藏</span>
                                </div>
                            </div>
                            <div
                                className="playlist-button edit-button"
                                ng-show="!is_mine && !is_local"
                                open-url="playlist_source_url"
                                >
                                <div className="play-list">
                                    <span className="icon li-link"></span>
                                    <span>链接</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className="detail-songlist">
                    <div className="playlist-search">
                        <svg className="feather playlist-search-icon">
                            <use href="#search"></use>
                        </svg>
                        <svg
                            className="feather playlist-clear-icon"
                            ng-show="playlistFilter.key!=''"
                            ng-click="clearFilter()"
                        >
                            <use href="#x"></use>
                        </svg>
                        <input
                            className="playlist-search-input"
                            type="text"
                            ng-model="playlistFilter.key"
                            placeholder="搜索"
                        />
                    </div>
                    <li className="head">
                        <div className="title">
                            <a>歌曲名{'(' + playlist?.tracks?.length + ')'}</a>
                        </div>
                        <div className="artist"><a>歌手</a></div>
                        <div className="album"><a>专辑</a></div>
                        <div className="tools">操作</div>
                    </li>
                    {
                        playlist?.tracks?.map((song:any, index:number) => {
                            return (
                                <li
                                    key={song.id}
                                    ng-repeat="song in songs | filter: fieldFilter track by $index"
                                    ng-class-odd="'odd'"
                                    ng-class-even="'even'"
                                    ng-mouseenter="options=true"
                                    ng-mouseleave="options=false"
                                    ng-dblclick="addAndPlay(song)"
                                    draggable="true"
                                    drag-drop-zone
                                    drag-zone-object="song"
                                    drag-zone-title="song.title"
                                    drag-zone-type="'application/listen1-song'"
                                    drop-zone-ondrop="onPlaylistSongDrop(list_id, song, arg1, arg2, arg3)"
                                >
                                    <div className="title">
                                        {/* <!-- <a className="disabled" ng-if="song.disabled" ng-click="copyrightNotice()">{{ song.title }}</a> --> */}
                                        <a add-and-play="song">{ song.title }</a>
                                    </div>
                                    <div className="artist">
                                        <a ng-click="showPlaylist(song.artist_id)">{ song.artist }</a>
                                    </div>
                                    <div className="album">
                                        <a ng-click="showPlaylist(song.album_id)" >{ song.album }</a>
                                    </div>
                                    <div className="tools">
                                        <a
                                            title="{{_ADD_TO_QUEUE}}"
                                            className="detail-add-button"
                                            add-without-play="song"
                                            ng-show="options"
                                        >
                                            <span className="icon li-add"></span>
                                        </a>
                                        <a
                                            title="{{_ADD_TO_PLAYLIST}}"
                                            className="detail-fav-button"
                                            ng-show="options"
                                            ng-click="showDialog(0, song)"
                                        >
                                            <span className="icon li-songlist"></span>
                                        </a>
                                        <a
                                            title="{{_REMOVE_FROM_PLAYLIST}}"
                                            className="detail-delete-button"
                                            ng-click="removeSongFromPlaylist(song, list_id)"
                                            ng-show="options && (is_mine=='1'||is_local) "
                                        >
                                            <span className="icon li-del"></span>
                                        </a>
                                        <a
                                            title="{{_ORIGIN_LINK}}"
                                            className="source-button"
                                            open-url="song.source_url"
                                            ng-show="options && !is_local"
                                        >
                                            <span className="icon li-link"></span>
                                        </a>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Playlist;