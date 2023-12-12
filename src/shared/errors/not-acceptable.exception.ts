import { HttpStatus } from '@nestjs/common';
import { ExceptionMessageEnum } from '../enums/exception-message.enum';

export class NotAcceptableException extends Error {
  message: string;
  statusCode: number;

  constructor(message: string) {
    super();
    this.message = `${ExceptionMessageEnum.NOT_ACCEPTABLE}. ${message}`;
    this.statusCode = HttpStatus.NOT_ACCEPTABLE;
  }
}
