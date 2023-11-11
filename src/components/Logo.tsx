import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="flex items-center gap-1" to="/">
      <img src="/Logo.png" alt="Logo" className="w-10" />
      <span className="font-semibold tracking-wider">Notion</span>
    </Link>
  );
}
