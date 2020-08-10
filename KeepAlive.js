import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { Context } from './Context';

export default React.memo(function (props) {
    const { children, cacheId } = props;
    const { map, setMap, mapNode, setMapNode, deleteCache, addEvent, event } = useContext(Context);
    const container = useRef(null);
    if (cacheId === undefined) {
        throw new Error('KeepAlive需要唯一的cacheId');
    }
    //进入缓存的生命周期
    function activated(callback) {
        addEvent(cacheId, 'activated', callback);
    }
    //离开缓存的生命周期
    function deactivated(callback) {
        addEvent(cacheId, 'deactivated', callback);
    }
    // 缓存虚拟dom
    useEffect(() => {
        if (!map[cacheId]) {
            let node = React.cloneElement(children, {
                map,
                setMap,
                mapNode,
                setMapNode,
                deleteCache,
                activated,
                deactivated,
            });
            setMap((state) => ({ ...state, ...{ [cacheId]: node } }));
        }
    }, []);
    //加载dom节点
    useLayoutEffect(() => {
        if (mapNode[cacheId]) {
            container.current && container.current.appendChild(mapNode[cacheId]);
        }
    }, [mapNode[cacheId]]);
    //缓存的生命周期
    useEffect(() => {
        if (mapNode[cacheId]) {
            event[cacheId] && event[cacheId].activated && event[cacheId].activated();
        }
        return () => {
            event[cacheId] && event[cacheId].deactivated && event[cacheId].deactivated();
        };
    }, []);
    return <div ref={container} data-cache={cacheId}></div>;
});
