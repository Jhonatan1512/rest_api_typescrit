import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi:  '3.1.0',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TS',
            version: '2.0.0',
            description: 'API Docs for Products'
        }
    } ,
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('');
            height: 120px;
            width: auto
        }
        .swagger-ui .topbar{
            background-color: #2b3b45
        }
    `,
    customSiteTitle: 'API Documentation'
} 

export default swaggerSpec
export {swaggerUiOptions}