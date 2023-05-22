// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    // tauri::Builder::default()
    //     .invoke_handler(tauri::generate_handler![greet])
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");

    neteaseTest();
}

use scraper::{Html, Selector};
fn neteaseTest() {
    let uri = "https://music.163.com/discover/playlist/".to_string();
    let resp = reqwest::blocking::get(uri).unwrap_or_else(| err | {
        panic!("show_playlist error is {}", err);
    });
    let text = resp.text().unwrap();

    let fragment = Html::parse_fragment(&text);
    let liSelector = Selector::parse("ul.m-cvrlst li").unwrap();


    let imageSelector = Selector::parse("div.u-cover img").unwrap();

    let detailSelector = Selector::parse("div.u-cover a.msk").unwrap();


    for liElement in fragment.select(&liSelector) {
        let imageElement = liElement.select(&imageSelector);
        let image = imageElement.last().unwrap();
        println!("{:?}", image.value().attr("src").unwrap());
        // imageElement.for_each(|x|  {
        //     println!("{:?}", x.value().attr("src").unwrap());

        // });

        let detailElement = liElement.select(&detailSelector);

        let detail = detailElement.last().unwrap();
        println!("{:?}", detail.value().attr("href").unwrap());
        println!("{:?}", detail.value().attr("title").unwrap());

        // detailElement.for_each(|x| {
        //     println!("{:?}", x.value().attr("href").unwrap());
        //     println!("{:?}", x.value().attr("title").unwrap());

        // });

    }

    
}
