import express from 'express';
import {
  deleteBlog,
  getBlog,
  getBlogs,
  getBlogsByType,
  getLatestBlog,
  getLatestBlogs,
  updateBlog,
  upload,
  uploadImage,
  uploadPdf,
} from '../controllers';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json({ limit: '50mb' })); // or express.json({ limit: '50mb' })

// Increase limit for URL-encoded payload
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/blogs', getBlogs);
// router.get('/blogs/category/:category', getBlogsByCategory)
router.get('/blogs/latest', getLatestBlogs);
router.get('/blog/:id', getBlog);

router.post('/blog/create', upload);
router.put('/blog/update/:id', updateBlog);

router.delete('/blog/delete/:id', deleteBlog);
router.post('/blog/upload/image', uploadImage);
router.post('/upload/pdf', uploadPdf);
export default router;
