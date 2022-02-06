import { AppContext } from './appContext'
import React from 'react'

export default function useAppContext(){
    return React.useContext(AppContext)
}