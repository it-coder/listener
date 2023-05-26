// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use listener::provider::netease::{NeteaseParam, CustomAlbum, SongListDetail, SongTrack};
use listener::provider::netease::{test, ne_custom_album_list, netease_ne_playlist_detail,netease_ne_song_detail};
use std::error::Error;
/// 异常测试TODO
#[tauri::command]
fn test_api(params : NeteaseParam) -> Result<(), String> {
    test(params);
    return Ok(());
}

/// 获取自定义专辑
#[tauri::command]
fn custom_album_list_api(params : NeteaseParam) -> Vec<CustomAlbum> {
    return ne_custom_album_list(params).unwrap();
}
#[tauri::command]
fn ne_play_list_api(params : NeteaseParam) -> SongListDetail {
    println!("{:#?}", params);
    return netease_ne_playlist_detail(params).unwrap();
}

#[tauri::command]
fn ne_song_detail_api(params : NeteaseParam) -> Vec<SongTrack>{
    println!("{:#?}", params);
    return netease_ne_song_detail(params).unwrap();
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![test_api, custom_album_list_api, ne_play_list_api,ne_song_detail_api])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    // let config = NeteaseConfig{
    //     order: None,
    //     offset: None,
    //     limit: None,
    //     cat: None,
    // };
    // netease_playlist(config);

    

}

