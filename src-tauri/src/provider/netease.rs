
struct NeteaseMusic {
    order: String,
    cat: String,
    limit: u8,
    offset: u8,
}

impl NeteaseMusic {
    fn new(order: Option<String>, cat: Option<String>, limit: Option<u8>, offset: Option<u8>) -> Self {
        NeteaseMusic {
            order: order.unwrap_or_else(|| "hot".to_string()),
            cat: cat.unwrap(),
            limit: limit.unwrap(),
            offset: offset.unwrap()
        }
    }

    pub fn show_playlist(self) -> String {
        
        let uri = "https://music.163.com/discover/playlist/".to_string();
        let resp = reqwest::blocking::get(uri).unwrap_or_else(| err | {
            panic!("show_playlist error is {}", err);
        });
        let text = resp.text().unwrap();
    
        return text;
    }
}


