'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';

export default function RichTextEditor({ initialValue = '', onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: initialValue || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) onChange(html);
    },
  });

  useEffect(() => {
    if (editor && initialValue) {
      editor.commands.setContent(initialValue);
    }
  }, [initialValue, editor]);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-md p-4">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <button onClick={() => editor?.chain().focus().toggleBold().run()} className={getBtnClass(editor?.isActive('bold'))}>Bold</button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={getBtnClass(editor?.isActive('italic'))}>Italic</button>
        <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={getBtnClass(editor?.isActive('underline'))}>Underline</button>
        <button onClick={() => editor?.chain().focus().toggleStrike().run()} className={getBtnClass(editor?.isActive('strike'))}>Strike</button>
        <button onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={getBtnClass(editor?.isActive('blockquote'))}>Quote</button>
        <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={getBtnClass(editor?.isActive('bulletList'))}>• List</button>
        <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={getBtnClass(editor?.isActive('orderedList'))}>1. List</button>
        <button onClick={() => editor?.chain().focus().setParagraph().run()} className={getBtnClass(editor?.isActive('paragraph'))}>P</button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={getBtnClass(editor?.isActive('heading', { level: 2 }))}>H2</button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={getBtnClass(editor?.isActive('heading', { level: 3 }))}>H3</button>
        <button onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()} className="px-3 py-1 text-sm bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200">Clear</button>
      </div>

      <EditorContent editor={editor} className="min-h-[350px] rounded-xl border px-4 py-3 focus:outline-none text-base" />

      <style jsx global>{`
        .ProseMirror:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}

function getBtnClass(active) {
  return `px-3 py-1 text-sm rounded-md ${
    active
      ? 'bg-blue-600 text-white'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  }`;
}
