import SkeletonLoader from "@/components/ui/skeleton";

const RightSectionLoader = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 w-full h-fit items-center">
          <SkeletonLoader width={"40px"} variant="circle" />
          <SkeletonLoader height={"25px"} width={"150px"} />
        </div>

        <div className="flex flex-col ml-3 gap-4">
          <div className="flex gap-2 w-full h-fit items-center">
            <SkeletonLoader width={"30px"} variant="circle" />
            <div className="flex flex-col gap-2">
              <SkeletonLoader height={"10px"} width={"150px"} />
              <SkeletonLoader height={"10px"} width={"100px"} />
            </div>
          </div>
          <div className="flex gap-2 w-full h-fit items-center">
            <SkeletonLoader width={"30px"} variant="circle" />
            <div className="flex flex-col gap-2">
              <SkeletonLoader height={"10px"} width={"150px"} />
              <SkeletonLoader height={"10px"} width={"100px"} />
            </div>
          </div>
          <div className="flex gap-2 w-full h-fit items-center">
            <SkeletonLoader width={"30px"} variant="circle" />
            <div className="flex flex-col gap-2">
              <SkeletonLoader height={"10px"} width={"150px"} />
              <SkeletonLoader height={"10px"} width={"100px"} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full h-fit">
        <SkeletonLoader height={"25px"} width={"150px"} />
        <SkeletonLoader height={"15px"} width={"100px"} />
      </div>
    </div>
  );
};

export default RightSectionLoader;
