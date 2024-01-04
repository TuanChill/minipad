import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { MenuBar } from "./MenuBar";
import TittlePad from "../../containers/Pads/TittlePad";
import { useRecoilValue } from "recoil";
import { editState } from "../../containers/PadStore/PadStore";
import { saveContentById } from "../../services/pad";

import "./index.css";
import "./editor.css";
import { encryptPad } from "../../libs/crypt";

interface IPadEditor {
  id: string;
  uid: string;
  content: string;
}

let timer = "none";

const extensions = [
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
  // ListItem,
  TaskItem,
  TaskList,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Underline,
];

export default function PadEditor({ id, uid, content }: IPadEditor) {
  const isEditable = useRecoilValue(editState);
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
      // reset func
      if (timer) {
        clearTimeout(timer);
      }

      // debounce
      timer = setTimeout(async () => {
        // encrypt content
        //save content
        const html = editor.getHTML();
        const cipherText = encryptPad(html, uid);
        // console.log(html);
        // console.log(cipherText);
        await saveContentById({
          uid,
          id,
          content: cipherText,
        });
        // update pad to db here
      }, 800) as unknown as string;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  //  focus editor when editor change
  useEffect(() => {
    if (editor) {
      // editor.commands.clearContent();
      editor.commands.setContent(content);
      setTimeout(() => {
        editor.commands.focus();
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, id]);

  // set is editor for editor
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <div className="tiptap-container">
      <div className="header">
        {editor && <MenuBar editor={editor} />}
        <TittlePad isEdit={true} />
      </div>
      <EditorContent editor={editor} className="tiptap-main-content" />
    </div>
  );
}
