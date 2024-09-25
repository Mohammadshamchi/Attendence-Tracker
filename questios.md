I have calendar component which built with shadcn react 

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useState } from "react"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      selected={selected}
      onSelect={onSelect}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }


now i want to check the data with my fakeData .js file and if the day selected on calendar component was in the range of the the time of the classess shows all available classess! 

interface ClassData {
  id: number;
  name: string;
  info: string;
  participants: string[];
  startDate: Date;
  endDate: Date;
  classHours: {
    start: string;
    end: string;
  };
}

export const initialClasses: ClassData[] = [
  {
    id: 1,
    name: "Introduction to React",
    info: "Learn the basics of React framework",
    participants: ["Alice", "Bob", "Charlie"],
    startDate: new Date(2024, 8, 1), // September 1, 2024
    endDate: new Date(2024, 11, 15), // December 15, 2024
    classHours: {
      start: "10:00",
      end: "12:00"
    }
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    info: "Deep dive into JavaScript concepts",
    participants: ["David", "Eve", "Frank"],
    startDate: new Date(2024, 8, 5), // September 5, 2024
    endDate: new Date(2024, 11, 20), // December 20, 2024
    classHours: {
      start: "14:00",
      end: "16:00"
    }
  },
  // Add more classes as needed
];
interface StudentData {
  student_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  signup_date: Date;
  class_signed_up: string[];
  attendance_history: {
    class_id: string;
    date: Date;
    attended: boolean;
  }[];
  email?: string; // Optional field
}

export const initialStudents: StudentData[] = [
  {
    student_id: "S001",
    first_name: "John",
    last_name: "Doe",
    phone_number: "123-456-7890",
    signup_date: new Date("2024-01-15"),
    class_signed_up: ["C001", "C002"],
    attendance_history: [
      { class_id: "C001", date: new Date("2024-02-01"), attended: true },
      { class_id: "C002", date: new Date("2024-02-03"), attended: false },
    ],
    email: "john.doe@example.com"
  },
  {
    student_id: "S002",
    first_name: "Jane",
    last_name: "Smith",
    phone_number: "987-654-3210",
    signup_date: new Date("2024-01-20"),
    class_signed_up: ["C001"],
    attendance_history: [
      { class_id: "C001", date: new Date("2024-02-01"), attended: true },
    ],
    email: "jane.smith@example.com"
  },
  // Add more student records as needed
];


export type { ClassData,StudentData };
