import { useState, useEffect } from "react";
import Modal from "react-modal";
import { ImFileVideo } from "react-icons/im";
import VideoPlayer from "../../video-player";
import Avatar from "../../avatar";
import { MdClose, MdOutlineEmojiEmotions } from "react-icons/md";
import { SpinnerLoader } from "../../loader";
import { useCreatePostMutation } from "@/api/services/postServices";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "@/store/slices/modalSlice";
import useAuth from "@/hooks/use-auth";

const CreatePostModal = () => {
  const [selectedFile, setSelectedFile] = useState({ data: "", type: "" });
  const { user } = useAuth();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.createPost);
  const [createPost, { isLoading: isPosting }] = useCreatePostMutation();
  const [postData, setPostData] = useState({
    file: "",
    caption: "",
  });

  const handleFIleSelectorChange = (e) => {
    const _file = e.target.files[0];
    const fileType = _file.type.split("/")[0];
    let fileReader = new FileReader();

    if (_file) {
      setPostData((prev) => {
        return { ...prev, file: _file };
      });
      fileReader.onloadend = () => {
        setSelectedFile((prev) => {
          return { data: fileReader.result, type: fileType };
        });
      };
      fileReader.readAsDataURL(_file);
      console.log(selectedFile.type);
    }
  };
  const handleCaptionChange = (e) => {
    const value = e.target.value;
    setPostData((prev) => {
      return { ...prev, caption: value };
    });
  };
  const clearAll = () => {
    setPostData({ file: "", caption: "" });
    setSelectedFile({ data: "", type: "" });
  };
  const handleSharePost = async () => {
    if (!postData.caption || !postData.file) {
      alert("Please fill the filled");
      // return;
    } else {
      // Change To Form Data 👇🏼
      const fd = new FormData();
      fd.append("file", postData.file);
      fd.append("caption", postData.caption);

      try {
        const res = await createPost(fd).unwrap();
        clearAll();
        closeModal();
        toast.dark(res.message);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    setSelectedFile({ data: "", type: "" });

    return () => {
      clearAll();
      setSelectedFile({ data: "", type: "" });
    };
  }, []);

  const closeModal = () => {
    dispatch(hideModal({ modalName: "createPost" }));
  };
  return (
    <Modal
      overlayClassName="modal-overlay bg-black/60 flex items-center justify-center"
      className="modal w-full sm:w-fit h-screen sm:h-[460px] bg-[#2c2c2c] sm:rounded-md"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="w-full sm:w-fit h-full">
        {/* Empty File View */}
        {selectedFile.data ? (
          <>
            <div className="grid grid-rows-[10%,90%] w-full sm:w-[750px] h-full ">
              <header className="p-1 w-full flex items-center justify-between px-2 border-solid border-b-white/5 border-t-0 border-r-0 border-l-0">
                <h3
                  className="cursor-pointer text-sm hover:opacity-70 transition text-red "
                  onClick={clearAll}
                >
                  Delete
                </h3>
                <h3 className="text-sm font-semibold ">Create new post</h3>
                <div>
                  {isPosting ? (
                    <SpinnerLoader className={"size-5"} />
                  ) : (
                    <span
                      onClick={() => handleSharePost()}
                      className="cursor-pointer text-sm hover:opacity-70 transition text-[#30beff] font-semibold"
                    >
                      Share
                    </span>
                  )}
                </div>
              </header>

              <main className=" w-full max-h-full flex max-sm:flex-col">
                <div className="overflow-hidden flex-1 h-full">
                  {selectedFile.type === "image" ? (
                    <div className="size-full">
                      <img
                        src={selectedFile.data}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <VideoPlayer
                        style={{ height: "100%", maxWidth: "100%" }}
                        src={selectedFile.data}
                      />
                    </div>
                  )}
                </div>

                <div className="w-full max-sm:flex-1 sm:w-[40%] p-4 pr-0 h-full">
                  <div className="w-full overflow-y-scroll h-full">
                    <ul className="flex flex-col gap-1 w-full ">
                      <li className="flex flex-col gap-2">
                        {/* ProfilePart */}
                        <div className="flex gap-2 items-center">
                          <div className="w-[35px]">
                            <Avatar src={user?.profilePicture} />
                          </div>
                          <h3 className="text-sm">{user?.username}</h3>
                        </div>
                      </li>
                      {/* Caption Input part */}
                      <li className="w-full flex flex-col pr-2">
                        <textarea
                          placeholder="Write a caption..."
                          className="bg-black/0 py-2 resize-none h-40 w-full placeholder:text-[gray] text-sm"
                          onChange={handleCaptionChange}
                          maxLength={200}
                        ></textarea>
                        <div className="flex justify-between items-center">
                          <span className="cursor-pointer">
                            <MdOutlineEmojiEmotions />
                          </span>

                          <h3 className="text-white/50 text-xs">
                            {200 - postData.caption.length}
                          </h3>
                        </div>
                      </li>

                      {/* Additional Settings */}
                    </ul>
                  </div>
                </div>
              </main>
            </div>
          </>
        ) : (
          // Empty File Select
          <div className="flex items-center justify-center h-full w-full flex-col">
            <header className="p-1 w-full flex items-center justify-between sm:justify-center border-solid border-b-white/5 border-t-0 border-r-0 border-l-0">
              <span className="sm:hidden cursor-pointer" onClick={closeModal}>
                <MdClose />
              </span>
              <h3 className="text-sm font-semibold ">Create new post</h3>
              <span />
            </header>

            <main className="flex flex-1 items-center justify-center w-[430px]">
              <div className="flex flex-col items-center gap-4">
                <span>
                  <ImFileVideo className="text-4xl" />
                </span>
                <h3>Select 1 Video or 1 Photo here</h3>
                <div>
                  <label
                    htmlFor="post-file-selector"
                    className="text-md py-1 px-2 rounded-md cursor-pointer bg-primary-900 hover:bg-primary-500 transition"
                  >
                    Select from device
                  </label>
                  <input
                    onChange={handleFIleSelectorChange}
                    className="hidden"
                    type="file"
                    name="post-file-selector"
                    id="post-file-selector"
                    accept="image/*, video/*"
                  />
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreatePostModal;
