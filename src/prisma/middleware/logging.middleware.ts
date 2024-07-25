// src/prisma/middleware/logging.middleware.ts

import { Prisma } from '@prisma/client';

export function loggingMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();

    console.log(`Query: ${params.model}.${params.action}`);
    console.log(`Params: ${JSON.stringify(params.args)}`);
    console.log(`SQL: ${params.args.query}`);
    console.log(`Duration: ${after - before}ms`);

    return result;
  };
}
