import { HttpResponse } from '../protocols/http'

export const badRequest = (msgError: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: msgError
  }
}
