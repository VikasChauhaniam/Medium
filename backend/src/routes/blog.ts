import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { Environment } from '../index'
import { Prisma } from '@prisma/client';
import {createBlogInput, updateBlogInput} from '@iamviky/medium-common'

// type Environment = {

// 	Bindings: { DATABASE_URL: string, JWT_SECRET: string},
//     Variables : { userId: any, prisma: any }

// }

interface blogsType{
  id: string;
  title: string;
  content: string;
  author: { name: string | null } | null;
}

export const blogRouter = new Hono<Environment>()

//---------------------------------------------------------------------------middleware
blogRouter.use('/*', async(c, next)=>{

    console.log("1 Middle")
    const jwt = c.req.header('Authorization')
    console.log("2 Middle")
    if(!jwt) {
      console.log("3 final Middle")
          c.status(401);
          return c.json({ error: "authentication is not provided" });
      }
      console.log("3 Middle")
    console.log(jwt)
    const token = jwt.split(' ')[1];
    console.log("4 Middle")
    console.log("token : ",token)
      const payload = await verify(token, c.env.JWT_SECRET);
      console.log("5 Middle")
    if(!payload) {
      console.log("6 Final Middle")
          c.status(401);
          return c.json({ error: "unauthorized" });
      }
      console.log("6 Middle")
    c.set('userId', payload.id);
    console.log("Authenticatiopn Succesfful")
    console.log("7 FINAL Middle")
    await next()
  });
  

  
  //--------------------------------------------------------------------------upload post
  blogRouter.post('/', async (c) => {
     
    console.log("1 create post")

    const userid = c.get('userId');
    const prisma = c.get('prisma');
    const body = await c.req.json()

    console.log("2 create post")

    const {success} = createBlogInput.safeParse(body)
    console.log("3 create post")
        if(!success){
          console.log("4 FINAL create post")
          c.status(411)
          return c.json({message : "Input not correct"})
        }

        console.log("4 create post")

    try{
      console.log("5 create post")
        const blog = await prisma.Post.create({ 
        data : {
          title : body.title,
          content : body.content,
          published : true,
          authorId : userid
        }
        
      });
      console.log("6 FINAL create post")
      return c.json({blog})
    }
    catch(e){
      console.log("6 ERROR  create post")
      c.status(403)
      return c.json({Error  : "Error while creating a post"})
    }

    
  });
  
  //--------------------------------------------------------------------------update post
  blogRouter.put('/', async (c) => {
    
    console.log("1 update post")

   
    const prisma = c.get('prisma');

    const body = await c.req.json()
    console.log("2 update post")
    
    const {success} = updateBlogInput.safeParse(body)
        if(!success){
          console.log("3 FINAL update post")
          c.status(411)
          return c.json({message : "Input not correct"})
        }

        console.log("3 update post")

    try{
      console.log("4 update post")
        const blog = await prisma.Post.update({ 
            where : {
                id : body.id
            },
        data : {
          title : body.title,
          content : body.content,
        }
      });
      console.log("5 FINAL update post")
      return c.json({blog})
    }
    catch(e){
      console.log("5 ERROR update post")
      c.status(403)
      return c.json({Error  : "Error while creating a post"})
    }
  });

  //----------------------------------------------------------------------------bulk
  blogRouter.get('/bulk', async (c) => {
    
    console.log("1 bulk post")

    const prisma = c.get('prisma');

    console.log("2 bulk post")

    try{
      console.log("3 bulk post")
        
        const blogs : Array<blogsType> = await prisma.post.findMany({
          select: {
              id: true,
              title: true,
              content: true,
              published: true,
              author: {
                  select: {
                      name: true, // Include the author's name
                      email: true, // Include the author's email
                  },
              },
          },
      });
      console.log("4 FINAL bulk post")
      return c.json({blogs})
    }
    catch(e){
      console.log("4 ERROR bulk post")
      console.log(e)
      c.status(411)
      return c.json({Error  : "Error while fetching blog post"})
    }
    

  });
  
  //----------------------------------------------------------------------------get post
  blogRouter.get('/:id', async (c) => {
    
    

    console.log("1 get ID post")

    const prisma = c.get('prisma');

    const id = await c.req.param("id")
    console.log("2 get ID post")

    try{
      console.log("3 get ID post")
        const blog = await prisma.Post.findFirst({ 
            where : {
                id : id
            },
            select: {
              id: true,
              title: true,
              content: true,
              published: true,
              author: {
                  select: {
                      name: true, // Include the author's name
                      email: true, // Include the author's email
                  },
              },
          },
      });
      console.log("4 FINAL get ID post")
      return c.json({blog})
    }
    catch(e){
      console.log("4 ERROR get ID post")
      c.status(411)
      return c.json({Error  : "Error while fetching blog post"})
    }

  });
  
  