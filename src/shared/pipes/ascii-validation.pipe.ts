import { Injectable, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '../errors/bad-request.exception';

@Injectable()
export class AsciiValidationPipe implements PipeTransform {
  transform(value: string): string {
    if (!/^[A-Za-z0-9]+$/.test(value)) {
      throw new BadRequestException('Value must be ASCII');
    }

    return value;
  }
}
