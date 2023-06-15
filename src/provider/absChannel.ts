
export abstract class AbsChannel {
    /**
     * 获取过滤条件
     */
    public abstract get_playlist_filters(): Promise<any>;

    abstract custom_album_list_api(): Promise<any>;

    /**
     * 获取专辑列表
     * @param url 参数
     */
    abstract show_playlist(url:string): any;

    abstract get_playlist(url:string): any;
}

