import { Switch } from "@/components/ui/switch";

type ToggleSwitchProps = {
  enabled: boolean;
  onChange: () => void;
};

export const ToggleSwitch = ({ enabled, onChange }: ToggleSwitchProps) => {
  return (
    <Switch
      checked={enabled}
      onCheckedChange={onChange}
      className="bg-red-500 h-6 w-[45px]  data-[state=unchecked]:bg-[#F1F1F3]"
    />
  );
};
