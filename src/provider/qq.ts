
import { Channel } from "./channel";

import client from "../server";

export class QQ extends Channel {

    
    private htmlDecode(value: string): any {
        const parser = new DOMParser();
        return parser.parseFromString(value, 'text/html').body.textContent;
    }

    public get_playlist_filters(): any {
        console.log('2222');
        const axios = client;
        const target_url =
            'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg' +
            `?picmid=1&rnd=${Math.random()}&g_tk=732560869` +
            '&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8' +
            '&notice=0&platform=yqq.json&needNewCode=0';
            console.log('333');
            axios.get(target_url)
        async () => {
            console.log('1111');
            const response = await axios.get(target_url)
            
            const { data } = response;
            const all: any = [];
            data.data.categories.forEach((cate:any) => {
                const result:any = { category: cate.categoryGroupName, filters: [] };
                if (cate.usable === 1) {
                    cate.items.forEach((item:any) => {
                        result.filters.push({
                            id: item.categoryId,
                            name: this.htmlDecode(item.categoryName),
                        });
                    });
                    all.push(result);
                }
            });
            const recommendLimit = 8;
            const recommend = [
                { id: '', name: '全部' },
                { id: 'toplist', name: '排行榜' },
                ...all[1].filters.slice(0, recommendLimit),
            ];
        
            return  { recommend, all };
        }

        return  { };
    
    }
}