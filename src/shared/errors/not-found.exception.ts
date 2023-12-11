import { HttpStatus } from '@nestjs/common';
import { ExceptionMessageEnum } from '../enums/exception-message.enum';

export class NotFoundException extends Error {
  message: string;
  statusCode: number;

  constructor(entity: string) {
    super();
    this.message = `${ExceptionMessageEnum.NOT_FOUND}. ${entity}`;
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}
