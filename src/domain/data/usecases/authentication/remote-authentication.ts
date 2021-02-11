import { HttpPostClient } from '@/domain/data/protocols/http/http-post-client';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credencitals-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { AccountModel } from '@/domain/models/account-model';
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication';
import { deflate } from 'zlib';
import { HttpStatusCode } from '../../protocols/http/http-response';

export class RemoteAuthentication implements Authentication{
    constructor(
        private readonly url : string,
        private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
        ) {}

    async auth(params: AuthenticationParams): Promise<AccountModel>{
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })
        switch(httpResponse.statusCode){
            case HttpStatusCode.ok: return httpResponse.body
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
        
    }
}