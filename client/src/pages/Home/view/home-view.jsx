import Stories from "../_components/stories-section";
import PostListContainer from "../_components/posts-container";
import { FullLineLoader } from "@/components/common/loader";
import Suggestion from "../_components/suggestion";

const HomeView = () => {
  return (
    <>
      <main className="grid grid-cols-[65%,35%] gap-10 w-[100%] max-lg:grid-cols-[100%]">
        <div className="min-h-screen">
          <div className="gap-[15px] sm:gap-[30px] flex flex-col">
            {/* ------- Stoire Container -------- */}
            <Stories />

            <section className="">
              {/* ------ Post Container ------- */}
              <PostListContainer />

              {/* ------- Loader Container ------- */}
            </section>
          </div>
        </div>
        {/* ------- Suggestion Container ------ */}
        <Suggestion
          containerClassName={"w-[80%] min-h-[300px] max-lg:hidden space-y-3"}
        />
      </main>
    </>
  );
};

export default HomeView;
