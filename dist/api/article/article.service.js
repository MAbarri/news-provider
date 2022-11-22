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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./article.entity");
const async = require("async");
const axios = require("axios");
let ArticleService = class ArticleService {
    paginateArticles(country, limit, page) {
        return this.repository.find({
            where: { country: country },
            order: { 'articleDate': 'DESC' },
            take: limit,
            skip: limit * page
        });
    }
    getAllArticle() {
        return this.repository.find();
    }
    getArticle(id) {
        return this.repository.findOne(id);
    }
    createArticle(body) {
        const article = new article_entity_1.Article();
        article.title = body.title;
        return this.repository.save(article);
    }
    findArticle(articleurl) {
        return this.repository.findOne({ where: { sourceURL: articleurl } });
    }
    scrapNewsData(country, category) {
        return new Promise(resolve => {
            const options = {
                method: 'GET',
                url: 'https://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&pageSize=100',
                headers: {
                    'X-Api-Key': 'dbe25773eee642da8aa0b07903b56c92'
                }
            };
            axios.request(options).then(async (response) => {
                console.log("results : ", response.data.articles.length);
                await this.insertNewArticles(response.data.articles, country, category);
                resolve({});
            }).catch(function (error) {
                console.error(error);
            });
        });
    }
    insertNewArticles(articlesArray, country, category) {
        return new Promise(resolve => {
            async.eachSeries(articlesArray, async (_article) => {
                let existingArticle = await this.findArticle(_article.url);
                console.log('Condition for this article : ', !existingArticle, !!_article.url, !!_article.urlToImage, !existingArticle && !!_article.url && !!_article.urlToImage);
                if (!existingArticle && !!_article.url && !!_article.urlToImage) {
                    let newArticle = new article_entity_1.Article();
                    newArticle.title = _article.title;
                    newArticle.articleDate = _article.publishedAt;
                    newArticle.author = _article.author || _article.source.name;
                    newArticle.content = _article.description;
                    newArticle.heroURL = _article.urlToImage;
                    newArticle.source = _article.source.name;
                    newArticle.sourceURL = _article.url;
                    newArticle.lang = "en";
                    newArticle.country = country;
                    newArticle.category = category;
                    console.log('saving new Article');
                    await this.repository.save(newArticle);
                }
                Promise.resolve();
            }, err => {
                console.log('err:', err);
            });
            console.log('FINISHED ?');
            resolve({});
        });
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(article_entity_1.Article),
    __metadata("design:type", typeorm_2.Repository)
], ArticleService.prototype, "repository", void 0);
ArticleService = __decorate([
    (0, common_1.Injectable)()
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map