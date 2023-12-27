const EMPTY_TITLE = "Không có tiêu đề"

export default function TittlePad() {
  return (
    <div className="title-pad">
      <input type="text" className="focus:outline-none focus:border-none bg-inherit w-2/3" placeholder={EMPTY_TITLE} />
      <span className="text-xs">Thời gian tạo: 12/12/2022</span>
    </div>
  )
}
