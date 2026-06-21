import React, { useState, useEffect, useRef } from 'react';
import Backendless from 'backendless';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'clean']
          ]
        }
      });
      quillInstance.current.on('text-change', () => {
        setContent(quillInstance.current?.root.innerHTML || '');
      });
    }
  }, []);

  const handlePublish = async () => {
    try {
      await Backendless.Data.of('Blogs').save({
        title: title,
        image: image,
        content: content
      });

      alert("Post published successfully!");
      
      setTitle('');
      setImage('');
      quillInstance.current?.setContents([]);
    } catch (error) {
      console.error("Publishing error:", error);
      alert("Error: Check your console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#061121] pt-32 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-display text-white uppercase tracking-widest">Create New Post</h1>
          <div className="w-12 h-1 bg-[#DFCE72] mx-auto mt-4" />
        </div>

        <div className="space-y-6">
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#0B1E36] border border-[#152C4A] text-white p-4 rounded-lg"
            placeholder="Post Title..."
          />
          
          <input 
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full bg-[#0B1E36] border border-[#152C4A] text-white p-4 rounded-lg"
            placeholder="Image URL..."
          />

          <div className="rounded-lg overflow-hidden border border-[#152C4A]">
            <div ref={editorRef} className="bg-[#0B1E36] text-white min-h-[300px]" />
          </div>

          <button 
            onClick={handlePublish}
            className="w-full bg-[#DFCE72] text-[#061121] font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-[#EEDF9D] transition-all"
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};