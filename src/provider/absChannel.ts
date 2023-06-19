
export abstract class AbsChannel {
    /**
     * 获取过滤条件
     */
    public abstract get_playlist_filters(): Promise<any>;

    abstract custom_album_list_api(): Promise<any>;

    /**
     * 获取专辑列表
     * @param url  查询参数 {example: url = ?filter_id=toplist}
     */
    abstract show_playlist(url:string): any;

    /**
     * 获取歌单歌曲列表
     * @param url 歌单id example： ?list_id=111
     */
    abstract get_playlist(url:string): any;

    abstract bootstrap_track(track:any, successFn: (resp:any) => void, failFn:(resp:any) => void):void;
}

