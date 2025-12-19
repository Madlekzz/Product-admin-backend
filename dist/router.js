"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("./handlers/product");
const middleware_1 = require("./middleware");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// Documentación de la API
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the product's id
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: the product's name
 *                  example: Monitor curvo
 *              price:
 *                  type: number
 *                  description: the product's price
 *                  example: 150
 *              availability:
 *                  type: boolean
 *                  description: the product's availability
 *                  example: true
 */
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: the ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad request - Invalid ID
 */
/**
 * @swagger
 * /api/products/:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Creates a new product in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo"
 *                              price:
 *                                  type: number
 *                                  example: 150
 *          responses:
 *              201:
 *                  description: Product created successfully
 *              400:
 *                  description: Bad request - Invalid values in request body
 */
/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates the values of a product
 *          tags:
 *              - Products
 *          description: Updates the values of a product in the database
 *          parameters:
 *            - in: path
 *              name: id
 *              description: the ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo"
 *                              price:
 *                                  type: number
 *                                  example: 150
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Product updated successfully
 *              400:
 *                  description: Bad request - Invalid values in request body
 *              404:
 *                  description: Product not found - Non Existant Id
 */
/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Changes the availability of a product
 *          tags:
 *              - Products
 *          description: Updates the availability of a product to it's opposite value
 *          parameters:
 *            - in: path
 *              name: id
 *              description: the ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Product updated successfully
 *              400:
 *                  description: Bad request - Invalid ID
 *              404:
 *                  description: Product not found - Non Existant ID
 */
/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product
 *          tags:
 *              - Products
 *          description: Deletes a product from the database
 *          parameters:
 *            - in: path
 *              name: id
 *              description: the ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Product deleted successfully
 *              400:
 *                  description: Bad request - Invalid ID
 *              404:
 *                  description: Product not found - Non Existant ID
 */
router.get('/', product_1.getProducts);
router.get('/:id', (0, express_validator_1.param)('id')
    .isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.getProductById);
router.post('/', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'), (0, express_validator_1.body)('price')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .isNumeric().withMessage('Valor no valido')
    .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'), middleware_1.handleInputErrors, product_1.createProduct);
router.put('/:id', (0, express_validator_1.param)('id')
    .isInt().withMessage('ID no válido'), (0, express_validator_1.body)('price')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .isNumeric().withMessage('Valor no valido')
    .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'), (0, express_validator_1.body)('availability')
    .isBoolean().withMessage('Valor para disponibilidad no válido'), middleware_1.handleInputErrors, product_1.updateProduct);
router.patch('/:id', (0, express_validator_1.param)('id')
    .isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.updateAvailability);
router.delete('/:id', (0, express_validator_1.param)('id')
    .isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map