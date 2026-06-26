import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const QuillEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  const initialValueRef = useRef(value);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
          ]
        }
      });

      if (initialValueRef.current) {
        quillInstance.current.root.innerHTML = initialValueRef.current;
      }

      quillInstance.current.on('text-change', () => {
        const html = quillInstance.current?.root.innerHTML || '';
        onChangeRef.current(html);
      });
    }
  }, []);

  return (
    <div className="bg-white text-slate-900 rounded-xl overflow-hidden">
      <div ref={editorRef} className="min-h-62.5" />
    </div>
  );
};