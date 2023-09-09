import { AddAccountRepository } from '../../protocols/add-account-repository'
import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { name, email, password } = accountData
    const encryptedPassword = await this.encrypter.encrypt(password)

    const account = Object.assign({}, { name, email, password: encryptedPassword })

    await this.addAccountRepository.add(account)
    return await new Promise((resolve) => { resolve(null) })
  }
}
