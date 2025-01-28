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
  
    console.log("1 signup")
    const body = await c.req.json()
    console.log("2 signup")
    const {success} = signupInput.safeParse(body)
    console.log("2 signup")
    if(!success){
      console.log("4 signup")
      c.status(411)
      return c.json({message : "Input not correct"})
    }
    const prisma = c.get('prisma');
    console.log("5 signup")
  
    try{
        console.log("4 signup")
      const user = await prisma.User.create({ 
        data : {
          name : body.name,
          email : body.email,
          password : body.password
        }
      });
      console.log("5  signup")
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log("6 final signup")
      return c.json({jwt})
    }
    catch(e){
        console.log("7 error signup")
      c.status(403)
      return c.json({Error  : "Error while sign up"})
    }
    
  })
  
  //--------------------------------------------------------------------------SIGN IN
  userRouter.post('/signin', async (c) => {
    
    // const prisma = new PrismaClient({
    //   datasourceUrl: c.env.DATABASE_URL,
    // }).$extends(withAccelerate())
    console.log("1  signIN")
    const body = await c.req.json()
    const {success} = signinInput.safeParse(body)
    console.log("2  signIN")
    if(!success){
      console.log("3 ERROR  signIN")
      c.status(411)
      return c.json({message : "Input not correct"})
    }

    const prisma = c.get('prisma');
    console.log("4  signIN")
    try{
      console.log("5  signIN")
      const user = await prisma.user.findUnique({
        where: {
          email  : body.email,
          password : body.password
        }
      });
  
      if(!user){
        console.log("6 ERROR  signIN")
        c.status(403)
        return c.json({message : "User not found"})
      }
      
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log("7 FINAL  signIN")
      console.log("Successful login")
        return c.json({ jwt });
    }
    catch(e){
      console.log("7 ERROR  signIN")
      c.status(403)
      return c.json({Error  : "Error while sign up"})
    }
  
  })
