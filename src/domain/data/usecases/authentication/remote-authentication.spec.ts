import { RemoteAuthentication } from "./remote-authentication"
import { HttpPostClientSpy } from "@/domain/data/test/mock-http-client"
import { mockAuthentication } from "@/domain/test/mock-authentication"
import { InvalidCredentialsError } from "@/domain/errors/invalid-credencitals-error"
import { HttpStatusCode } from "../../protocols/http/http-response"
import faker from 'faker'

type SutTypes ={
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes =>{
        const httpPostClientSpy = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        return{
            sut,
            httpPostClientSpy
        }
}


describe('RemoteAuthentication', ()=>{
    test('Should call HttpClient with correct URL', async()=>{
        const url = faker.internet.url()
        const {sut, httpPostClientSpy} = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpClient with correct body', async()=>{
        
        const {sut, httpPostClientSpy} = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })

    test('Should throw InvalidCredentialsError if HttpPostClient Returns 401', async()=>{
        const {sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unathorized
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
})