import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Backendless from '../configs/backendless.config';
import { QuillEditor } from '../components/QuillEditor';
import { useAuth } from '../context/AuthContext';
import type { UserWithRole } from '../services/blogService';

interface CreateFormValues {
  title: string;
  image: string;
  content: string;
  tags: string;
}

export const CreateBlog: React.FC = () => {
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const currentUser = user as UserWithRole | null;

  const validationSchema = Yup.object({
    title: Yup.string().trim().required("Title is required"),
    image: Yup.string()
      .trim()
      .url("Please enter a valid URL (e.g., https://example.com/image.jpg)")
      .required("Image URL is required"),
    content: Yup.string()
      .test('has-content', "Content can't be empty", (val: string | undefined) => {
        const stripped = (val || '').replace(/<[^>]*>/g, '').trim();
        return stripped.length > 0;
      })
      .required("Content can't be empty"),
    tags: Yup.string().required("Tag categorization selection is required"),
  });

  const formik = useFormik<CreateFormValues>({
    initialValues: {
      title: '',
      image: '',
      content: '',
      tags: 'Premium',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: CreateFormValues) => {
      setPublishing(true);
      try {
        let dynamicAuthorName = 'User';
        if (currentUser) {
          if (currentUser.role === 'admin') {
            dynamicAuthorName = 'Admin';
          } else {
            dynamicAuthorName = currentUser.email ? currentUser.email.split('@')[0] : 'User';
          }
        }

        await Backendless.Data.of('Blogs').save({
          title: values.title,
          image: values.image,
          content: values.content,
          tags: values.tags,
          authorName: dynamicAuthorName,
          published: Date.now()
        });

        alert("Post published successfully!");
        navigate('/blogs');
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Publishing error:", error);
        alert(errMessage);
      } finally {
        setPublishing(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#020813] text-white pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-luxury-gold uppercase">Creator Dashboard</span>
          <h1 className="text-3xl font-serif text-white uppercase tracking-wide mt-2">Create New Post</h1>
          <div className="w-12 h-px bg-luxury-gold/40 mx-auto mt-6" />
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Article Title</label>
            <input 
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full bg-white/3 border text-white p-4 rounded-xl outline-none transition-colors text-sm ${
                formik.touched.title && formik.errors.title ? "border-red-500 focus:border-red-500" : "border-white/8 focus:border-luxury-gold/40"
              }`}
              placeholder="e.g., The Legacy Behind Phenex Alligator"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1.5 text-xs text-red-400 font-mono pl-1">{formik.errors.title}</p>
            )}
          </div>
          
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Cover Image URL</label>
            <input 
              type="text"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full bg-white/3 border text-white p-4 rounded-xl outline-none transition-colors text-sm ${
                formik.touched.image && formik.errors.image ? "border-red-500 focus:border-red-500" : "border-white/8 focus:border-luxury-gold/40"
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {formik.touched.image && formik.errors.image && (
              <p className="mt-1.5 text-xs text-red-400 font-mono pl-1">{formik.errors.image}</p>
            )}
          </div>

          <div className="space-y-2 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Categorization Tag</label>
            <select
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full bg-[#0d1527] border border-white/8 text-white p-4 rounded-xl outline-none focus:border-luxury-gold/40 transition-colors text-sm cursor-pointer"
            >
              <option value="Premium">Premium</option>
              <option value="Performance">Performance</option>
            </select>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Content</label>
            <QuillEditor 
              value={formik.values.content} 
              onChange={(content) => {
                formik.setFieldValue('content', content);
                formik.setFieldTouched('content', true, false);
              }} 
            />
            {formik.touched.content && formik.errors.content && (
              <p className="mt-1.5 text-xs text-red-400 font-mono pl-1">{formik.errors.content}</p>
            )}
          </div>

          <button 
            type="submit"
            disabled={publishing || !formik.isValid}
            className="w-full bg-luxury-gold text-[#020813] font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-[#eedf9d] transition-all text-xs cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            {publishing ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
};