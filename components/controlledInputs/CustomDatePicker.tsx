"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ScheduleIcon from "../assets/images/Schedule.png";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

type Props = {
  range?: boolean;
  date: any;
  setDate: any;
  className?: string;
};

const CustomDatePicker = ({ range = false, date, setDate, className }: Props) => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        {range ? (
          <button
            className={cn(
              "w-[300px] h-14 px-2.5 border border-black rounded-[10px] text-black text-xl flex items-center justify-between font-[300]",
              !date && "text-muted-foreground",
              className
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} -{" "}
                  {formatDate(date.to)}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
            <Image src={ScheduleIcon} alt="" className="w-5 h-5 object-cover" />
          </button>
        ) : (
          <button
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
        )}
      </PopoverTrigger>
      {range ? (
        <PopoverContent className="w-auto p-0 z-50 bg-white" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      ) : (
        <PopoverContent className="w-auto p-0 z-50 bg-white">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      )}
    </Popover>
  );
};

export default CustomDatePicker;
