import { Request, Response } from 'express';
import {
  uploadBase64ImageToCloudinary,
  uploadBase64PdfToCloudinary,
} from '../utils';
import Blog from '../models/blog.model';
import Contact from '../models/contact.model';
import Subscriber from '../models/subscribers.model';

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
    // console.log(blogs[0].content);
    console.log(blogs);

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

    let relatedBlogs;

    if (blog) {
      relatedBlogs = await Blog.find({ category: blog.category }).limit(5);
    }

    const allBlogs = await Blog.find();

    const allCategories = allBlogs.filter(
      (blog) => blog.blogType === 'product'
    );

    const getAllCategories = allCategories.map((category) => category.category);
    const uniqueCategories = [...new Set(getAllCategories)];
    console.log(uniqueCategories);

    return res.status(200).json({
      success: true,
      data: blog,
      relatedBlogs,
      categories: uniqueCategories,
    });
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

export const getBlogsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const blogs = await Blog.find({ category });
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const saveContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: 'Please fill all fields.' });
    }

    const contact = await Contact.create({ name, email, message });

    return res
      .status(201)
      .json({ success: true, data: 'Contact saved successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find();

    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const saveSubscriber = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide a name and email.' });
    }

    const subscriber = await Subscriber.create({ name, email });

    return res
      .status(201)
      .json({ success: true, data: 'Subscriber saved successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await Subscriber.find();

    return res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
