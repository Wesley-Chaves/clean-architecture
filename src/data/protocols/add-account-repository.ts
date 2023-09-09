export interface DbAddAccountModel {
  name: string
  email: string
  password: string
}

export interface DbAccountModel {
  id: string
  name: string
  email: string
  password: string
}

export interface AddAccountRepository {
  add (accountData: DbAddAccountModel): Promise<DbAccountModel>
}
