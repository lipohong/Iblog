import * as express from 'express';
import { LikeController } from '../controllers/likeController';
const auth = require('../middlewares/auth');

export class likeRoute {

  public likeController: LikeController = new LikeController();

  public routes(app): void {
    app.use('/api/likes', this.likeRoute());
  }

  private likeRoute() {
    let router = express.Router();

    router.get('/blog/:blogId', auth(false), this.likeController.getLikesByBlogId);
    router.get('/blog/:blogId/amount', auth(false), this.likeController.getLikesAmountByBlogId);
    router.get('/blog/:blogId/user/:userId', auth(false), this.likeController.checkBlogLikedByUser);
    router.get('/', auth(true), this.likeController.getMyLikes);
    router.get('/blogs/top5', auth(false), this.likeController.getTop5LikedBlogs);
    router.post('/blog', auth(false), this.likeController.getLikeAmountForBlogs);
    router.post('/blog/:blogId', auth(true), this.likeController.likeOrUnlike);

    return router;
  }

}