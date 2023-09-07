import { MissingParamError } from '../../errors/missing-param'
import { InvalidParamError } from '../../errors/invalid-param'
import { badRequest, sucess } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))

    return sucess()
  }
}
