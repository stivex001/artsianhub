"use client";

import { CustomModal } from "@/components/modals/CustomModal";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ConfirmIcon } from "@/components/assets/icons/ModalIcon";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  role: string;
};

const IncompleteProfileModal = ({ isOpen, onClose, role }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/auth/profile-setup?role=${role}`);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      disableClose
      onClose={onClose}
      icon={<ConfirmIcon />}
    >
      <div className="text-center">
        <h1 className="text-lg font-bold text-paragrah">
          Complete Your Profile
        </h1>
        <p className="text-sm text-body mt-2">
          You need to complete your profile before accessing your {role}{" "}
          dashboard.
        </p>
      </div>
      <CustomButton
        type="button"
        label="Go to Profile Setup"
        className="w-full rounded-xl mt-4"
        variant="primary"
        onClick={handleClick}
      />
    </CustomModal>
  );
};

export default IncompleteProfileModal;
