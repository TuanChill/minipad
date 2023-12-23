interface IModal {
  visible: boolean;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
}

export default function Modal({ visible, children, onClose }: IModal) {
  if (!visible) return null;

  const handleOnClose: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if ((ev.target as HTMLElement).id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      onClick={handleOnClose}
      className="fixed inset-0 bg-slate-500 opacity-30 z-50 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white p-2 rounded-md shadow-md">{children}</div>
    </div>
  );
}
