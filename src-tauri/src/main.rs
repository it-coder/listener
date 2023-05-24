// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use listener::provider::netease::{NeteaseParam, SongList, SongListDetail, netease_playlist, netease_ne_playlist_detail};
#[tauri::command]
fn play_list_api(params : NeteaseParam) -> Vec<SongList> {
    return netease_playlist(params).unwrap();
}
#[tauri::command]
fn ne_play_list_api(params : NeteaseParam) -> SongListDetail {
    println!("{:#?}", params);
    return netease_ne_playlist_detail(params).unwrap();
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![play_list_api, ne_play_list_api])
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

