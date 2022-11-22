"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
let ArticleController = class ArticleController {
    paginateArticles(country, limit, page) {
        return this.service.paginateArticles(country, limit, page);
    }
};
__decorate([
    (0, common_1.Inject)(article_service_1.ArticleService),
    __metadata("design:type", article_service_1.ArticleService)
], ArticleController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)('paginate/:country/:limit/:page'),
    __param(0, (0, common_1.Param)('country')),
    __param(1, (0, common_1.Param)('limit', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "paginateArticles", null);
ArticleController = __decorate([
    (0, common_1.Controller)('article')
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map