import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateArticleDto } from './article.dto';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {

    @Inject(ArticleService)
    private readonly service: ArticleService;

    // @Get()
    // public getAllArticles(): Promise<Article[]> {
    //     return this.service.getAllArticle();
    // }
    // @Get("callapi/:lang/:keyword")
    // public testScrapping(@Param('lang') lang, @Param('keyword') keyword) {
    //     this.service.scrapNewsData(lang, keyword);
    // }

    @Get('paginate/:limit/:page')
    public paginateArticles(@Param('limit', ParseIntPipe) limit: number, @Param('page', ParseIntPipe) page: number): Promise<Article[]> {
        return this.service.paginateArticles(limit, page);
    }

    // @Post()
    // public createArticle(@Body() body: CreateArticleDto): Promise<Article> {
    //     return this.service.createArticle(body);
    // }


}
