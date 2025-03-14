import ArtisanAuthLayout from "@/components/Artisan/auth/ArtisanAuthLayout";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CustomButton } from "@/components/clickable/CustomButton";

type Props = {};

const OTP = (props: Props) => {
  return (
    <ArtisanAuthLayout>
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-white text-3xl font-semibold mb-2">Enter Code</h1>
        <p className="text-white text-base font-semibold">
          We sent a code to 020*******89
        </p>
        <form action="" className="my-6">
          <InputOTP maxLength={4}>
            <InputOTPGroup className="gap-2.5 rounded-[10px]">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <button
            type={"button"}
            className="text-base text-white font-semibold flex items-center justify-center my-6 "
          >
            Don’t get a code? Click to resend
          </button>
        </form>
        <CustomButton
          type="button"
          label="Proceed to Profile Setup"
          className="w-full rounded-[10px]"
        />
      </div>
    </ArtisanAuthLayout>
  );
};

export default OTP;
