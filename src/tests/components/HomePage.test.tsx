import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../../store/reducers/store';
import HomePage from '../../pages/HomePage';

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

describe('UserDropdown', () => {
    test('renders loading state', async () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <HomePage />
                </Provider>
            </ThemeProvider>,
        )

        const loadingMessage = screen.getByText(/Loading.../i)
        expect(loadingMessage).toBeInTheDocument()
        await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));
    })
})
