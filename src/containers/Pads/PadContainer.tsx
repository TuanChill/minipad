import { useNavigate, useParams } from "react-router-dom";
import PadEditor from "../../components/PadEditor";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { IPad, getPadById } from "../../services/pad";
import LoadingIndicator from "../../components/Loading/LoadingIndicator";
import { decryptPad } from "../../libs/crypt";

export default function PadContainer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useCurrentUser();
  const [pad, setPad] = useState<IPad | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (user?.uid && id) {
        setLoading(true);
        const pad = await getPadById({
          uid: user.uid,
          id,
        });

        // decrypt content
        if (pad) {
          await setPad(pad);
        } else {
          // messageError("Lỗi tải ghi chú");
          navigate("/app/pad");
        }

        setLoading(false);
      }
    };
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user?.uid]);

  const getContent = (pad: IPad, uid: string) => {
    return decryptPad(pad.content, uid);
  };

  return (
    <>
      {id && user?.uid && pad ? (
        <div className="w-full h-full">
          {isLoading ? (
            <LoadingIndicator className="w-full h-full opacity-50" />
          ) : (
            <PadEditor
              id={id}
              uid={user?.uid}
              content={getContent(pad, user.uid)}
            />
          )}
        </div>
      ) : null}
    </>
  );
}
