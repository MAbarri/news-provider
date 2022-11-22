import { ArticleService } from "../api/article/article.service";
export declare class NewsRetreiverService {
    private articleService;
    constructor(articleService: ArticleService);
    handleCron(): Promise<void>;
}
