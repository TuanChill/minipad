import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

import { MenuBar } from "./MenuBar";
import { useEffect, useState } from "react";
import TittlePad from "../../containers/Pads/TittlePad";
import "./index.css";
import "./editor.css"

interface IPadEditor {
  id: string;
  content: string;
}

let timer = "none";

const extensions = [
  StarterKit,
  Highlight,
  Typography,
  Youtube,
  Link.configure({ openOnClick: false }),
  Image,
  TextAlign,
  Underline,
];

export default function PadEditor({ id, content }: IPadEditor) {
  const [update, setUpdate] = useState(0);

  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none m-auto",
      },
    },
    content: content,
    onUpdate() {
      setUpdate((prev) => prev + 1);
    },
  });

  useEffect(() => {
    if (editor) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        const html = editor.getHTML();
        console.log(id, html);
        // update pad to db here
      }, 2000) as unknown as string;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  useEffect(() => {
    if (editor) {
      editor.commands.clearContent();
      editor.commands.setContent(content);
      setTimeout(() => {
        editor.commands.focus();
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <div className="tiptap-container">
      <div className="header">
        {editor && <MenuBar editor={editor} />}
        <TittlePad />
      </div>
      <EditorContent editor={editor} className="tiptap-main-content" />
    </div>
  );
}
