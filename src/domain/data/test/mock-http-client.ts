import { HttpPostClient, HttpPostParams } from "@/domain/data/protocols/http/http-post-client";
import { HttpResponse, HttpStatusCode } from "@/domain/data/protocols/http/http-response";
// import { HttpResponse } from "../protocols/http/http-response";

export class HttpPostClientSpy implements HttpPostClient{
    url?: string
    body?: object
    response: HttpResponse = {
        statusCode: HttpStatusCode.noContent
    }

    async post(params: HttpPostParams): Promise<HttpResponse>{
        this.url = params.url
        this.body = params.body
        return Promise.resolve(this.response)

    }
}