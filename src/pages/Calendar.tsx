
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          Event Calendar
        </h1>
      </div>
      <Card className="p-6">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </Card>
    </div>
  );
};

export default Calendar;
