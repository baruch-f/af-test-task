import { createAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../reducers/store'
import { User } from '../../types/mockapi'

export const setContents = createAction<User[]>('data/setContents');

export const setLoading = createAction<boolean>('data/setLoading');

export const setError = createAction<string>('data/setError');

export const fetchContents = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(''));

        const response = await fetch('https://648b31ee17f1536d65ea9242.mockapi.io/users')
        const data: User[] = await response.json();
        if(data?.length) {
            dispatch(setContents(data));
        }

        dispatch(setLoading(false))
    } catch (error) {
        console.error('Error fetching contents:', error)
        dispatch(setError('Failed to fetch data'))
        dispatch(setLoading(false))
    }
}
