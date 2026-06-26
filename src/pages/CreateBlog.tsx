import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Backendless from '../configs/backendless.config';
import { QuillEditor } from '../components/QuillEditor';

export const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required!");
    
    setPublishing(true);
    try {
      await Backendless.Data.of('Blogs').save({
        title,
        image: image || 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=800',
        content,
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
  };

  return (
    <div className="min-h-screen bg-[#020813] text-white pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-luxury-gold uppercase">Creator Dashboard</span>
          <h1 className="text-3xl font-serif text-white uppercase tracking-wide mt-2">Create New Post</h1>
          <div className="w-12 h-px bg-luxury-gold/40 mx-auto mt-6" />
        </div>

        <form onSubmit={handlePublish} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Article Title</label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/3 border border-white/8 text-white p-4 rounded-xl outline-none focus:border-luxury-gold/40 transition-colors text-sm"
              placeholder="e.g., The Legacy Behind Phenex Alligator"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Cover Image URL</label>
            <input 
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-white/3 border border-white/8] text-white p-4 rounded-xl outline-none focus:border-luxury-gold/40 transition-colors text-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Content</label>
            <QuillEditor value={content} onChange={setContent} />
          </div>

          <button 
            type="submit"
            disabled={publishing}
            className="w-full bg-luxury-gold text-[#020813] font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-[#eedf9d] transition-all text-xs disabled:opacity-50"
          >
            {publishing ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
};