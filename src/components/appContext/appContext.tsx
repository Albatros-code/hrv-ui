import React from 'react'
import appInitialArgs from './appInitialArgs';

export const AppContext = React.createContext<any>(undefined)

function appReducer(state, action) {
    switch (action.type) {
      case 'setLoading':
        return {...state, loading: true};
      case 'stopLoading':
        return {...state, loading: false};
        case 'setChartData':
          return {...state, chartData: action.payload};
      default:
        throw new Error();
    }
  }

const initialState = {
    loading: appInitialArgs.loading,
    chartData: appInitialArgs.chartData
}

const AppContextProvider = ({children}) => {

    const [ store, dispatch ] = React.useReducer(appReducer, initialState,)

    return (
        <AppContext.Provider value={{store, dispatch}}>
            {children}
        </AppContext.Provider>

    )
}

export default AppContextProvider