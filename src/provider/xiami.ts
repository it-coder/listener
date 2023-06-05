
import { AbsChannel } from "./absChannel";

import  client from '../server'

export class Xiami extends AbsChannel {
    async get_playlist_filters(): Promise<any> {
        
        return  {}
    }

}