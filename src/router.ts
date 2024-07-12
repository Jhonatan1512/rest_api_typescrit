import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/** 
 * @swagger 
 * components:
 *     schemas:
 *         Products:
 *             type: object
 *             properties:
 *                 id:
 *                     type: integer
 *                     description: The Product ID
 *                     example: 1
 *                 name:
 *                     type: string
 *                     description: The Product name
 *                     example: Monitor curvo 47'
 *                 price:
 *                     type: number
 *                     description: The Product price
 *                     example: 100
 *                 availability:
 *                     type: boolean
 *                     description: The Product availability
 *                     example: true 
 * 
*/

/**
 * @swagger 
 * /api/products:
 *     get:
 *         summary: Get a lis of products
 *         tags:
 *            - Products
 *         description: Return a lis of products 
 *         responses: 
 *             200:
 *                 description: Successful response
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 $ref: '#/components/schemas/Product' 
 */
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *     summary: Get a product by ID 
 *     tags:
 *        - Products
 *     description: Retunr a product based on its unique ID
 *     parameters:
 *       - in: path 
 *         name: id
 *         description: The ID of teh product to retrive
 *         required: true
 *         schema: 
 *             type: integer
 *     responses:
 *         200:
 *             description: Seccessful Response
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Product'
 *         404:
 *             description: Not Found 
 *         400:
 *             description: Bad Request - Invalid ID
 */
 

router.get('/', getProducts)

router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors, 
    getProductById
)

/**
 * @swagger
 * /api/products: 
 *     post:
 *         summary: Creates a new Product
 *         tags:
 *            - Products
 *         description: Returns a new record in the db
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                                 name: 
 *                                     type: string
 *                                     example: "Monitor Curvo 27'"
 *                                 price: 
 *                                     type: number
 *                                     example: 250
 *         responses:
 *             201:
 *                 description: Successful response
 *                 content: 
 *                     application/json:
 *                         schema: 
 *                             $ref: '#/components/schemas/Product'             
 *             400:
 *                 description: Bad resquest - invalid input data
 */


router.post('/', 
    
    //Validación 
    body('name')
        .notEmpty().withMessage('El nombre del producto esta vacio'),       

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto esta vacio')
        .custom(value => value > 0).withMessage('Valor no válido'), 
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *     put:
 *         summary: Updates a product wwith user input
 *         tags:
 *           - Products
 *         description: Retunr the update product 
 *         parameters: 
 *              - in: path 
 *                name: id
 *                description: The ID of teh product to retrive
 *                required: true
 *                schema: 
 *                     type: integer    
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                                 name: 
 *                                     type: string
 *                                     example: "Monitor Curvo 27 - update'"
 *                                 price: 
 *                                     type: number
 *                                     example: 350
 *                                 availability: 
 *                                      type: boolean
 *                                      example: true
 *         responses: 
 *             200:
 *                 description: Successful response
 *                 content: 
 *                     application/json:
 *                         schema: 
 *                             $ref: '#/components/schemas/Product'
 *             400:
 *                 description: Bad request - Invalid ID or Invalid input data
 *             404:
 *                 description: Product Not Found
 */

router.put('/:id', 
    //Validación 
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto esta vacio'),       

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto esta vacio')
        .custom(value => value > 0).withMessage('Precio no válido'), 
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad  no valido'),
    handleInputErrors,
    updateProduct
) 

/**
 * @swagger
 * /api/products/{id}:
 *     patch:
 *         summary: Update Product availability
 *         tags:
 *            - Products
 *         description: Returns the update availability
 *         parameters: 
 *              - in: path 
 *                name: id
 *                description: The ID of teh product to retrive
 *                required: true
 *                schema: 
 *                     type: integer
 *         responses: 
 *             200:
 *                 description: Successful response
 *                 content: 
 *                     application/json:
 *                         schema: 
 *                             $ref: '#/components/schemas/Product'
 *             400:
 *                 description: Bad request - Invalid ID or Invalid input data
 *             404:
 *                 description: Product Not Found
 * 
 *                      
 * 
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 *  /api/products/{id}:
 *     delete:
 *         summary: Deletes a product by a given ID
 *         tags:
 *            - Products
 *         description: Returns a confirmation message
 *         parameters: 
 *              - in: path 
 *                name: id
 *                description: The ID of teh product to delete
 *                required: true
 *                schema: 
 *                     type: integer
 *         responses: 
 *             200:
 *                 description: Successful response
 *                 content: 
 *                     application/json:
 *                         schema: 
 *                             type: string
 *                             value: 'Producto eliminado'
 *             400:
 *                 description: Bad request - Invalid ID or Invalid input data
 *             404:
 *                 description: Product Not Found
 */

router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)


export default router