use std::error::Error;
use anyhow::{anyhow, Context, Result, bail, Ok};


use std::collections::HashMap;

use scraper::{Html, Selector};
use serde::{Deserialize, Serialize, Deserializer};
use serde_json::Value;
use reqwest::{header, header::HeaderMap, Client};
use crate::provider::view::{CustomAlbum, CustomAlbumDetail, Song};

use super::view::Track;

/// test
pub fn test_ne(params : NeteaseParam) -> Result<String> {
    // let s = params.order.ok_or(anyhow!("order can not is None"))?;

    let uri = String::from("");
    let resp = reqwest::blocking::get(uri)?;
    Ok(String::from("success"))
}

/// 获取自定义专辑列表
pub async fn ne_custom_album_list(params : NeteaseParam) -> Result<Vec<CustomAlbum>> {
    let uri = format!("https://music.163.com/discover/playlist/?order={}", params.order.unwrap_or("hot".to_string()));
    // TODO other param handle

    let resp = reqwest::get(uri).await?;
    let text = resp.text().await?;

    let fragment = Html::parse_fragment(&text);
    let li_selector = Selector::parse("ul.m-cvrlst li").map_err(|x| anyhow!(format!("{}", x)))?;
    let image_selector = Selector::parse("div.u-cover img").map_err(|x| anyhow!(format!("{}", x)))?;
    let detail_selector = Selector::parse("div.u-cover a.msk").map_err(|x| anyhow!(format!("{}", x)))?;

    let mut custom_album_list: Vec<_> = Vec::new();
    for li_element in fragment.select(&li_selector) {
        // html属性获取
        let image_element = li_element.select(&image_selector);
        let image = image_element.last().ok_or(anyhow!("cover_img_url is None"))?;
        let detail_element = li_element.select(&detail_selector);
        let detail = detail_element.last().ok_or(anyhow!("playlist title is None"))?;
        let cover_img_url = image.value().attr("src").unwrap().replace("140y140", "512y512");
        let title = detail.value().attr("title").unwrap().to_string();
        let id = detail.value().attr("href").unwrap().to_string().split("=").collect::<Vec<&str>>()[1].to_string();
        
        let source_url: String = format!("https://music.163.com/#/playlist?id={}", id);
        let id_u8 = format!("neplaylist_{}", id);
        let custom_album = CustomAlbum::new(id_u8, cover_img_url, source_url, title);
        custom_album_list.push(custom_album);
    }
    return Ok(custom_album_list);
}

/// 自定义专辑详情
pub async fn ne_custom_album_detail(params : NeteaseParam) -> Result<CustomAlbumDetail> {
    // 构建cookie client
    let client = client_build_with_cookie(&params)?;

    // 获取歌单详情
    let uri: String = String::from("https://music.163.com/weapi/v3/playlist/detail");
    let mut form = HashMap::new();
    form.insert("params", params.params.unwrap());
    form.insert("encSecKey", params.enc_sec_key.unwrap());
    let resp = client.post(uri).form(&form).send().await?;
    let resp_text = resp.text().await?;
    let netease_http_response: NeteaseHttpResponse = serde_json::from_str(&resp_text)?;

    let playlist_resp = netease_http_response.playlist.unwrap();
    let id = params.list_id.unwrap();
    let cover_img_url = playlist_resp.cover_img_url;
    let title = playlist_resp.name;

    let source_url = format!("https://music.163.com/#/playlist?id={}", id.split("_").collect::<Vec<&str>>()[1].to_string());

    let track_ids_array = playlist_resp.track_ids;
    let mut track_ids = Vec::new();
    for track_value in track_ids_array {
        track_ids.push(track_value.id);
    }
    let detail = CustomAlbumDetail::new(id, cover_img_url, source_url, title, track_ids);
    return Ok(detail);
}

/// netease 自定义专辑playlist
pub async fn ne_custom_album_playlist(params : NeteaseParam) -> Result<Vec<Song>> {
    // 构建cookie client
    let client = client_build_with_cookie(&params)?;

    // 获取歌单详情
    let uri: String = String::from("https://music.163.com/weapi/v3/song/detail");
    let mut form = HashMap::new();
    form.insert("params", params.params.unwrap());
    form.insert("encSecKey", params.enc_sec_key.unwrap());
    let resp = client.post(uri).form(&form).send().await?;
    let resp_text = resp.text().await?;
    println!("resp is {}", resp_text);
    let resp: NeteaseHttpResponse = serde_json::from_str(&resp_text).unwrap();
    
    let mut songs_vo = Vec::new();
    for song in resp.songs.unwrap() {
        
        let id = format!("netrack_{}", song.id);
        let title = song.name;
        let artist = format!("{}", song.ar[0].name);
        let artist_id = format!("neartist_{}", song.ar[0].id);
        let album = song.al.name;
        let album_id = format!("nealbum_{}", song.al.id);
        let source = String::from("netease");
        let source_url = format!("https://music.163.com/#/song?id={}", song.id);
        let img_url = song.al.pic_url;
        let song_vo = Song::new(id, title, artist, artist_id, album, album_id, source, source_url, img_url);
        songs_vo.push(song_vo);
    }
    Ok(songs_vo)

}


/// 网易云 获取源播放地址
pub async fn ne_bootsrap_track(params : NeteaseParam) -> Result<Track> {
    let client = reqwest::ClientBuilder::new().build()?;
    // 构建cookie client
    // let client = client_build_with_cookie(&params)?;

    // 获取源地址
    let uri: String = String::from("https://interface3.music.163.com/eapi/song/enhance/player/url");
    let mut form = HashMap::new();
    form.insert("params", params.params.unwrap());
    let resp = client.post(uri).form(&form).send().await?;

    let resp_text = resp.text().await?;
    println!("resp is {}", resp_text);
    let resp: NeteaseHttpResponse = serde_json::from_str(&resp_text)?;

    let mut tracks = resp.data.unwrap();
    let track = tracks.pop().unwrap();

    let track = Track::new(track.url.unwrap(), track.br.unwrap());
    Ok(track)

}

pub async fn ne_lyric(params : NeteaseParam) -> Result<String> {
    let client = reqwest::ClientBuilder::new().build()?;

    let uri: String = String::from("https://music.163.com/weapi/song/lyric?csrf_token=");
    let mut form = HashMap::new();
    form.insert("params", params.params.unwrap());
    form.insert("encSecKey", params.enc_sec_key.unwrap());

    let resp = client.post(uri).form(&form).send().await?;

    let resp_text = resp.text().await?;
    println!("{}", resp_text);
    let josn_str:Value = serde_json::from_str(resp_text.as_str())?;
    let lyric = josn_str["lrc"]["lyric"].as_str().unwrap();
   
    Ok(String::from(lyric))
}


fn client_build_with_cookie(params : &NeteaseParam) -> Result<Client> {
    // 构建cookie
    let str_for = format!("_ntes_nuid={};_ntes_nnid={}"
        , params._ntes_nuid.clone().ok_or(anyhow!("_ntes_nuid can not is None"))?
        , params._ntes_nnid.clone().ok_or(anyhow!("_ntes_nnid can not is None"))?);
    let cookie_str = str_for.as_str();
    let mut request_headers = HeaderMap::new();
    request_headers.insert(
        header::COOKIE, 
        header::HeaderValue::from_str(cookie_str)?
    );
    
    let client = reqwest::ClientBuilder::new()
        .default_headers(request_headers).cookie_store(true).build()?;

    return Ok(client);
}


#[derive(Deserialize, Debug)]
pub struct NeteaseParam {
    // playlist 
    order: Option<String>,
    offset: Option<u8>,
    limit: Option<u8>,
    cat: Option<String>,
    // ne playlist detail
    list_id: Option<String>,
    params: Option<String>,
    enc_sec_key: Option<String>,
    _ntes_nuid: Option<String>,
    _ntes_nnid: Option<String>,

}


#[derive(Debug, Deserialize)]
struct NeteaseHttpResponse {
    code: u8,
    playlist: Option<PlaylistResponse>,
    songs: Option<Vec<SongDetailResponse>>,
    data: Option<Vec<TrackResponse>>,
}

#[derive(Debug, Deserialize)]
struct PlaylistResponse {
    id: usize,
    #[serde(alias = "coverImgUrl")]
    cover_img_url: String,
    name: String,
    #[serde(alias = "trackIds")]
    track_ids: Vec<TrackResponse>
}

#[derive(Debug, Deserialize)]
struct TrackResponse {
    id: usize,
    url: Option<String>,
    br: Option<usize>,
}

/// 歌曲信息
#[derive(Debug, Deserialize)]
struct SongDetailResponse {
    id: usize,
    name: String,
    al: SongAlResponse,
    ar: Vec<SongArResponse>,
}
/// 专辑信息
#[derive(Debug, Deserialize)]
struct SongAlResponse {
    id: usize,
    name: String,
    #[serde(alias = "picUrl")]
    pic_url: String,
}
/// 歌手信息
#[derive(Debug, Deserialize)]
struct SongArResponse {
    id: usize,
    name: String,
}



