
use std::error::Error;
use std::collections::HashMap;

use scraper::{Html, Selector};
use serde::{Deserialize, Serialize, Deserializer};
use serde_json::Value;
use reqwest::{header, header::HeaderMap};


/// playlist api
pub fn netease_playlist(params : NeteaseParam) -> Result<Vec<SongList>, Box<dyn Error>> {
    let mut uri = "https://music.163.com/discover/playlist/?order=".to_string();
    uri.push_str(params.order.unwrap_or_else(|| "hot".to_string()).as_str());
    // TODO other param handle


    let resp = reqwest::blocking::get(uri).unwrap_or_else(| err | {
        panic!("netease_playlist error is {}", err);
    });
    let text = resp.text()?;

    let fragment = Html::parse_fragment(&text);
    let li_selector = Selector::parse("ul.m-cvrlst li").unwrap();


    let image_selector = Selector::parse("div.u-cover img").unwrap();

    let detail_selector = Selector::parse("div.u-cover a.msk").unwrap();

    let mut play_list: Vec<_> = Vec::new();
    for li_element in fragment.select(&li_selector) {
        let image_element = li_element.select(&image_selector);
        let image = image_element.last().unwrap();
        println!("{:?}", image.value().attr("src").unwrap());
       

        let detail_element = li_element.select(&detail_selector);

        let detail = detail_element.last().unwrap();
        println!("{:?}", detail.value().attr("href").unwrap());
        println!("{:?}", detail.value().attr("title").unwrap());
        let cover_img_url = image.value().attr("src").unwrap().replace("140y140", "512y512");
        let title = detail.value().attr("title").unwrap().to_string();
        let id = detail.value().attr("href").unwrap().to_string().split("=").collect::<Vec<&str>>()[1].to_string();
        
        let mut source_url = String::from("https://music.163.com/#/playlist?id=");
        source_url.push_str(&id);
        let mut id_u8 = String::from("neplaylist_");
        id_u8.push_str(&id);
        
        let song = SongList::new(cover_img_url, id_u8, source_url, title);
        println!("song is {:#?}", song);
        play_list.push(song);
    }
    return Ok(play_list);

    
}

/// 歌单detail
pub fn netease_ne_playlist_detail(params : NeteaseParam) -> Result<SongListDetail, Box<dyn Error>> {
    // 构建cookie
    let str_for = format!("_ntes_nuid={};_ntes_nnid={}", params._ntes_nuid.unwrap(), params._ntes_nnid.unwrap());
    let cookie_str = str_for.as_str();
    let mut request_headers = HeaderMap::new();
    request_headers.insert(
        header::COOKIE, 
        header::HeaderValue::from_str(cookie_str)?
    );
    
    let client = reqwest::blocking::ClientBuilder::new()
        .default_headers(request_headers).cookie_store(true).build().unwrap();

    // 获取歌单详情
    let uri: String = "https://music.163.com/weapi/v3/playlist/detail".to_string();
    let mut form = HashMap::new();
    form.insert("params", params.params.unwrap());
    form.insert("encSecKey", params.enc_sec_key.unwrap());
    let resp = client.post(uri).form(&form).send().unwrap();
    let resp_text = resp.text().unwrap();
    println!("resp is {}", resp_text);
    let netease_http_response: NeteaseHttpResponse = serde_json::from_str(&resp_text).unwrap();

    let playlist_resp = netease_http_response.playlist.unwrap();
    let id = params.list_id.unwrap();
    let cover_img_url = playlist_resp.cover_img_url;
    let title = playlist_resp.name;
    let mut source_url = "https://music.163.com/#/playlist?id=".to_string();
    let list_id = id.split("_").collect::<Vec<&str>>()[1].to_string();
    source_url.push_str(&list_id);
    let track_ids_array = playlist_resp.track_ids;
    let mut track_ids = Vec::new();
    for track_value in track_ids_array {
        track_ids.push(track_value.id);
    }
    let detail = SongListDetail {
        id,
        cover_img_url,
        title,
        source_url,
        track_ids,
    };
    return Ok(detail);
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

/// 歌单model
#[derive(Debug, Serialize)]
pub struct SongList {
    cover_img_url: String,
    id: String,
    source_url: String,
    title: String,
}

impl SongList {
    fn new(cover_img_url: String, id: String, source_url: String, title: String) -> Self {
        SongList {
            cover_img_url,
            id,
            source_url,
            title,
        }
    }
}

/// 歌单详情moedel
#[derive(Debug, Serialize)]
pub struct SongListDetail {
    id: String,
    cover_img_url: String,
    title: String,
    source_url: String,
    track_ids: Vec<String>,
}


#[derive(Debug, Deserialize)]
struct NeteaseHttpResponse {
    code: u8,
    playlist: Option<PlaylistResponse>,
}

#[derive(Debug, Deserialize)]
struct PlaylistResponse {
    #[serde(deserialize_with = "deserialize_number_to_string")] 
    id: String,
    #[serde(alias = "coverImgUrl")]
    cover_img_url: String,
    name: String,
    #[serde(alias = "trackIds")]
    track_ids: Vec<TrackIdResponse>
}

#[derive(Debug, Deserialize)]
struct TrackIdResponse {
    #[serde(deserialize_with = "deserialize_number_to_string")] 
    id: String,
}

fn deserialize_number_to_string<'de, D>(deserializer: D) -> Result<String, D::Error>
where
    D: Deserializer<'de>,
{           
    let v: Value = Deserialize::deserialize(deserializer)?;
    if v.is_number() {
        let r= v.to_string();
        Ok(r)
    } else {
        Ok("".to_string())
    }
}


