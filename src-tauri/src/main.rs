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

    netease_test();
}

use scraper::{Html, Selector};
fn netease_test() {
    let uri = "https://music.163.com/discover/playlist/".to_string();
    let resp = reqwest::blocking::get(uri).unwrap_or_else(| err | {
        panic!("show_playlist error is {}", err);
    });
    let text = resp.text().unwrap();

    let fragment = Html::parse_fragment(&text);
    let li_selector = Selector::parse("ul.m-cvrlst li").unwrap();


    let image_selector = Selector::parse("div.u-cover img").unwrap();

    let detail_selector = Selector::parse("div.u-cover a.msk").unwrap();


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
    }

    
}

#[derive(Debug)]
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
