import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcryptadapter'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt hash with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})