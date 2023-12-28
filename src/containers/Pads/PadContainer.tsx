import { useParams } from "react-router-dom";
import PadEditor from "../../components/PadEditor";

export const defContent = "<h1>Hãy bắt đầu ghi chú ngay thôi nào!!!</h1>" ;

export default function PadContainer() {
  const { id } = useParams();

  return (
    <>
      {id ? (
        <PadEditor id={id} content={defContent} />
      ) : null}
    </>
  );
}
