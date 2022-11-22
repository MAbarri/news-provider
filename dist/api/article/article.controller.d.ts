import { Article } from './article.entity';
export declare class ArticleController {
    private readonly service;
    paginateArticles(limit: number, page: number): Promise<Article[]>;
}
