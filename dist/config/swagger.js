"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: "1.0.0",
            description: 'API docs for Products'
        }
    },
    apis: ['./src/router.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Esports_organization_Fnatic_logo.svg/2560px-Esports_organization_Fnatic_logo.svg.png');
            height: 100px;
            width: auto;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / Typescript'
};
exports.swaggerUiOptions = swaggerUiOptions;
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map