import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { Environment } from '../index'
import { Prisma } from '@prisma/client';
import {createBlogInput, updateBlogInput} from '@iamviky/medium-common'

// type Environment = {

// 	Bindings: { DATABASE_URL: string, JWT_SECRET: string},
//     Variables : { userId: any, prisma: any }

// }

export const blogRouter = new Hono<Environment>()

//---------------------------------------------------------------------------middleware
blogRouter.use('/*', async(c, next)=>{

    // console.log("1")
    const jwt = c.req.header('Authorization')
    // console.log("2")
    if(!jwt) {
      // console.log("3")
          c.status(401);
          return c.json({ error: "authentication is not provided" });
      }
    // console.log("4")
    console.log(jwt)
    const token = jwt.split(' ')[1];
    console.log("token : ",token)
      const payload = await verify(token, c.env.JWT_SECRET);
    // console.log("5")
    if(!payload) {
      // console.log("6")
          c.status(401);
          return c.json({ error: "unauthorized" });
      }
    // console.log("7")
    c.set('userId', payload.id);
    console.log("Authenticatiopn Succesfful")

    await next()
  });
  

  
  //--------------------------------------------------------------------------upload post
  blogRouter.post('/', async (c) => {
     
    console.log("9")//---------

    const userid = c.get('userId');
    const prisma = c.get('prisma');
    const body = await c.req.json()

    const {success} = createBlogInput.safeParse(body)
        if(!success){
          c.status(411)
          return c.json({message : "Input not correct"})
        }

    console.log("10")//---------

    try{
        console.log("11")
        const blog = await prisma.Post.create({ 
        data : {
          title : body.title,
          content : body.content,
          published : true,
          authorId : userid
        }
      });
      console.log("12")
      return c.json({blog})
    }
    catch(e){
        console.log("13")
      c.status(403)
      return c.json({Error  : "Error while creating a post"})
    }

    
  });
  
  //--------------------------------------------------------------------------update post
  blogRouter.put('/', async (c) => {
    
    console.log("9put")//---------

   
    const prisma = c.get('prisma');

    const body = await c.req.json()
    
    const {success} = updateBlogInput.safeParse(body)
        if(!success){
          c.status(411)
          return c.json({message : "Input not correct"})
        }

    console.log("10")//---------

    try{
        console.log("11")
        const blog = await prisma.Post.update({ 
            where : {
                id : body.id
            },
        data : {
          title : body.title,
          content : body.content,
        }
      });
      console.log("12")
      return c.json({blog})
    }
    catch(e){
        console.log("13")
      c.status(403)
      return c.json({Error  : "Error while creating a post"})
    }
  });

  //----------------------------------------------------------------------------bulk
  blogRouter.get('/bulk', async (c) => {
    
    console.log("9bulk")//---------

    const prisma = c.get('prisma');

    console.log("10")//---------

    try{
        console.log("11")
        const blogs:any = await prisma.Post.findMany({
      });
      console.log("12bulk")
      return c.json({blogs})
    }
    catch(e){
      console.log("13")
      c.status(411)
      return c.json({Error  : "Error while fetching blog post"})
    }
    

  });
  
  //----------------------------------------------------------------------------get post
  blogRouter.get('/:id', async (c) => {
    
    

    console.log("9ID")//---------

    const prisma = c.get('prisma');

    const id = await c.req.param("id")
    console.log("10")//---------

    try{
        console.log("11")
        const blog = await prisma.Post.findFirst({ 
            where : {
                id : id
            },
      });
      console.log("12ID")
      return c.json({blog})
    }
    catch(e){
      console.log("13")
      c.status(411)
      return c.json({Error  : "Error while fetching blog post"})
    }

  });
  
  