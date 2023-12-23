import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { messageError, messageSuccess } from "../../components/Message";
import { getImgUrl, uploadImgFile } from "../../services/fileAvt";
import { getAuthCache } from "../localAuth";
import { updateFieldUser } from "../../services/users";
import { defaultAvatar } from "../../pages/auth/ProfileSetting";
import Popup from "../../components/Popup";

interface IAvatLane {
  avt: string;
  // uid: string;
}

export default function AvatarLane({ avt }: IAvatLane) {
  const { uid } = getAuthCache();

  const [avtImg, setAvtImg] = useState<string>(avt);
  const inputImgRef = useRef<HTMLInputElement>(null);

  const [isVisible, setVisible] = useState<boolean>(false);

  // update img fl avt
  useEffect(() => {
    setAvtImg(avt);
  }, [avt]);

  // open window file explore
  const openChooseImg = () => {
    if (inputImgRef.current) {
      inputImgRef.current.click();
    }
  };

  // check img is png/ jpg/ jpeg
  const isImageFile = (file: File | null) => {
    return (
      file?.type.startsWith("image/") &&
      /\.(png|jpg|jpeg)$/.test(file?.name.toLowerCase())
    );
  };

  const updateAvt = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    // valid img
    if (file && isImageFile(file)) {
      // set avatar display
      setAvtImg(URL.createObjectURL(file));
      const avtPath = `avatars/${uid}`;
      // save img to storage
      uploadImgFile(file, avtPath)
        .then(() => {
          messageSuccess("Cập nhật ảnh thành công");
        })
        // get img url and update user info
        .then(() => {
          getImgUrl(avtPath)
            .then((url) => {
              console.log(url);
              return url;
            })
            .then((url) => {
              updateFieldUser(uid, {
                photoURL: url,
              });
            });
        });
    } else {
      messageError("Vui lòng chọn ảnh PNG/JPG");
      // clear cache file
      ev.target.value = "";
    }
  };

  const removeAvt = async () => {
    setAvtImg(defaultAvatar);
    updateFieldUser(uid, {
      photoURL: defaultAvatar,
    })
      .then(() => messageSuccess("Xoá ảnh thành công"))
      .catch(() => messageError("Vui lòng thử lại"));
    setVisible(false);
  };

  return (
    <section className="flex">
      <img
        src={avtImg}
        alt={avtImg}
        className="w-[80px] h-[80px] rounded-full cursor-pointer"
      />
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
            onClick={openChooseImg}
            className="bg-blue-600 text-white hover:bg-blue-500"
          />
          <Button onClick={() => setVisible(true)} text="Xoá ảnh" />
        </div>
        <p className="mt-3 text-sm text-red-400">
          Vui lòng chỉ cập nhật ảnh PNG/JPG
        </p>
      </div>
      <Popup
        title="Xoá ảnh"
        visible={isVisible}
        onClose={() => setVisible(false)}
      >
        <div className="flex justify-between w-[300px]">
          <Button
            onClick={removeAvt}
            className="bg-red-200 text-red-600 border-red-500"
            text="Xoá"
          />
          <Button onClick={() => setVisible(false)} text="Huỷ" />
        </div>
      </Popup>
    </section>
  );
}
