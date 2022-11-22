import { CreateArticleDto } from './article.dto';
import { Article } from './article.entity';
export declare class ArticleService {
    private readonly repository;
    paginateArticles(country: any, limit: any, page: any): Promise<Article[]>;
    getAllArticle(): Promise<Article[]>;
    getArticle(id: any): Promise<Article>;
    createArticle(body: CreateArticleDto): Promise<Article>;
    findArticle(articleurl: any): Promise<any>;
    scrapNewsData(country: any, category: any): Promise<unknown>;
    insertNewArticles(articlesArray: any, country: any, category: any): Promise<unknown>;
}
