pub mod netease;


pub mod view {
    use serde::{Deserialize, Serialize, Deserializer};

    /// 自定义专辑model
    #[derive(Debug, Serialize)]
    pub struct CustomAlbum {
        id: String,
        cover_img_url: String,
        source_url: String,
        title: String,
    }

    impl CustomAlbum {
        pub fn new(id: String, cover_img_url: String,  source_url: String, title: String) -> Self {
            CustomAlbum {
                id,
                cover_img_url,
                source_url,
                title,
            }
        }
    }



    /// 自定义专辑详情model
    #[derive(Debug, Serialize)]
    pub struct CustomAlbumDetail {
        id: String,
        cover_img_url: String,
        title: String,
        source_url: String,
        track_ids: Vec<String>,
    }

    impl CustomAlbumDetail {
        pub fn new(id: String, cover_img_url: String, source_url: String, title: String, track_ids: Vec<String>) -> Self {
            CustomAlbumDetail {
                id,
                cover_img_url,
                source_url,
                title,
                track_ids,
            }
        }
    }

    /// 歌曲信息
    #[derive(Debug, Serialize)]
    pub struct Song {
        id: String,
        title: String,
        artist: String,
        artist_id: String,
        album: String,
        album_id: String,
        source: String,
        source_url: String,
        img_url: String,
    }

    impl Song {
        pub fn new(id: String, title: String, artist: String, artist_id: String, album: String, album_id: String, source: String, source_url: String, img_url: String,) -> Self {
            Song {
                id,
                title,
                artist,
                artist_id,
                album,
                album_id,
                source,
                source_url,
                img_url,
            }
        }
    }

}