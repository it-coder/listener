import React, {useState, useEffect, useImperativeHandle, forwardRef} from "react"
import { getChannelInstanceById } from '../provider/channelProvider'
import { AbsChannel } from "../provider/absChannel"

interface IProps {
    albumRef:any
}


const Filter = (props: IProps, ref:any) => {
    const { albumRef } = props
    const [filterList, setFilterList] = useState([])
    const [filterId, setFilterId] = useState()

 
    useImperativeHandle(ref, () => ({
        init: (channelId: any) => {
            console.log('Filter init ')
            const channel : AbsChannel = getChannelInstanceById(channelId)
            channel.get_playlist_filters().then((resp) => {
                const {recommend, all} = resp;
                setFilterList(recommend);
                const filterId = recommend[0].id
                setFilterId(filterId)
                // 初始化 歌单
                onToggleFilter(filterId)
            });
        }
    }));

    useEffect(() => {
        console.log('filter')
    })

    const onToggleFilter = (filterId: any) => {
        setFilterId(filterId)

        const channelId = localStorage.getItem('channelId')
        albumRef?.current.init(channelId, filterId)
    }

    return (
        <div className="playlist-filter">
            {
                filterList?.map((filter:any, index) => {
                    return (
                        <div
                            key={filter.id}
                            className={["l1-button filter-item", filter.id === filterId?'active':''].join(' ')}
                            onClick={() => {
                                onToggleFilter(filter.id)
                            }}
                        >
                            {filter.name}
                        </div>
                    );
                })
            }
            <div
                className="l1-button filter-item"
                ng-show="playlistFilters[tab] && playlistFilters[tab].length > 0"
                ng-click="toggleMorePlaylists()"
                ng-class="{'active':showMore}"
                >
                更多...  
            </div>
      </div>
    );
}

export default forwardRef(Filter);