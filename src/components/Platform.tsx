import React, {useState} from "react";

interface IProps {
    sourceList: Array<Source>
    onTogglePlatform: TogglePlatform
    activeTab?:string
};

interface Source {
    name:string
    displayId:string
    displayText: string
}


const Platform = (props: IProps) => {
    const { sourceList, activeTab,  onTogglePlatform} = props;
    const [active, setActive] = useState(activeTab)
    return (
        <div className="source-list" ng-show="is_window_hidden==1">
            {
                sourceList?.map((source, index) => {
                    return (
                        <React.Fragment key={source.displayId}>
                            <div className={["source-button", source?.displayId === active?'active':''].join(' ')} 
                                onClick={() => {
                                    setActive(source.displayId)
                                    onTogglePlatform(source.displayId)
                                }}>
                                {source?.displayText}
                            </div>
                            {
                                sourceList.length-1 === index?null:(<div className="splitter"></div>)
                            }
                            
                        </React.Fragment>
                    );
                })
            }
        </div>
    );
};


export default Platform;