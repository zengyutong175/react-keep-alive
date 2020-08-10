import React, { useState } from 'react';
import KeepNode from './KeepNode';
import ReactDom from 'react-dom';
const Context = React.createContext();

export default React.memo(function (props) {
    const [map, setMap] = useState({}); //虚拟dom映射
    const [mapNode, setMapNode] = useState({}); //dom映射
    const [event, setEvent] = useState({}); //新增缓存的生命周期
    function addEvent(cacheId, type, callback) {
        //新增事件
        if (cacheId && type && callback) {
            setEvent((state) => {
                let newState = { ...state };
                if (!newState[cacheId]) {
                    newState[cacheId] = {};
                }
                newState[cacheId][type] = callback;
                return newState;
            });
        }
    }
    function deleteCache(key) {
        setMap((state) => {
            return del(state, key);
        });
        setMapNode((state) => {
            return del(state, key);
        });
    }
    function del(state, key) {
        let newState = { ...state };
        newState[key] = null;
        return newState;
    }
    return (
        <Context.Provider value={{ map, setMap, mapNode, setMapNode, deleteCache, addEvent, event }}>
            <>{props.children}</>
            {ReactDom.createPortal(
                <div style={{ display: 'none' }}>
                    {Object.entries(map).map((v) => {
                        return (
                            <KeepNode key={v[0]} cacheId={v[0]}>
                                {v[1]}
                            </KeepNode>
                        );
                    })}
                </div>,
                document.body
            )}
        </Context.Provider>
    );
});
export { Context };
