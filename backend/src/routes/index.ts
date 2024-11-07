import express from 'express';
import {
  deleteBlog,
  getBlog,
  getBlogs,
  getBlogsByCategory,
  getBlogsByType,
  getContacts,
  getLatestBlog,
  getLatestBlogs,
  getSubscribers,
  saveContact,
  saveSubscriber,
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
router.get('/blogs/category/:category', getBlogsByCategory);
router.get('/blogs/latest', getLatestBlogs);
router.get('/blog/:id', getBlog);

router.post('/blog/hamzay/4hmztech/hamzayhamzay/create', upload);
router.put('/blog/hamzay/4hmztech/hamzayhamzay/update/:id', updateBlog);

router.delete('/blog/delete/:id', deleteBlog);
router.post('/blog/upload/image', uploadImage);
router.post('/upload/pdf', uploadPdf);

router.post('/contact', saveContact);
router.get('/contacts', getContacts);
router.post('/subscribe', saveSubscriber);
router.get('/subscribers', getSubscribers);
export default router;
