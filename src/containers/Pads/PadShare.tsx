import { Link, useParams } from "react-router-dom";
import PadContent from "../../components/PadEditor/PadContent";
import { useEffect, useState } from "react";
import { IPad, getPadById } from "../../services/pad";
import TitlePadShare from "../../layouts/ShareView/TitlePadShare";
import LoadingIndicator from "../../components/Loading/LoadingIndicator";

export default function PadShare() {
  const { uid, id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [pad, setPad] = useState<IPad | null>(null);

  useEffect(() => {
    const fetchPad = async () => {
      if (uid && id) {
        setLoading(true);
        const pad = await getPadById({ uid, id });
        if (pad) {
          setPad(pad);
        } else {
          console.log("not found pad");
        }
        setLoading(false);
      }
    };

    fetchPad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return id && !isLoading ? (
    pad ? (
      <div>
        <TitlePadShare title={pad.title} createAt={pad.createAt} />
        <PadContent id={id} content={pad.content} />
      </div>
    ) : (
      <div className="flex flex-col items-center text-center px-3">
        <img
          className="max-w-[500px] mt-16"
          src="https://firebasestorage.googleapis.com/v0/b/notion-6958d.appspot.com/o/Person%20writing%20love%20letter%20flat%20vector%20illustration.jpg?alt=media&token=4c45ec85-8994-48c4-97cb-e3990383d108"
          alt="not found pad"
        />
        <p className="text-4xl">Oops....</p>
        <p className="mt-6 font-medium">
          Không tìm thấy ghi chú nào. Vui lòng kiểm tra lại đường dẫn của bạn!!
        </p>
        <Link
          to="/contact-us"
          className="inline-flex mt-6 items-center px-4 py-2 w-fit border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cần hỗ trợ
        </Link>
      </div>
    )
  ) : (
    <LoadingIndicator className="w-full h-full" />
  );
}
