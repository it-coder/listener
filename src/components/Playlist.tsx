

interface IProps {
    covers?: Array<Cover>


}

interface Cover {
    cover_img_url:string
    title:string
    id:string

}

const Playlist = (props: IProps) => {
    const { covers } = props;

    return (
        <div className="site-wrapper-innerd" id="hotplaylist">
            <div className="cover-container" id="playlist-content">
                <ul  ng-style="{'padding-bottom':playlist.length == 0?'0px':'120px'}" className="playlist-covers">
                    {
                        covers?.map((cover, index) => {
                            
                            return (
                                <li key={cover.id}>
                                    <div className="u-cover">
                                        <img
                                            err-src="https://y.gtimg.cn/mediastyle/global/img/playlist_300.png"
                                            src={cover.cover_img_url}
                                            ng-click="showPlaylist(i.id)"
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
                                        ><a href="">{cover.title}</a>
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


export default Playlist;