import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = new MongoClient(url)
    await this.client.connect()
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  mapMongoIdToObject (fetchedData: Record<string, any>): any {
    const { _id, ...objWithoutId } = fetchedData
    return Object.assign({}, { id: _id.toHexString(), ...objWithoutId })
  }
}
