import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Dropdown from '../../components/Dropdown'
import { store } from '../../store/reducers/store'
import { setError, setLoading } from '../../store/actions/data'

describe('UserDropdown', () => {
    test('renders loading state', () => {
        store.dispatch(setLoading(true));
        render(
            <Provider store={store}>
                <Dropdown />
            </Provider>,
        )

        const loadingMessage = screen.getByText(/Loading.../i)
        expect(loadingMessage).toBeInTheDocument()
    })

    test('renders error state', () => {
        store.dispatch(setError('Failed to fetch data'));
        render(
            <Provider store={store}>
                <Dropdown />
            </Provider>,
        )

        const errorMessage = screen.getByText(/Error: Failed to fetch data/i)
        expect(errorMessage).toBeInTheDocument()
    })
})
