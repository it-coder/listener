import {useState, useImperativeHandle, forwardRef} from 'react'
import { AbsChannel } from "../provider/absChannel"
import { getChannelInstanceById } from '../provider/channelProvider'
import { useNavigate } from 'react-router-dom'




const Album = (props:any,ref:any) => {
    const navigate = useNavigate()
    const [albums, setAlbums] = useState([])


    useImperativeHandle(ref, () => ({
        init: (channelId: any, filterId: any) => {
           const channel : AbsChannel = getChannelInstanceById(channelId)
           channel.custom_album_list_api().then((resp) => {
                setAlbums(resp)
           })

           
        }
    }));


    return (
        <div className="site-wrapper-innerd" id="hotplaylist">
            <div className="cover-container" id="playlist-content">
                <ul style={{'paddingBottom': albums.length == 0?'0px':'120px'}} className="playlist-covers">
                    {
                        albums?.map((album:any, index) => {
                            
                            return (
                                <li key={album.id}>
                                    <div className="u-cover">
                                        <img
                                            err-src="https://y.gtimg.cn/mediastyle/global/img/playlist_300.png"
                                            src={album.cover_img_url}
                                            onClick={ () => {
                                                navigate('/container/playlist')
                                            }}
                                        />
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
                                        ><a href="">{album.title}</a>
                                        </span>
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


export default forwardRef(Album);