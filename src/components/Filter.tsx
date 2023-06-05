import React, {useState, useImperativeHandle, forwardRef} from "react"
import { getChannelById } from '../provider/channelProvider'
import { AbsChannel } from "../provider/absChannel"

interface IProps {
    onToggleFilter: ToggleFilter
}

interface FilterObj {
    id: string
    name: string
}

const Filter = (props: IProps, ref:any) => {
    const { onToggleFilter } = props;

    const [filterList, setFilterList] = useState([])
    const [filterId, setFilterId] = useState()

     useImperativeHandle(ref, () => ({
        changeChannel: (channelId: any) => {
           const channel : AbsChannel = getChannelById(channelId)
           channel.get_playlist_filters().then((resp) => {
                const {recommend, all} = resp;
                setFilterList(recommend);
                setFilterId(recommend[0].id)
           });

           
        }
    }));

    return (
        <div className="playlist-filter">
            {
                filterList?.map((filter:any, index) => {
                    return (
                        <div
                            key={filter.id}
                            className={["l1-button filter-item", filter.id === filterId?'active':''].join(' ')}
                            onClick={() => {
                                setFilterId(filter.id)
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