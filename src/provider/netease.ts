import * as forge from "node-forge";
import { invoke } from '@tauri-apps/api/tauri';

export class Netease {

      private static _create_secret_key(size: number) : string {
            const result = [];
            const choice = '012345679abcdef'.split('');
            for (let i = 0; i < size; i += 1) {
                  const index = Math.floor(Math.random() * choice.length);
                  result.push(choice[index]);
            }
            return result.join('');
      }
            
      private static _aes_encrypt(text: string, sec_key: string, algo: string) : forge.util.ByteStringBuffer {
            const cipher = forge.cipher.createCipher(algo as forge.cipher.Algorithm, sec_key as forge.Bytes);
            cipher.start({ iv: '0102030405060708' });
            cipher.update(forge.util.createBuffer(text as forge.Bytes));
            cipher.finish();
            
            return cipher.output;
      }
            
      private static _rsa_encrypt(text: string, pubKey: string, modulus: string) : string {
            text = text.split('').reverse().join(''); // eslint-disable-line no-param-reassign
            const n = new forge.jsbn.BigInteger(modulus, 16);
            const e = new forge.jsbn.BigInteger(pubKey, 16);
            const b = new forge.jsbn.BigInteger(forge.util.bytesToHex(text), 16);
            const enc = b.modPow(e, n).toString(16).padStart(256, '0');
            return enc;
      }
            
      private static weapi(text: object)  : object {
            const modulus =
                  '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b72' +
                  '5152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbd' +
                  'a92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe48' +
                  '75d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
            const nonce = '0CoJUm6Qyw8W8jud';
            const pubKey = '010001';
            const text_str = JSON.stringify(text); // eslint-disable-line no-param-reassign
            const sec_key = this._create_secret_key(16);
            const enc_text = btoa(
                  this._aes_encrypt(
                  btoa(this._aes_encrypt(text_str, nonce, 'AES-CBC').data),
                  sec_key,
                  'AES-CBC'
                  ).data
            );
            const enc_sec_key = this._rsa_encrypt(sec_key, pubKey, modulus);
            const data = {
                  params: enc_text,
                  enc_sec_key: enc_sec_key,
            };
            
            return data;
      }

      // refer to https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/util/crypto.js
      private static eapi(url:string, obj: object) :object {
            const eapiKey = 'e82ckenh8dichen8';
      
            const text = typeof obj === 'object' ? JSON.stringify(obj) : obj;
            const message = `nobody${url}use${text}md5forencrypt`;
            const digest = forge.md5
                  .create()
                  .update(forge.util.encodeUtf8(message))
                  .digest()
                  .toHex();
            const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`;
      
            return {
                  params: this._aes_encrypt(data, eapiKey, 'AES-ECB').toHex().toUpperCase(),
            };
      }

      private static ne_get_playlist(id: string) : object {
            const d = {
                  id: id,
                  offset: 0,
                  total: true,
                  limit: 1000,
                  n: 1000,
                  csrf_token: '',
            };
            const data = this.weapi(d);
            return data;
      }

      private static cookie_build() : object {
            const domain = 'https://music.163.com';
            const nuidName = '_ntes_nuid';
            const nnidName = '_ntes_nnid';
            const nuidValue = this._create_secret_key(32);
            const nnidValue = `${nuidValue},${new Date().getTime()}`;
            // netease default cookie expire time: 100 years
            const expire =
            (new Date().getTime() + 1e3 * 60 * 60 * 24 * 365 * 100) / 1000;
            return {
                  "_ntes_nuid": nuidValue,
                  "_ntes_nnid": nnidValue
            };
      }

      private static get_encrypt_params(list_id: string) : object {
            const list_type = list_id.split("_")[0];
            const id = list_id.split("_")[1];
            switch (list_type) {
                  case 'neplaylist':
                    return this.ne_get_playlist(id);
                  case 'nealbum':
                    return {};//this.ne_album(list_id);
                  case 'neartist':
                    return {};//this.ne_artist(list_id);
                  default:
                    return {};
            }
      }

      public static async test_netease() {
            let albums = await this.custom_album_list_api();
            console.log("test_netease[albums]:", albums)

            let customAlbumDetail = await this.ne_album_list_detail_api(albums[0].id);
            console.log("test_netease[customAlbumDetail]:", customAlbumDetail)

            this.ne_bootstrap_track(customAlbumDetail.songs[0]);
            console.log("test_netease[track]:")

            this.ne_lyric({id: "423406145"})


      }
      /**
       * 获取自定义专辑
       * @returns 自定义专辑列表
       */
      public static async custom_album_list_api() : Promise<CustomAlbum[]> {
            console.log("custom_album_list_api")
            let rs = await invoke<Array<CustomAlbum>>(TauriApi.CUSTOM_ALBUM_LIST_API, {params : {order:"hot"}});
            return rs;
      }
      /**
       * 获取歌单详细信息
       * @param list_id 专辑id(example: neCustomAlbum_2075587022)
       * @returns 
       */
      public static async ne_album_list_detail_api(list_id: string) : Promise<CustomAlbumDetail> {
            const encrypt_params = this.get_encrypt_params(list_id);
            const cookie = this.cookie_build();

            let resp = await invoke<CustomAlbumDetail>(TauriApi.NE_CUSTOM_ALBUM_DETAIL_API, 
                  { params : {list_id, ...encrypt_params, ...cookie} });
                 
            let songs = await this.ne_parse_playlist_tracks(resp.track_ids, cookie);
            resp.songs = songs;
            return resp;
      }
      /**
       * 获取歌单中playlist
       * @param playlist_tracks 
       * @param encrypt_params 
       * @param cookie 
       */
      static async ne_parse_playlist_tracks(playlist_tracks: Array<string>, cookie: object): Promise<Array<Song>> {
            const track_ids = playlist_tracks;
            const d = {
              c: `[${track_ids.map((id) => `{"id":${id}}`).join(',')}]`,
              ids: `[${track_ids.join(',')}]`,
            };
            const data = this.weapi(d);
            let resp = await invoke<Array<Song>>(TauriApi.NE_CUSTOM_ALBUM_PLAYLIST_API, { params : {...data, ...cookie}} )
            return resp;
     
      }

      /**
       * 解析歌曲详情 获取播放地址
       * @param track 歌曲详情
       */
      public static async ne_bootstrap_track(track: Song) {
            const sound = {};
            const target_url = `https://interface3.music.163.com/eapi/song/enhance/player/url`;
            let song_id = track.id;
            const eapiUrl = '/api/song/enhance/player/url';

            song_id = song_id.slice('netrack_'.length);

            const d = {
                  ids: `[${song_id}]`,
                  br: 999000,
            };
            const data = this.eapi(eapiUrl, d);

            let song = await invoke<Song>(TauriApi.NE_BOOTSRAP_TRACK_API, { params : {...data}} )
            console.log(song)

      }

      public static async ne_lyric(track: Song) {
            const track_id = track.id;
            // use chrome extension to modify referer.
            const target_url = 'https://music.163.com/weapi/song/lyric?csrf_token=';
            const csrf = '';
            const d = {
                  id: track_id,
                  lv: -1,
                  tv: -1,
                  csrf_token: csrf,
            };
            const data = this.weapi(d);
            let res_data:object = await invoke(TauriApi.NE_LYRIC_API, { params : {...data}} ) 
            console.log(res_data)

           
      }

}


// tauri provider api
enum TauriApi {
      // 歌单api
      CUSTOM_ALBUM_LIST_API = "custom_album_list_api",
      // 歌单详情api
      NE_CUSTOM_ALBUM_DETAIL_API = "ne_custom_album_detail_api",
      // 歌曲列表api
      NE_CUSTOM_ALBUM_PLAYLIST_API = "ne_custom_album_playlist_api",
      // 源播放地址
      NE_BOOTSRAP_TRACK_API  = "ne_bootsrap_track_api",
      // lyric
      NE_LYRIC_API = "ne_lyric_api",

}
