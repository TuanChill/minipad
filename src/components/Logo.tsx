import { Link } from "react-router-dom";

export default function Logo({className} : {className?: string}) {
  return (
    <Link className="flex items-center gap-1" to="/">
      <img src="/Logo.png" alt="Logo" className={`w-10 ${className}`} />
      <span className="font-normal tracking-wider font-logo">Notion</span>
    </Link>
  );
}
