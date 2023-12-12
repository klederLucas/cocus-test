import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AsciiValidationPipe implements PipeTransform {
  transform(value: string): string {
    if (/^[A-Za-z0-9]+$/.test(value)) {
      throw new Error('Value must be ASCII');
    }

    return value;
  }
}
