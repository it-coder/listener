
interface IProps {
    filterList?: Array<FilterObj>
}

interface FilterObj {
    id: string
    name: string
}

const Filter = (props: IProps) => {
    const { filterList } = props;
    return (
        <div className="playlist-filter">
            {
                filterList?.map((filter, index) => {
                    return (
                        <div
                            key={filter.id}
                            className="l1-button filter-item"
                            ng-click="changeFilter(filter.id)"
                            ng-class="{'active':filter.id === currentFilterId}"
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

export default Filter;