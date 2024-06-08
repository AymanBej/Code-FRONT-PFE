import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { Box } from "@mui/material";
import { Breadcrumb } from "app/components";

function Calendar() {
  return (
    <div
      style={{
        margin: "auto",
        width: "80%",
        fontFamily: "DM Sans",
        padding: "2%",
        color: "#181834"
      }}
    >
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Calendrier" }]} />
      </Box>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        locale={frLocale}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        height={"70vh"}
        themeSystem={"standard"}
        dayMaxEventRows={true}
        dayMaxEvents={true}
        eventDisplay={"block"}
        eventBorderColor={"#0d5195"}
        eventBackgroundColor={"#0d5195"}
      />
    </div>
  );
}

export default Calendar;
