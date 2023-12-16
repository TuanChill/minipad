import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { messageError, messageSuccess } from "../../components/Message";
import { getImgUrl, uploadImgFile } from "../../services/fileAvt";
import { getAuthCache } from "../localAuth";
import { updateFieldUser } from "../../services/users";

interface IAvatLane {
  avt: string;
  // uid: string;
}

export default function AvatarLane({ avt}: IAvatLane) {
  const {uid} = getAuthCache();

  const [avtImg, setAvtImg] = useState<string>(avt);
  const inputImgRef = useRef<HTMLInputElement>(null);

  // update img fl avt
  useEffect(() => {
    setAvtImg(avt);
  }, [avt]);

  const openChooseImg = () => {
    if (inputImgRef.current) {
      inputImgRef.current.click();
    }
  };

  const isImageFile = (file: File | null) => {
    return (
      file?.type.startsWith("image/") &&
      /\.(png|jpg|jpeg)$/.test(file?.name.toLowerCase())
    );
  };

  const updateAvt = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file && isImageFile(file)) {
      setAvtImg(URL.createObjectURL(file));
      const avtPath = `avatars/${uid}`
      uploadImgFile(file, avtPath)
        .then(() => {
          messageSuccess("Cập nhật ảnh thành công")
        })
        .then(() => {
          getImgUrl(avtPath)
            .then(url => {
              console.log(url)
              return url
            })
            .then((url) => {
              updateFieldUser(uid, {
                photoURL: url
              })
        })
        })
    } else {
      messageError("Vui lòng chọn ảnh PNG/JPG");
      // clear cache file
      ev.target.value = "";
    }
  };

  const removeAvt = () => {};

  return (
    <section className="flex">
      <img src={avtImg} alt={avtImg} className="w-[80px] h-[80px] rounded-full cursor-pointer"  />
      <div className="ml-6">
        <div className="flex gap-4">
          <input
            type="file"
            name="avt"
            className="hidden"
            ref={inputImgRef}
            onChange={(ev) => updateAvt(ev)}
          />
          <Button
            text="Cập nhật ảnh"
            onClick={() => openChooseImg()}
            className="bg-blue-600 text-white hover:bg-blue-500"
          />
          <Button onClick={() => removeAvt()} text="Xoá ảnh" />
        </div>
        <p className="mt-3 text-sm text-red-400">
          Vui lòng chỉ cập nhật ảnh PNG/JPG
        </p>
      </div>
    </section>
  );
}
