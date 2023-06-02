import React from "react";

interface PlatformProps {
    sourceList: Array<Source>
};

interface Source {
    name:string
    displayId:string
    displayText: string
}

 

const Platform = (props: PlatformProps) => {
    const { sourceList } = props;
    return (
        <div className="source-list" ng-show="is_window_hidden==1">
            {
                sourceList.map((source, index) => {
                    return (
                        <>
                            <div className="source-button">
                                {source.displayText}
                            </div>
                            <div className="splitter"></div>
                        </>
                    );
                })
            }
        </div>
    );
};


export default Platform;