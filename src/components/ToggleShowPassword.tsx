interface IProps {
  isChecked: boolean;
  onClick: () => void
}

export default function ToggleShowPassword({ isChecked, onClick }: IProps) {
  return (
    <article className="flex items-center">
      <input
        className="form-checkbox text-pink-500 rounded mr-2 focus:ring focus:ring-offset-0 focus:ring-transparent"
        type="checkbox"
        checked={isChecked}
        onChange={onClick}
      />
      <span className="text-sm">Hiển thị mật khẩu</span>
    </article>
  );
}
