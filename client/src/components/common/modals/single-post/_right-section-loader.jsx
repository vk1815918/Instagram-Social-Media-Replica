import Skeleton from "react-loading-skeleton";

const RightSectionLoader = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex gap-2 w-full h-fit items-center">
          <Skeleton circle={true} height={"40px"} width={"40px"} />
          <Skeleton height={"25px"} width={"150px"} />
        </div>

        <div className="flex flex-col ml-3">
          <div className="flex gap-2 w-full h-fit items-center">
            <Skeleton circle={true} height={"30px"} width={"30px"} />
            <div className="flex flex-col gap-0">
              <Skeleton height={"15px"} width={"150px"} />
              <Skeleton height={"10px"} width={"100px"} />
            </div>
          </div>
          <div className="flex gap-2 w-full h-fit items-center">
            <Skeleton circle={true} height={"30px"} width={"30px"} />
            <div className="flex flex-col">
              <Skeleton height={"15px"} width={"150px"} />
              <Skeleton height={"10px"} width={"100px"} />
            </div>
          </div>
          <div className="flex gap-2 w-full h-fit items-center">
            <Skeleton circle={true} height={"30px"} width={"30px"} />
            <div className="flex flex-col">
              <Skeleton height={"15px"} width={"150px"} />
              <Skeleton height={"10px"} width={"100px"} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full h-fit">
        <Skeleton height={"25px"} width={"150px"} />
        <Skeleton height={"15px"} width={"100px"} />
      </div>
    </div>
  );
};

export default RightSectionLoader;
