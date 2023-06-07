import React, {useState, useEffect} from "react";
import { getAllChannel } from '../provider/channelProvider'

interface IProps {
    onTogglePlatform: TogglePlatform
};


const Platform = (props: IProps) => {

    const cannelList:Array<any> = getAllChannel();

    const { onTogglePlatform} = props;
    const [channelId, setChannelId] = useState(cannelList[0].id)

    useEffect(() => {
        onTogglePlatform(channelId)
    })
    return (
        <div className="source-list" ng-show="is_window_hidden==1">
            {
                cannelList?.map((channe, index) => {
                    return (
                        <React.Fragment key={channe.id}>
                            <div className={["source-button", channe.id === channelId?'active':''].join(' ')} 
                                onClick={() => {
                                    setChannelId(channe.id)
                                    onTogglePlatform(channe.id)
                                }}>
                                {channe?.displayText}
                            </div>
                            {
                                cannelList.length-1 === index?null:(<div className="splitter"></div>)
                            }
                            
                        </React.Fragment>
                    );
                })
            }
        </div>
    );
};


export default Platform;