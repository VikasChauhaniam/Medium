import { Hono } from 'hono'

const app = new Hono().basePath('/api/v1')

app.post('/signup', (c) => {
  return c.text('signup!')
})

app.post('/signup', (c) => {
  return c.text('signin!')
})

app.post('/blog', (c) => {
  return c.text('post blogo!')
})

app.put('/blog', (c) => {
  return c.text('put blog!')
})

app.get('/blog', (c) => {
  return c.text('get blog!')
})

export default app




