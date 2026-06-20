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

  const { user } = useAuth(); 

  const isAdmin = user && (user as any).role === 'admin';

  const fetchBlogs = () => {
    setLoading(true);
    Backendless.Data.of('Blogs').find<BlogArticle>({
      options: { sortBy: ['published DESC'] }
    })
    .then((data) => {
      setBlogs(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching articles:", err);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (e: React.MouseEvent, objectId: string) => {
    e.stopPropagation();
    if (!isAdmin) return alert("Access Denied: Only administrators can wipe database rows.");
    if (!window.confirm("Are you absolutely sure you want to remove this report from the cloud database?")) return;

    try {
      await Backendless.Data.of('Blogs').remove({ objectId });
      fetchBlogs();
    } catch (err) {
      alert("Failed to delete. Check database custom permissions.");
    }
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
    } catch (err: any) {
      alert("Error updates: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ocean-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-luxury-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ocean-950 pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl tracking-widest text-white uppercase">
            ANGLER <span className="text-luxury-gold">HUB</span>
          </h1>
          <p className="text-xs text-slate-400 font-sans tracking-widest uppercase mt-2">
            Expeditions, gear insights, and marine dispatch reports
          </p>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-ocean-800 rounded-xl bg-ocean-900/20 max-w-md mx-auto">
            <p className="text-sm text-slate-400 font-sans tracking-wide">No dispatch records found in the archive.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((article, index) => (
              <motion.article 
                key={article.objectId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedBlog(article)}
                className="bg-ocean-900/30 border border-ocean-800/50 rounded-xl overflow-hidden shadow-2xl flex flex-col group hover:border-luxury-gold/30 transition-all duration-300 cursor-pointer relative"
              >
                {isAdmin && (
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <button 
                      onClick={(e) => startEditing(e, article)}
                      className="bg-ocean-950/80 hover:bg-ocean-900 text-luxury-gold border border-ocean-800 px-2 py-1 text-xs rounded transition-colors font-sans font-bold"
                      title="Edit Article"
                    >
                      ✏️ EDIT
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, article.objectId)}
                      className="bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-800/60 p-1.5 rounded transition-colors text-xs"
                      title="Delete Article"
                    >
                      🗑️
                    </button>
                  </div>
                )}

                <div className="h-52 w-full overflow-hidden bg-ocean-950 relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/banner.png';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-ocean-950/80 backdrop-blur-md border border-ocean-800 px-2.5 py-1 rounded text-[10px] text-luxury-gold tracking-widest font-sans font-semibold uppercase">
                    {new Date(article.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="font-display text-xl text-white tracking-wide leading-snug group-hover:text-luxury-gold-light transition-colors mb-3">
                    {article.title}
                  </h2>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed tracking-wide line-clamp-3 flex-grow mb-6">
                    {article.content}
                  </p>
                  <div className="pt-4 border-t border-ocean-800/40 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-sans tracking-widest uppercase font-bold">PHENEX FISHING</span>
                    <span className="text-[10px] text-luxury-gold font-sans tracking-widest uppercase font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      READ REPORT ➔
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-ocean-900 border border-ocean-800 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl shadow-2xl p-6 relative font-sans text-white"
            >
              <button onClick={() => setSelectedBlog(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg bg-ocean-950/50 w-8 h-8 rounded-full border border-ocean-800 flex items-center justify-center transition-colors">✕</button>
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-64 object-cover rounded-lg border border-ocean-800 mb-6" onError={(e) => { (e.target as HTMLImageElement).src = '/banner.png'; }} />
              <span className="text-[10px] text-luxury-gold font-bold tracking-widest uppercase block mb-2">Published on {new Date(selectedBlog.published).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-white mb-4">{selectedBlog.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed tracking-wide whitespace-pre-line border-t border-ocean-800/60 pt-4">{selectedBlog.content}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-ocean-900 border border-ocean-800 w-full max-w-2xl rounded-xl p-8 shadow-2xl font-sans text-white"
            >
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h3 className="font-display text-xl text-white uppercase tracking-widest">EDITORIAL <span className="text-luxury-gold">EDITOR</span></h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Modifying active cloud database parameters</p>
                </div>
                <button type="button" onClick={() => setEditingBlog(null)} className="text-slate-400 hover:text-white text-sm">CANCEL</button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Article Title</label>
                  <input type="text" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-ocean-950 border border-ocean-800 focus:border-luxury-gold text-white px-4 py-2.5 rounded text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Featured Cover Image Link</label>
                  <input type="text" required value={editImage} onChange={(e) => setEditImage(e.target.value)} className="w-full bg-ocean-950 border border-ocean-800 focus:border-luxury-gold text-white px-4 py-2.5 rounded text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Editorial Content Body</label>
                  <textarea required rows={6} value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full bg-ocean-950 border border-ocean-800 focus:border-luxury-gold text-white px-4 py-2.5 rounded text-sm outline-none resize-none leading-relaxed" />
                </div>
                <div className="pt-2">
                  <button type="submit" disabled={saving} className="bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-ocean-950 font-bold uppercase tracking-widest text-xs px-6 py-3 rounded shadow-lg disabled:opacity-50 transition-all duration-300">
                    {saving ? 'UPDATING CLOUD DATA...' : 'SAVE CHANGES'}
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