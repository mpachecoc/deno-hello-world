import { Router } from 'https://deno.land/x/oak/mod.ts'

import { index, single, create, update, del } from './controllers/Products.ts'

const router = new Router()

router.get('/products', index)
      .get('/products/:id', single)
      .post('/products', create)
      .put('/products/:id', update)
      .delete('/products/:id', del)

export default router