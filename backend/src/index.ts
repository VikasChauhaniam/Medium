import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import {userRouter} from './routes/user'
import {blogRouter} from './routes/blog'

export type Environment = {

	Bindings: { DATABASE_URL: string, JWT_SECRET: string},
  Variables : { userId: any, prisma: any }

}
const app = new Hono<Environment>().basePath('/api/v1')

app.use('/*', async (c, next)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,       //wrangler.tomel
  }).$extends(withAccelerate())

  c.set('prisma', prisma)
  await next()

})

app.route('/user', userRouter);
app.route('/blog', blogRouter);

export default app




