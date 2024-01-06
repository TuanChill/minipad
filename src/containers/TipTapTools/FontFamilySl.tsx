import { Editor } from "@tiptap/react";

import "./index.css"

const spFontFamily: string[] = ["Arial" ,"Roboto","Space Mono", "cursive"];

export default function FontFamilySl({ editor }: { editor: Editor }) {
  return (
    <select
      className="select-btn"
      onChange={(event) =>
        editor
          ?.chain()
          .focus()
          .setFontFamily(event.target.value || "")
          .run()
      }
      value={editor ? editor.getAttributes("textStyle").fontFamily : ""}
    >
      {spFontFamily.map((font, index) => (
        <option key={index} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
}
