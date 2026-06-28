import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { QuillEditor } from '../components/QuillEditor';
import { getBlogs, deleteBlog, updateBlog } from '../services/blogService';
import type { BlogArticle, UserWithRole } from '../services/blogService';
import { Trash2, Calendar, User as UserIcon, Tag } from 'lucide-react';

interface BlogCardProps {
  article: BlogArticle & { tags?: string; authorName?: string };
  index: number;
  isAdmin: boolean;
  glassStyle: string;
  onReadMore: (article: BlogArticle) => void;
  onEdit: (e: React.MouseEvent, article: BlogArticle) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
}

interface FormValues {
  title: string;
  image: string;
  content: string;
  tags: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ article, index, isAdmin, glassStyle, onReadMore, onEdit, onDelete }) => {
  const [imgSrc, setImgSrc] = useState<string>(article.image || '/placeholder.webp');

  const formattedDate = article.published 
    ? new Date(article.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent';

  const displayAuthor = article.authorName || 'Admin';

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className={`${glassStyle} rounded-[24px] overflow-hidden flex flex-col group hover:border-luxury-gold/20 transition-all duration-300`}
    >
      <div className="aspect-16/10 w-full overflow-hidden relative border-b border-white/8 bg-black/40">
        <img 
          src={imgSrc} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
          onError={() => {
            if (imgSrc !== '/placeholder.webp') {
              setImgSrc('/placeholder.webp');
            }
          }}
        />
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
          <button
            onClick={() => onReadMore(article)}
            className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-2 rounded-lg backdrop-blur-sm hover:border-luxury-gold hover:text-luxury-gold transition-colors bg-black/20"
          >
            Read Article
          </button>
        </div>
        
        {isAdmin && (
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <button 
              onClick={(e) => onEdit(e, article)} 
              className="cursor-pointer bg-black/60 backdrop-blur-md text-luxury-gold px-3 py-1.5 text-[9px] font-bold rounded-md border border-luxury-gold/20 tracking-wider uppercase transition-colors hover:text-white"
            >
              EDIT
            </button>
            <button 
              onClick={(e) => onDelete(e, article.objectId)} 
              className="cursor-pointer bg-red-950/60 backdrop-blur-md text-red-200 px-2.5 py-1.5 rounded-md text-[9px] border border-red-500/20 transition-colors hover:bg-red-900/80 flex items-center justify-center"
              title="Delete Article"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {article.tags && (
          <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5">
            <Tag className="w-2.5 h-2.5 text-luxury-gold" />
            <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-300">{article.tags}</span>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8 flex flex-col grow justify-between">
        <div>
          <div className="flex items-center gap-4 text-slate-400 text-[10px] uppercase tracking-widest font-medium mb-3">
            <div className="flex items-center gap-1.5">
              <UserIcon className="w-3 h-3 text-luxury-gold/70" />
              <span className="truncate max-w-30" title={displayAuthor}>{displayAuthor}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-luxury-gold/70" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-serif font-normal text-white group-hover:text-luxury-gold transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h2>
          <div 
            className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-3 font-light mt-3"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </motion.article>
  );
};

export const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<(BlogArticle & { tags?: string; authorName?: string })[] | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);
  const [editingBlog, setEditingBlog] = useState<(BlogArticle & { tags?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  const { user } = useAuth(); 
  const currentUser = user as UserWithRole | null;
  const isAdmin = currentUser?.role === 'admin';

  const fetchBlogs = useCallback(async (): Promise<void> => {
    try {
      const data = await getBlogs();
      setBlogs(data as (BlogArticle & { tags?: string; authorName?: string })[]);
    } catch (err) {
      console.error(err);
      setBlogs([]); 
    }
  }, []);

  useEffect(() => { 
    let active = true;
    const loadContent = async () => {
      if (active) {
        await fetchBlogs();
      }
    };
    void loadContent();
    return () => {
      active = false;
    };
  }, [fetchBlogs]);

  const validationSchema = Yup.object({
    title: Yup.string().trim().required("Title is required"),
    image: Yup.string().trim().url("Please enter a valid URL").required("Image URL is required"),
    content: Yup.string()
      .test('has-content', "Content can't be empty", (val: string | undefined) => {
        const stripped = (val || '').replace(/<[^>]*>/g, '').trim();
        return stripped.length > 0;
      })
      .required("Content can't be empty"),
    tags: Yup.string().required("Tag selection is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      image: '',
      content: '',
      tags: 'Premium',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      if (!editingBlog) return;
      setSaving(true);
      try {
        const updatePayload = {
          objectId: editingBlog.objectId,
          title: values.title,
          image: values.image,
          content: values.content,
          tags: values.tags
        } as unknown as BlogArticle;

        await updateBlog(updatePayload);
        
        setEditingBlog(null);
        void fetchBlogs(); 
      } catch (err) { 
        console.error(err);
        alert(err instanceof Error ? err.message : "Error updating"); 
      } finally {
        setSaving(false); 
      }
    },
  });

  const handleDelete = async (e: React.MouseEvent, objectId: string) => {
    e.stopPropagation();
    if (!isAdmin || !window.confirm("Delete this report?")) return;
    try {
      await deleteBlog(objectId);
      void fetchBlogs();
    } catch (err) { 
      console.error(err);
      alert("Failed to delete."); 
    }
  };

  const startEditing = (e: React.MouseEvent, article: BlogArticle & { tags?: string }) => {
    e.stopPropagation(); 
    setEditingBlog(article);
    formik.setValues({
      title: article.title,
      image: article.image,
      content: article.content,
      tags: article.tags || 'Premium',
    });
  };

  const windowSafeCloseModal = () => {
    setSelectedBlog(null);
  };

  const filteredBlogs = blogs?.filter(blog => {
    if (selectedTag === 'All') return true;
    return blog.tags?.toLowerCase() === selectedTag.toLowerCase();
  }) || [];

  if (blogs === null) {
    return (
      <div className="min-h-screen bg-[#020813] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020813] text-white pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-luxury-gold uppercase">Angler Hub</span>
          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mt-4">
            PHENEX <span className="text-luxury-gold italic">Newsletter</span>
          </h1>
          <div className="w-12 h-px bg-luxury-gold/40 mx-auto mt-5" />
        </div>

        <div className="flex justify-center items-center gap-3 mb-12">
          {['All', 'Premium', 'Performance'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`cursor-pointer text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full transition-all duration-300 border ${
                selectedTag === tag 
                  ? 'bg-luxury-gold text-[#020813] border-luxury-gold' 
                  : 'bg-white/3 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-light text-sm tracking-wide">
            No articles found matching this filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((article, index) => (
              <BlogCard 
                key={article.objectId}
                article={article}
                index={index}
                isAdmin={isAdmin}
                glassStyle={glassStyle}
                onReadMore={setSelectedBlog}
                onEdit={startEditing}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={`${glassStyle} w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[28px] p-6 sm:p-10 relative`}
            >
              <button onClick={windowSafeCloseModal} className="cursor-pointer absolute top-6 right-6 text-white/50 hover:text-white text-sm transition-colors z-20">✕</button>
              <div className="aspect-21/9 w-full overflow-hidden rounded-2xl mb-6 bg-black/40">
                <img 
                  src={selectedBlog.image || '/placeholder.webp'} 
                  alt={selectedBlog.title} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    if (e.currentTarget.src !== window.location.origin + '/placeholder.webp') {
                      e.currentTarget.src = '/placeholder.webp';
                    }
                  }}
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif tracking-tight text-white mb-4 uppercase">{selectedBlog.title}</h2>
              <div 
                className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light space-y-4 custom-html-content"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`${glassStyle} w-full max-w-2xl rounded-[28px] p-6 sm:p-10`}
            >
              <h3 className="text-base tracking-widest text-white mb-6 uppercase font-bold">Edit Article Blueprint</h3>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    name="title"
                    value={formik.values.title} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-white/3 border text-white px-5 py-3.5 rounded-xl text-xs outline-none transition ${
                      formik.touched.title && formik.errors.title ? "border-red-500 focus:border-red-500" : "border-white/8 focus:border-luxury-gold/50"
                    }`} 
                    placeholder="Title" 
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="mt-1.5 text-[10px] text-red-400 font-mono text-left pl-1">{formik.errors.title}</p>
                  )}
                </div>

                <div>
                  <input 
                    type="text" 
                    name="image"
                    value={formik.values.image} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-white/3 border text-white px-5 py-3.5 rounded-xl text-xs outline-none transition ${
                      formik.touched.image && formik.errors.image ? "border-red-500 focus:border-red-500" : "border-white/8 focus:border-luxury-gold/50"
                    }`} 
                    placeholder="Image URL" 
                  />
                  {formik.touched.image && formik.errors.image && (
                    <p className="mt-1.5 text-[10px] text-red-400 font-mono text-left pl-1">{formik.errors.image}</p>
                  )}
                </div>

                <div>
                  <select
                    name="tags"
                    value={formik.values.tags}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-[#0d1527] border border-white/8 text-white px-5 py-3.5 rounded-xl text-xs outline-none focus:border-luxury-gold/50 transition cursor-pointer"
                  >
                    <option value="Premium">Premium</option>
                    <option value="Performance">Performance</option>
                  </select>
                </div>
                
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Content Blueprint</label>
                  <QuillEditor 
                    value={formik.values.content} 
                    onChange={(content) => {
                      formik.setFieldValue('content', content);
                      formik.setFieldTouched('content', true, false);
                    }} 
                  />
                  {formik.touched.content && formik.errors.content && (
                    <p className="mt-1.5 text-[10px] text-red-400 font-mono text-left pl-1">{formik.errors.content}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    disabled={saving || !formik.isValid} 
                    className="cursor-pointer bg-luxury-gold text-[#020813] font-bold uppercase py-3 px-6 rounded-xl text-[10px] tracking-wider disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEditingBlog(null)} 
                    className="cursor-pointer text-white/50 text-[10px] uppercase tracking-wider font-bold hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};