import { RemoteAuthentication } from "./remote-authentication"
import { HttpPostClientSpy } from "@/domain/data/test"
import { mockAccountModel, mockAuthentication } from "@/domain/test"
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors"
import { HttpStatusCode } from "../../protocols/http"
import { AuthenticationParams } from "@/domain/usecases"
import { AccountModel } from "@/domain/models"
import faker from 'faker'

type SutTypes ={
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes =>{
        const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
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

    test('Should throw UnexpectedError if HttpPostClient Returns 400', async()=>{
        const {sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient Returns 500', async()=>{
        const {sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient Returns 404', async()=>{
        const {sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should return AccountModal if HttpPostClient Returns 200', async()=>{
        const {sut, httpPostClientSpy} = makeSut()
        const httpResult = mockAccountModel()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }
        const account = sut.auth(mockAuthentication())
        expect(account).rejects.toEqual(httpResult)
    })
    
    
})