import { AddAccountRepository, DbAccountModel, DbAddAccountModel } from '../../../../data/protocols/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: DbAddAccountModel): Promise<DbAccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const insertionResult = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: insertionResult.insertedId })

    const { _id, name, email, password } = account
    const mappedAccount: DbAccountModel = {
      id: _id.toHexString(),
      name,
      email,
      password
    }

    return mappedAccount
  }
}
