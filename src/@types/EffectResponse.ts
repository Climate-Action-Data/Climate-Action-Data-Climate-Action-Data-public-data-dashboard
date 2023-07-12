export type EffectResponse<T> = EffectResponseValid<T> | EffectResponseError

export interface EffectResponseValid<T> {
    data: T
    error: undefined
}

export interface EffectResponseError {
    data: undefined
    error: ErrorResponse
}

export interface ErrorResponse {
    message: string
    code: string
}