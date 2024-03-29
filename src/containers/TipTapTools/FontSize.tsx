import { Editor } from "@tiptap/react";
import { useState } from "react";
import InputControl from "../../components/Controls/Input";
import { messageWarning } from "../../components/Message";
import Tippy from "@tippyjs/react";

const fontSizeList = [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72];

export default function FontSize({ editor }: { editor: Editor }) {
  const [fontSize, setFontSize] = useState<number>(14);

  const changeFontSize = (val: number) => {
    if (val < fontSizeList[0] || val > fontSizeList[fontSizeList.length - 1]) {
        messageWarning(`Font size must be between ${fontSizeList[0]} and ${fontSizeList[fontSizeList.length - 1]}`);
    } else {
        editor.commands.setFontSize(val);
        setFontSize(val);
    }
  };

  return (
    <div>
      <Tippy
        interactive
        delay={200}
        offset={[0, 5]}
        content={
          <div className="flex flex-col shadow-lg w-10 items-center rounded">
            {fontSizeList.map((val, i) => (
              <span onClick={() => changeFontSize(val)} className="hover:bg-gray-100 w-full py-1 bg-gray-300 text-center" key={i}>{val}</span>
            ))}
          </div>
        }
      >
        <div className="flex border-l-2 border-r-2 px-2">
          <button onClick={() => changeFontSize(fontSize - 1)}>
            <i className="ri-subtract-line"></i>
          </button>
          <InputControl
            readOnly
            className="w-10 mx-1"
            value={fontSize.toString()}
          />
          <button onClick={() => changeFontSize(fontSize + 1)}>
            <i className="ri-add-line"></i>
          </button>
        </div>
      </Tippy>
    </div>
  );
}
