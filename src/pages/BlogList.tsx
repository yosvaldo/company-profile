import React, { useEffect, useState } from 'react';
import Backendless from '../configs/backendless.config';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogArticle {
  objectId: string;
  title: string;
  image: string;
  content: string;
  published: number;
}

interface BlogCardProps {
  article: BlogArticle;
  index: number;
  isAdmin: boolean;
  glassStyle: string;
  onReadMore: (article: BlogArticle) => void;
  onEdit: (e: React.MouseEvent, article: BlogArticle) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ article, index, isAdmin, glassStyle, onReadMore, onEdit, onDelete }) => {
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
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
          decoding="async"
        />
        <div 
          onClick={() => onReadMore(article)} 
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300 z-10"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-2 rounded-lg backdrop-blur-sm">
            Read Article
          </span>
        </div>
        
        {isAdmin && (
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <button 
              onClick={(e) => onEdit(e, article)} 
              className="bg-black/60 backdrop-blur-md text-luxury-gold px-3 py-1.5 text-[9px] font-bold rounded-md border border-luxury-gold/20 tracking-wider uppercase"
            >
              EDIT
            </button>
            <button 
              onClick={(e) => onDelete(e, article.objectId)} 
              className="bg-red-950/60 backdrop-blur-md text-red-200 px-2.5 py-1.5 rounded-md text-[9px] border border-red-500/20"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8 flex flex-col grow justify-between space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-serif font-normal text-white group-hover:text-luxury-gold transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h2>
          <div 
            className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-3 font-light mt-3"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        <button 
          onClick={() => onReadMore(article)}
          className="text-left text-[10px] font-bold uppercase tracking-widest text-luxury-gold hover:underline pt-2"
        >
          Read Full Report →
        </button>
      </div>
    </motion.article>
  );
};

export const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);
  
  const [editingBlog, setEditingBlog] = useState<BlogArticle | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);

  const glassStyle = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-[32px] backdrop-saturate-[160%] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]";

  const { user } = useAuth(); 
  const isAdmin = user !== null && user.getProperty('role') === 'admin';

  const fetchBlogs = () => {
    setLoading(true);
    const queryBuilder = Backendless.DataQueryBuilder.create().setSortBy(['published DESC']);

    Backendless.Data.of('Blogs').find<BlogArticle>(queryBuilder)
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setLoading(false);
      });
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (e: React.MouseEvent, objectId: string) => {
    e.stopPropagation();
    if (!isAdmin || !window.confirm("Delete this report?")) return;
    try {
      await Backendless.Data.of('Blogs').remove({ objectId });
      fetchBlogs();
    } catch (err) { alert("Failed to delete."); }
  };

  const startEditing = (e: React.MouseEvent, article: BlogArticle) => {
    e.stopPropagation(); 
    setEditingBlog(article);
    setEditTitle(article.title);
    setEditImage(article.image);
    setEditContent(article.content);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    setSaving(true);
    try {
      await Backendless.Data.of('Blogs').save({
        objectId: editingBlog.objectId,
        title: editTitle,
        image: editImage,
        content: editContent
      });
      setEditingBlog(null);
      fetchBlogs(); 
    } catch (err: any) { alert("Error updating: " + err.message); } 
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020813] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020813] text-white pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-luxury-gold uppercase">Angler Hub</span>
          <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mt-4">
            PHENEX <span className="text-luxury-gold italic">Newsletter</span>
          </h1>
          <div className="w-12 h-px bg-luxury-gold/40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((article, index) => (
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
              <button onClick={() => setSelectedBlog(null)} className="absolute top-6 right-6 text-white/50 hover:text-white text-sm transition-colors z-20">✕</button>
              <div className="aspect-21/9 w-full overflow-hidden rounded-2xl mb-6 bg-black/40">
                <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
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
              <form onSubmit={handleUpdate} className="space-y-4">
                <input type="text" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-white/3 border border-white/8 text-white px-5 py-3.5 rounded-xl text-xs outline-none" placeholder="Title" />
                <input type="text" required value={editImage} onChange={(e) => setEditImage(e.target.value)} className="w-full bg-white/3 border border-white/8 text-white px-5 py-3.5 rounded-xl text-xs outline-none" placeholder="Image URL" />
                <textarea required rows={6} value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full bg-white/3 border border-white/8 text-white px-5 py-3.5 rounded-xl text-xs outline-none font-light" placeholder="Content text..." />
                <div className="flex gap-4 pt-2">
                  <button type="submit" disabled={saving} className="bg-luxury-gold text-[#020813] font-bold uppercase py-3 px-6 rounded-xl text-[10px] tracking-wider">{saving ? 'Saving...' : 'Save Changes'}</button>
                  <button type="button" onClick={() => setEditingBlog(null)} className="text-white/50 text-[10px] uppercase tracking-wider font-bold">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};