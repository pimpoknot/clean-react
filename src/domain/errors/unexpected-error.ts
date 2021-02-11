export class UnexpectedError extends Error{
  constructor(){
    super('Credenciais inválidas')
    this.name = 'InvalidCredentialsError'
  }
}