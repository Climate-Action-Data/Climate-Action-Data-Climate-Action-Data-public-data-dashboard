export interface EffectResponse<T> {
  data?: T
  error?: ErrorResponse
}

export interface ErrorResponse {
  message: string
  code: string
}
