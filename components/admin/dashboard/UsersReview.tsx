import { Details } from "@/components/shared/Details";
import SkeletonLoader from "@/components/shared/SkeletonModal";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {
  usersCount: any;
  isLoading: boolean;
};

export const UserReview = ({ usersCount, isLoading }: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl text-primary pb-2">Users</h1>
      <Wrapper className="px-5 py-8 bg-secondary">
        <div className="px-7 my-5 grid md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-y-12">
          {isLoading ? (
            <SkeletonLoader type="card" count={4} bgColor="!bg-white" />
          ) : (
            <>
              <Details
                className="bg-[#D9D9D9] text-primary"
                title="Artisans"
                count={usersCount?.totalArtisans}
              />
              <Details
                className="bg-[#1F873B]"
                title="Active Artisans"
                count={usersCount?.activeArtisans}
              />
              <Details
                className="bg-[#D09B9B]"
                title="Inactive Artisans"
                count={usersCount?.inactiveArtisans}
              />{" "}
              <Details
                className="bg-[#AE2525]"
                title="Deactivated Artisans"
                count={usersCount?.deactivatedArtisans}
              />{" "}
            </>
          )}
        </div>
      </Wrapper>
    </div>
  );
};
