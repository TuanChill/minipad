interface IPopup {
  title: string;
  visible: boolean;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
}

export default function Popup({ visible, title, children, onClose }: IPopup) {
  if (!visible) return null;
  const handleOnClose: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if ((ev.target as HTMLElement).id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      onClick={handleOnClose}
      className="fixed inset-0 z-50 flex justify-center items-center lg:items-start"
    >
      <div
        className={`bg-gray-50 rounded-md shadow-lg min-w-[200px] h-fit lg:mt-[200px]`}
      >
        <div className="flex p-2 justify-between items-center border-b-[1px]">
          <span className="font-semibold">{title}</span>
          <button onClick={() => onClose()}>
            <i className="ri-close-fill p-1"></i>
          </button>
        </div>
        <div className="px-2 pt-2 pb-4 mt-1">{children}</div>
      </div>
    </div>
  );
}
