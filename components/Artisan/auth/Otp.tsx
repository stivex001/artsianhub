"use client";

import AuthLayout from "@/components/Artisan/auth/AuthLayout";
import React, { useState } from "react";
import loginAuth from "@/components/assets/images/Login.png";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { BackNavigation } from "@/components/shared/BackNavigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useAuth } from "@/api/crud/auth";
import { toast } from "sonner";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Spinner } from "@/components/shared/Spinner";
import { ContactSupport } from "@/components/Artisan/auth/ContactSupport";

type Props = {
  email?: string;
};

const OtpContent = ({ email }: Props) => {
  const router = useRouter();
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
          router.push(`/auth/profile-setup`);
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
    <AuthLayout
      authImg={loginAuth}
      title="Where Great Work Meets Real Opportunities"
      desc="Whether you're booking help or offering your skills, MensayHub is your trusted space to connect, work, and grow."
    >
      <div className="flex flex-col gap-10">
        <BackNavigation />
        <AuthTitle
          title="Enter OTP"
          desc="Enter the 6 digit code sent to your email address"
        />
        <form onSubmit={() => submit(otpValue)} className="space-y-6">
          <InputOTP value={otpValue} onChange={handleOtpChange} maxLength={6}>
            <InputOTPGroup className="gap-4 rounded-[10px]">
              {[0, 1, 2].map((index) => (
                <InputOTPSlot
                  key={index}
                  className="border border-[#E4E5EA] bg-white"
                  index={index}
                />
              ))}
              <InputOTPSeparator className="text-[#EBEBEB]" />
              {[3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  className="border border-[#E4E5EA] bg-white"
                  index={index}
                />
              ))}
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
  );
};

export default OtpContent;
