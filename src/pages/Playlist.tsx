import { useNavigate } from "react-router-dom"

const Playlist = () => {
    const cover_img_url= ''
    const playlist_title = ""
    const navigate = useNavigate()
    const go2 = () => {
        console.log(11122)
        navigate('/container/Albumlist')
  }

    return (
        <div className="page">
            <button onClick={go2}>BACK</button>
            <div className="playlist-detail">
                <div className="detail-head">
                    <div className="detail-head-cover">
                        <img
                            ng-src="{{ cover_img_url.replace('/300/','/500/').replace('/240/','/512/').replace('/T002R300x300M','/T002R800x800M') }}"
                            err-src="https://y.gtimg.cn/mediastyle/global/img/singer_300.png"
                        />
                        <div
                            className="covershadow"
                            style= {{backgroundImage:`url(${cover_img_url})`, opacity: 1}}>

                        </div>
                        <div
                            className="bottom"
                            ng-click="playMylist(list_id)">  

                            <svg style={{height: '44%', width:'44%', marginLeft: '4px'}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" fill="currentColor" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                        </div>
                    </div>
                    <div className="detail-head-title">
                        <h2>{playlist_title}</h2>
                        <div className="playlist-button-list">
                            <div style={{padding: '0',height: 'auto',backgroundColor: `var(--theme-color-hover)`,color: `var(--theme-color)`}} className="playlist-button playadd-button">
                                <div
                                    style={{padding: '8px 0 8px 16px',width: '100px'}}
                                    className="play-list"
                                    ng-click="playMylist(list_id)">

                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" className="icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                                    播放全部
                                </div>
                                <div
                                    style={{padding: '8px 16px 8px 0px'}}
                                    className="add-list"
                                    ng-click="addMylist(list_id)">

                                    <svg t="1659628019588" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1723" width="512" height="512"><path d="M938.516167 597.182834 85.483833 597.182834C38.527925 597.182834 0 559.256908 0 511.699001c0-46.955908 37.925926-85.483833 85.483833-85.483833l853.032334 0c46.955908 0 85.483833 37.925926 85.483833 85.483833C1024 559.256908 986.074074 597.182834 938.516167 597.182834L938.516167 597.182834 938.516167 597.182834zM512.300999 1024c-46.955908 0-85.483833-37.925926-85.483833-85.483833L426.817166 85.483833C426.817166 37.925926 464.743092 0 512.300999 0c46.955908 0 85.483833 37.925926 85.483833 85.483833l0 853.634333C597.182834 985.472075 559.256908 1024 512.300999 1024L512.300999 1024 512.300999 1024zM512.300999 1024" fill="currentColor" p-id="1724"></path></svg>
                                </div>
                            </div>
                            <div
                                className="playlist-button clone-button"
                                ng-show="!is_mine && !is_local"
                                ng-click="clonePlaylist(list_id)">

                                <div className="play-list">
                                    <span className="icon li-songlist"></span>
                                    <span>添加到我的歌单</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playlist;