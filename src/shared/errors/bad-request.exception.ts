import { HttpStatus } from '@nestjs/common';
import { ExceptionMessageEnum } from '../enums/exception-message.enum';

export class BadRequestException extends Error {
  message: string;
  statusCode: number;

  constructor(entity: string) {
    super();
    this.message = `${ExceptionMessageEnum.BAD_REQUEST}. Invalid ${entity}`;
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}
