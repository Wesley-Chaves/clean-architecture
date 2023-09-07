import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (msgError: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: msgError
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export const sucess = (data?): HttpResponse => {
  return {
    statusCode: 200,
    body: data || 'sucess'
  }
}
