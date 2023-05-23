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
                  encSecKey: enc_sec_key,
            };
            
            return data;
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

      private static cookei_build() : object {
            const domain = 'https://music.163.com';
            const nuidName = '_ntes_nuid';
            const nnidName = '_ntes_nnid';
            const nuidValue = this._create_secret_key(32);
            const nnidValue = `${nuidValue},${new Date().getTime()}`;
            // netease default cookie expire time: 100 years
            const expire =
            (new Date().getTime() + 1e3 * 60 * 60 * 24 * 365 * 100) / 1000;
            return {
                  "ntesNuid": nuidValue,
                  "ntesNnid": nnidValue
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
      // song list api
      public static play_list_api() : Array<object> {
            invoke('play_list_api', {config : {order:"hot"}})
            .then((resp) => {
                  console.log(resp)
                  return resp;
            });
            return [];
      }
      // get playlist api of song_list
      public static ne_playlist_api(list_id: string) : object {
            const encrypt_params = this.get_encrypt_params(list_id);
            console.log(encrypt_params);

            const cookie = this.cookei_build();
            console.log(cookie);

            invoke('ne_play_list_api', {...encrypt_params, ...cookie})
                  .then((resp) => {
                        console.log(resp)
                        return resp;
                  });
            return {};
      }

}

