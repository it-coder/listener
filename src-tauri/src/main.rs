// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn play_list_api(config : NeteaseConfig) -> Vec<SongList> {
    return netease_playlist(config);
}
use reqwest::{cookie::Jar, header, header::HeaderMap};
use serde_json::{Value};
#[tauri::command]
fn ne_play_list_api(params: String, enc_sec_key: String, _ntes_nuid: String, _ntes_nnid: String) -> String {
    println!("params is {} ;{}; {}; {}",params, enc_sec_key, _ntes_nuid, _ntes_nnid);
    let str_for = format!("_ntes_nuid={};_ntes_nnid={}", _ntes_nuid, _ntes_nnid);
    let cookie_str = str_for.as_str();
    
    let mut request_headers = HeaderMap::new();
    request_headers.insert(
        header::COOKIE, 
        header::HeaderValue::from_str(cookie_str).unwrap()
    );
    
    let client = reqwest::blocking::ClientBuilder::new()
        .default_headers(request_headers).cookie_store(true).build().unwrap();

    let uri: String = "https://music.163.com/weapi/v3/playlist/detail".to_string();
    let mut form = HashMap::new();
    form.insert("params", params);
    form.insert("encSecKey", enc_sec_key);
    let resp = client.post(uri).form(&form).send().unwrap();
    let resp_text = resp.text().unwrap();
    let neteaseHttpResponse: NeteaseHttpResponse = serde_json::from_str(&resp_text).unwrap();

    let playlistResp = neteaseHttpResponse.playlist.unwrap();
    let cover_img_url = playlistResp.cover_img_url;
    let title = playlistResp.name;
    let source_url = "https://music.163.com/#/playlist?id=".to_string().push_str("c");
    let track_ids_array = playlistResp.track_ids;
    let mut track_ids = Vec::new();
    for track_value in track_ids_array {
        track_ids.push(track_value.id);
    }


    return "success".to_string();
}


fn main() {
    // tauri::Builder::default()
    //     .invoke_handler(tauri::generate_handler![play_list_api, ne_play_list_api])
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");

    // let config = NeteaseConfig{
    //     order: None,
    //     offset: None,
    //     limit: None,
    //     cat: None,
    // };
    // netease_playlist(config);

    let str = r#"{
        "code": 200,
        "adType": 0
    }"#;
    let obj: NeteaseHttpResponse = serde_json::from_str(str).unwrap();
    println!("{:?}", obj);

}

use std::collections::HashMap;

use scraper::{Html, Selector};
use serde::{Deserialize, Serialize};
fn netease_playlist(config : NeteaseConfig) -> Vec<SongList> {
    let mut uri = "https://music.163.com/discover/playlist/?order=".to_string();
    uri.push_str(config.order.unwrap_or_else(|| "hot".to_string()).as_str());


    let resp = reqwest::blocking::get(uri).unwrap_or_else(| err | {
        panic!("show_playlist error is {}", err);
    });
    let text = resp.text().unwrap();

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
    return play_list;

    
}


#[derive(Deserialize, Debug)]
struct NeteaseConfig {
    order: Option<String>,
    offset: Option<u8>,
    limit: Option<u8>,
    cat: Option<String>,
}

#[derive(Debug, Serialize)]
struct SongList {
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


#[derive(Debug, Deserialize)]
struct NeteaseHttpResponse {
    code: u8,
    playlist: Option<PlaylistResponse>,
}

#[derive(Debug, Deserialize)]
struct PlaylistResponse {
    id: String,
    cover_img_url: String,
    name: String,
    track_ids: Vec<TrackIdResponse>
}

#[derive(Debug, Deserialize)]
struct TrackIdResponse {
    id: String,
}