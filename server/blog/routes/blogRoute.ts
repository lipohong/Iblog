import * as express from 'express';
import { BlogController } from '../controllers/blogController';
import isAdmin from '../middlewares/isAdmin';
const auth = require('../middlewares/auth');

export class blogRoute {

  public blogController: BlogController = new BlogController();

  public routes(app): void {
    app.use('/api/blogs', this.blogRoute());
  }

  private blogRoute() {
    let router = express.Router();

    router.get('/', auth(false), this.blogController.search);
    router.get('/myBlogs', auth(true), this.blogController.getMyBlogs);
    router.get('/user/:userId', auth(false), this.blogController.getUserBlogs);
    router.get('/user/:userId/amount', auth(false), this.blogController.getUserBlogsAmount);
    router.get('/viewedBlogs/top5', auth(false), this.blogController.getTop5ViewedBlogs);
    router.get('/blogPosters/top5', auth(false), this.blogController.getTop5BlogPosters);
    router.get('/latestBlogs/top5', auth(false), this.blogController.getTop5LatestBlogs);
    router.get('/:blogId', auth(false), this.blogController.getBlogById);
    router.post('/', auth(true), this.blogController.create);
    router.post('/blogs', auth(false), this.blogController.getBlogsByIds);
    router.put('/:blogId', auth(true), this.blogController.update);
    router.put('/:blogId/recommend', auth(true), isAdmin, this.blogController.setOrResetRecommend);
    router.delete('/:blogId', auth(true), this.blogController.remove);
    

    return router;
  }

}