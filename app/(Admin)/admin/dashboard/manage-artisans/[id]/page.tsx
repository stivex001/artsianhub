"use client";
import { useArtisans } from "@/api/crud/artisans";
import ArtisanProfileDetails from "@/components/ArtisanProfileDetails";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { General } from "@/components/Artisan/General";
import ProfessionalDetails from "@/components/Artisan/ProfessionalDetails";

type Props = {};

const ArtisanDetails = (props: Props) => {
  const params = useParams();
  const artisanId = params?.id as string;

  const { getAllArtisan } = useArtisans();
  const { data , isLoading, refetch } = getAllArtisan();

  const artisans = data?.data || [];

  const selectedArtisan = artisans?.find(
    (artisan:any) => artisan?._id === artisanId
  );

  const isVerified =  true;

  if (isLoading)
    return <p className="text-white text-center mt-20 ">Loading...</p>;
  if (!selectedArtisan)
    return <p className="text-white text-center mt-20">Artisan not found</p>;


  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Artisan Details" />
      <div className="flex flex-col gap-2">
        <div className="flex justify-end items-center gap-4">
          <CustomButton label="View KYC" className="rounded-[10px] h-[37px]" />
          <CustomButton
            label="Activate"
            className="rounded-[10px] bg-[#1F873B]"
          />
          <CustomButton
            label="Deactivate"
            className="rounded-[10px] bg-[#AE2525]"
          />
        </div>
        <Wrapper className="shadow-dropShadow border-none">
          <div className="bg-primary rounded-[10px] px-12 py-5 flex justify-between items-center">
            <ArtisanProfileDetails selectedArtisan={selectedArtisan} />
            <div className="flex items-center gap-3">
              <p
                className={`${
                  isVerified
                    ? "bg-[#1F873B] text-white"
                    : "bg-[#FFD6D0] text-[#AE2525]"
                }   rounded-[10px] flex items-center justify-center px-3 py-1`}
              >
                {isVerified ? "Verified" : "Pending"}
              </p>
              {!isVerified && (
                <>
                  <div className=" h-9 border bg-white" />
                  <p className="bg-[#FFD6D0] text-[#AE2525] rounded-[10px] flex items-center justify-center px-3 py-1">
                    No Verification Done
                  </p>
                </>
              )}
            </div>
          </div>
          {/* tabs */}
          <Tabs defaultValue="general" className="my-8 ">
            <TabsList>
              <div className="flex items-center gap-4 mb-5 px-2">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:border-b data-[state=active]:border-b-primary bg-transparent  text-[#34679E] text-base"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="kyc"
                  className="data-[state=active]:border-b data-[state=active]:border-b-primary bg-transparent  text-[#34679E] text-base"
                >
                  KYC
                </TabsTrigger>
                <TabsTrigger
                  value="track"
                  className="data-[state=active]:border-b data-[state=active]:border-b-primary bg-transparent  text-[#34679E] text-base"
                >
                  Track Artisan Services
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="general">
              <General selectedArtisan={selectedArtisan} />
            </TabsContent>
            <TabsContent value="kyc">
              <ProfessionalDetails selectedArtisan={selectedArtisan} refetch={refetch} />
            </TabsContent>
            <TabsContent value="track">
              <h1>Track</h1>
            </TabsContent>
          </Tabs>
        </Wrapper>
      </div>
    </section>
  );
};

export default ArtisanDetails;
