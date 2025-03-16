"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import ScheduleIcon from "../assets/images/Schedule.png";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

type Props = {};

const CustomDatePicker = (props: Props) => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          //   variant={"default"}
          className={cn(
            "w-[90px] h-8 px-2.5 border border-black rounded-[5px] flex items-center justify-between font-[300]",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
           <span className="text-[10px]">{formatDate(`${date}`)}</span> 
          ) : (
            <span className="text-[10px] ">From</span>
          )}
          <Image src={ScheduleIcon} alt="" className="w-5 h-5 object-cover" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50 bg-white">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomDatePicker;
