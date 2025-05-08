import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ReusableDialogProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  // width?: string;
}

const ReusableDialog = ({
  title,
  open,
  onOpenChange,
  children,
  className = "",
}: // width
ReusableDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`bg-white !rounded-[20px] sm:px-7 px-4 sm:!w-[60vw] !w-[90vw] ${className}`}
      >
        <DialogTitle className="text-xl font-bold text-grey border-b border-borderColor pb-2">
          {title}
        </DialogTitle>
        <section className={`overflow-y-scroll scrollbar-hidden max-h-[70vh] `}>
          {children}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
