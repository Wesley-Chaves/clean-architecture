import { DbAddAccount } from './db-add-account'
import { AddAccountRepository, DbAddAccountModel, DbAccountModel, Encrypter } from './db-add-account-protocols'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise((resolve) => { resolve('encrypted_password') })
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AccountMongoRepositoryStub implements AddAccountRepository {
    async add (accountData: DbAddAccountModel): Promise<DbAccountModel> {
      const generatedId = 'valid_id'
      const { name, email, password } = accountData
      const account = { id: generatedId, name, email, password }
      return await new Promise((resolve) => { resolve(account) })
    }
  }
  return new AccountMongoRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }

    const { name, email, password } = httpRequest.body
    const accountData = { name, email, password }
    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should return throw if Encrypter returns throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }
    const { name, email, password } = httpRequest.body
    const accountData = { name, email, password }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct params', async () => {
    const { sut, encrypterStub, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }

    const { name, email, password } = httpRequest.body
    const encryptedPassword = await encrypterStub.encrypt(password)
    const accountData = Object.assign({}, { name, email, password })

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith(Object.assign({}, { name, email, password: encryptedPassword }))
  })
})
