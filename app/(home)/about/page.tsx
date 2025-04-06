import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import image1 from "@/components/assets/images/buy.png";
import image2 from "@/components/assets/images/bar.png";
import image3 from "@/components/assets/images/makup.png";
import image4 from "@/components/assets/images/Interiorlogo.png";
import image5 from "@/components/assets/images/iMac.png";
import image6 from "@/components/assets/images/Drawing.png";
import image7 from "@/components/assets/images/Hammer.png";
import image8 from "@/components/assets/images/cart.png";
import Image from "next/image";

type Props = {};

const data = [
  { id: 1, icon: image1, desc: "Fashion & Textile Artisans" },
  { id: 2, icon: image2, desc: "Food & Culinary Artisans" },
  { id: 3, icon: image3, desc: "Beauty & Personal Care Artisans" },
  { id: 4, icon: image4, desc: "Home & Interior Artisans" },
  { id: 5, icon: image5, desc: "Digital & Creative Artisans" },
  { id: 6, icon: image6, desc: "Visual & Performing Arts Artisans" },
  { id: 7, icon: image7, desc: "Craft & Handmade Goods Artisans" },
  { id: 8, icon: image8, desc: "Skilled Trades & Repair Artisans" },
];

const AboutUs = (props: Props) => {
  return (
    <main>
      <section className="w-full lg:w-9/12 lg:mx-auto relative bg-hero bg-cover bg-top bg-no-repeat aspect-[3/2] h-[65vh] rounded-[40px] flex flex-col items-center justify-center ">
        <h1 className="text-white text-left text-5xl lg:text-8xl font-semibold">MENSAYHUB</h1>
      </section>
      <div className="w-fit bg-white mx-auto h-[105px] flex items-center justify-center px-7 rounded-[40px] -mt-10 z-40 sticky shadow-dropShadow ">
        <h1 className="text-primary font-semibold text-3xl lg:text-4xl ">
          Get to know about US
        </h1>
      </div>
      <div className="lg:w-9/12 mx-auto flex flex-col gap-14 my-16">
        <Wrapper className="rounded-[40px] flex flex-col justify-center gap-5 pt-20 pb-14 ">
          <h2 className="text-3xl lg:text-[32px] text-center font-[200] text-primary">
            Get to know a little bit about
          </h2>
          <h1 className="text-3xl lg:text-[40px] font-bold text-center text-primary">
            MENSAYHUB
          </h1>
          <p className="max-w-2xl px-5 lg:px-0 lg:max-w-[838px] mx-auto text-center text-xl lg:text-2xl font-semibold text-primary">
            {/* MensayHub connects customers with reliable, skilled artisans,
            promoting local craftsmanship and supporting small businesses. We
            vet artisans for quality and excellence, providing a seamless
            experience for customers. Our goal is to build lasting relationships
            based on trust, transparency, and quality, helping bring
            your vision to life. */}
            We are committed to simplifying the way people connect with trusted
            artisans and professionals across diverse fields—including fashion,
            beauty, culinary arts, home services, and more
          </p>
        </Wrapper>
        <Wrapper className="rounded-[40px] flex flex-col justify-center gap-5 pt-20 pb-14 ">
          <h2 className="text-[32px] text-center font-[200] text-primary">
            What we specialize in
          </h2>

          <p className="px-2 lg:px-0 max-w-[838px] mx-auto text-center text-xl lg:text-2xl font-semibold text-primary">
            MensayHub offers a range of services, including artisan connection,
            project management, quality assurance, and a seamless platform for
            finding and collaborating with skilled professionals.
          </p>
          <div className="flex items-center gap-8 px-1 lg:pl-16">
            {data.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-6">
                <Image
                  src={item.icon}
                  alt="icon"
                  width={50}
                  height={50}
                  className=""
                />
                <p className="text-sm text-center font-[300] text-primary">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>
    </main>
  );
};

export default AboutUs;
