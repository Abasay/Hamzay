import { Request, Response } from 'express';
import {
  uploadBase64ImageToCloudinary,
  uploadBase64PdfToCloudinary,
} from '../utils';
import Blog from '../models/blog.model';

export const upload = async (req: Request, res: Response) => {
  try {
    const {
      title,
      category,
      description,
      blogImage,
      keywords,
      tags,
      author,
      content,
    } = req.body;

    if (
      !title ||
      !category ||
      !description ||
      !blogImage ||
      !keywords ||
      !tags ||
      !author ||
      !content
    )
      return res
        .status(500)
        .json({ success: false, message: 'Please fill all fields.' });

    const imageLink = await uploadBase64ImageToCloudinary(blogImage, 'blog');

    const blog = await Blog.create({
      ...req.body,
      image: imageLink,
      keywords: keywords.split(','),
      tags: tags.split(','),
    });

    return res.status(201).json({
      success: true,
      data: 'Blog created successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      description,
      blogImage,
      keywords,
      tags,
      author,
      content,
    } = req.body;
    if (
      !title ||
      !category ||
      !description ||
      !blogImage ||
      !keywords ||
      !tags ||
      !author ||
      !content
    )
      return res
        .status(500)
        .json({ success: false, message: 'Please fill all fields.' });

    const imageLink = await uploadBase64ImageToCloudinary(blogImage, 'blog');

    await Blog.findByIdAndUpdate(id, {
      ...req.body,
      image: imageLink,
      keywords: keywords,
      tags: tags,
    });

    return res
      .status(200)
      .json({ success: true, message: 'Blog updated successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Blog.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: 'Blog deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();

    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const getBlogsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;

    const blogs = await Blog.find({ blogType: type });
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const getLatestBlogs = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    const blogs = await Blog.find({ blogType: type })
      .sort({ createdAt: -1 })
      .limit(5);
    console.log(blogs[0].content);

    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const getLatestBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const getLatestTechBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    console.log(blog?.content);

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;

    if (!image)
      return res
        .status(500)
        .json({ success: false, message: 'Please provide an image.' });

    const imageLink = await uploadBase64ImageToCloudinary(image, 'blog');

    return res.status(200).json({ success: true, data: imageLink });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const uploadPdf = async (req: Request, res: Response) => {
  try {
    const { pdf } = req.body;

    if (!pdf)
      return res
        .status(500)
        .json({ success: false, message: 'Please provide a pdf.' });

    const pdfLink = await uploadBase64PdfToCloudinary(pdf, 'pdf');

    return res.status(200).json({ success: true, data: pdfLink });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
