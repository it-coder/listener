import { Netease } from "./netease";
import { QQ } from "./qq";
import { Xiami } from "./xiami";


const PROVIDERS = [
  {
    name: 'netease',
    displayText: '网易云音乐',
    instance: new Netease,
    searchable: true,
    support_login: true,
    id: 'ne',
  },
  {
    name: 'xiami',
    displayText: '虾米音乐',
    instance: new Xiami,
    searchable: false,
    hidden: true,
    support_login: false,
    id: 'xm',
  },
  {
    name: 'qq',
    displayText: 'QQ音乐',
    instance: new QQ,
    searchable: true,
    support_login: true,
    id: 'qq',
  }
];


export function getChannelInstanceById(sourceId:string): any {
    return (PROVIDERS.find((i) => i.id === sourceId) || {}).instance;
}

export function getDefaultChannel(): any {
  return (PROVIDERS[0] || {});
}


export function getAllChannel(): any {
    return PROVIDERS.filter((i) => !i.hidden).map((i) => i);
  }

  
  
