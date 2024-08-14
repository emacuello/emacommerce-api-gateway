import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as basicAuth from 'express-basic-auth';
import { envs } from 'src/config/envs';

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    basicAuth({
      users: {
        [envs.PROM_USER]: envs.PROM_PASS,
      },
      challenge: true,
    })(req, res, next);
  }
}
