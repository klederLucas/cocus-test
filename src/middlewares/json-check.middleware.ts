import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NotAcceptableException } from '../shared/errors/not-acceptable.exception';

@Injectable()
export class JsonCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const acceptHeader = req.headers['accept'];

    if (acceptHeader && acceptHeader.includes('application/json')) {
      next();
    } else {
      throw new NotAcceptableException(
        'Please set Accept header to "application/json".',
      );
    }
  }
}
