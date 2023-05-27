class TestVO {
    title: string
    other: string
    
   
}


/**
 * 自定义专辑
 */
class CustomAlbum {
    public cover_img_url: string
    public id: string 
    public source_url: string 
    public title: string 
    


}

/**
 * 自定义专辑详情
 */
class CustomAlbumDetail extends CustomAlbum {
    public track_ids: Array<string>

    public songs: Array<Song>
}

/**
 * 歌曲信息
 */
class Song {
    id: String
    title: String
    artist: String
    artist_id: String
    album: String
    album_id: String
    source: String
    source_url: String
    img_url: String
}