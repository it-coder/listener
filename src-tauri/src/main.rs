// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use listener::provider::netease::{ NeteaseParam };
use listener::provider::view::{CustomAlbum, CustomAlbumDetail, Song, Track};
use listener::provider::netease::{test_ne, ne_custom_album_list, ne_custom_album_detail, ne_custom_album_playlist, ne_bootsrap_track, ne_lyric};
use anyhow::{anyhow, Context, Result, bail};
use serde::Deserialize;
use serde_json::Value;

/// 异常测试TODO
#[tauri::command]
fn test_api(params : NeteaseParam) -> Result<CustomAlbum, String> {
    // let rs = test_ne(params);
    let cs = CustomAlbum::new("id".to_string(), "cover_img_url".to_string(), "source_url".to_string(), "title".to_string());
    Ok(cs)
    
}

fn exception_handle<T>(result: Result<T>) -> Result<T, String> {
    match result {
        Ok(v) => Ok(v),
        Err(ref error) => {
            let mut msg = String::from("error : ");
            for i in error.chain() {
                msg.push_str(format!("{} {}", i, "\n").as_str());
            }
            return Err(msg);
        },
    }
}

/// 获取自定义专辑
/// # params example
/// ``` json
/// { "params" : {"order": "hot"}}
/// ```
#[tauri::command]
async fn custom_album_list_api(params : NeteaseParam) -> Result<Vec<CustomAlbum>, String> {
    let rs = ne_custom_album_list(params).await;
    exception_handle(rs)
}



/// 通过id获取自定义专辑详情
#[tauri::command]
async fn ne_custom_album_detail_api(params : NeteaseParam) -> Result<CustomAlbumDetail, String> {
    let rs = ne_custom_album_detail(params).await;
    exception_handle(rs)
}

/// 自定义专辑playlist
#[tauri::command]
async fn ne_custom_album_playlist_api(params : NeteaseParam) -> Result<Vec<Song>, String>{
    let rs = ne_custom_album_playlist(params).await;
    exception_handle(rs)
}

/// 解析源播放地址
#[tauri::command]
async fn ne_bootsrap_track_api(params : NeteaseParam) -> Result<Track, String>{
    let rs = ne_bootsrap_track(params).await;
    exception_handle(rs)
}
/// 歌词
#[tauri::command]
async fn ne_lyric_api(params : NeteaseParam) -> Result<String, String>{
    let rs = ne_lyric(params).await;
    exception_handle(rs)
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![test_api, custom_album_list_api, ne_custom_album_detail_api
            , ne_custom_album_playlist_api, ne_bootsrap_track_api, ne_lyric_api])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    // let resp_text = r#"
    //     {
    //         "data": {
    //             "name":"lihang"
    //         }
    //     }
    // "#;

    // use serde_json::json;
    
    
    // let josn_str:Value = serde_json::from_str(resp_text).unwrap();

    // println!("{:?}", josn_str["data"]["name"].as_str().unwrap());


}
