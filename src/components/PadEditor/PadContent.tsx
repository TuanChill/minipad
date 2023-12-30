import { AnyExtension, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";

import "./index.css"

interface IPadShare {
  id: string;
  content: string;
}

const extensions: AnyExtension[] = [
  StarterKit,
  Highlight.configure({
    multicolor: true,
  }),
  Typography,
  Youtube.configure({
    inline: true,
  }),
  Link.configure({ openOnClick: false }),
  Image,
  TaskItem,
  TaskList,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Underline,
];

export default function PadContent({ id, content }: IPadShare) {
  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none m-auto",
      },
    },
    content: content,
  });

  useEffect(() => {
    editor?.setEditable(false);
  }, [id, editor]);

  return (
    <div className="tiptap-container h-full">
      <EditorContent editor={editor} className="tiptap-main-content pt-6" />
    </div>
  );
}
