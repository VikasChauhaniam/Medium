import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { Environment } from '../index'
import {signupInput, signinInput} from '@iamviky/medium-common'


// type Environment = {

// 	Bindings: { DATABASE_URL: string, JWT_SECRET: string},
//     Variables : { userId: any, prisma: any }

// }

export const userRouter = new Hono<Environment>()


//--------------------------------------------------------------------------SIGN UP
userRouter.post('/signup', async (c) => {

    // const prisma = new PrismaClient({
    //   datasourceUrl: c.env.DATABASE_URL,
    // }).$extends(withAccelerate())
  
    console.log("1")
    const body = await c.req.json()

    const {success} = signupInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({message : "Input not correct"})
    }
    const prisma = c.get('prisma');
    console.log("3")
  
    try{
        console.log("4")
      const user = await prisma.User.create({ 
        data : {
          email : body.email,
          password : body.password
        }
      });
      console.log("5")
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log("6")
      return c.json({jwt})
    }
    catch(e){
        console.log("7")
      c.status(403)
      return c.json({Error  : "Error while sign up"})
    }
    
  })
  
  //--------------------------------------------------------------------------SIGN IN
  userRouter.post('/signin', async (c) => {
    
    // const prisma = new PrismaClient({
    //   datasourceUrl: c.env.DATABASE_URL,
    // }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = signinInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({message : "Input not correct"})
    }

    const prisma = c.get('prisma');
  
    try{
      const user = await prisma.user.findUnique({
        where: {
          email  : body.email,
          password : body.password
        }
      });
  
      if(!user){
        c.status(403)
        return c.json({message : "User not found"})
      }
      
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log("Successful login")
        return c.json({ jwt });
    }
    catch(e){
      c.status(403)
      return c.json({Error  : "Error while sign up"})
    }
  
  })
