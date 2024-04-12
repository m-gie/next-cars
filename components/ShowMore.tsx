"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ShowMoreProps } from "@/types";
import { Button } from "@/components";
import { updateSearchParams } from "@/utils";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathName = updateSearchParams("limit", `${newLimit}`);
    router.push(newPathName, { scroll: false });
  };
  return (
    <div className="flex-center mt-10 w-full items-center gap-5">
      {!isNext && (
        <Button
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
      <a href="#discover">
        <Button
          title="Back to Top"
          containerStyles="bg-primary-blue text-white rounded-full"
          handleClick={() => {}}
        />
      </a>
    </div>
  );
};

export default ShowMore;
