"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swaggerUiAssetPath = require("swagger-ui-dist");
const express = require("express");
const path = require("path");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    const port = process.env.PORT;
    const swaggerDistPath = swaggerUiAssetPath.getAbsoluteFSPath();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('HRMS')
        .setDescription('These are the APIs belongs to HRMS Backend')
        .setVersion('1.0')
        .addTag('hrms')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use('/api-doc', express.static(path.join(__dirname, './swagger-ui-dist')));
    await app.listen(port, () => {
        console.log('listening to port ', port);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map