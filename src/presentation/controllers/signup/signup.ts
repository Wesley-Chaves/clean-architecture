import { MissingParamError } from '../../errors/missing-param'
import { InvalidParamError } from '../../errors/invalid-param'
import { badRequest, sucess } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { EmailValidator } from '../../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { email, password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))

    const isValid = this.emailValidator.isValid(email)
    if (!isValid) return badRequest(new InvalidParamError('email'))

    return sucess()
  }
}
