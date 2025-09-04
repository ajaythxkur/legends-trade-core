import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'


import premarketRoutes from './routes/premarketRoutes.js'
import dashRoutes from './routes/dashboardRoutes.js'

const app = new Hono()
app.use("/*", cors({ origin: "http://localhost:3000" }))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/premarket", premarketRoutes);
app.route("/dashboard", dashRoutes);

serve({
  fetch: app.fetch,
  port: 4000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
