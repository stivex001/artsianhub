"use client";

import AuthLayout from "@/components/Artisan/auth/AuthLayout";
import React, { Suspense, useState } from "react";
import loginAuth from "@/components/assets/images/Login.png";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { BackNavigation } from "@/components/shared/BackNavigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/api/crud/auth";
import { toast } from "sonner";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Spinner } from "@/components/shared/Spinner";
import { ContactSupport } from "@/components/Artisan/auth/ContactSupport";

type Props = {};

const OTP = (props: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const [otpValue, setOtpValue] = useState("");

  const { verifyOTP, resendOTP } = useAuth();
  const { isPending: verifyPending, mutateAsync: verifyOtp } = verifyOTP;
  const { isPending: resendPending, mutateAsync: resendOtp } = resendOTP;

  const submit = async (otp: string) => {
    const payload = new FormData();
    payload.append("otp", otp);
    payload.append("email", email || "");

    try {
      await verifyOtp(payload, {
        onSuccess: (response: any) => {
          console.log(response, "res_");
          // setSuccessMessage(response?.message);
          // setShowSuccessModal(true);
          // router.push(`/`);
        },
        onError: (error: any) => {
          toast.error(error?.message);
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtpValue(value);

    // Automatically submit when OTP is complete
    if (value.length === 6) {
      submit(value);
    }
  };

  const handleResendOtp = async () => {
    const payload = new FormData();
    payload.append("email", email || "");

    try {
      await resendOtp(payload, {
        onSuccess: (response: any) => {
          console.log(response, "res_");
          toast.success(response?.message);
          router.push(`/`);
        },
        onError: (error: any) => {
          toast.error(error?.message);
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <AuthLayout
        authImg={loginAuth}
        title="Where Great Work Meets Real Opportunities"
        desc="Whether you're booking help or offering your skills, MensayHub is your trusted space to connect, work, and grow."
      >
        <div className="flex flex-col gap-10">
          <BackNavigation />
          <AuthTitle
            title="Enter OTP"
            desc="Enter the 6 digit code sent to you email address"
          />
          <form onSubmit={() => submit(otpValue)} className="space-y-6">
            <InputOTP value={otpValue} onChange={handleOtpChange} maxLength={6}>
              <InputOTPGroup className="gap-4  rounded-[10px]">
                <InputOTPSlot
                  className="border border-[#E4E5EA] bg-white"
                  index={0}
                />
                <InputOTPSlot
                  className="border border-[#E4E5EA] bg-white"
                  index={1}
                />
                <InputOTPSlot
                  className="border border-[#E4E5EA] bg-white"
                  index={2}
                />
                <InputOTPSeparator className="text-[#EBEBEB]" />
                <InputOTPSlot
                  className="border border-[#E4E5EA] bg-white"
                  index={3}
                />
                <InputOTPSlot
                  className="border border-[#E4E5EA] bg-white"
                  index={4}
                />
                <InputOTPSlot
                  className="border border-[#E4E5EA] bg-white"
                  index={5}
                />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm">
              Code expires in{" "}
              <span className="text-primary font-medium">00:30</span>
            </p>
            <CustomButton
              label="Verify"
              type="submit"
              isLoading={verifyPending}
              className="w-full font-medium "
            />
            <p className="text-sm">
              Don’t get a code?{" "}
              <span
                className="text-paragrah font-medium cursor-pointer"
                onClick={handleResendOtp}
              >
                {resendPending ? <Spinner /> : "Resend Code"}
              </span>
            </p>
          </form>

          <ContactSupport className="!justify-start" />
        </div>
      </AuthLayout>
    </Suspense>
  );
};

export default OTP;
