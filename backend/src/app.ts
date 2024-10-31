// Importing required modules
import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import indexRouter from './routes';
import { connectDB } from './configs/config';
import cors from 'cors';

const app = express();
app.use(cors());
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger('dev'));

// Set a reasonable limit for JSON and URL-encoded payloads
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    extended: false,
    limit: '50mb',
    parameterLimit: 1000000,
  })
);

app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: '0', etag: false })
);
app.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// API routes
app.use('/api', indexRouter);

// Middleware to handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = createError(404, 'Not Found');
  next(error);
});

// General error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Set the status code based on the error, default to 500 if not set
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
