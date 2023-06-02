import React from "react";

interface IProps {
    sourceList?: Array<Source>
    source?: Source
};

interface Source {
    name:string
    displayId:string
    displayText: string
}

 

const Platform = (props: IProps) => {
    const { sourceList } = props;
    return (
        <div className="source-list" ng-show="is_window_hidden==1">
            {
                sourceList?.map((source, index) => {
                    return (
                        <PlatformItem source={source} key={source.displayId} />
                    );
                })
            }
        </div>
    );
};


const PlatformItem = (props: IProps) => {
    const {source} = props;
    return (
        <>
            <div className="source-button" >
                {source?.displayText}
            </div>
            <div className="splitter"></div>
        </>
    );
}


export default Platform;