"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CustomButton } from "@/components/clickable/CustomButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/api/crud/auth";
import { toast } from "sonner";
import { CheckCircle, Loader2 } from "lucide-react";

type Props = {};

const OTPPage = (props: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const isClient = params.get("isClient");
  const isArtisan = params.get("isArtisan");
  const isAdmin = params.get("isAdmin");

  const [otpValue, setOtpValue] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
          setSuccessMessage(response?.message);
          setShowSuccessModal(true);
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
    if (value.length === 4) {
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

  const handleSuccessModalAction = () => {
    if (isClient) {
      router.push("/");
    } else if (isArtisan) {
      router.push("/auth/login");
    } else if (isAdmin) {
      router.push("/auth/login");
    }
    setShowSuccessModal(false);
  };

  if (verifyPending) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-white" />
          <p className="text-white mt-4 text-lg">Verifying OTP...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-[10px] text-center max-w-sm w-full">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              OTP Verified
            </h2>
            <p className="text-gray-600 mb-6">{successMessage}</p>

            <div className="space-y-4">
              <CustomButton
                label={
                  isClient
                    ? "Proceed"
                    : "Complete registration by Siginin in"
                }
                onClick={handleSuccessModalAction}
                className="w-full rounded-[10px]"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-white text-3xl font-semibold mb-2">Enter Code</h1>
        <p className="text-white text-base font-semibold">
          We sent a code to {email}
        </p>
        <form action="" className="my-6">
          <InputOTP value={otpValue} onChange={handleOtpChange} maxLength={4}>
            <InputOTPGroup className="gap-2.5 rounded-[10px]">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <CustomButton
            label="Don’t get a code? Click to resend"
            type={"button"}
            onClick={handleResendOtp}
            isLoading={resendPending}
            className="text-base !bg-transparent text-white font-semibold flex items-center justify-center my-6 "
          />
        </form>
        {/* <CustomButton
          type="button"
          label="Proceed to Profile Setup"
          className="w-full rounded-[10px]"
          onClick={() => router.push(`/artisan/dashboard`)}
        /> */}
      </div>
    </div>
  );
};

export default OTPPage;
