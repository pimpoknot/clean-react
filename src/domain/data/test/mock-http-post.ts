import { HttpPostParams } from '@/domain/data/protocols/http'
import faker from 'faker'

export const  mockPostRequest = (): HttpPostParams<any> =>({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})