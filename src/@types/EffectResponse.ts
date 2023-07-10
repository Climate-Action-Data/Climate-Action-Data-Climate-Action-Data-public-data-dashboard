export interface EffectResponse<T> {
    data: T | undefined
    error?: {
        message: string
        code: string
    }
}