import React, {useState, useEffect,forwardRef} from "react";
import { getAllChannel } from '../provider/channelProvider'

interface IProps {
    filterRef: any
};



const Platform = (props:IProps) => {

    const cannelList:Array<any> = getAllChannel();

    const { filterRef } = props;
    const [channelId, setChannelId] = useState(cannelList[0].id)

    useEffect(() => {
        onTogglePlatform(channelId)
    })
    const onTogglePlatform = (id: string) => {
        setChannelId(id)
        filterRef?.current.init(id)
    }

    return (
        <div className="source-list">
            {
                cannelList?.map((channe, index) => {
                    return (
                        <React.Fragment key={channe.id}>
                            <div className={["source-button", channe.id === channelId?'active':''].join(' ')} 
                                onClick={() => {
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