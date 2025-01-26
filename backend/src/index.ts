import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

type Environment = {

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


//--------------------------------------------------------------------------SIGN UP
app.post('/signup', async (c) => {

  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate())

  console.log("1")
  const body = await c.req.json()
  const prisma = c.get('prisma');
  console.log("3")

  try{
    const user = await prisma.user.create({ 
      data : {
        email : body.email,
        password : body.password
      }
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log("3")
    return c.json({jwt})
  }
  catch(e){
    c.status(403)
    return c.json({Error  : "Error while sign up"})
  }
  
})

//--------------------------------------------------------------------------SIGN IN
app.post('/signin', async (c) => {
  
  // const prisma = new PrismaClient({
  //   datasourceUrl: c.env.DATABASE_URL,
  // }).$extends(withAccelerate())

  const body = await c.req.json()
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

//---------------------------------------------------------------------------middleware
app.use('/blog/*', async(c, next)=>{

  // console.log("1")
  const jwt = c.req.header('Authorization')
  // console.log("2")
  if(!jwt) {
    // console.log("3")
		c.status(401);
		return c.json({ error: "unauthorized" });
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
  // console.log("8")
  await next()
});


//--------------------------------------------------------------------------upload post
app.post('/blog', (c):any => {
   
  console.log("9")
  const userid = c.get('userId');
  console.log("10")
  return c.text('post blogo!'+ userid)
});

//--------------------------------------------------------------------------update post
app.put('/blog', (c) : any => {
  
  // const userid = c.get('userId');
  return c.text('PUT blogo!')
});

//----------------------------------------------------------------------------delete post
app.get('/blog/:id', (c):any => {
  
  return c.text('get blogo!')
});

//----------------------------------------------------------------------------delete post
app.get('/blog/bulk ', (c):any => {
  
  return c.text('get blogo!')
});

export default app




