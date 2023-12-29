import { useParams } from "react-router-dom";
import PadEditor from "../../components/PadEditor";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { getPadById } from "../../services/pad";
import LoadingIndicator from "../../components/Loading/LoadingIndicator";

export default function PadContainer() {
  const { id } = useParams();
  const user = useCurrentUser();
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (user?.uid && id) {
        setLoading(true);
        const pad = await getPadById({
          uid: user.uid,
          id,
        });
        console.log(pad);
        await setContent(pad?.content ?? "");
        setLoading(false);
      }
    };
    fetchContent();
  }, [id, user?.uid]);

  return (
    <>
      {id && user?.uid ? (
        <div className="w-full h-full">
          {isLoading ? (
            <LoadingIndicator className="w-full h-full opacity-40" />
          ) : (
            <PadEditor id={id} uid={user?.uid} content={content} />
          )}
        </div>
      ) : null}
    </>
  );
}
