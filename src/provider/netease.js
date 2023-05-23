class netease {
      static _create_secret_key(size) {
            const result = [];
            const choice = '012345679abcdef'.split('');
            for (let i = 0; i < size; i += 1) {
                  const index = Math.floor(Math.random() * choice.length);
                  result.push(choice[index]);
            }
            return result.join('');
      }
            
      static _aes_encrypt(text, sec_key, algo) {
            const cipher = forge.cipher.createCipher(algo, sec_key);
            cipher.start({ iv: '0102030405060708' });
            cipher.update(forge.util.createBuffer(text));
            cipher.finish();
            
            return cipher.output;
      }
            
      static _rsa_encrypt(text, pubKey, modulus) {
            text = text.split('').reverse().join(''); // eslint-disable-line no-param-reassign
            const n = new forge.jsbn.BigInteger(modulus, 16);
            const e = new forge.jsbn.BigInteger(pubKey, 16);
            const b = new forge.jsbn.BigInteger(forge.util.bytesToHex(text), 16);
            const enc = b.modPow(e, n).toString(16).padStart(256, '0');
            return enc;
      }
            
      static weapi(text) {
            const modulus =
                  '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b72' +
                  '5152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbd' +
                  'a92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe48' +
                  '75d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
            const nonce = '0CoJUm6Qyw8W8jud';
            const pubKey = '010001';
            text = JSON.stringify(text); // eslint-disable-line no-param-reassign
            const sec_key = this._create_secret_key(16);
            const enc_text = btoa(
                  this._aes_encrypt(
                  btoa(this._aes_encrypt(text, nonce, 'AES-CBC').data),
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
}