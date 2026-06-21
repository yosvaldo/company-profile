import React, { useEffect, useState } from 'react';
import Backendless from 'backendless';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogArticle {
  objectId: string;
  title: string;
  image: string;
  content: string;
  published: number;
}

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
  const isAdmin = user && (user as any).role === 'admin';

  const fetchBlogs = () => {
    setLoading(true);
    
    const queryBuilder = Backendless.DataQueryBuilder.create();
    
    queryBuilder.setSortBy(['published DESC']);

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
      <div className="min-h-screen bg-[#061121] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#DFCE72]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061121] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl tracking-tight text-white uppercase">ANGLER <span className="text-[#DFCE72]">HUB</span></h1>
          <p className="text-[10px] text-slate-400 tracking-[0.3em] uppercase mt-2">Newsletter</p>
          <div className="w-12 h-[1px] bg-[#DFCE72]/40 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((article, index) => (
            <motion.article 
              key={article.objectId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`${glassStyle} rounded-[24px] overflow-hidden flex flex-col group hover:from-white/[0.1] hover:to-white/[0.04] transition-all duration-300`}
            >
              <div className="h-52 w-full overflow-hidden relative">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div onClick={(e) => { e.stopPropagation(); setSelectedBlog(article); }} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-2">Read More</span>
                </div>
                {isAdmin && (
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <button onClick={(e) => startEditing(e, article)} className="bg-black/40 backdrop-blur-md text-[#DFCE72] px-3 py-1 text-[9px] rounded-lg border border-[#DFCE72]/20">EDIT</button>
                    <button onClick={(e) => handleDelete(e, article.objectId)} className="bg-red-900/40 backdrop-blur-md text-red-200 px-3 py-1 rounded-lg text-[9px] border border-red-500/20">✕</button>
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-lg font-normal tracking-tight text-white mb-4">{article.title}</h2>
                <p className="text-[12px] text-slate-400 leading-relaxed line-clamp-3 font-light">{article.content}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={`${glassStyle} w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[28px] p-8 relative`}
            >
              <button onClick={() => setSelectedBlog(null)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">✕</button>
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
              <h2 className="text-2xl uppercase tracking-tight text-white mb-6">{selectedBlog.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-light">{selectedBlog.content}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`${glassStyle} w-full max-w-2xl rounded-[28px] p-10`}
            >
              <h3 className="text-lg tracking-widest text-white mb-8 uppercase">Edit Article</h3>
              <form onSubmit={handleUpdate} className="space-y-5">
                <input type="text" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-white/[0.03] border border-white/[0.08] text-white px-5 py-3 rounded-xl text-sm outline-none" placeholder="Title" />
                <input type="text" required value={editImage} onChange={(e) => setEditImage(e.target.value)} className="w-full bg-white/[0.03] border border-white/[0.08] text-white px-5 py-3 rounded-xl text-sm outline-none" placeholder="Image URL" />
                <textarea required rows={6} value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full bg-white/[0.03] border border-white/[0.08] text-white px-5 py-3 rounded-xl text-sm outline-none" placeholder="Content" />
                <div className="flex gap-4 pt-4">
                  <button type="submit" disabled={saving} className="bg-[#DFCE72] text-[#061121] font-semibold uppercase py-3 px-8 rounded-xl text-[11px] tracking-wider">{saving ? 'Saving...' : 'Save Changes'}</button>
                  <button type="button" onClick={() => setEditingBlog(null)} className="text-white/50 text-[11px] uppercase tracking-wider">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};