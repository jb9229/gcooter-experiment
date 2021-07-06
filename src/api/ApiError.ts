export class ApiError extends Error {
  constructor(code: number, message: string, developerMessage?: string) {
    super(message);
    this.code = code;
    this.developerMessage = developerMessage;
  }

  code: number;
  developerMessage: string | undefined;
}
