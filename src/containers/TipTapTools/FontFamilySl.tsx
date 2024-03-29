import { Editor } from "@tiptap/react";

import "./index.css"
import { useState } from "react";

const spFontFamily: string[] = ["Arial" ,"Roboto","Space Mono", "cursive"];

export default function FontFamilySl({ editor }: { editor: Editor }) {
  const [currFont, setCurrFont] = useState<string>("")

  return (
    <select
      className={`select-btn`}
      style={{ fontFamily: `'${currFont}'` }}
      onChange={(event) =>
        {
          editor
            ?.chain()
            .focus()
            .setFontFamily(event.target.value || "")
            .run();
            
            setCurrFont(event.target.value)
        }
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
