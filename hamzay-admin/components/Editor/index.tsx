'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
  Element as SlateElement,
  Range,
} from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineFile,
  AiOutlinePicture,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { RiSendPlaneLine } from 'react-icons/ri';
import { css } from '@emotion/css';
import { Picker } from 'emoji-mart';
import { categories } from './categories';
import toast, { Toaster } from 'react-hot-toast';
import SlateRenderer from './Renderer';
import { useRouter } from 'next/navigation';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
] as any;

// Utility functions for handling formatting
const toggleFormat = (editor: any, format: any) => {
  const isActive = isFormatActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isFormatActive = (editor: any, format: string) => {
  const marks = Editor.marks(editor) as [];
  return marks ? marks[format as any] === true : false;
};

// Leaf component to apply formatting to text
const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.link) {
    children = (
      <a
        href={leaf.url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-500 underline'
      >
        {children}
      </a>
    );
  }
  return <span {...attributes}>{children}</span>;
};

// Image component
const ImageElement = ({ attributes, children, element }: any) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img src={element.url} alt='' className='h-auto max-w-full' />
      </div>
      {children}
    </div>
  );
};

// Link component
const LinkElement = ({ attributes, children, element }: any) => {
  return (
    <a href={element.url} {...attributes} className='text-blue-500 underline'>
      {children}
    </a>
  );
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_BLOCK_TYPES = [
  'paragraph',
  'heading-one',
  'heading-two',
  'heading-three',
];

const HamzayEditor = () => {
  const [editor] = useState<any>(() => withReact(withHistory(createEditor())));
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  //CONTACTS

  const [contacts, setContacts] = useState<any[]>([]);

  const handleGetContacts = async () => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/contacts`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const response = await request.json();
      setContacts(response.data);
      console.log(response);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const [subscribers, setSubscribers] = useState<any[]>([]);

  const handleGetSubscribers = async () => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/subscribers`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const response = await request.json();
      setSubscribers(response.data);
      console.log(response);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleGetContacts();
    handleGetSubscribers();
  }, []);

  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'bulleted-list':
        return (
          <ul className=' list-item' {...props.attributes}>
            {props.children}
          </ul>
        );
      case 'numbered-list':
        return (
          <ol className=' list-decimal' {...props.attributes}>
            {props.children}
          </ol>
        );
      case 'list-item':
        return <li {...props.attributes}>{props.children}</li>;
      case 'image':
        return <ImageElement {...props} />;
      case 'link':
        return <LinkElement {...props} />;
      case 'heading-one':
        return (
          <h1 className=' text-2xl font-bold' {...props.attributes}>
            {props.children}
          </h1>
        );
      case 'heading-two':
        return (
          <h2 className='text-xl font-bold' {...props.attributes}>
            {props.children}
          </h2>
        );
      case 'heading-three':
        return (
          <h3 className=' text-sm font-bold' {...props.attributes}>
            {props.children}
          </h3>
        );
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  const toggleHeading = (editor: Editor, format: string) => {
    const isActive = isBlockActive(editor, format);
    const newProperties: Partial<SlateElement> = {
      type: isActive ? 'paragraph' : format,
    } as any;
    Transforms.setNodes(editor, newProperties);
  };
  const toggleList = (editor: any, format: string) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n: any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes((n as any).type),
      split: true,
    });

    const newProperties: Partial<SlateElement> = {
      type: !isActive ? 'paragraph' : isList ? 'list-item' : format,
    } as any;
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const isBlockActive = (editor: any, format: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === format,
    }) as any;
    return !!match;
  };

  // Function to insert an image element into the editor
  const insertImage = (url: string) => {
    const text = { text: '' };
    const image = { type: 'image', url, children: [text] };
    Transforms.insertNodes(editor, image);
  };

  // Function to insert a link
  const insertLink = () => {
    if (!linkUrl) return;

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);

    if (isCollapsed) {
      Transforms.insertNodes(editor, {
        type: 'link',
        url: linkUrl,
        children: [{ text: linkUrl }],
      } as any);
    } else {
      Transforms.wrapNodes(
        editor,
        { type: 'link', url: linkUrl, children: [] } as any,
        { split: true }
      );
      Transforms.collapse(editor, { edge: 'end' });
    }

    setLinkUrl(''); // Reset the input
    setShowLinkInput(false);
  };

  // Function to handle image file input
  const handleImageUpload = (event: Event) => {
    const file = (event as any).target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      console.log(reader.result);
      toast.loading('Uploading image... A moment please');
      const request = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL as string
        }/api/blog/hamzay/4hmztech/hamzayhamzay/upload/image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer {token}`,
          },
          body: JSON.stringify({ image: reader.result }),
        }
      );

      const response = await request.json();
      console.log(response);

      toast.dismiss();

      if (response.success) {
        insertImage(response.data);
        toast.success('Image uploaded successfully.');
      } else {
        toast.error('Failed to upload image.');
      }
    };
    reader.readAsDataURL(file); // Convert image to base64 URL
  };

  // Function to handle image URL input
  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      insertImage(imageUrl);
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  const handleBold = () => {
    toggleFormat(editor, 'bold');
  };

  const handleItalic = () => {
    toggleFormat(editor, 'italic');
  };

  const handleSubmit = () => {
    setContent(value);
    console.log('Comment:', JSON.stringify(value));
  };

  const toggleLinkInput = () => {
    setShowLinkInput(!showLinkInput);
  };

  const addEmoji = (emoji: any) => {
    const { selection } = editor;
    if (selection) {
      Transforms.insertText(editor, emoji.native);
    }
  };

  const [content, setContent] = useState<any>('');
  const [saveStatus, setSaveStatus] = useState('Saved');

  const [blogDetails, setBlogDetails] = useState<{
    title: string;
    description: string;
    tags: string;
    category: string;
    author: string;
    keywords: string;
    blogImage: string;
    slug: string;
    blogType: string;
  }>({
    title: '',
    description: '',
    tags: '',
    category: 'Wearable device',
    author: '',
    keywords: '',
    blogImage: '',
    slug: '',
    blogType: 'blog',
  });

  const handleEditBlog = (blog: any) => {
    console.log(typeof blog.content);
    console.log(typeof JSON.parse(blog.content));
    console.log(JSON.parse(blog.content));
    setBlogDetails({
      title: blog.title,
      description: blog.description,
      tags: blog.tags,
      category: blog.category,
      author: blog.author,
      keywords: blog.keywords,
      blogImage: blog.blogImage,
      slug: blog.slug,
      blogType: blog.blogType,
    });
    setBlogId(blog._id);
    // setValue(JSON.parse(blog.content));
    setJsonVal(JSON.parse(blog.content));
    setShowEditBlog(true);
  };

  const [jsonVal, setJsonVal] = useState<any>(null);
  const [editorContent, setEditorContent] = useState<any>(null);
  const [blogId, setBlogId] = useState<string>('');
  const [showEditBlog, setShowEditBlog] = useState<boolean>(false);

  const [active, setActive] = useState<string>('');

  const [publishing, setPublishing] = useState<boolean>(false);

  const [blogs, setBlogs] = useState<any[]>([]);

  const router = useRouter();

  const handlePublish = async () => {
    try {
      if (
        blogDetails.title === '' ||
        blogDetails.description === '' ||
        blogDetails.tags === '' ||
        blogDetails.category === '' ||
        blogDetails.author === '' ||
        blogDetails.slug === '' ||
        !blogDetails.blogType
      )
        return toast.error('Please fill all fields.');

      if (!value) return alert('Please write some content.');

      toast.loading('Publishing blog... A moment please');
      const url = blogId
        ? `/api/blog/hamzay/4hmztech/hamzayhamzay/update/${blogId}`
        : '/api/blog/hamzay/4hmztech/hamzayhamzay/create';

      const options = {
        method: blogId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer {token}`,
        },
        body: JSON.stringify({
          ...blogDetails,
          content: JSON.stringify(value),
          json: jsonVal,
        }),
      };

      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`,
        options
      );
      const response = await request.json();
      console.log(response);
      if (response.success) {
        toast.success('Blog published successfully.');
        toast.dismiss();
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      handleGetBlogs();
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    }
  };

  const handleGetBlogs = async () => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/blogs`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer {token}`,
          },
        }
      );
      const response = await request.json();
      setBlogs(response.data);
      console.log(response);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setBlogDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const [match] = Editor.nodes(editor, {
        match: (n: any) => n.type,
        // n.type === "image" ||
        // n.type === "heading-one" ||
        // n.type === "heading-two" ||
        // n.type === "heading-three" ||
        // n.type === "numbered-list" ||
        // n.type === "bulleted-list" ||
        // n.type === "list-item",
      }) as any;

      if (match) {
        // Prevent default 'Enter' behavior
        event.preventDefault();
        // Insert a new paragraph instead of duplicating the image
        Transforms.insertNodes(editor, {
          type: 'paragraph',
          children: [{ text: '' }],
        } as any);
      }
    }
  };

  console.log(value);
  return (
    <>
      <Toaster />
      <div
        className='mx-auto my-3 mb-6 w-full rounded-lg border border-gray-300 bg-white'
        onClick={() => {
          // setShowLinkInput(false);
          // setShowImageInput(false);
        }}
      >
        <div className='border-muted bg-background flex w-full flex-col justify-between border-b px-5 py-3'>
          <div className='flex w-[60%] flex-col gap-5'>
            <h1 className=' text-xl font-bold'>Blog Details</h1>
            <div className='w-full'>
              <input
                type='text'
                name='title'
                value={blogDetails.title}
                onChange={handleChange}
                className='
              w-full rounded-sm border-[2px] border-zinc-400 bg-transparent p-2 text-3xl font-bold focus:outline-none
              '
                placeholder='Title'
              />
            </div>
            <div>
              <input
                type='text'
                name='author'
                value={blogDetails.author}
                onChange={handleChange}
                className='
            w-full rounded-sm border-[2px] border-zinc-400 bg-transparent p-2 text-sm font-normal focus:outline-none
            '
                placeholder='Author'
              />
            </div>
            <div className='w-full'>
              <textarea
                rows={3}
                name='description'
                value={blogDetails.description}
                onChange={handleChange}
                draggable={false}
                className='
              w-full rounded-sm border-[2px] border-zinc-400 bg-transparent p-2 text-lg font-normal focus:outline-none
              '
                placeholder='Description'
              />
            </div>
            <div>
              <input
                type='text'
                name='tags'
                value={blogDetails.tags}
                onChange={handleChange}
                className='
            w-full rounded-sm border-[2px] border-zinc-400 bg-transparent p-2 text-sm font-normal focus:outline-none
            '
                placeholder='Tags (separated by commas)'
              />
            </div>
            <div className='flex w-full items-center gap-2'>
              <p className=' text-base font-semibold'>Blog Type:</p>

              <select
                title='Blog Type'
                name='blogType'
                id=''
                value={blogDetails.blogType}
                onChange={handleChange}
                className='
            w-[150px] max-w-[400px] rounded-sm border-[2px] border-zinc-400  bg-white p-[5px] text-sm font-normal text-zinc-700 focus:outline-none
            '
              >
                <option value='blog'>Blog</option>
                <option value='product'>Product</option>
              </select>
            </div>
            <div>
              <input
                type='text'
                name='slug'
                value={blogDetails.slug}
                onChange={handleChange}
                className='
            w-full rounded-sm border-[2px] border-zinc-400 bg-transparent p-2 text-sm font-normal focus:outline-none
            '
                placeholder='Enter the slug to be unique to only this blog.'
              />
            </div>
            <div className='flex w-full items-center gap-2'>
              <p className=' text-base font-semibold'>Category:</p>
              <select
                title='Category'
                name='category'
                id=''
                value={blogDetails.category}
                onChange={handleChange}
                className='
            w-[150px] max-w-[400px] rounded-sm border-[2px] border-zinc-400  bg-white p-[5px] text-sm font-normal text-zinc-700 focus:outline-none
            '
              >
                {categories.map((category, idx) => (
                  <option key={idx} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className=' flex w-full items-center gap-3'>
                <p className='text-base font-semibold'>Blog Image Cover:</p>
                <input
                  type='file'
                  accept='image/*'
                  title='Select image'
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setBlogDetails((prev) => ({
                          ...prev,
                          blogImage: reader.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className='w-[150px] max-w-[400px] rounded-sm border-[2px] border-zinc-400 bg-white p-[5px] text-sm font-normal text-zinc-700 focus:outline-none'
                />
              </div>
            </div>

            <div>
              <input
                type='Keywords'
                name='keywords'
                value={blogDetails.keywords}
                className='
            w-full rounded-sm border-[2px] border-zinc-400 bg-transparent p-2 text-sm font-normal focus:outline-none
            '
                placeholder='Keywords (separated by commas)'
                onChange={handleChange}
              />
            </div>

            <div></div>
          </div>
        </div>
        {!showEditBlog && (
          <Slate
            editor={editor}
            initialValue={initialValue}
            onValueChange={(value) => {
              setValue(value);
            }}
            // value={value}
            onChange={(newValue: any) => {
              console.log(typeof newValue);
              console.log(newValue);
              setValue(newValue);
            }}
          >
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              onKeyDown={handleKeyDown}
              placeholder='Enter some texts...'
              className={`${css`
                min-height: 400px;
                padding: 10px;
              `} placeholder:p-3 focus-within:outline-none`}
            />
            <div className='relative flex h-[46px] w-[350px] justify-between space-x-4 rounded-tr-md bg-gray-200 px-4 py-1'>
              <div className=' flex gap-4'>
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    toggleHeading(editor, 'heading-one');
                  }}
                >
                  H1
                </button>
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    toggleHeading(editor, 'heading-two');
                  }}
                >
                  H2
                </button>
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    toggleHeading(editor, 'heading-three');
                  }}
                >
                  H3
                </button>
                <button
                  title='Bold Text'
                  onClick={handleBold}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineBold />
                </button>
                <button
                  title='Italize text'
                  onClick={handleItalic}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineItalic />
                </button>
                <button
                  title='Ordered List'
                  onClick={() => toggleList(editor, 'numbered-list')}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineOrderedList />
                </button>

                <button
                  title='Unordered List'
                  onClick={() => toggleList(editor, 'bulleted-list')}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineUnorderedList />
                </button>

                <button
                  title='Select image'
                  onClick={() => setShowImageInput(!showImageInput)}
                  className='text-xl text-gray-700 hover:text-black'
                >
                  <AiOutlinePicture />
                </button>
              </div>

              <div className=' flex gap-4'>
                <button
                  title='add link to text'
                  onClick={toggleLinkInput}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineLink />
                </button>
                {/* <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-gray-600 hover:text-black"
            >
              😊
            </button> */}

                <button
                  onClick={handleSubmit}
                  className='flex items-center rounded-lg bg-gray-400 px-2 text-white hover:bg-gray-500'
                >
                  Check
                </button>
                <button
                  onClick={handlePublish}
                  className='flex items-center rounded-lg bg-gray-400 px-2 text-white hover:bg-gray-500'
                >
                  {blogId ? 'Update' : 'Publish'}
                </button>
              </div>

              {showLinkInput && (
                <div className='absolute my-2 grid h-full place-content-center place-items-center rounded-md bg-black bg-opacity-20 '>
                  <input
                    type='text'
                    placeholder='Enter URL'
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className=' delay-none w-full rounded-lg px-2 py-1 outline-none transition-all duration-500 focus-within:outline-4 focus-within:outline-primary'
                  />
                  <div className=' flex gap-2'>
                    <button
                      onClick={insertLink}
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Add Link
                    </button>
                    <button
                      onClick={() => setShowLinkInput(false)}
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              {/* {showEmojiPicker && (
                        <Picker onSelect={addEmoji} className='my-2' />
                    )} */}
              {showImageInput && (
                <div className='absolute my-2 grid h-full w-full place-content-center place-items-center rounded-md bg-black bg-opacity-20 '>
                  <input
                    type='text'
                    placeholder='Enter image URL'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className=' delay-none w-full rounded-lg px-2 py-1 outline-none transition-all duration-500 focus-within:outline-4 focus-within:outline-primary'
                  />
                  <div className=' flex gap-2'>
                    <button
                      onClick={handleImageUrlSubmit}
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Insert Image
                    </button>
                    <button
                      onClick={() => setShowImageInput(false)}
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Close
                    </button>
                    <label
                      htmlFor='file-input'
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Upload Image
                    </label>
                  </div>

                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleImageUpload(e as any)}
                    className='hidden'
                    id='file-input'
                  />
                </div>
              )}
            </div>
          </Slate>
        )}

        {showEditBlog && (
          <Slate
            editor={editor}
            initialValue={jsonVal}
            onValueChange={(value) => {
              setValue(value);
            }}
            // value={value}
            onChange={(newValue: any) => {
              console.log(typeof newValue);
              console.log(newValue);
              setValue(newValue);
            }}
          >
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              onKeyDown={handleKeyDown}
              placeholder='Enter some texts...'
              className={`${css`
                min-height: 400px;
                padding: 10px;
              `} placeholder:p-3 focus-within:outline-none`}
            />
            <div className='relative flex h-[46px] w-[350px] justify-between space-x-4 rounded-tr-md bg-gray-200 px-4 py-1'>
              <div className=' flex gap-4'>
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    toggleHeading(editor, 'heading-one');
                  }}
                >
                  H1
                </button>
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    toggleHeading(editor, 'heading-two');
                  }}
                >
                  H2
                </button>
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    toggleHeading(editor, 'heading-three');
                  }}
                >
                  H3
                </button>
                <button
                  title='Bold Text'
                  onClick={handleBold}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineBold />
                </button>
                <button
                  title='Italize text'
                  onClick={handleItalic}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineItalic />
                </button>
                <button
                  title='Ordered List'
                  onClick={() => toggleList(editor, 'numbered-list')}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineOrderedList />
                </button>

                <button
                  title='Unordered List'
                  onClick={() => toggleList(editor, 'bulleted-list')}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineUnorderedList />
                </button>

                <button
                  title='Select image'
                  onClick={() => setShowImageInput(!showImageInput)}
                  className='text-xl text-gray-700 hover:text-black'
                >
                  <AiOutlinePicture />
                </button>
              </div>

              <div className=' flex gap-4'>
                <button
                  title='add link to text'
                  onClick={toggleLinkInput}
                  className='text-xl  text-gray-700 hover:text-black'
                >
                  <AiOutlineLink />
                </button>
                {/* <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-gray-600 hover:text-black"
            >
              😊
            </button> */}

                <button
                  onClick={handleSubmit}
                  className='flex items-center rounded-lg bg-gray-400 px-2 text-white hover:bg-gray-500'
                >
                  Check
                </button>
                <button
                  onClick={handlePublish}
                  className='flex items-center rounded-lg bg-gray-400 px-2 text-white hover:bg-gray-500'
                >
                  {blogId ? 'Update' : 'Publish'}
                </button>
              </div>

              {showLinkInput && (
                <div className='absolute my-2 grid h-full place-content-center place-items-center rounded-md bg-black bg-opacity-20 '>
                  <input
                    type='text'
                    placeholder='Enter URL'
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className=' delay-none w-full rounded-lg px-2 py-1 outline-none transition-all duration-500 focus-within:outline-4 focus-within:outline-primary'
                  />
                  <div className=' flex gap-2'>
                    <button
                      onClick={insertLink}
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Add Link
                    </button>
                    <button
                      onClick={() => setShowLinkInput(false)}
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              {/* {showEmojiPicker && (
                        <Picker onSelect={addEmoji} className='my-2' />
                    )} */}
              {showImageInput && (
                <div className='absolute my-2 grid h-full w-full place-content-center place-items-center rounded-md bg-black bg-opacity-20 '>
                  <input
                    type='text'
                    placeholder='Enter image URL'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className=' delay-none w-full rounded-lg px-2 py-1 outline-none transition-all duration-500 focus-within:outline-4 focus-within:outline-primary'
                  />
                  <div className=' flex gap-2'>
                    <button
                      onClick={handleImageUrlSubmit}
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Insert Image
                    </button>
                    <button
                      onClick={() => setShowImageInput(false)}
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Close
                    </button>
                    <label
                      htmlFor='file-input'
                      className='hover:bg-tertiary mt-1 rounded-md bg-secondary px-4 py-1 text-white'
                    >
                      Upload Image
                    </label>
                  </div>

                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleImageUpload(e as any)}
                    className='hidden'
                    id='file-input'
                  />
                </div>
              )}
            </div>
          </Slate>
        )}
      </div>

      {content && <SlateRenderer content={content} />}

      <div className='mt-6'>
        <h2 className='text-xl font-bold'>Blogs</h2>
        <ul className='list-disc pl-5'>
          {blogs && blogs.length ? (
            blogs.map((blog, index) => (
              <li key={index} className='mb-2'>
                <button
                  onClick={() =>
                    setActive(active === blog.title ? '' : blog.title)
                  }
                  className='text-blue-500 underline'
                >
                  {blog.title}
                </button>
                {active === blog.title && (
                  <div className='mt-2 pl-4'>
                    <p>
                      <strong>Author:</strong> {blog.author}
                    </p>
                    <p>
                      <strong>Description:</strong> {blog.description}
                    </p>
                    <p>
                      <strong>Tags:</strong> {blog.tags}
                    </p>
                    <p>
                      <strong>Category:</strong> {blog.category}
                    </p>
                    <p>
                      <strong>Keywords:</strong> {blog.keywords}
                    </p>
                    <div className=' flex gap-3 '>
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className='mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                      >
                        Edit Blog
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete?')) {
                            fetch(
                              `${
                                process.env.NEXT_PUBLIC_BASE_URL as string
                              }/api/blog/delete/${blog._id}`,
                              {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                  // Authorization: `Bearer {token}`,
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((data) => {
                                console.log(data);
                                if (data.success) {
                                  toast.success('Blog deleted successfully.');
                                  handleGetBlogs();
                                } else {
                                  toast.error('Failed to delete blog.');
                                }
                              });
                          }
                        }}
                        className='mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                      >
                        Delete Blog
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li>No blogs found</li>
          )}
        </ul>
      </div>

      <div className='mt-6'>
        <h2 className='text-xl font-bold'>Contacts</h2>
        <ul className='list-disc pl-5'>
          {contacts && contacts.length ? (
            contacts.map((contact, index) => (
              <li key={index} className='mb-2'>
                <p>
                  <strong>Name:</strong> {contact.name}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
                <p>
                  <strong>Phone:</strong> {contact.phone}
                </p>
              </li>
            ))
          ) : (
            <li>No contacts found</li>
          )}
        </ul>
      </div>

      <div className='mt-6'>
        <h2 className='text-xl font-bold'>Subscribers</h2>
        <ul className='list-disc pl-5'>
          {subscribers && subscribers.length ? (
            subscribers.map((subscriber, index) => (
              <li key={index} className='mb-2'>
                <p>
                  <strong>Name:</strong> {subscriber.name}
                </p>
                <p>
                  <strong>Email:</strong> {subscriber.email}
                </p>
              </li>
            ))
          ) : (
            <li>No subscribers found</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default HamzayEditor;
