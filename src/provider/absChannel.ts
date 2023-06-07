
export abstract class AbsChannel {
    public abstract get_playlist_filters(): Promise<any>;

    abstract custom_album_list_api(): Promise<any>;
}

