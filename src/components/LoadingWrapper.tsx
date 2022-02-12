import React from 'react'
import useAppContext from './appContext/useAppContext';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const StyledDiv = styled('div')({
    height: '100%',
    width: '100%',
    background: 'rgba(255,255,255,0.7)',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1001',
})

const changeTabIndex = (childNodes: HTMLElement[], isFocusable: boolean) => {
    childNodes.forEach(el => {el.tabIndex = isFocusable ? 0 : -1})
}

const getFocusableNodes = (childNodes: NodeListOf<any>, result: HTMLElement[]) => {
    childNodes.forEach(el => {
        if (el.tabIndex === 0) result.push(el) 
        if (el.childNodes) getFocusableNodes(el.childNodes, result)
    })
}

const LoadingWrapper = ({children}) => {
    const { loading } = useAppContext().store
    
    const firstNode = React.useRef<HTMLDivElement>(null)
    const focusableNodes = React.useRef<HTMLElement[]>([])

    React.useEffect(() => {
        const nodesToCheck = firstNode.current?.parentNode?.childNodes
        const nodesToUpdate = focusableNodes.current
        if(nodesToCheck && loading)  getFocusableNodes(nodesToCheck, focusableNodes.current)
        if(nodesToUpdate.length > 0) changeTabIndex(nodesToUpdate, !loading)
    }, [loading])

    return (
        <>
            {children}
            {loading && <StyledDiv ref={firstNode}><CircularProgress /></StyledDiv>}
        </>
    )
}

export default LoadingWrapper