import { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "@/store/slices/modalSlice";
import { useSearchParams } from "react-router-dom";
import { useGetSinglePostQuery } from "@/api/services/postServices";
import "react-loading-skeleton/dist/skeleton.css";

// Componenets
import CommentSection from "./_comment-section";
import MediaWrapper from "./_media-wrapper";
import Header from "./_header";
import Footer from "./_footer";
import RightSectionLoader from "./_right-section-loader";

const SinglePostModal = ({}) => {
  const singlePost = useSelector((state) => state.modal.singlePost);
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const postID = searchParam.get("p");

  const { data, isLoading, isError } = useGetSinglePostQuery(postID);

  const closeModal = () => {
    setSearchParam((prev) => {
      prev.delete("p");
      prev.has("commentIdToReply") && prev.delete("commentIdToReply");
      prev.has("commentUserToReply") && prev.delete("commentUserToReply");
      return prev;
    });
    dispatch(hideModal({ modalName: "singlePost" }));
  };

  useEffect(() => {
    !!!postID && closeModal();
  }, [location.pathname]);

  return (
    <Modal
      overlayClassName="modal-overlay bg-black/40 flex items-center justify-center max-sm:items-end"
      className="modal max-sm:w-full max-sm:h-[90%] max-sm:rounded-t-md sm:w-[90%] md:w-[70%] h-[90%] bg-[#000000] "
      isOpen={singlePost}
      onRequestClose={closeModal}
    >
      <>
        {isError ? (
          <div className="flex items-center justify-center w-full h-full ">
            <h3 className=" text-white py-4 px-8 rounded-md">
              Some Error Occured
            </h3>
          </div>
        ) : (
          <div className="w-full h-[100%] max-sm:grid-cols-1  grid grid-cols-[1fr,1fr]">
            {/* Left */}
            <div className="h-[100%] overflow-hidden max-sm:hidden relative">
              {isLoading ? (
                <div className="w-[100%] h-[100%] overflow-hidden bg-[gray]" />
              ) : (
                <MediaWrapper post={data} />
              )}
            </div>

            {/* Right */}
            <div className="bg-black h-full p-3 overflow-hidden">
              {isLoading ? (
                //  Right Section Loader
                <RightSectionLoader />
              ) : (
                // Right Sction Contents
                <ul className=" flex flex-col h-full">
                  {/* ------ Header------ */}
                  <Header post={data} />

                  {/* Comment Section */}
                  <CommentSection post={data} postID={postID} />

                  {/* Bottom / Actions Section */}
                  <Footer post={data} postID={postID} />
                </ul>
              )}
            </div>
          </div>
        )}
      </>
    </Modal>
  );
};

export default SinglePostModal;
