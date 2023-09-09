import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { password } = accountData

    await this.encrypter.encrypt(password)

    return await new Promise((resolve) => { resolve(null) })
  }
}
