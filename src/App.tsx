import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import RootComponent from './RootComponent'
import { persistor, store } from './store/reducers/store'

const theme = {
    colors: {
        black100: "hsla(225, 14%, 12%, 1)",
        black200: "hsla(225, 14%, 14%, 1)",
        black300: "hsla(225, 14%, 16%, 1)",
        black400: "hsla(225, 14%, 18%, 1)",
        black500: "hsla(225, 14%, 20%, 1)",
        black600: "hsla(225, 14%, 22%, 1)",
        white100: "hsla(225, 14%, 100%, 1)",
        white200: "hsla(225, 14%, 100%, 0.8)",
        blue100: "hsla(210, 100%, 37%, 1)",
        blue200: "hsla(210, 100%, 33%, 1)",
        blue300: "hsla(210, 100%, 35%, 1)",
        blue400: "hsla(210, 100%, 33%, 0.5)",
    },
};


const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootComponent />
                </PersistGate>
            </Provider>
        </ThemeProvider>
    )
}

export default App
