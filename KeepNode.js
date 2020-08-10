import React, { useEffect, useContext, useRef } from 'react';
import { Context } from './Context';
export default React.memo(function Keeper({ children, cacheId }) {
    const { setMapNode } = useContext(Context);
    const ref = useRef(null);
    useEffect(() => {
        if (!children) {
            setMapNode((state) => ({ ...state, [cacheId]: null }));
        } else {
            setMapNode((state) => ({ ...state, [cacheId]: ref.current }));
        }
    }, [children]);
    return <div ref={ref}>{children}</div>;
});
