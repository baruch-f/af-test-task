import { User } from './mockapi'

export interface ReducerData {
    contents: User[],
    loading: boolean,
    error: string,
}

export type ReduxActionData<T> = {
    type: any
    payload?: T
}

export type ReduxAction<T> = (data: T) => ReduxActionData<T>
