import { HttpPostClient } from '@/domain/data/protocols/http/http-post-client';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credencitals-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { deflate } from 'zlib';
import { HttpStatusCode } from '../../protocols/http/http-response';

export class RemoteAuthentication{

    constructor(
        private readonly url : string,
        private readonly httpPostClient: HttpPostClient
        ) {}

    async auth(params: AuthenticationParams): Promise<void>{
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })
        switch(httpResponse.statusCode){
            case HttpStatusCode.ok: break
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
        
    }
}