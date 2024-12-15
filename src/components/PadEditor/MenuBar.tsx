import { Editor } from "@tiptap/react";
import React, { ChangeEvent, useCallback, useRef } from "react";
import Tippy from "@tippyjs/react";
import { useParams } from "react-router-dom";
import { uploadImgInPad } from "../../services/pad";
import { messageError } from "../Message";
import { getImgUrl } from "../../services/fileAvt";
import FontFamilySl from "../../containers/TipTapTools/FontFamilySl";

import "./index.css";
import FontSize from "../../containers/TipTapTools/FontSize";

interface IMenuBar {
  editor: Editor;
}

interface MenuItemWithTitle {
  icon: string;
  title: true; // Indicate that title is present
  description: string;
}

interface MenuItemWithoutTitle {
  icon: string;
  onClick: () => void;
  isActive: string;
  description: string;
  title?: undefined; // Indicate that title is optional
}

type MenuItem = MenuItemWithTitle | MenuItemWithoutTitle;

export const MenuBar = ({ editor }: IMenuBar) => {
  const { id } = useParams();

  const getFocus = () => editor.chain().focus();
  const isActive = (type: string, options?: unknown) => {
    return editor?.isActive(type, options ?? {}) ? "is-active" : " ";
  };

  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const addImg = () => {
    if (!imgInputRef.current) {
      return;
    } else {
      imgInputRef.current.click();
    }
  };

  const addYoutube = () => {
    const url = window.prompt("Nhập đường dẫn youtube");
    const youtubePattern =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/;
    if (url != null && youtubePattern.test(url)) {
      editor.commands.focus();
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  const setLink = useCallback(() => {
    const href = editor?.getAttributes("link").href;
    editor?.commands.toggleLink({ href, target: "_blank" });
  }, [editor]);

  const showImg = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const img = e.target.files?.[0];
      if (img && id) {
        const imgUrl = URL.createObjectURL(img);
        await uploadImgInPad(img, id)
          .then((snap) => {
            const pathImg = snap.metadata.fullPath;
            return getImgUrl(pathImg);
          })
          .then((path) => {
            editor.chain().focus().setImage({ src: path }).run();
          })
          .catch((err) => {
            editor.chain().focus().setImage({ src: imgUrl }).run();
            console.log(err);
            messageError("Lưu ảnh thất bại");
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editor]
  );

  const menus: MenuItem[][] = [
    [
      {
        icon: "bold",
        onClick: () => getFocus().toggleBold().run(),
        isActive: isActive("bold"),
        description: "Áp dụng hoặc loại bỏ định dạng đậm",
      },
      {
        icon: "italic",
        onClick: () => getFocus().toggleItalic().run(),
        isActive: isActive("italic"),
        description: "Áp dụng hoặc loại bỏ định dạng nghiêng",
      },
      {
        icon: "underline",
        onClick: () => getFocus().toggleUnderline().run(),
        isActive: isActive("underline"),
        description: "Áp dụng hoặc loại bỏ định dạng gạch chân",
      },
    ],
    [
      {
        icon: "heading",
        title: true,
        description: "Chuyển đổi định dạng tiêu đề",
      },
      {
        icon: "h-1",
        onClick: () => getFocus().toggleHeading({ level: 1 }).run(),
        isActive: isActive("heading", { level: 1 }),
        description: "Chuyển đổi định dạng tiêu đề cấp 1",
      },
      {
        icon: "h-2",
        onClick: () => getFocus().toggleHeading({ level: 2 }).run(),
        isActive: isActive("heading", { level: 2 }),
        description: "Chuyển đổi định dạng tiêu đề cấp 2",
      },
      {
        icon: "h-3",
        onClick: () => getFocus().toggleHeading({ level: 3 }).run(),
        isActive: isActive("heading", { level: 3 }),
        description: "Chuyển đổi định dạng tiêu đề cấp 3",
      },
    ],
    [
      {
        icon: "align-left",
        title: true,
        description: "Căn chỉnh văn bản",
      },
      {
        icon: "align-left",
        onClick: () => getFocus().setTextAlign("left").run(),
        isActive: isActive("", { textAlign: "left" }),
        description: "Căn chỉnh văn bản vào bên trái",
      },
      {
        icon: "align-center",
        onClick: () => getFocus().setTextAlign("center").run(),
        isActive: isActive("", { textAlign: "center" }),
        description: "Căn chỉnh văn bản vào giữa",
      },
      {
        icon: "align-right",
        onClick: () => getFocus().setTextAlign("right").run(),
        isActive: isActive("", { textAlign: "right" }),
        description: "Căn chỉnh văn bản vào bên phải",
      },
      {
        icon: "align-justify",
        onClick: () => getFocus().setTextAlign("justify").run(),
        isActive: isActive("", { textAlign: "justify" }),
        description: "Căn đều văn bản",
      },
    ],
    [
      {
        icon: "list-unordered",
        title: true,
        description: "Định dạng danh sách dấu đầu dòng",
      },
      {
        icon: "list-unordered",
        onClick: () => getFocus().toggleBulletList().run(),
        isActive: isActive("bulletList"),
        description: "Định dạng danh sách dấu đầu dòng",
      },
      {
        icon: "list-ordered",
        onClick: () => getFocus().toggleOrderedList().run(),
        isActive: isActive("orderedList"),
        description: "Danh sách công việc",
      },
      {
        icon: "list-check-3",
        isActive: isActive("taskList"),
        onClick: () => getFocus().toggleTaskList().run(),
        description: "Định dạng danh sách có số thứ tự",
      },
    ],
    [
      {
        icon: "separator",
        onClick: () => getFocus().setHorizontalRule().run(),
        isActive: " ",
        description: "Chèn đường kẻ ngang",
      },
      {
        icon: "mark-pen-fill",
        onClick: () => getFocus().toggleHighlight({ color: "#ffcc00" }).run(),
        isActive: isActive("highlight"),
        description: "Đánh dấu đoạn văn",
      },
    ],
    [
      {
        icon: "link",
        onClick: () => setLink(),
        isActive: isActive("link"),
        description: "Chèn hoặc chỉnh sửa liên kết",
      },
      {
        icon: "code-box-line",
        onClick: () => getFocus().toggleCodeBlock().run(),
        isActive: isActive("codeBlock"),
        description: "Chuyển đổi định dạng khối mã",
      },
      {
        icon: "double-quotes-l",
        onClick: () => getFocus().toggleBlockquote().run(),
        isActive: isActive("blockquote"),
        description: "Chuyển đổi định dạng trích dẫn",
      },
      {
        icon: "image-line",
        onClick: () => addImg(),
        isActive: " ",
        description: "Chèn hình ảnh",
      },
      {
        icon: "youtube-line",
        onClick: addYoutube,
        isActive: " ",
        description: "Chèn video youtube",
      },
    ],
  ];

  if (!editor) return null;
  return (
    <div className="toolbar">
      <FontFamilySl editor={editor} />
      <FontSize  editor={editor}/>
      {menus.map((group, i) => {
        // check group tool
        return group[0]?.title ? (
          <div key={i} className="">
            <Tippy
              interactive={true}
              delay={100}
              placement="bottom"
              content={
                <div className="flex flex-col p-1 rounded-md gap-2 bg-white shadow-md">
                  {group.map((e) => {
                    if (!e?.title) {
                      // console.log(e)
                      return (
                        <button
                          key={e.icon}
                          className={`btn-item ${e.isActive}`}
                          onClick={e?.onClick}
                        >
                          <i className={`ri-${e.icon}`}></i>
                        </button>
                      );
                    }
                  })}
                </div>
              }
            >
              <button key={group[0].icon} className={`btn-item`}>
                <i className={`ri-${group[0].icon}`}></i>
              </button>
            </Tippy>
          </div>
        ) : (
          <div key={i} className="group-item">
            {group.map((item) => {
              if (!item.title)
                return (
                  <Tippy
                    key={item.icon}
                    interactive={true}
                    placement="bottom"
                    content={
                      <React.Fragment>
                        {item.description && (
                          <span className="bg-gray-300 p-2 rounded-md text-black">
                            {item?.description}
                          </span>
                        )}
                      </React.Fragment>
                    }
                  >
                    <button
                      key={item.icon}
                      className={`btn-item ${item?.isActive}`}
                      onClick={item?.onClick}
                    >
                      <i className={`ri-${item.icon}`}></i>
                    </button>
                  </Tippy>
                );
            })}
          </div>
        );
      })}
      <input
        ref={imgInputRef}
        onChange={showImg}
        className="hidden"
        type="file"
        name="input-file-data"
      />
    </div>
  );
};
