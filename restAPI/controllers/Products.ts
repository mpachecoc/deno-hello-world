import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Product } from '../types.ts';

let products: Product[] = [
   {
      id: "1",
      name: "Product One",
      description: "This is a description of P1",
      price: 49.99,
   },
   {
      id: "2",
      name: "Product Two",
      description: "This is a description of P2",
      price: 79.99,
   },
   {
      id: "3",
      name: "Product Three",
      description: "This is a description of P3",
      price: 99.99,
   },
];

// @desc    Get all products
// @route   GET /products
const index = ({ response }: { response: any }) => {
   response.body = {
      success: true,
      data: products
   }
}

// @desc    Get single product
// @route   GET /products/:id
const single = ({ params, response }: { params: {id: string}, response: any }) => {
   
   const product: Product | undefined = products.find(product => product.id === params.id)

   if(product) {
      response.status = 200
      response.body = {
         success: true,
         data: product
      }
   } else {
      response.status = 404
      response.body = {
         success: false,
         message: 'No Product Found.'
      }
   }
}

// @desc    Add product
// @route   POST /products
const create = async ({ request, response }: { request: any, response: any }) => {

   const body = await request.body()

   if (!request.hasBody) {
      response.status = 400
      response.body = {
         success: false,
         message: 'No Data.'
      }
      return 
   }

   const product: Product = body.value
   
   product.id = v4.generate()
   products.push(product)

   response.status = 201
   response.body = {
      success: true,
      message: product
   }

}

// @desc    Update product
// @route   PUT /products/:id
const update = async ({ params, request, response }: { params: {id: string}, request: any, response: any }) => {

   const product: Product | undefined = products.find(product => product.id === params.id)

   if(product) {
      const body = await request.body()

      const updateProd: { name?: string; description?: string; price?: number } = body.value

      products = products.map(prod => prod.id === params.id ? { ...prod, ...updateProd } : prod)
   
      response.status = 200
      response.body = {
         success: true,
         message: products
      }
     
   } else {
      response.status = 404
      response.body = {
         success: false,
         message: 'No Product Found.'
      }
   }
   
}

// @desc    Delete product
// @route   DELETE /products/:id
const del = ({ params, response }: { params: { id: string }, response: any }) => {
   
   products = products.filter(prod => prod.id !== params.id)

   response.status = 200
   response.body = {
      success: true,
      message: 'Product removed.'
   }
}

export { index, single, create, update, del }