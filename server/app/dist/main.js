/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ratings_module_1 = __webpack_require__(/*! ./modules/ratings.module */ "./src/modules/ratings.module.ts");
const orders_module_1 = __webpack_require__(/*! ./modules/orders.module */ "./src/modules/orders.module.ts");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./src/entities/user.entity.ts");
const bonus_card_entity_1 = __webpack_require__(/*! ./entities/bonus-card.entity */ "./src/entities/bonus-card.entity.ts");
const product_entity_1 = __webpack_require__(/*! ./entities/product.entity */ "./src/entities/product.entity.ts");
const order_entity_1 = __webpack_require__(/*! ./entities/order.entity */ "./src/entities/order.entity.ts");
const order_item_entity_1 = __webpack_require__(/*! ./entities/order-item.entity */ "./src/entities/order-item.entity.ts");
const rating_entity_1 = __webpack_require__(/*! ./entities/rating.entity */ "./src/entities/rating.entity.ts");
const reward_transaction_entity_1 = __webpack_require__(/*! ./entities/reward-transaction.entity */ "./src/entities/reward-transaction.entity.ts");
const nestjs_cls_1 = __webpack_require__(/*! nestjs-cls */ "nestjs-cls");
const users_module_1 = __webpack_require__(/*! ./modules/users.module */ "./src/modules/users.module.ts");
const auth_module_1 = __webpack_require__(/*! ./modules/auth.module */ "./src/modules/auth.module.ts");
const product_credit_entity_1 = __webpack_require__(/*! ./entities/product-credit.entity */ "./src/entities/product-credit.entity.ts");
const stores_entity_1 = __webpack_require__(/*! ./entities/stores.entity */ "./src/entities/stores.entity.ts");
const ai_classification_module_1 = __webpack_require__(/*! ./modules/ai-classification.module */ "./src/modules/ai-classification.module.ts");
const ai_classification_entity_1 = __webpack_require__(/*! ./entities/ai-classification.entity */ "./src/entities/ai-classification.entity.ts");
const products_module_1 = __webpack_require__(/*! ./modules/products.module */ "./src/modules/products.module.ts");
const markets_module_1 = __webpack_require__(/*! ./modules/markets.module */ "./src/modules/markets.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: { mount: true }
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 3306),
                    username: configService.get('DB_USERNAME', 'root'),
                    password: configService.get('DB_PASSWORD', ''),
                    database: configService.get('DB_DATABASE', 'bonus_card_rating'),
                    entities: [
                        user_entity_1.User,
                        bonus_card_entity_1.BonusCard,
                        product_entity_1.Product,
                        order_entity_1.Order,
                        order_item_entity_1.OrderItem,
                        rating_entity_1.Rating,
                        reward_transaction_entity_1.RewardTransaction,
                        product_credit_entity_1.ProductCredit,
                        stores_entity_1.Market,
                        ai_classification_entity_1.AiClassification
                    ],
                    synchronize: configService.get('DB_SYNCHRONIZE', false),
                    logging: configService.get('DB_LOGGING', false),
                    timezone: 'Z',
                }),
                inject: [config_1.ConfigService],
            }),
            ratings_module_1.RatingsModule,
            orders_module_1.OrdersModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            ai_classification_module_1.AiClassificationModule,
            products_module_1.ProductsModule,
            markets_module_1.MarketsModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),

/***/ "./src/controllers/ai-classification.controller.ts":
/*!*********************************************************!*\
  !*** ./src/controllers/ai-classification.controller.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiClassificationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const ai_classification_service_1 = __webpack_require__(/*! @/services/ai-classification.service */ "./src/services/ai-classification.service.ts");
const ai_classification_dto_1 = __webpack_require__(/*! @/dtos/ai-classification.dto */ "./src/dtos/ai-classification.dto.ts");
const auth_guard_1 = __webpack_require__(/*! @/guards/auth.guard */ "./src/guards/auth.guard.ts");
const admin_guard_1 = __webpack_require__(/*! @/guards/admin.guard */ "./src/guards/admin.guard.ts");
let AiClassificationController = class AiClassificationController {
    constructor(aiClassificationService) {
        this.aiClassificationService = aiClassificationService;
    }
    async checkHealth() {
        const health = await this.aiClassificationService.checkFastAPIHealth();
        return {
            statusCode: 200,
            message: 'FastAPI service health check',
            data: health,
        };
    }
    async findAll(limit, offset) {
        const classifications = await this.aiClassificationService.findAll(limit, offset);
        return {
            statusCode: 200,
            message: 'Classifications retrieved successfully',
            data: classifications,
        };
    }
    async getByRating(ratingId) {
        const classifications = await this.aiClassificationService.getClassificationsByRating(ratingId);
        return {
            statusCode: 200,
            message: 'Classifications retrieved successfully',
            data: classifications,
        };
    }
    async getByProduct(productId) {
        const classifications = await this.aiClassificationService.getClassificationsByProduct(productId);
        return {
            statusCode: 200,
            message: 'Product classifications retrieved successfully',
            data: classifications,
            count: classifications.length,
        };
    }
    async getProductStats(productId) {
        const stats = await this.aiClassificationService.getProductClassificationStats(productId);
        return {
            statusCode: 200,
            message: 'Statistics retrieved successfully',
            data: stats,
        };
    }
    async getGlobalStats() {
        const stats = await this.aiClassificationService.getGlobalTopicDistribution();
        return {
            statusCode: 200,
            message: 'Global statistics retrieved successfully',
            data: stats,
        };
    }
    async findOne(id) {
        const classification = await this.aiClassificationService.findOne(id);
        return {
            statusCode: 200,
            message: 'Classification retrieved successfully',
            data: classification,
        };
    }
    async remove(id) {
        await this.aiClassificationService.remove(id);
        return {
            statusCode: 200,
            message: 'Classification deleted successfully',
        };
    }
};
exports.AiClassificationController = AiClassificationController;
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({
        summary: 'Check FastAPI service health',
        description: 'Verify if the FastAPI classification service is available'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Health check result',
        schema: {
            example: {
                statusCode: 200,
                message: 'FastAPI service health check',
                data: {
                    available: true,
                    url: 'http://localhost:8000'
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiClassificationController.prototype, "checkHealth", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all AI classifications',
        description: 'Retrieve all comment classifications with pagination'
    }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 50 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, type: Number, example: 0 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Classifications retrieved successfully',
        type: [ai_classification_dto_1.AiClassificationDto]
    }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AiClassificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('rating/:ratingId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get classifications for a specific rating',
        description: 'Retrieve all topic classifications for a given rating'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Classifications found',
        type: [ai_classification_dto_1.AiClassificationDto]
    }),
    __param(0, (0, common_1.Param)('ratingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiClassificationController.prototype, "getByRating", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all classifications for a product',
        description: 'Retrieve all comment classifications across all ratings for a product'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product classifications found',
        type: [ai_classification_dto_1.AiClassificationDto]
    }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiClassificationController.prototype, "getByProduct", null);
__decorate([
    (0, common_1.Get)('product/:productId/stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get classification statistics for a product',
        description: 'Get aggregated topic statistics (count, confidence, percentage) for a product'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Statistics retrieved successfully',
        type: [ai_classification_dto_1.ClassificationStatsDto],
        schema: {
            example: {
                statusCode: 200,
                message: 'Statistics retrieved successfully',
                data: [
                    {
                        topicLabel: 'Keyfiyyət',
                        count: 125,
                        averageConfidence: 0.87,
                        percentage: 35.5
                    },
                    {
                        topicLabel: 'Qiymət',
                        count: 89,
                        averageConfidence: 0.82,
                        percentage: 25.3
                    }
                ]
            }
        }
    }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiClassificationController.prototype, "getProductStats", null);
__decorate([
    (0, common_1.Get)('stats/global'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get global topic distribution',
        description: 'Get topic statistics across all products and ratings'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Global statistics retrieved',
        type: [ai_classification_dto_1.ClassificationStatsDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiClassificationController.prototype, "getGlobalStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get classification by ID',
        description: 'Retrieve a specific classification with full details'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Classification found',
        type: ai_classification_dto_1.AiClassificationDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Classification not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AiClassificationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a classification',
        description: 'Remove a classification from the system'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Classification deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Classification not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AiClassificationController.prototype, "remove", null);
exports.AiClassificationController = AiClassificationController = __decorate([
    (0, common_1.Controller)('ai-classifications'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiTags)('AI Classifications'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof ai_classification_service_1.AiClassificationService !== "undefined" && ai_classification_service_1.AiClassificationService) === "function" ? _a : Object])
], AiClassificationController);


/***/ }),

/***/ "./src/controllers/auth.controller.ts":
/*!********************************************!*\
  !*** ./src/controllers/auth.controller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const create_auth_dto_1 = __webpack_require__(/*! @/dtos/create-auth.dto */ "./src/dtos/create-auth.dto.ts");
const register_auth_dto_1 = __webpack_require__(/*! @/dtos/register-auth.dto */ "./src/dtos/register-auth.dto.ts");
const auth_service_1 = __webpack_require__(/*! @/services/auth.service */ "./src/services/auth.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    register(registerDto) {
        return this.authService.register(registerDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'User login',
        description: 'Authenticate user with phone and password'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login successful',
        schema: {
            example: {
                status: true,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    name: 'Orkhan',
                    surname: 'Aliyev',
                    phone: '+994501234567'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid credentials'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_auth_dto_1.loginDto !== "undefined" && create_auth_dto_1.loginDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'User registration',
        description: 'Create a new user account'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Registration successful',
        schema: {
            example: {
                status: true,
                message: 'User registered successfully',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    name: 'Orkhan',
                    surname: 'Aliyev',
                    phone: '+994501234567'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Phone number already exists'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Validation error'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof register_auth_dto_1.RegisterDto !== "undefined" && register_auth_dto_1.RegisterDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)("auth"),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./src/controllers/markets.controller.ts":
/*!***********************************************!*\
  !*** ./src/controllers/markets.controller.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarketsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const markets_service_1 = __webpack_require__(/*! ../services/markets.service */ "./src/services/markets.service.ts");
const create_market_dto_1 = __webpack_require__(/*! @/dtos/create-market.dto */ "./src/dtos/create-market.dto.ts");
const update_market_dto_1 = __webpack_require__(/*! @/dtos/update-market.dto */ "./src/dtos/update-market.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const auth_guard_1 = __webpack_require__(/*! @/guards/auth.guard */ "./src/guards/auth.guard.ts");
const admin_guard_1 = __webpack_require__(/*! @/guards/admin.guard */ "./src/guards/admin.guard.ts");
let MarketsController = class MarketsController {
    constructor(marketsService) {
        this.marketsService = marketsService;
    }
    create(createMarketDto) {
        return this.marketsService.create(createMarketDto);
    }
    findAll() {
        return this.marketsService.findAll();
    }
    findOne(id) {
        return this.marketsService.findOne(+id);
    }
    update(id, updateMarketDto) {
        return this.marketsService.update(+id, updateMarketDto);
    }
    remove(id) {
        return this.marketsService.remove(+id);
    }
};
exports.MarketsController = MarketsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_market_dto_1.CreateMarketDto !== "undefined" && create_market_dto_1.CreateMarketDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], MarketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MarketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_market_dto_1.UpdateMarketDto !== "undefined" && update_market_dto_1.UpdateMarketDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], MarketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketsController.prototype, "remove", null);
exports.MarketsController = MarketsController = __decorate([
    (0, common_1.Controller)('markets'),
    (0, swagger_1.ApiTags)('Markets'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof markets_service_1.MarketsService !== "undefined" && markets_service_1.MarketsService) === "function" ? _a : Object])
], MarketsController);


/***/ }),

/***/ "./src/controllers/orders.controller.ts":
/*!**********************************************!*\
  !*** ./src/controllers/orders.controller.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const orders_service_1 = __webpack_require__(/*! ../services/orders.service */ "./src/services/orders.service.ts");
const order_dto_1 = __webpack_require__(/*! ../dtos/order.dto */ "./src/dtos/order.dto.ts");
const create_order_dto_1 = __webpack_require__(/*! ../dtos/create-order.dto */ "./src/dtos/create-order.dto.ts");
const auth_guard_1 = __webpack_require__(/*! @/guards/auth.guard */ "./src/guards/auth.guard.ts");
const admin_guard_1 = __webpack_require__(/*! @/guards/admin.guard */ "./src/guards/admin.guard.ts");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async createOrder(createOrderDto) {
        const order = await this.ordersService.createOrder(createOrderDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: `Order created successfully! You earned $${order.bonusEarned.toFixed(2)} in cashback bonus.`,
            data: order
        };
    }
    async getMyOrders(query) {
        const orders = await this.ordersService.getMyOrders(query);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Orders retrieved successfully',
            data: orders
        };
    }
    async getOrderByIdAdmin(orderId) {
        const order = await this.ordersService.getOrderByIdAdmin(orderId);
        return {
            statusCode: common_1.HttpStatus.OK,
            data: order
        };
    }
    async getOrderById(orderId) {
        const order = await this.ordersService.getOrderById(orderId);
        return {
            statusCode: common_1.HttpStatus.OK,
            data: order
        };
    }
    async getUnratedProducts() {
        const products = await this.ordersService.getUnratedProducts();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: products.length > 0
                ? `You have ${products.length} product(s) waiting for your review! Rate them to earn bonus points.`
                : 'Great job! You\'ve rated all your purchased products.',
            data: products
        };
    }
    async getOrderStats() {
        const stats = await this.ordersService.getOrderStats();
        return {
            statusCode: common_1.HttpStatus.OK,
            data: stats
        };
    }
    async delete(id) {
        return this.ordersService.deleteOrder(id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create new order',
        description: 'Create a new order by providing bonus card and products. Automatically calculates total and bonus cashback (5%).',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Order created successfully',
        type: create_order_dto_1.OrderCreatedResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid bonus card, products not found, or validation error',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_order_dto_1.CreateOrderDto !== "undefined" && create_order_dto_1.CreateOrderDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('my-orders'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get my orders',
        description: 'Retrieve user\'s purchase history. Products are automatically sorted by PL status (PL first) and then by popularity (rating count).',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orders retrieved successfully with sorted products',
        type: [order_dto_1.MyOrdersResponseDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof order_dto_1.GetMyOrdersQueryDto !== "undefined" && order_dto_1.GetMyOrdersQueryDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], OrdersController.prototype, "getMyOrders", null);
__decorate([
    (0, common_1.Get)('admin/:orderId'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get order by ID (Admin)',
        description: 'Retrieve detailed information about any order (Admin only)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'orderId',
        description: 'UUID of the order',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order details retrieved successfully',
        type: order_dto_1.MyOrdersResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Order not found',
    }),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], OrdersController.prototype, "getOrderByIdAdmin", null);
__decorate([
    (0, common_1.Get)(':orderId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get order by ID',
        description: 'Retrieve detailed information about a specific order',
    }),
    (0, swagger_1.ApiParam)({
        name: 'orderId',
        description: 'UUID of the order',
        example: '550e8400-e29b-41d4-a716-446655440030',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order details retrieved successfully',
        type: order_dto_1.MyOrdersResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Order not found',
    }),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], OrdersController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Get)('my-orders/unrated'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get unrated products',
        description: 'Retrieve all products from completed orders that the user hasn\'t rated yet. Perfect for prompting reviews.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Unrated products retrieved successfully',
        type: [order_dto_1.ProductInOrderDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], OrdersController.prototype, "getUnratedProducts", null);
__decorate([
    (0, common_1.Get)('my-orders/stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get order statistics',
        description: 'Get user\'s order statistics including total orders, total spent, and total bonus earned',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order statistics retrieved successfully',
        schema: {
            properties: {
                statusCode: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        totalOrders: { type: 'number', example: 12 },
                        totalSpent: { type: 'number', example: 456.78 },
                        totalBonusEarned: { type: 'number', example: 22.84 },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], OrdersController.prototype, "getOrderStats", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete order (Admin)',
        description: 'Delete an order and all its related data (items, credits). Admin only.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'UUID of the order to delete',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order deleted successfully',
        type: order_dto_1.DeleteOrderResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Order not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], OrdersController.prototype, "delete", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _a : Object])
], OrdersController);


/***/ }),

/***/ "./src/controllers/products.controller.ts":
/*!************************************************!*\
  !*** ./src/controllers/products.controller.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsController = void 0;
const create_product_dto_1 = __webpack_require__(/*! @/dtos/create-product.dto */ "./src/dtos/create-product.dto.ts");
const update_product_dto_1 = __webpack_require__(/*! @/dtos/update-product.dto */ "./src/dtos/update-product.dto.ts");
const admin_guard_1 = __webpack_require__(/*! @/guards/admin.guard */ "./src/guards/admin.guard.ts");
const auth_guard_1 = __webpack_require__(/*! @/guards/auth.guard */ "./src/guards/auth.guard.ts");
const products_service_1 = __webpack_require__(/*! @/services/products.service */ "./src/services/products.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    async findTop() {
        return await this.productsService.findTop();
    }
    findAll() {
        return this.productsService.findAll();
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('top'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findTop", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_product_dto_1.UpdateProductDto !== "undefined" && update_product_dto_1.UpdateProductDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiTags)("products"),
    __metadata("design:paramtypes", [typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object])
], ProductsController);


/***/ }),

/***/ "./src/controllers/ratings.controller.ts":
/*!***********************************************!*\
  !*** ./src/controllers/ratings.controller.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const ratings_service_1 = __webpack_require__(/*! ../services/ratings.service */ "./src/services/ratings.service.ts");
const rating_dto_1 = __webpack_require__(/*! ../dtos/rating.dto */ "./src/dtos/rating.dto.ts");
const auth_guard_1 = __webpack_require__(/*! @/guards/auth.guard */ "./src/guards/auth.guard.ts");
const ai_classification_service_1 = __webpack_require__(/*! @/services/ai-classification.service */ "./src/services/ai-classification.service.ts");
const update_rating_dto_1 = __webpack_require__(/*! @/dtos/update-rating.dto */ "./src/dtos/update-rating.dto.ts");
const admin_guard_1 = __webpack_require__(/*! @/guards/admin.guard */ "./src/guards/admin.guard.ts");
let RatingsController = class RatingsController {
    constructor(ratingsService, aiClassificationService) {
        this.ratingsService = ratingsService;
        this.aiClassificationService = aiClassificationService;
    }
    async createRating(createRatingDto) {
        const rating = await this.ratingsService.createRating(createRatingDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: `Rating submitted successfully! You earned ${rating.rewardPoints} bonus points ($${rating.rewardAmount.toFixed(2)})`,
            data: rating
        };
    }
    async updateRating(ratingId, updateRatingDto) {
        const updatedRating = await this.ratingsService.updateRating(ratingId, updateRatingDto);
        return {
            statusCode: 200,
            message: 'Rating updated successfully',
            data: updatedRating
        };
    }
    async getProductRatings(productId) {
        const ratings = await this.ratingsService.getProductRatings(productId);
        return {
            statusCode: common_1.HttpStatus.OK,
            data: ratings
        };
    }
    async getProductRatingStats(productId) {
        const stats = await this.ratingsService.getProductRatingStats(productId);
        return {
            statusCode: common_1.HttpStatus.OK,
            data: stats
        };
    }
    async getMyRatings() {
        const ratings = await this.ratingsService.getUserRatings();
        return {
            statusCode: common_1.HttpStatus.OK,
            data: ratings
        };
    }
};
exports.RatingsController = RatingsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit a product rating',
        description: 'Rate a product you have purchased. Earn 30 points for PL products or 10 points for normal products. Comment is always optional.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Rating successfully created and bonus points awarded',
        type: rating_dto_1.RatingResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Invalid input',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product not found or is not active',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'User has already rated this product',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof rating_dto_1.CreateRatingDto !== "undefined" && rating_dto_1.CreateRatingDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], RatingsController.prototype, "createRating", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof update_rating_dto_1.UpdateRatingDto !== "undefined" && update_rating_dto_1.UpdateRatingDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "updateRating", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('product/:productId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get product ratings',
        description: 'Retrieve all ratings and reviews for a specific product',
    }),
    (0, swagger_1.ApiParam)({
        name: 'productId',
        description: 'UUID of the product',
        example: '550e8400-e29b-41d4-a716-446655440012',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of ratings for the product',
        type: [rating_dto_1.RatingResponseDto],
    }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], RatingsController.prototype, "getProductRatings", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('product/:productId/stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get product rating statistics',
        description: 'Get aggregated rating data including average, total count, and distribution by star level',
    }),
    (0, swagger_1.ApiParam)({
        name: 'productId',
        description: 'UUID of the product',
        example: '550e8400-e29b-41d4-a716-446655440012',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Rating statistics for the product',
        type: rating_dto_1.ProductRatingStatsDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product not found',
    }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], RatingsController.prototype, "getProductRatingStats", null);
__decorate([
    (0, common_1.Get)('my-ratings'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get my ratings',
        description: 'Retrieve all ratings submitted by the authenticated user',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of user\'s ratings',
        type: [rating_dto_1.RatingResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], RatingsController.prototype, "getMyRatings", null);
exports.RatingsController = RatingsController = __decorate([
    (0, swagger_1.ApiTags)('ratings'),
    (0, common_1.Controller)('ratings'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof ratings_service_1.RatingsService !== "undefined" && ratings_service_1.RatingsService) === "function" ? _a : Object, typeof (_b = typeof ai_classification_service_1.AiClassificationService !== "undefined" && ai_classification_service_1.AiClassificationService) === "function" ? _b : Object])
], RatingsController);


/***/ }),

/***/ "./src/controllers/users.controller.ts":
/*!*********************************************!*\
  !*** ./src/controllers/users.controller.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const create_user_dto_1 = __webpack_require__(/*! @/dtos/create-user.dto */ "./src/dtos/create-user.dto.ts");
const update_user_dto_1 = __webpack_require__(/*! @/dtos/update-user.dto */ "./src/dtos/update-user.dto.ts");
const admin_guard_1 = __webpack_require__(/*! @/guards/admin.guard */ "./src/guards/admin.guard.ts");
const auth_guard_1 = __webpack_require__(/*! @/guards/auth.guard */ "./src/guards/auth.guard.ts");
const users_service_1 = __webpack_require__(/*! @/services/users.service */ "./src/services/users.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        try {
            return await this.usersService.create(createUserDto);
        }
        catch (error) {
            let errorMessage = {
                statusCode: 409,
                message: error.message
            };
            return errorMessage;
        }
    }
    findAll() {
        return this.usersService.findAll();
    }
    getMe() {
        return this.usersService.getMe();
    }
    async findOne(id) {
        try {
            return await this.usersService.findOne(id);
        }
        catch (error) {
            let errorMessage = {
                statusCode: 404,
                message: error.message
            };
            return errorMessage;
        }
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _c : Object, typeof (_d = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),

/***/ "./src/dtos/ai-classification.dto.ts":
/*!*******************************************!*\
  !*** ./src/dtos/ai-classification.dto.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClassificationStatsDto = exports.CreateAiClassificationDto = exports.AiClassificationDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AiClassificationDto {
}
exports.AiClassificationDto = AiClassificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Classification ID',
        example: 1,
    }),
    __metadata("design:type", Number)
], AiClassificationDto.prototype, "classificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rating ID this classification belongs to',
        example: '550e8400-e29b-41d4-a716-446655440100',
    }),
    __metadata("design:type", String)
], AiClassificationDto.prototype, "ratingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Topic label identified by AI',
        example: 'Quality',
        enum: ['Quality', 'Price', 'Packaging', 'Taste', 'Service', 'Delivery', 'Other'],
    }),
    __metadata("design:type", String)
], AiClassificationDto.prototype, "topicLabel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'AI model confidence score (0-1)',
        example: 0.95,
        minimum: 0,
        maximum: 1,
    }),
    __metadata("design:type", Number)
], AiClassificationDto.prototype, "topicConfidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The comment text that was classified',
        example: 'The product quality is excellent!',
    }),
    __metadata("design:type", String)
], AiClassificationDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Classification creation date',
        example: '2024-12-23T10:30:00.000Z',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AiClassificationDto.prototype, "createdAt", void 0);
class CreateAiClassificationDto {
}
exports.CreateAiClassificationDto = CreateAiClassificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rating ID to classify',
        example: '550e8400-e29b-41d4-a716-446655440100',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAiClassificationDto.prototype, "ratingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Topic label',
        example: 'Quality',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAiClassificationDto.prototype, "topicLabel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Confidence score (0-1)',
        example: 0.95,
        minimum: 0,
        maximum: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", Number)
], CreateAiClassificationDto.prototype, "topicConfidence", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Comment text',
        example: 'The product quality is excellent!',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAiClassificationDto.prototype, "comment", void 0);
class ClassificationStatsDto {
}
exports.ClassificationStatsDto = ClassificationStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Topic label',
        example: 'Quality',
    }),
    __metadata("design:type", String)
], ClassificationStatsDto.prototype, "topicLabel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of mentions',
        example: 125,
    }),
    __metadata("design:type", Number)
], ClassificationStatsDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Average confidence score',
        example: 0.87,
    }),
    __metadata("design:type", Number)
], ClassificationStatsDto.prototype, "averageConfidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentage of total classifications',
        example: 35.5,
    }),
    __metadata("design:type", Number)
], ClassificationStatsDto.prototype, "percentage", void 0);


/***/ }),

/***/ "./src/dtos/create-auth.dto.ts":
/*!*************************************!*\
  !*** ./src/dtos/create-auth.dto.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class loginDto {
}
exports.loginDto = loginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        default: "+9941234567"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+\d{10,15}$/),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], loginDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        default: "salam123"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], loginDto.prototype, "password", void 0);


/***/ }),

/***/ "./src/dtos/create-market.dto.ts":
/*!***************************************!*\
  !*** ./src/dtos/create-market.dto.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMarketDto = void 0;
class CreateMarketDto {
}
exports.CreateMarketDto = CreateMarketDto;


/***/ }),

/***/ "./src/dtos/create-order.dto.ts":
/*!**************************************!*\
  !*** ./src/dtos/create-order.dto.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderCreatedResponseDto = exports.CreateOrderDto = exports.CreateOrderItemDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateOrderItemDto {
}
exports.CreateOrderItemDto = CreateOrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product ID to add to order',
        example: '550e8400-e29b-41d4-a716-446655440012',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of the product',
        example: 2,
        minimum: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'Quantity must be at least 1' }),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "quantity", void 0);
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bonus card number used for this purchase',
        example: 'BC-2024-001234',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "bonusCardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of products and quantities to order',
        type: [CreateOrderItemDto],
        example: [
            { productId: '550e8400-e29b-41d4-a716-446655440012', quantity: 2 },
            { productId: '550e8400-e29b-41d4-a716-446655440020', quantity: 1 },
        ],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateOrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Market Id',
        example: '94021cad-e008-11f0-a98e-7440e2b1cdee',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "marketId", void 0);
class OrderCreatedResponseDto {
}
exports.OrderCreatedResponseDto = OrderCreatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order ID', example: '550e8400-e29b-41d4-a716-446655440030' }),
    __metadata("design:type", String)
], OrderCreatedResponseDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order creation date', example: '2024-12-20T15:30:00.000Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], OrderCreatedResponseDto.prototype, "orderDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total order amount', example: 45.92 }),
    __metadata("design:type", Number)
], OrderCreatedResponseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bonus earned from this purchase (5% cashback)', example: 2.30 }),
    __metadata("design:type", Number)
], OrderCreatedResponseDto.prototype, "bonusEarned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of items in order', example: 3 }),
    __metadata("design:type", Number)
], OrderCreatedResponseDto.prototype, "itemCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Products ordered',
        example: [
            {
                productId: '550e8400-e29b-41d4-a716-446655440012',
                productName: 'Signature Chocolate Cookies',
                quantity: 2,
                unitPrice: 6.99,
                totalPrice: 13.98,
            },
        ],
    }),
    __metadata("design:type", Array)
], OrderCreatedResponseDto.prototype, "items", void 0);


/***/ }),

/***/ "./src/dtos/create-product.dto.ts":
/*!****************************************!*\
  !*** ./src/dtos/create-product.dto.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProductDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Organic Apple',
        description: 'The name of the product',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Fresh organic apples from local farm',
        description: 'Detailed description of the product',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'APP-001',
        description: 'Stock Keeping Unit',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "sku", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether users can rate this product',
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "allowedRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0.10,
        description: 'Static reward amount in dollars for rating this product',
        default: 0.00,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "rewardAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2.99,
        description: 'Price of the product',
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: false,
        description: 'Is this a Private Label product?',
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isPrivateLabel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Is product active in catalog?',
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: false,
        description: 'Is this a new product?',
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isNew", void 0);


/***/ }),

/***/ "./src/dtos/create-user.dto.ts":
/*!*************************************!*\
  !*** ./src/dtos/create-user.dto.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        default: "Suleyman"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        default: "Asgarov"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        default: "+9941234567"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+\d{10,15}$/),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        default: "ruhi123"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2007-08-31',
        description: 'Date of birth in ISO format (YYYY-MM-DD)'
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "dateOfBirth", void 0);


/***/ }),

/***/ "./src/dtos/order.dto.ts":
/*!*******************************!*\
  !*** ./src/dtos/order.dto.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteOrderResponseDto = exports.GetMyOrdersQueryDto = exports.MyOrdersResponseDto = exports.ProductInOrderDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class ProductInOrderDto {
}
exports.ProductInOrderDto = ProductInOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product ID', example: '550e8400-e29b-41d4-a716-446655440012' }),
    __metadata("design:type", String)
], ProductInOrderDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product name', example: 'Signature Chocolate Cookies' }),
    __metadata("design:type", String)
], ProductInOrderDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product description', example: 'Decadent chocolate chip cookies' }),
    __metadata("design:type", String)
], ProductInOrderDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product price', example: 6.99 }),
    __metadata("design:type", Number)
], ProductInOrderDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is this a Private Label product', example: true }),
    __metadata("design:type", Boolean)
], ProductInOrderDto.prototype, "isPrivateLabel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of ratings', example: 421 }),
    __metadata("design:type", Number)
], ProductInOrderDto.prototype, "ratingCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average rating score', example: 4.8 }),
    __metadata("design:type", Number)
], ProductInOrderDto.prototype, "averageRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity ordered', example: 2 }),
    __metadata("design:type", Number)
], ProductInOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total price for this product', example: 13.98 }),
    __metadata("design:type", Number)
], ProductInOrderDto.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Has the user rated this product', example: false }),
    __metadata("design:type", Boolean)
], ProductInOrderDto.prototype, "hasUserRated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Can this product be rated', example: true }),
    __metadata("design:type", Boolean)
], ProductInOrderDto.prototype, "rateable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Standard reward amount for rating this product', example: 0.10 }),
    __metadata("design:type", Number)
], ProductInOrderDto.prototype, "rewardAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User\'s rating for this product if exists',
        example: { score: 5, comment: 'Great!', createdAt: '2024-12-20T15:30:00.000Z' },
    }),
    __metadata("design:type", Object)
], ProductInOrderDto.prototype, "userRating", void 0);
class MyOrdersResponseDto {
}
exports.MyOrdersResponseDto = MyOrdersResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order ID', example: '550e8400-e29b-41d4-a716-446655440030' }),
    __metadata("design:type", String)
], MyOrdersResponseDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order date', example: '2024-12-15T10:30:00.000Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], MyOrdersResponseDto.prototype, "orderDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total order amount', example: 45.92 }),
    __metadata("design:type", Number)
], MyOrdersResponseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bonus earned from purchase', example: 2.30 }),
    __metadata("design:type", Number)
], MyOrdersResponseDto.prototype, "bonusEarned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Products in this order', type: [ProductInOrderDto] }),
    __metadata("design:type", Array)
], MyOrdersResponseDto.prototype, "products", void 0);
class GetMyOrdersQueryDto {
}
exports.GetMyOrdersQueryDto = GetMyOrdersQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Maximum number of orders to return',
        example: 50,
        default: 50,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetMyOrdersQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of orders to skip for pagination',
        example: 0,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GetMyOrdersQueryDto.prototype, "offset", void 0);
class DeleteOrderResponseDto {
}
exports.DeleteOrderResponseDto = DeleteOrderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order ID', example: '550e8400-e29b-41d4-a716-446655440030' }),
    __metadata("design:type", String)
], DeleteOrderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status message', example: 'Order deleted successfully' }),
    __metadata("design:type", String)
], DeleteOrderResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp of deletion', example: '2024-12-20T15:30:00.000Z' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DeleteOrderResponseDto.prototype, "deletedAt", void 0);


/***/ }),

/***/ "./src/dtos/rating.dto.ts":
/*!********************************!*\
  !*** ./src/dtos/rating.dto.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductRatingStatsDto = exports.RatingWithClassificationsDto = exports.RatingResponseDto = exports.CreateRatingDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateRatingDto {
}
exports.CreateRatingDto = CreateRatingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the product to rate',
        example: '550e8400-e29b-41d4-a716-446655440012',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRatingDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rating score from 1 to 5 stars',
        minimum: 1,
        maximum: 5,
        example: 5,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Rating score must be at least 1' }),
    (0, class_validator_1.Max)(5, { message: 'Rating score must be at most 5' }),
    __metadata("design:type", Number)
], CreateRatingDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional comment about the product (will be automatically classified by AI)',
        example: 'Amazing product! The quality is excellent and price is reasonable.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRatingDto.prototype, "comment", void 0);
class RatingResponseDto {
}
exports.RatingResponseDto = RatingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rating ID', example: '550e8400-e29b-41d4-a716-446655440100' }),
    __metadata("design:type", String)
], RatingResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product ID', example: '550e8400-e29b-41d4-a716-446655440012' }),
    __metadata("design:type", String)
], RatingResponseDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product name', example: 'Signature Chocolate Cookies' }),
    __metadata("design:type", String)
], RatingResponseDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rating score (1-5)', example: 5, minimum: 1, maximum: 5 }),
    __metadata("design:type", Number)
], RatingResponseDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User comment', example: 'Amazing cookies!', nullable: true }),
    __metadata("design:type", Object)
], RatingResponseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reward points earned', example: 520 }),
    __metadata("design:type", Number)
], RatingResponseDto.prototype, "rewardPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reward amount in dollars', example: 0.52 }),
    __metadata("design:type", Number)
], RatingResponseDto.prototype, "rewardAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rating creation date', example: '2024-12-23T15:30:00.000Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RatingResponseDto.prototype, "createdAt", void 0);
class RatingWithClassificationsDto extends RatingResponseDto {
}
exports.RatingWithClassificationsDto = RatingWithClassificationsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'AI-generated topic classifications',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                topicLabel: { type: 'string', example: 'Quality' },
                topicConfidence: { type: 'number', example: 0.87 },
            },
        },
    }),
    __metadata("design:type", typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object)
], RatingWithClassificationsDto.prototype, "aiClassifications", void 0);
class ProductRatingStatsDto {
}
exports.ProductRatingStatsDto = ProductRatingStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product ID', example: '550e8400-e29b-41d4-a716-446655440012' }),
    __metadata("design:type", String)
], ProductRatingStatsDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average rating score', example: 4.8 }),
    __metadata("design:type", Number)
], ProductRatingStatsDto.prototype, "averageRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of ratings', example: 421 }),
    __metadata("design:type", Number)
], ProductRatingStatsDto.prototype, "totalRatings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Distribution of ratings by score',
        example: { 1: 2, 2: 5, 3: 18, 4: 94, 5: 302 },
    }),
    __metadata("design:type", Object)
], ProductRatingStatsDto.prototype, "ratingDistribution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Most common topics mentioned in comments',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                topicLabel: { type: 'string', example: 'Quality' },
                count: { type: 'number', example: 125 },
                percentage: { type: 'number', example: 35.5 },
            },
        },
    }),
    __metadata("design:type", typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object)
], ProductRatingStatsDto.prototype, "topTopics", void 0);


/***/ }),

/***/ "./src/dtos/register-auth.dto.ts":
/*!***************************************!*\
  !*** ./src/dtos/register-auth.dto.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User first name',
        example: 'Orkhan',
        type: 'string'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User surname',
        example: 'Aliyev',
        type: 'string'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number in international format',
        example: '+994501234567',
        type: 'string'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+\d{10,15}$/, {
        message: 'Phone must be in international format (e.g., +994501234567)'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password (minimum 6 characters)',
        example: 'salam123',
        type: 'string',
        minLength: 6
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth',
        example: '1995-05-15',
        type: 'string',
        format: 'date',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "dateOfBirth", void 0);


/***/ }),

/***/ "./src/dtos/update-market.dto.ts":
/*!***************************************!*\
  !*** ./src/dtos/update-market.dto.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMarketDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_market_dto_1 = __webpack_require__(/*! ./create-market.dto */ "./src/dtos/create-market.dto.ts");
class UpdateMarketDto extends (0, swagger_1.PartialType)(create_market_dto_1.CreateMarketDto) {
}
exports.UpdateMarketDto = UpdateMarketDto;


/***/ }),

/***/ "./src/dtos/update-product.dto.ts":
/*!****************************************!*\
  !*** ./src/dtos/update-product.dto.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProductDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_product_dto_1 = __webpack_require__(/*! ./create-product.dto */ "./src/dtos/create-product.dto.ts");
class UpdateProductDto extends (0, mapped_types_1.PartialType)(create_product_dto_1.CreateProductDto) {
}
exports.UpdateProductDto = UpdateProductDto;


/***/ }),

/***/ "./src/dtos/update-rating.dto.ts":
/*!***************************************!*\
  !*** ./src/dtos/update-rating.dto.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRatingDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateRatingDto {
}
exports.UpdateRatingDto = UpdateRatingDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], UpdateRatingDto.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 500),
    __metadata("design:type", String)
], UpdateRatingDto.prototype, "comment", void 0);


/***/ }),

/***/ "./src/dtos/update-user.dto.ts":
/*!*************************************!*\
  !*** ./src/dtos/update-user.dto.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const user_entity_1 = __webpack_require__(/*! @/entities/user.entity */ "./src/entities/user.entity.ts");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_entity_1.Role }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(user_entity_1.Role),
    __metadata("design:type", typeof (_a = typeof user_entity_1.Role !== "undefined" && user_entity_1.Role) === "function" ? _a : Object)
], UpdateUserDto.prototype, "role", void 0);


/***/ }),

/***/ "./src/entities/ai-classification.entity.ts":
/*!**************************************************!*\
  !*** ./src/entities/ai-classification.entity.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiClassification = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const rating_entity_1 = __webpack_require__(/*! ./rating.entity */ "./src/entities/rating.entity.ts");
let AiClassification = class AiClassification {
};
exports.AiClassification = AiClassification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], AiClassification.prototype, "classificationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], AiClassification.prototype, "ratingId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rating_entity_1.Rating, rating => rating.aiClassifications, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'ratingId' }),
    __metadata("design:type", typeof (_a = typeof rating_entity_1.Rating !== "undefined" && rating_entity_1.Rating) === "function" ? _a : Object)
], AiClassification.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], AiClassification.prototype, "topicLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], AiClassification.prototype, "topicConfidence", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AiClassification.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AiClassification.prototype, "createdAt", void 0);
exports.AiClassification = AiClassification = __decorate([
    (0, typeorm_1.Entity)('ai_classifications'),
    (0, typeorm_1.Index)('IDX_AI_CLASSIFICATION_RATING', ['ratingId']),
    (0, typeorm_1.Index)(['topicLabel'])
], AiClassification);


/***/ }),

/***/ "./src/entities/bonus-card.entity.ts":
/*!*******************************************!*\
  !*** ./src/entities/bonus-card.entity.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BonusCard = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
let BonusCard = class BonusCard {
    generateCardNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const random = Math.floor(1000 + Math.random() * 9000);
        const timePart = now.getTime().toString().slice(-6);
        this.cardNumber = `BC-${year}-${timePart}${random}`.slice(0, 20);
    }
};
exports.BonusCard = BonusCard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BonusCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_bonus_card_number', { unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], BonusCard.prototype, "cardNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], BonusCard.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
        comment: 'Whether the card is active'
    }),
    __metadata("design:type", Boolean)
], BonusCard.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BonusCard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BonusCard.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.bonusCard, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], BonusCard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BonusCard.prototype, "generateCardNumber", null);
exports.BonusCard = BonusCard = __decorate([
    (0, typeorm_1.Entity)('bonus_cards')
], BonusCard);


/***/ }),

/***/ "./src/entities/order-item.entity.ts":
/*!*******************************************!*\
  !*** ./src/entities/order-item.entity.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderItem = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const order_entity_1 = __webpack_require__(/*! ./order.entity */ "./src/entities/order.entity.ts");
const product_entity_1 = __webpack_require__(/*! ./product.entity */ "./src/entities/product.entity.ts");
let OrderItem = class OrderItem {
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_order_item_order'),
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_order_item_product'),
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], OrderItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        unsigned: true,
        comment: 'Quantity of this product in the order'
    }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'Unit price at time of purchase'
    }),
    __metadata("design:type", Number)
], OrderItem.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'Total price for this line item (quantity × unitPrice)'
    }),
    __metadata("design:type", Number)
], OrderItem.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], OrderItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, order => order.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'orderId' }),
    __metadata("design:type", typeof (_b = typeof order_entity_1.Order !== "undefined" && order_entity_1.Order) === "function" ? _b : Object)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.orderItems, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", Object)
], OrderItem.prototype, "product", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)('order_items'),
    (0, typeorm_1.Index)('idx_order_product', ['orderId', 'productId'])
], OrderItem);


/***/ }),

/***/ "./src/entities/order.entity.ts":
/*!**************************************!*\
  !*** ./src/entities/order.entity.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Order = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
const order_item_entity_1 = __webpack_require__(/*! ./order-item.entity */ "./src/entities/order-item.entity.ts");
const stores_entity_1 = __webpack_require__(/*! ./stores.entity */ "./src/entities/stores.entity.ts");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_order_user'),
    (0, typeorm_1.Column)({ type: 'varchar', length: '36' }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: 'Bonus card number used for this purchase'
    }),
    __metadata("design:type", String)
], Order.prototype, "bonusCardNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'Total order amount in dollars'
    }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
        comment: 'Bonus earned from this purchase (standard cashback)'
    }),
    __metadata("design:type", Number)
], Order.prototype, "bonusEarned", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.orders, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItem, orderItem => orderItem.order, { cascade: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_order_market'),
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Order.prototype, "marketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stores_entity_1.Market, (market) => market.orders),
    (0, typeorm_1.JoinColumn)({ name: 'marketId' }),
    __metadata("design:type", typeof (_d = typeof stores_entity_1.Market !== "undefined" && stores_entity_1.Market) === "function" ? _d : Object)
], Order.prototype, "market", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('orders'),
    (0, typeorm_1.Index)('idx_user_created', ['userId', 'createdAt'])
], Order);


/***/ }),

/***/ "./src/entities/product-credit.entity.ts":
/*!***********************************************!*\
  !*** ./src/entities/product-credit.entity.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductCredit = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const order_entity_1 = __webpack_require__(/*! ./order.entity */ "./src/entities/order.entity.ts");
const product_entity_1 = __webpack_require__(/*! ./product.entity */ "./src/entities/product.entity.ts");
let ProductCredit = class ProductCredit {
};
exports.ProductCredit = ProductCredit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductCredit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_credit_order'),
    (0, typeorm_1.Column)({ type: 'varchar', length: '36' }),
    __metadata("design:type", String)
], ProductCredit.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_credit_product'),
    (0, typeorm_1.Column)({ type: 'varchar', length: '36' }),
    __metadata("design:type", String)
], ProductCredit.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'Product price in this order'
    }),
    __metadata("design:type", Number)
], ProductCredit.prototype, "productPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'Static reward amount for this product'
    }),
    __metadata("design:type", Number)
], ProductCredit.prototype, "allocatedCredit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        unsigned: true,
        comment: 'Points allocated for rating this product (PL=30, Normal=10)'
    }),
    __metadata("design:type", Number)
], ProductCredit.prototype, "ratingPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        comment: 'Whether this credit has been claimed by rating'
    }),
    __metadata("design:type", Boolean)
], ProductCredit.prototype, "isClaimed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ProductCredit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ProductCredit.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'orderId' }),
    __metadata("design:type", typeof (_c = typeof order_entity_1.Order !== "undefined" && order_entity_1.Order) === "function" ? _c : Object)
], ProductCredit.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", typeof (_d = typeof product_entity_1.Product !== "undefined" && product_entity_1.Product) === "function" ? _d : Object)
], ProductCredit.prototype, "product", void 0);
exports.ProductCredit = ProductCredit = __decorate([
    (0, typeorm_1.Entity)('product_credits'),
    (0, typeorm_1.Index)('idx_order_product', ['orderId', 'productId'])
], ProductCredit);


/***/ }),

/***/ "./src/entities/product.entity.ts":
/*!****************************************!*\
  !*** ./src/entities/product.entity.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const order_item_entity_1 = __webpack_require__(/*! ./order-item.entity */ "./src/entities/order-item.entity.ts");
const rating_entity_1 = __webpack_require__(/*! ./rating.entity */ "./src/entities/rating.entity.ts");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
        name: 'allowed_rating',
        comment: 'True if this product can be rated and earn credits'
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "allowedRating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'Product price in dollars'
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_is_private_label'),
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        name: 'is_private_label',
        comment: 'True if this is a Private Label (PL) product'
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isPrivateLabel", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_rating_count'),
    (0, typeorm_1.Column)({
        type: 'int',
        unsigned: true,
        default: 0,
        name: 'rating_count',
        comment: 'Total number of ratings received'
    }),
    __metadata("design:type", Number)
], Product.prototype, "ratingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 3,
        scale: 2,
        default: 0.00,
        name: 'average_rating',
        comment: 'Average rating score (1.00 to 5.00)'
    }),
    __metadata("design:type", Number)
], Product.prototype, "averageRating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
        name: 'reward_amount',
        comment: 'Static reward amount in dollars for rating this product'
    }),
    __metadata("design:type", Number)
], Product.prototype, "rewardAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
        name: 'is_active',
        comment: 'Whether the product is active in the catalog'
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        name: 'is_new',
        comment: 'Whether the product is marked as new'
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isNew", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItem, orderItem => orderItem.product),
    __metadata("design:type", Array)
], Product.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rating_entity_1.Rating, rating => rating.product),
    __metadata("design:type", Array)
], Product.prototype, "ratings", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products'),
    (0, typeorm_1.Index)('idx_product_sorting', ['isPrivateLabel', 'ratingCount'])
], Product);


/***/ }),

/***/ "./src/entities/rating.entity.ts":
/*!***************************************!*\
  !*** ./src/entities/rating.entity.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rating = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
const product_entity_1 = __webpack_require__(/*! ./product.entity */ "./src/entities/product.entity.ts");
const reward_transaction_entity_1 = __webpack_require__(/*! ./reward-transaction.entity */ "./src/entities/reward-transaction.entity.ts");
const ai_classification_entity_1 = __webpack_require__(/*! ./ai-classification.entity */ "./src/entities/ai-classification.entity.ts");
let Rating = class Rating {
};
exports.Rating = Rating;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Rating.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Rating.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.ratings, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Rating.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Rating.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.ratings, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", typeof (_b = typeof product_entity_1.Product !== "undefined" && product_entity_1.Product) === "function" ? _b : Object)
], Rating.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Rating.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Rating.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Rating.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reward_transaction_entity_1.RewardTransaction, transaction => transaction.rating),
    __metadata("design:type", Array)
], Rating.prototype, "rewardTransactions", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        unsigned: true,
        comment: 'Reward points earned for this rating (10 or 30)'
    }),
    __metadata("design:type", Number)
], Rating.prototype, "rewardPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'Bonus money earned for this rating (in dollars)'
    }),
    __metadata("design:type", Number)
], Rating.prototype, "rewardAmount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ai_classification_entity_1.AiClassification, classification => classification.rating, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Rating.prototype, "aiClassifications", void 0);
exports.Rating = Rating = __decorate([
    (0, typeorm_1.Entity)('ratings'),
    (0, typeorm_1.Index)(['userId', 'productId'], { unique: true }),
    (0, typeorm_1.Index)(['productId']),
    (0, typeorm_1.Index)(['userId'])
], Rating);


/***/ }),

/***/ "./src/entities/reward-transaction.entity.ts":
/*!***************************************************!*\
  !*** ./src/entities/reward-transaction.entity.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardTransaction = exports.TransactionType = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
const rating_entity_1 = __webpack_require__(/*! ./rating.entity */ "./src/entities/rating.entity.ts");
var TransactionType;
(function (TransactionType) {
    TransactionType["RATING_REWARD"] = "rating_reward";
    TransactionType["PURCHASE_CASHBACK"] = "purchase_cashback";
    TransactionType["MANUAL_ADJUSTMENT"] = "manual_adjustment";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
let RewardTransaction = class RewardTransaction {
};
exports.RewardTransaction = RewardTransaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RewardTransaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_transaction_user'),
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], RewardTransaction.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
        nullable: true,
        comment: 'Reference to rating if this is a rating reward'
    }),
    __metadata("design:type", Object)
], RewardTransaction.prototype, "ratingId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TransactionType,
        default: TransactionType.RATING_REWARD
    }),
    __metadata("design:type", String)
], RewardTransaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        unsigned: true,
        comment: 'Points earned in this transaction'
    }),
    __metadata("design:type", Number)
], RewardTransaction.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'Bonus amount in dollars'
    }),
    __metadata("design:type", Number)
], RewardTransaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        comment: 'User balance after this transaction'
    }),
    __metadata("design:type", Number)
], RewardTransaction.prototype, "balanceAfter", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: 'Additional description or notes'
    }),
    __metadata("design:type", Object)
], RewardTransaction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RewardTransaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.rewardTransactions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], RewardTransaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rating_entity_1.Rating, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'ratingId' }),
    __metadata("design:type", Object)
], RewardTransaction.prototype, "rating", void 0);
exports.RewardTransaction = RewardTransaction = __decorate([
    (0, typeorm_1.Entity)('reward_transactions'),
    (0, typeorm_1.Index)('idx_user_created', ['userId', 'createdAt'])
], RewardTransaction);


/***/ }),

/***/ "./src/entities/stores.entity.ts":
/*!***************************************!*\
  !*** ./src/entities/stores.entity.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Market = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const order_entity_1 = __webpack_require__(/*! ./order.entity */ "./src/entities/order.entity.ts");
let Market = class Market {
};
exports.Market = Market;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Market.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Market.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Market.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Market.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], Market.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], Market.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Market.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Market.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Market.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.market),
    __metadata("design:type", Array)
], Market.prototype, "orders", void 0);
exports.Market = Market = __decorate([
    (0, typeorm_1.Entity)('markets')
], Market);


/***/ }),

/***/ "./src/entities/user.entity.ts":
/*!*************************************!*\
  !*** ./src/entities/user.entity.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.Role = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const bonus_card_entity_1 = __webpack_require__(/*! ./bonus-card.entity */ "./src/entities/bonus-card.entity.ts");
const order_entity_1 = __webpack_require__(/*! ./order.entity */ "./src/entities/order.entity.ts");
const rating_entity_1 = __webpack_require__(/*! ./rating.entity */ "./src/entities/rating.entity.ts");
const reward_transaction_entity_1 = __webpack_require__(/*! ./reward-transaction.entity */ "./src/entities/reward-transaction.entity.ts");
const bcyrpt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["ADMIN"] = "admin";
})(Role || (exports.Role = Role = {}));
let User = class User {
    async hashPassword() {
        const salt = 10;
        const password = this.password;
        const hash = await bcyrpt.hash(password, salt);
        this.password = hash;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
        comment: 'Bonus balance in dollars'
    }),
    __metadata("design:type", Number)
], User.prototype, "bonusBalance", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bonus_card_entity_1.BonusCard, bonusCard => bonusCard.user),
    __metadata("design:type", typeof (_d = typeof bonus_card_entity_1.BonusCard !== "undefined" && bonus_card_entity_1.BonusCard) === "function" ? _d : Object)
], User.prototype, "bonusCard", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, order => order.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rating_entity_1.Rating, rating => rating.user),
    __metadata("design:type", Array)
], User.prototype, "ratings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reward_transaction_entity_1.RewardTransaction, transaction => transaction.user),
    __metadata("design:type", Array)
], User.prototype, "rewardTransactions", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),

/***/ "./src/guards/admin.guard.ts":
/*!***********************************!*\
  !*** ./src/guards/admin.guard.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nestjs_cls_1 = __webpack_require__(/*! nestjs-cls */ "nestjs-cls");
const user_entity_1 = __webpack_require__(/*! ../entities/user.entity */ "./src/entities/user.entity.ts");
let AdminGuard = class AdminGuard {
    constructor(clsService) {
        this.clsService = clsService;
    }
    canActivate(context) {
        const user = this.clsService.get('user');
        if (user?.role !== user_entity_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('Access denied. Admin role required.');
        }
        return true;
    }
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_cls_1.ClsService !== "undefined" && nestjs_cls_1.ClsService) === "function" ? _a : Object])
], AdminGuard);


/***/ }),

/***/ "./src/guards/auth.guard.ts":
/*!**********************************!*\
  !*** ./src/guards/auth.guard.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const users_service_1 = __webpack_require__(/*! @/services/users.service */ "./src/services/users.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const nestjs_cls_1 = __webpack_require__(/*! nestjs-cls */ "nestjs-cls");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService, usersService, clsService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.clsService = clsService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let token = request.headers["authorization"];
        if (!token)
            throw new common_1.UnauthorizedException();
        token = token.split(" ")[1];
        let payload;
        try {
            payload = this.jwtService.verify(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
        const user = await this.usersService.findOne(payload.userId);
        if (!user)
            throw new common_1.NotFoundException();
        this.clsService.set("user", user);
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof nestjs_cls_1.ClsService !== "undefined" && nestjs_cls_1.ClsService) === "function" ? _c : Object])
], JwtAuthGuard);


/***/ }),

/***/ "./src/modules/ai-classification.module.ts":
/*!*************************************************!*\
  !*** ./src/modules/ai-classification.module.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiClassificationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const ai_classification_entity_1 = __webpack_require__(/*! @/entities/ai-classification.entity */ "./src/entities/ai-classification.entity.ts");
const rating_entity_1 = __webpack_require__(/*! @/entities/rating.entity */ "./src/entities/rating.entity.ts");
const ai_classification_service_1 = __webpack_require__(/*! @/services/ai-classification.service */ "./src/services/ai-classification.service.ts");
const ai_classification_controller_1 = __webpack_require__(/*! @/controllers/ai-classification.controller */ "./src/controllers/ai-classification.controller.ts");
const ratings_module_1 = __webpack_require__(/*! ./ratings.module */ "./src/modules/ratings.module.ts");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
let AiClassificationModule = class AiClassificationModule {
};
exports.AiClassificationModule = AiClassificationModule;
exports.AiClassificationModule = AiClassificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ai_classification_entity_1.AiClassification, rating_entity_1.Rating]),
            (0, common_1.forwardRef)(() => ratings_module_1.RatingsModule),
            axios_1.HttpModule
        ],
        controllers: [ai_classification_controller_1.AiClassificationController],
        providers: [ai_classification_service_1.AiClassificationService],
        exports: [ai_classification_service_1.AiClassificationService],
    })
], AiClassificationModule);


/***/ }),

/***/ "./src/modules/auth.module.ts":
/*!************************************!*\
  !*** ./src/modules/auth.module.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_controller_1 = __webpack_require__(/*! @/controllers/auth.controller */ "./src/controllers/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! @/services/auth.service */ "./src/services/auth.service.ts");
const users_module_1 = __webpack_require__(/*! ./users.module */ "./src/modules/users.module.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const bonus_card_entity_1 = __webpack_require__(/*! @/entities/bonus-card.entity */ "./src/entities/bonus-card.entity.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET
            }),
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([bonus_card_entity_1.BonusCard])
        ]
    })
], AuthModule);


/***/ }),

/***/ "./src/modules/markets.module.ts":
/*!***************************************!*\
  !*** ./src/modules/markets.module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarketsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const markets_service_1 = __webpack_require__(/*! ../services/markets.service */ "./src/services/markets.service.ts");
const markets_controller_1 = __webpack_require__(/*! ../controllers/markets.controller */ "./src/controllers/markets.controller.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const stores_entity_1 = __webpack_require__(/*! @/entities/stores.entity */ "./src/entities/stores.entity.ts");
let MarketsModule = class MarketsModule {
};
exports.MarketsModule = MarketsModule;
exports.MarketsModule = MarketsModule = __decorate([
    (0, common_1.Module)({
        controllers: [markets_controller_1.MarketsController],
        providers: [markets_service_1.MarketsService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([stores_entity_1.Market])
        ]
    })
], MarketsModule);


/***/ }),

/***/ "./src/modules/orders.module.ts":
/*!**************************************!*\
  !*** ./src/modules/orders.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const orders_controller_1 = __webpack_require__(/*! ../controllers/orders.controller */ "./src/controllers/orders.controller.ts");
const orders_service_1 = __webpack_require__(/*! ../services/orders.service */ "./src/services/orders.service.ts");
const order_entity_1 = __webpack_require__(/*! ../entities/order.entity */ "./src/entities/order.entity.ts");
const order_item_entity_1 = __webpack_require__(/*! ../entities/order-item.entity */ "./src/entities/order-item.entity.ts");
const rating_entity_1 = __webpack_require__(/*! ../entities/rating.entity */ "./src/entities/rating.entity.ts");
const product_entity_1 = __webpack_require__(/*! ../entities/product.entity */ "./src/entities/product.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../entities/user.entity */ "./src/entities/user.entity.ts");
const bonus_card_entity_1 = __webpack_require__(/*! ../entities/bonus-card.entity */ "./src/entities/bonus-card.entity.ts");
const product_credit_entity_1 = __webpack_require__(/*! @/entities/product-credit.entity */ "./src/entities/product-credit.entity.ts");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                order_entity_1.Order,
                order_item_entity_1.OrderItem,
                rating_entity_1.Rating,
                product_entity_1.Product,
                user_entity_1.User,
                bonus_card_entity_1.BonusCard,
                product_credit_entity_1.ProductCredit
            ]),
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService],
        exports: [orders_service_1.OrdersService],
    })
], OrdersModule);


/***/ }),

/***/ "./src/modules/products.module.ts":
/*!****************************************!*\
  !*** ./src/modules/products.module.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const products_controller_1 = __webpack_require__(/*! ../controllers/products.controller */ "./src/controllers/products.controller.ts");
const products_service_1 = __webpack_require__(/*! @/services/products.service */ "./src/services/products.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const product_entity_1 = __webpack_require__(/*! @/entities/product.entity */ "./src/entities/product.entity.ts");
const rating_entity_1 = __webpack_require__(/*! @/entities/rating.entity */ "./src/entities/rating.entity.ts");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, rating_entity_1.Rating])],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
    })
], ProductsModule);


/***/ }),

/***/ "./src/modules/ratings.module.ts":
/*!***************************************!*\
  !*** ./src/modules/ratings.module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const ratings_controller_1 = __webpack_require__(/*! ../controllers/ratings.controller */ "./src/controllers/ratings.controller.ts");
const ratings_service_1 = __webpack_require__(/*! ../services/ratings.service */ "./src/services/ratings.service.ts");
const rating_entity_1 = __webpack_require__(/*! ../entities/rating.entity */ "./src/entities/rating.entity.ts");
const product_entity_1 = __webpack_require__(/*! ../entities/product.entity */ "./src/entities/product.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../entities/user.entity */ "./src/entities/user.entity.ts");
const order_item_entity_1 = __webpack_require__(/*! ../entities/order-item.entity */ "./src/entities/order-item.entity.ts");
const reward_transaction_entity_1 = __webpack_require__(/*! ../entities/reward-transaction.entity */ "./src/entities/reward-transaction.entity.ts");
const product_credit_entity_1 = __webpack_require__(/*! @/entities/product-credit.entity */ "./src/entities/product-credit.entity.ts");
const ai_classification_module_1 = __webpack_require__(/*! ./ai-classification.module */ "./src/modules/ai-classification.module.ts");
let RatingsModule = class RatingsModule {
};
exports.RatingsModule = RatingsModule;
exports.RatingsModule = RatingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                rating_entity_1.Rating,
                product_entity_1.Product,
                user_entity_1.User,
                order_item_entity_1.OrderItem,
                reward_transaction_entity_1.RewardTransaction,
                product_credit_entity_1.ProductCredit,
            ]),
            (0, common_1.forwardRef)(() => ai_classification_module_1.AiClassificationModule)
        ],
        controllers: [ratings_controller_1.RatingsController],
        providers: [ratings_service_1.RatingsService],
        exports: [ratings_service_1.RatingsService],
    })
], RatingsModule);


/***/ }),

/***/ "./src/modules/users.module.ts":
/*!*************************************!*\
  !*** ./src/modules/users.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const users_controller_1 = __webpack_require__(/*! @/controllers/users.controller */ "./src/controllers/users.controller.ts");
const user_entity_1 = __webpack_require__(/*! @/entities/user.entity */ "./src/entities/user.entity.ts");
const users_service_1 = __webpack_require__(/*! @/services/users.service */ "./src/services/users.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService]
    })
], UsersModule);


/***/ }),

/***/ "./src/services/ai-classification.service.ts":
/*!***************************************************!*\
  !*** ./src/services/ai-classification.service.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiClassificationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ai_classification_entity_1 = __webpack_require__(/*! @/entities/ai-classification.entity */ "./src/entities/ai-classification.entity.ts");
const rating_entity_1 = __webpack_require__(/*! @/entities/rating.entity */ "./src/entities/rating.entity.ts");
let AiClassificationService = class AiClassificationService {
    constructor(aiClassificationRepo, ratingRepo, configService) {
        this.aiClassificationRepo = aiClassificationRepo;
        this.ratingRepo = ratingRepo;
        this.configService = configService;
        this.fastApiUrl = this.configService.get('FASTAPI_URL', 'http://fastapi-api:8000');
    }
    async classifyComment(ratingId, comment) {
        const rating = await this.ratingRepo.findOne({ where: { id: ratingId } });
        if (!rating) {
            throw new common_1.NotFoundException('Rating not found');
        }
        if (!comment || comment.trim().length === 0) {
            return [];
        }
        try {
            const classification = await this.callFastAPIClassification(comment);
            if (classification.topic_label) {
                const aiClassification = this.aiClassificationRepo.create({
                    ratingId,
                    topicLabel: classification.topic_label,
                    topicConfidence: Number(classification.confidence.toFixed(2)),
                    comment,
                });
                const saved = await this.aiClassificationRepo.save(aiClassification);
                return [saved];
            }
            else {
                throw new common_1.ConflictException("CONFLICT HAPPENED!");
            }
        }
        catch (error) {
            console.error('FastAPI classification failed, using fallback:', error);
            return await this.fallbackKeywordClassification(ratingId, comment);
        }
    }
    async rawCommentClassify(comment) {
        if (!comment || comment.trim().length === 0) {
            return [];
        }
        try {
            const classification = await this.callFastAPIClassification(comment);
            if (!classification.topic_label) {
                throw new common_1.ConflictException("CONFLICT HAPPENED!");
            }
            return classification;
        }
        catch (error) {
            console.error('FastAPI classification failed, using fallback:', error);
        }
    }
    async callFastAPIClassification(comment) {
        const response = await fetch(`${this.fastApiUrl}/classify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        });
        if (!response.ok) {
            throw new Error(`FastAPI returned ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    }
    async fallbackKeywordClassification(ratingId, comment) {
        const commentLower = comment.toLowerCase();
        const classifications = [];
        const topics = {
            Keyfiyyət: {
                keywords: ['keyfiyyət', 'quality', 'yaxşı', 'pis', 'əla', 'mükəmməl'],
                confidence: 0,
            },
            Qiymət: {
                keywords: ['qiymət', 'price', 'bahá', 'ucuz', 'baha', 'əlverişli'],
                confidence: 0,
            },
            Qablaşdırma: {
                keywords: ['qablaşdırma', 'paket', 'qutu', 'bükülmüş'],
                confidence: 0,
            },
            Dad: {
                keywords: ['dad', 'ləzzət', 'taste', 'dadlı', 'ləzzətli'],
                confidence: 0,
            },
            Xidmət: {
                keywords: ['xidmət', 'service', 'işçi', 'personal'],
                confidence: 0,
            },
            Çatdırılma: {
                keywords: ['çatdırılma', 'delivery', 'yetişdirilmə', 'tez', 'gec'],
                confidence: 0,
            },
        };
        Object.entries(topics).forEach(([label, config]) => {
            let matchCount = 0;
            config.keywords.forEach(keyword => {
                if (commentLower.includes(keyword)) {
                    matchCount++;
                }
            });
            if (matchCount > 0) {
                const confidence = Math.min(0.5 + (matchCount * 0.15), 0.99);
                classifications.push({
                    ratingId,
                    topicLabel: label,
                    topicConfidence: Number(confidence.toFixed(2)),
                    comment,
                });
            }
        });
        if (classifications.length === 0) {
            classifications.push({
                ratingId,
                topicLabel: 'Digər',
                topicConfidence: 0.50,
                comment,
            });
        }
        const savedClassifications = [];
        for (const classificationDto of classifications) {
            const classification = this.aiClassificationRepo.create(classificationDto);
            const saved = await this.aiClassificationRepo.save(classification);
            savedClassifications.push(saved);
        }
        return savedClassifications;
    }
    async getClassificationsByRating(ratingId) {
        return await this.aiClassificationRepo.find({
            where: { ratingId },
            order: { topicConfidence: 'DESC' },
        });
    }
    async getClassificationsByProduct(productId) {
        return await this.aiClassificationRepo
            .createQueryBuilder('classification')
            .innerJoin('classification.rating', 'rating')
            .where('rating.productId = :productId', { productId })
            .orderBy('classification.topicConfidence', 'DESC')
            .getMany();
    }
    async getProductClassificationStats(productId) {
        const classifications = await this.aiClassificationRepo
            .createQueryBuilder('classification')
            .select('classification.topicLabel', 'topicLabel')
            .addSelect('COUNT(*)', 'count')
            .addSelect('AVG(classification.topicConfidence)', 'averageConfidence')
            .innerJoin('classification.rating', 'rating')
            .where('rating.productId = :productId', { productId })
            .groupBy('classification.topicLabel')
            .orderBy('count', 'DESC')
            .getRawMany();
        const totalCount = classifications.reduce((sum, item) => sum + parseInt(item.count), 0);
        return classifications.map(item => ({
            topicLabel: item.topicLabel,
            count: parseInt(item.count),
            averageConfidence: parseFloat(parseFloat(item.averageConfidence).toFixed(2)),
            percentage: parseFloat(((parseInt(item.count) / totalCount) * 100).toFixed(1)),
        }));
    }
    async classifyRating(ratingId, comment, manager) {
        if (!comment || comment.trim().length === 0) {
            return [];
        }
        const commentLower = comment.toLowerCase();
        const classifications = [];
        const classification = await this.rawCommentClassify(comment);
        if (classifications.length === 0 && classification) {
            classifications.push({
                ratingId,
                topicLabel: classification["topic_label"],
                topicConfidence: classification["confidence"],
                comment,
            });
        }
        const savedClassifications = [];
        if (manager) {
            for (const classificationDto of classifications) {
                const classification = manager.create(ai_classification_entity_1.AiClassification, classificationDto);
                const saved = await manager.save(ai_classification_entity_1.AiClassification, classification);
                savedClassifications.push(saved);
            }
        }
        else {
            for (const classificationDto of classifications) {
                const classification = this.aiClassificationRepo.create(classificationDto);
                const saved = await this.aiClassificationRepo.save(classification);
                savedClassifications.push(saved);
            }
        }
        return savedClassifications;
    }
    async findAll(limit = 50, offset = 0) {
        return await this.aiClassificationRepo.find({
            relations: ['rating', 'rating.user', 'rating.product'],
            take: limit,
            skip: offset,
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(classificationId) {
        const classification = await this.aiClassificationRepo.findOne({
            where: { classificationId },
            relations: ['rating', 'rating.user', 'rating.product'],
        });
        if (!classification) {
            throw new common_1.NotFoundException('Classification not found');
        }
        return classification;
    }
    async remove(classificationId) {
        const classification = await this.findOne(classificationId);
        await this.aiClassificationRepo.remove(classification);
    }
    async getGlobalTopicDistribution() {
        const classifications = await this.aiClassificationRepo
            .createQueryBuilder('classification')
            .select('classification.topicLabel', 'topicLabel')
            .addSelect('COUNT(*)', 'count')
            .addSelect('AVG(classification.topicConfidence)', 'averageConfidence')
            .groupBy('classification.topicLabel')
            .orderBy('count', 'DESC')
            .getRawMany();
        const totalCount = classifications.reduce((sum, item) => sum + parseInt(item.count), 0);
        return classifications.map(item => ({
            topicLabel: item.topicLabel,
            count: parseInt(item.count),
            averageConfidence: parseFloat(parseFloat(item.averageConfidence).toFixed(2)),
            percentage: parseFloat(((parseInt(item.count) / totalCount) * 100).toFixed(1)),
        }));
    }
    async checkFastAPIHealth() {
        try {
            const response = await fetch(`${this.fastApiUrl}/docs`, {
                method: 'GET',
                signal: AbortSignal.timeout(3000),
            });
            return {
                available: response.ok,
                url: this.fastApiUrl,
            };
        }
        catch (error) {
            return {
                available: false,
                url: this.fastApiUrl,
            };
        }
    }
};
exports.AiClassificationService = AiClassificationService;
exports.AiClassificationService = AiClassificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ai_classification_entity_1.AiClassification)),
    __param(1, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AiClassificationService);


/***/ }),

/***/ "./src/services/auth.service.ts":
/*!**************************************!*\
  !*** ./src/services/auth.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/services/users.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const bonus_card_entity_1 = __webpack_require__(/*! @/entities/bonus-card.entity */ "./src/entities/bonus-card.entity.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let AuthService = class AuthService {
    constructor(usersService, jwtService, bonusCardRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.bonusCardRepository = bonusCardRepository;
    }
    async login({ password, phone }) {
        const user = await this.usersService.findOneByUsername({ phone }, { password: true, id: true, name: true, surname: true, phone: true, bonusBalance: true });
        if (!user) {
            throw new common_1.HttpException('Username or password is incorrect!', common_1.HttpStatus.BAD_REQUEST);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Username or password is incorrect!', common_1.HttpStatus.BAD_REQUEST);
        }
        const token = this.jwtService.sign({ userId: user.id });
        const { password: _, ...userWithoutPassword } = user;
        return {
            status: true,
            token,
            user: userWithoutPassword
        };
    }
    async register({ name, surname, phone, password, dateOfBirth }) {
        const existingUser = await this.usersService.findOneByUsername({ phone });
        if (existingUser) {
            throw new common_1.HttpException('Phone number is already registered', common_1.HttpStatus.CONFLICT);
        }
        const newUser = await this.usersService.create({
            name,
            surname,
            phone,
            password,
            dateOfBirth
        });
        const token = this.jwtService.sign({ userId: newUser.id });
        const { password: _, ...userWithoutPassword } = newUser;
        const bonusCard = this.bonusCardRepository.create({
            userId: newUser.id,
            isActive: true
        });
        await this.bonusCardRepository.save(bonusCard);
        return {
            status: true,
            message: 'User registered successfully',
            bonusCard,
            token,
            user: userWithoutPassword
        };
    }
    findAll() {
        return `This action returns all auth`;
    }
    findOne(id) {
        return `This action returns a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(bonus_card_entity_1.BonusCard)),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], AuthService);


/***/ }),

/***/ "./src/services/markets.service.ts":
/*!*****************************************!*\
  !*** ./src/services/markets.service.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarketsService = void 0;
const stores_entity_1 = __webpack_require__(/*! @/entities/stores.entity */ "./src/entities/stores.entity.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let MarketsService = class MarketsService {
    constructor(marketRepo) {
        this.marketRepo = marketRepo;
    }
    create(createMarketDto) {
        return 'This action adds a new market';
    }
    async findAll() {
        const markets = await this.marketRepo.find();
        return markets;
    }
    findOne(id) {
        return `This action returns a #${id} market`;
    }
    update(id, updateMarketDto) {
        return `This action updates a #${id} market`;
    }
    remove(id) {
        return `This action removes a #${id} market`;
    }
};
exports.MarketsService = MarketsService;
exports.MarketsService = MarketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stores_entity_1.Market)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], MarketsService);


/***/ }),

/***/ "./src/services/orders.service.ts":
/*!****************************************!*\
  !*** ./src/services/orders.service.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const order_entity_1 = __webpack_require__(/*! ../entities/order.entity */ "./src/entities/order.entity.ts");
const order_item_entity_1 = __webpack_require__(/*! ../entities/order-item.entity */ "./src/entities/order-item.entity.ts");
const rating_entity_1 = __webpack_require__(/*! ../entities/rating.entity */ "./src/entities/rating.entity.ts");
const product_entity_1 = __webpack_require__(/*! ../entities/product.entity */ "./src/entities/product.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../entities/user.entity */ "./src/entities/user.entity.ts");
const bonus_card_entity_1 = __webpack_require__(/*! ../entities/bonus-card.entity */ "./src/entities/bonus-card.entity.ts");
const product_credit_entity_1 = __webpack_require__(/*! ../entities/product-credit.entity */ "./src/entities/product-credit.entity.ts");
const nestjs_cls_1 = __webpack_require__(/*! nestjs-cls */ "nestjs-cls");
const PURCHASE_CASHBACK_RATE = 0.02;
let OrdersService = class OrdersService {
    constructor(ordersRepository, orderItemsRepository, ratingsRepository, productsRepository, usersRepository, bonusCardsRepository, productCreditsRepository, dataSource, clsService) {
        this.ordersRepository = ordersRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.ratingsRepository = ratingsRepository;
        this.productsRepository = productsRepository;
        this.usersRepository = usersRepository;
        this.bonusCardsRepository = bonusCardsRepository;
        this.productCreditsRepository = productCreditsRepository;
        this.dataSource = dataSource;
        this.clsService = clsService;
    }
    async createOrder(createOrderDto) {
        const { bonusCardNumber, items } = createOrderDto;
        const user = this.clsService.get('user');
        if (!user)
            throw new common_1.ForbiddenException('User not identified');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const bonusCard = await queryRunner.manager.findOne(bonus_card_entity_1.BonusCard, {
                where: { cardNumber: bonusCardNumber, isActive: true },
            });
            if (!bonusCard) {
                throw new common_1.BadRequestException('Invalid bonus card');
            }
            if (bonusCard.userId !== user.id) {
                throw new common_1.ForbiddenException('Bonus card does not belong to user');
            }
            const userId = user.id;
            const productIds = items.map(item => item.productId);
            const products = await queryRunner.manager.find(product_entity_1.Product, {
                where: {
                    id: (0, typeorm_2.In)(productIds),
                    isActive: true
                }
            });
            if (products.length !== productIds.length) {
                throw new common_1.BadRequestException('One or more products not found or inactive');
            }
            const productMap = new Map(products.map(p => [p.id, p]));
            let totalAmount = 0;
            const orderItemsData = items.map(item => {
                const product = productMap.get(item.productId);
                if (!product) {
                    throw new common_1.BadRequestException(`Product ${item.productId} not found`);
                }
                const unitPrice = Number(product.price);
                const totalPrice = unitPrice * item.quantity;
                totalAmount += totalPrice;
                return {
                    productId: item.productId,
                    product,
                    quantity: item.quantity,
                    unitPrice,
                    totalPrice,
                };
            });
            const bonusEarned = totalAmount * PURCHASE_CASHBACK_RATE;
            const order = queryRunner.manager.create(order_entity_1.Order, {
                userId,
                bonusCardNumber,
                totalAmount,
                marketId: createOrderDto.marketId,
                bonusEarned,
            });
            const savedOrder = await queryRunner.manager.save(order_entity_1.Order, order);
            const savedItems = [];
            for (const itemData of orderItemsData) {
                const orderItem = queryRunner.manager.create(order_item_entity_1.OrderItem, {
                    orderId: savedOrder.id,
                    productId: itemData.productId,
                    quantity: itemData.quantity,
                    unitPrice: itemData.unitPrice,
                    totalPrice: itemData.totalPrice,
                });
                const saved = await queryRunner.manager.save(order_item_entity_1.OrderItem, orderItem);
                savedItems.push({
                    ...saved,
                    product: itemData.product,
                });
                if (itemData.product.allowedRating && Number(itemData.product.rewardAmount) > 0) {
                    const rewardAmount = Number(itemData.product.rewardAmount);
                    const points = Math.round(rewardAmount / 0.001);
                    const productCredit = queryRunner.manager.create(product_credit_entity_1.ProductCredit, {
                        orderId: savedOrder.id,
                        productId: itemData.productId,
                        productPrice: itemData.totalPrice,
                        allocatedCredit: rewardAmount,
                        ratingPoints: points,
                        isClaimed: false,
                    });
                    await queryRunner.manager.save(product_credit_entity_1.ProductCredit, productCredit);
                }
            }
            const userToUpdate = await queryRunner.manager.findOne(user_entity_1.User, { where: { id: userId } });
            if (!userToUpdate) {
                throw new common_1.NotFoundException('User not found');
            }
            userToUpdate.bonusBalance = Number(userToUpdate.bonusBalance) + bonusEarned;
            await queryRunner.manager.save(user_entity_1.User, userToUpdate);
            await queryRunner.commitTransaction();
            return {
                orderId: savedOrder.id,
                orderDate: savedOrder.createdAt,
                totalAmount,
                bonusEarned,
                itemCount: savedItems.length,
                items: savedItems.map(item => ({
                    productId: item.product.id,
                    productName: item.product.name,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    totalPrice: item.totalPrice,
                    isPrivateLabel: item.product.isPrivateLabel,
                    allowedRating: item.product.allowedRating,
                    rewardAmount: Number(item.product.rewardAmount),
                })),
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getMyOrders(query) {
        const { limit = 50, offset = 0 } = query;
        const user = this.clsService.get('user');
        if (!user)
            throw new common_1.ForbiddenException('User not identified');
        const userId = user.id;
        const orders = await this.ordersRepository
            .createQueryBuilder('order')
            .where('order.userId = :userId', { userId })
            .orderBy('order.createdAt', 'DESC')
            .skip(offset)
            .take(limit)
            .getMany();
        return this.enrichOrders(orders, userId);
    }
    async getOrderById(orderId) {
        const user = this.clsService.get('user');
        if (!user)
            throw new common_1.ForbiddenException('User not identified');
        const order = await this.ordersRepository.findOne({
            where: { id: orderId }
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.userId !== user.id) {
            throw new common_1.ForbiddenException('You do not have permission to access this order');
        }
        const [enrichedOrder] = await this.enrichOrders([order], user.id);
        return enrichedOrder;
    }
    async getOrderByIdAdmin(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId }
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const [enrichedOrder] = await this.enrichOrders([order], order.userId);
        return enrichedOrder;
    }
    async enrichOrders(orders, userId) {
        if (orders.length === 0) {
            return [];
        }
        const orderIds = orders.map(order => order.id);
        const orderItems = await this.orderItemsRepository
            .createQueryBuilder('orderItem')
            .leftJoinAndSelect('orderItem.product', 'product')
            .where('orderItem.orderId IN (:...orderIds)', { orderIds })
            .orderBy('product.isPrivateLabel', 'DESC')
            .addOrderBy('product.ratingCount', 'DESC')
            .getMany();
        const productIds = orderItems.map(item => item.productId).filter(id => !!id);
        const userRatings = productIds.length > 0
            ? await this.ratingsRepository.find({
                where: {
                    userId,
                    productId: (0, typeorm_2.In)(productIds)
                }
            })
            : [];
        const productCredits = await this.productCreditsRepository.find({
            where: {
                orderId: (0, typeorm_2.In)(orderIds),
                isClaimed: false,
            }
        });
        const ratingMap = new Map(userRatings.map(rating => [rating.productId, rating]));
        const creditMap = new Map(productCredits.map(credit => [
            `${credit.orderId}-${credit.productId}`,
            credit
        ]));
        const orderItemsMap = new Map();
        orderItems.forEach(item => {
            if (!orderItemsMap.has(item.orderId)) {
                orderItemsMap.set(item.orderId, []);
            }
            orderItemsMap.get(item.orderId).push(item);
        });
        return orders.map(order => {
            const items = orderItemsMap.get(order.id) || [];
            const products = items.map(item => {
                const userRating = item.productId ? ratingMap.get(item.productId) : undefined;
                const creditKey = `${order.id}-${item.productId}`;
                const productCredit = creditMap.get(creditKey);
                if (!item.product) {
                    return {
                        id: item.productId || 'deleted',
                        name: 'Deleted Product',
                        description: 'This product is no longer available',
                        price: Number(item.unitPrice),
                        isPrivateLabel: false,
                        ratingCount: 0,
                        averageRating: 0,
                        quantity: item.quantity,
                        rateable: false,
                        totalPrice: Number(item.totalPrice),
                        hasUserRated: !!userRating,
                        rewardAmount: 0,
                        userRating: userRating ? {
                            score: userRating.score,
                            comment: userRating.comment,
                            createdAt: userRating.createdAt,
                            id: userRating.id
                        } : undefined,
                        rewardInfo: undefined
                    };
                }
                return {
                    id: item.product.id,
                    name: item.product.name,
                    description: item.product.description,
                    price: Number(item.product.price),
                    isPrivateLabel: item.product.isPrivateLabel,
                    ratingCount: item.product.ratingCount,
                    averageRating: Number(item.product.averageRating),
                    quantity: item.quantity,
                    rateable: item.product.allowedRating,
                    totalPrice: Number(item.totalPrice),
                    hasUserRated: !!userRating,
                    rewardAmount: Number(item.product.rewardAmount),
                    userRating: userRating ? {
                        score: userRating.score,
                        comment: userRating.comment,
                        createdAt: userRating.createdAt,
                        id: userRating.id
                    } : undefined,
                    rewardInfo: productCredit ? {
                        allocatedCredit: Number(productCredit.allocatedCredit),
                        ratingPoints: productCredit.ratingPoints,
                        canEarnReward: true
                    } : undefined
                };
            });
            return {
                orderId: order.id,
                orderDate: order.createdAt,
                totalAmount: Number(order.totalAmount),
                bonusEarned: Number(order.bonusEarned),
                products,
                createdAt: order.createdAt
            };
        });
    }
    async getUnratedProducts() {
        const user = this.clsService.get('user');
        if (!user)
            throw new common_1.ForbiddenException('User not identified');
        const userId = user.id;
        const orders = await this.getMyOrders({});
        const unratedProducts = [];
        orders.forEach(order => {
            order.products.forEach(product => {
                if (!product.hasUserRated && product.rateable) {
                    unratedProducts.push(product);
                }
            });
        });
        const uniqueProducts = Array.from(new Map(unratedProducts.map(p => [p.id, p])).values());
        return uniqueProducts.sort((a, b) => {
            if (a.isPrivateLabel !== b.isPrivateLabel) {
                return a.isPrivateLabel ? -1 : 1;
            }
            return b.ratingCount - a.ratingCount;
        });
    }
    async getOrderStats() {
        const user = this.clsService.get('user');
        if (!user)
            throw new common_1.ForbiddenException('User not identified');
        const userId = user.id;
        const stats = await this.ordersRepository
            .createQueryBuilder('order')
            .select('COUNT(*)', 'totalOrders')
            .addSelect('SUM(order.totalAmount)', 'totalSpent')
            .addSelect('SUM(order.bonusEarned)', 'totalBonusEarned')
            .where('order.userId = :userId', { userId })
            .getRawOne();
        return {
            totalOrders: parseInt(stats.totalOrders) || 0,
            totalSpent: parseFloat(stats.totalSpent) || 0,
            totalBonusEarned: parseFloat(stats.totalBonusEarned) || 0
        };
    }
    async deleteOrder(id) {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        await this.ordersRepository.remove(order);
        return {
            id,
            message: 'Order deleted successfully',
            deletedAt: new Date(),
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(5, (0, typeorm_1.InjectRepository)(bonus_card_entity_1.BonusCard)),
    __param(6, (0, typeorm_1.InjectRepository)(product_credit_entity_1.ProductCredit)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _g : Object, typeof (_h = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _h : Object, typeof (_j = typeof nestjs_cls_1.ClsService !== "undefined" && nestjs_cls_1.ClsService) === "function" ? _j : Object])
], OrdersService);


/***/ }),

/***/ "./src/services/products.service.ts":
/*!******************************************!*\
  !*** ./src/services/products.service.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = void 0;
const product_entity_1 = __webpack_require__(/*! @/entities/product.entity */ "./src/entities/product.entity.ts");
const rating_entity_1 = __webpack_require__(/*! @/entities/rating.entity */ "./src/entities/rating.entity.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let ProductsService = class ProductsService {
    constructor(productRepository, ratingRepository) {
        this.productRepository = productRepository;
        this.ratingRepository = ratingRepository;
    }
    async create(createProductDto) {
        const product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(product);
    }
    async findAll() {
        const products = await this.productRepository.find();
        return products;
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async findTop() {
        const top10Products = await this.productRepository
            .createQueryBuilder('product')
            .where('product.is_active = :active', { active: true })
            .orderBy('product.average_rating', 'DESC')
            .limit(10)
            .getMany();
        const data = await Promise.all(top10Products.map(async (item) => {
            const lastTwoReviews = await this.ratingRepository
                .createQueryBuilder('rating')
                .leftJoin('rating.user', 'user')
                .select([
                'rating.id AS id',
                'rating.userId AS "userId"',
                'user.name AS name',
                'rating.comment AS comment',
                'rating.createdAt AS "createdAt"',
                'rating.score AS "score"'
            ])
                .where('rating.productId = :productId', { productId: item.id })
                .orderBy('rating.createdAt', 'DESC')
                .limit(2)
                .getRawMany();
            const ratingDistributionRaw = await this.ratingRepository
                .createQueryBuilder('rating')
                .select('rating.score', 'score')
                .addSelect('COUNT(*)', 'count')
                .where('rating.productId = :productId', { productId: item.id })
                .groupBy('rating.score')
                .getRawMany();
            const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            ratingDistributionRaw.forEach(r => {
                ratingDistribution[Number(r.score)] = Number(r.count);
            });
            return {
                ...item,
                comments: lastTwoReviews,
                ratingDistribution
            };
        }));
        return data;
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        const updated = this.productRepository.merge(product, updateProductDto);
        return await this.productRepository.save(updated);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
        return {
            message: 'Product deleted successfully',
            product
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ProductsService);


/***/ }),

/***/ "./src/services/ratings.service.ts":
/*!*****************************************!*\
  !*** ./src/services/ratings.service.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const rating_entity_1 = __webpack_require__(/*! ../entities/rating.entity */ "./src/entities/rating.entity.ts");
const product_entity_1 = __webpack_require__(/*! ../entities/product.entity */ "./src/entities/product.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../entities/user.entity */ "./src/entities/user.entity.ts");
const order_item_entity_1 = __webpack_require__(/*! ../entities/order-item.entity */ "./src/entities/order-item.entity.ts");
const reward_transaction_entity_1 = __webpack_require__(/*! ../entities/reward-transaction.entity */ "./src/entities/reward-transaction.entity.ts");
const product_credit_entity_1 = __webpack_require__(/*! ../entities/product-credit.entity */ "./src/entities/product-credit.entity.ts");
const nestjs_cls_1 = __webpack_require__(/*! nestjs-cls */ "nestjs-cls");
const ai_classification_service_1 = __webpack_require__(/*! ./ai-classification.service */ "./src/services/ai-classification.service.ts");
const REWARD_CONFIG = {
    PL_PRODUCT_POINTS: 30,
    NORMAL_PRODUCT_POINTS: 10,
    POINTS_TO_DOLLAR_RATE: 0.001
};
let RatingsService = class RatingsService {
    constructor(ratingsRepository, productsRepository, usersRepository, orderItemsRepository, rewardTransactionsRepository, productCreditsRepository, dataSource, clsService, aiClassificationService) {
        this.ratingsRepository = ratingsRepository;
        this.productsRepository = productsRepository;
        this.usersRepository = usersRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.rewardTransactionsRepository = rewardTransactionsRepository;
        this.productCreditsRepository = productCreditsRepository;
        this.dataSource = dataSource;
        this.clsService = clsService;
        this.aiClassificationService = aiClassificationService;
    }
    async createRating(createRatingDto) {
        const { productId, score, comment } = createRatingDto;
        const user = this.clsService.get('user');
        if (!user)
            throw new common_1.ForbiddenException('User not identified');
        const userId = user.id;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const product = await queryRunner.manager.findOne(product_entity_1.Product, {
                where: { id: productId, isActive: true }
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found or is not active');
            }
            const hasPurchased = await this.verifyUserPurchase(userId, productId, queryRunner.manager);
            if (!hasPurchased) {
                throw new common_1.BadRequestException('You can only rate products you have purchased');
            }
            const existingRating = await queryRunner.manager.findOne(rating_entity_1.Rating, {
                where: { userId, productId }
            });
            if (existingRating) {
                throw new common_1.ConflictException('You have already rated this product');
            }
            const unclaimedCredits = await queryRunner.manager.find(product_credit_entity_1.ProductCredit, {
                where: {
                    productId,
                    isClaimed: false,
                },
                relations: ['order'],
            });
            const userCredits = unclaimedCredits.filter(credit => credit.order && credit.order.userId === userId);
            if (userCredits.length === 0) {
                throw new common_1.BadRequestException('No available credits for this product. You may have already rated it from all purchases.');
            }
            const creditToUse = userCredits[0];
            const rewardPoints = creditToUse.ratingPoints;
            const rewardAmount = creditToUse.allocatedCredit;
            const rating = queryRunner.manager.create(rating_entity_1.Rating, {
                userId,
                productId,
                score,
                comment: comment,
                rewardPoints,
                rewardAmount: Number(rewardAmount)
            });
            const savedRating = await queryRunner.manager.save(rating_entity_1.Rating, rating);
            creditToUse.isClaimed = true;
            await queryRunner.manager.save(product_credit_entity_1.ProductCredit, creditToUse);
            await this.updateProductRatingStats(productId, queryRunner.manager);
            const user = await queryRunner.manager.findOne(user_entity_1.User, { where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const newBalance = Number(user.bonusBalance) + Number(rewardAmount);
            user.bonusBalance = newBalance;
            await queryRunner.manager.save(user_entity_1.User, user);
            const transaction = queryRunner.manager.create(reward_transaction_entity_1.RewardTransaction, {
                userId,
                ratingId: savedRating.id,
                type: reward_transaction_entity_1.TransactionType.RATING_REWARD,
                points: rewardPoints,
                amount: rewardAmount,
                balanceAfter: newBalance,
                description: `Rating reward for ${product.isPrivateLabel ? 'PL' : 'normal'} product: ${product.name}`
            });
            await queryRunner.manager.save(reward_transaction_entity_1.RewardTransaction, transaction);
            await queryRunner.commitTransaction();
            if (comment && comment.trim().length > 0) {
                try {
                    await this.aiClassificationService.classifyComment(savedRating.id, comment);
                }
                catch (classificationError) {
                    console.error('AI Classification failed:', classificationError);
                }
            }
            return {
                id: savedRating.id,
                productId: product.id,
                productName: product.name,
                score: savedRating.score,
                comment: savedRating.comment,
                rewardPoints: savedRating.rewardPoints,
                rewardAmount: savedRating.rewardAmount,
                createdAt: savedRating.createdAt
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateRating(ratingId, updateRatingDto) {
        const userId = this.clsService.get("user").id;
        const rating = await this.ratingsRepository.findOne({
            where: { id: ratingId },
            relations: ['product']
        });
        if (!rating) {
            throw new common_1.NotFoundException('Rating not found');
        }
        if (rating.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own ratings');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (updateRatingDto.score !== undefined)
                rating.score = updateRatingDto.score;
            if (updateRatingDto.comment !== undefined)
                rating.comment = updateRatingDto.comment;
            const savedRating = await queryRunner.manager.save(rating_entity_1.Rating, rating);
            await queryRunner.manager.delete('AiClassification', { ratingId: rating.id });
            if (updateRatingDto.comment !== undefined) {
                await this.aiClassificationService.classifyRating(savedRating.id, savedRating.comment, queryRunner.manager);
            }
            await this.updateProductRatingStats(rating.productId, queryRunner.manager);
            await queryRunner.commitTransaction();
            return {
                id: savedRating.id,
                productId: rating.product.id,
                productName: rating.product.name,
                score: savedRating.score,
                comment: savedRating.comment,
                rewardPoints: savedRating.rewardPoints,
                rewardAmount: savedRating.rewardAmount,
                createdAt: savedRating.createdAt
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async verifyUserPurchase(userId, productId, manager) {
        const orderItem = await manager
            .createQueryBuilder(order_item_entity_1.OrderItem, 'orderItem')
            .innerJoin('orderItem.order', 'order')
            .where('order.userId = :userId', { userId })
            .andWhere('orderItem.productId = :productId', { productId })
            .getOne();
        return !!orderItem;
    }
    async updateProductRatingStats(productId, manager) {
        const stats = await manager
            .createQueryBuilder(rating_entity_1.Rating, 'rating')
            .select('COUNT(*)', 'count')
            .addSelect('AVG(rating.score)', 'average')
            .where('rating.productId = :productId', { productId })
            .getRawOne();
        await manager.update(product_entity_1.Product, productId, {
            ratingCount: parseInt(stats.count),
            averageRating: parseFloat(stats.average).toFixed(2)
        });
    }
    async getProductRatings(productId) {
        const ratings = await this.ratingsRepository.find({
            where: { productId },
            relations: ['user', 'product', 'aiClassifications'],
            order: { createdAt: 'DESC' }
        });
        return ratings.map(rating => ({
            id: rating.id,
            productId: rating.product.id,
            productName: rating.product.name,
            score: rating.score,
            comment: rating.comment,
            rewardPoints: rating.rewardPoints,
            rewardAmount: rating.rewardAmount,
            createdAt: rating.createdAt,
            aiClassifications: rating.aiClassifications?.map(c => ({
                topicLabel: c.topicLabel,
                topicConfidence: c.topicConfidence,
            })) || []
        }));
    }
    async getProductRatingStats(productId) {
        const product = await this.productsRepository.findOne({
            where: { id: productId }
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const distribution = await this.ratingsRepository
            .createQueryBuilder('rating')
            .select('rating.score', 'score')
            .addSelect('COUNT(*)', 'count')
            .where('rating.productId = :productId', { productId })
            .groupBy('rating.score')
            .getRawMany();
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        distribution.forEach(item => {
            ratingDistribution[item.score] = parseInt(item.count);
        });
        let topTopics = [];
        try {
            topTopics = await this.aiClassificationService.getProductClassificationStats(productId);
        }
        catch (error) {
            console.error('Failed to get classification stats:', error);
        }
        return {
            productId: product.id,
            averageRating: Number(product.averageRating),
            totalRatings: product.ratingCount,
            ratingDistribution,
            topTopics: topTopics.slice(0, 5)
        };
    }
    async getUserRatings() {
        const user = this.clsService.get('user');
        if (!user)
            throw new common_1.ForbiddenException('User not identified');
        const userId = user.id;
        const ratings = await this.ratingsRepository.find({
            where: { userId },
            relations: ['product', 'aiClassifications'],
            order: { createdAt: 'DESC' }
        });
        return ratings.map(rating => ({
            id: rating.id,
            productId: rating.product.id,
            productName: rating.product.name,
            score: rating.score,
            comment: rating.comment,
            rewardPoints: rating.rewardPoints,
            rewardAmount: rating.rewardAmount,
            createdAt: rating.createdAt,
            aiClassifications: rating.aiClassifications?.map(c => ({
                topicLabel: c.topicLabel,
                topicConfidence: c.topicConfidence,
            })) || []
        }));
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(4, (0, typeorm_1.InjectRepository)(reward_transaction_entity_1.RewardTransaction)),
    __param(5, (0, typeorm_1.InjectRepository)(product_credit_entity_1.ProductCredit)),
    __param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => ai_classification_service_1.AiClassificationService))),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _g : Object, typeof (_h = typeof nestjs_cls_1.ClsService !== "undefined" && nestjs_cls_1.ClsService) === "function" ? _h : Object, typeof (_j = typeof ai_classification_service_1.AiClassificationService !== "undefined" && ai_classification_service_1.AiClassificationService) === "function" ? _j : Object])
], RatingsService);


/***/ }),

/***/ "./src/services/users.service.ts":
/*!***************************************!*\
  !*** ./src/services/users.service.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const user_entity_1 = __webpack_require__(/*! @/entities/user.entity */ "./src/entities/user.entity.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const nestjs_cls_1 = __webpack_require__(/*! nestjs-cls */ "nestjs-cls");
let UsersService = class UsersService {
    constructor(userRepo, clsService) {
        this.userRepo = userRepo;
        this.clsService = clsService;
    }
    async create({ name, surname, phone, password, dateOfBirth }) {
        const isUserExist = !!(await this.findOneByUsername({ phone }));
        if (isUserExist) {
            throw new common_1.ConflictException('Phone number has already been taken!');
        }
        const newUser = this.userRepo.create({
            name,
            surname,
            phone,
            dateOfBirth,
            password
        });
        await this.userRepo.save(newUser);
        return newUser;
    }
    async findAll() {
        const users = await this.userRepo.find({
            relations: ["bonusCard"],
            select: { bonusCard: true }
        });
        return users;
    }
    async findOne(id) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException('User does not exist');
        }
        return user;
    }
    async getMe() {
        const user = await this.clsService.get('user');
        return user;
    }
    async findOneByUsername(where, select, relations) {
        const user = await this.userRepo.findOne({
            where,
            select,
            relations
        });
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        await this.userRepo.save(user);
        return user;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepo.remove(user);
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof nestjs_cls_1.ClsService !== "undefined" && nestjs_cls_1.ClsService) === "function" ? _b : Object])
], UsersService);


/***/ }),

/***/ "@nestjs/axios":
/*!********************************!*\
  !*** external "@nestjs/axios" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "nestjs-cls":
/*!*****************************!*\
  !*** external "nestjs-cls" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nestjs-cls");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('OBA Market API')
        .setDescription('Bonus card rating system API')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(3000);
    console.log(`🚀 Application is running on: http://localhost:3000`);
    console.log(`📚 Swagger docs available at: http://localhost:3000/api/docs`);
}
bootstrap();

})();

/******/ })()
;