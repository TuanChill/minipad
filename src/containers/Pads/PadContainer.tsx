import { useParams } from "react-router-dom";
import PadEditor from "../../components/PadEditor";

export default function PadContainer() {
  const { id } = useParams();

  return (
    <>
      {id ? (
        <PadEditor id={id} content="<h1>Ghi chú ngay bây giờ</h1>" />
      ) : null}
    </>
  );
}
