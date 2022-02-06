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

const changeTabIndex = (childNodes) => {
    childNodes.forEach(el => {
        el.tabIndex = -1
        changeTabIndex(el.childNodes)
    })
}

const LoadingWrapper = ({children}) => {
    const { loading } = useAppContext().store


    React.useEffect(() => {
        if (loading) changeTabIndex(refs)
    }, [loading])

    const refs: any[] = []

    return (
        <>
            {loading ? React.Children.map(children, (element) => {
                return React.cloneElement(element, { ref: (el) => {refs.push(el)} });
            }) : children}
            {(loading) && <StyledDiv><CircularProgress /></StyledDiv>}
        </>
    )
}

export default LoadingWrapper