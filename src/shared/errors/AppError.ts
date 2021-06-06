export default class AppError {
  public readonly message;
  public readonly statusCode;

  constructor(message: string, statusCode = 500) {
    this.message = message;
    this.statusCode = statusCode;
  }
}