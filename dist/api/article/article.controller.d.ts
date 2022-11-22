import { Article } from './article.entity';
export declare class ArticleController {
    private readonly service;
    paginateArticles(country: any, limit: number, page: number): Promise<Article[]>;
}
