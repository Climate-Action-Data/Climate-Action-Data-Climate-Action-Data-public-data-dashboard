export type EffectResponse<T> = EffectResponseValid<T>

export interface EffectResponseValid<T> {
    data?: T
    error?: ErrorResponse
}

export interface ErrorResponse {
    message: string
    code: string
}