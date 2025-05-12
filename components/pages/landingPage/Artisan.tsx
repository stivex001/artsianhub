"use client";
import { Headings } from "@/components/shared/Headings";
import image3 from "@/components/assets/images/port.png";
import Image, { StaticImageData } from "next/image";
import { CustomButton } from "@/components/clickable/CustomButton";
import { useRouter } from "next/navigation";
import { useArtisans } from "@/api/crud/artisans";
import SkeletonLoader from "@/components/shared/SkeletonModal";

type Props = {};

export const Artisan = (props: Props) => {
  const router = useRouter();
  const { getAllArtisan } = useArtisans();

  const { data: artisan = [], isLoading } = getAllArtisan();

  return (
    <div className="py-14 flex flex-col gap-8 lg:gap-10 ">
      <Headings
        title="Join Our Artisans"
        className="text-center text-4xl lg:text-5xl"
      />
      <div className="w-full lg:w-9/12 px-5 mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-10  lg:gap-x-20">
          {isLoading ? (
            <div className=" rounded-[10px] overflow-hidden w-[300] h-[350px]">
              <SkeletonLoader type="image" count={3} bgColor="white" />
            </div>
          ) : (
            artisan?.map((item) => (
              <div key={item?._id} className="lg:h-[350px]">
                <div
                  onClick={() =>
                    router.push(`/available-artisan/${item?.artisanId}`)
                  }
                  className="relative w-full h-full cursor-pointer"
                >
                  <Image
                    className="w-full object-cover rounded-[10px]"
                    src={item?.profilePhoto?.url || image3}
                    alt={item?.user?.firstName}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="self-end">
          <CustomButton
            onClick={() => router.push("/auth/signup?artisan=true")}
            className="rounded-[10px] h-[52px]"
          >
            Join as an Artisan
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
