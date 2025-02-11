import { GoogleCalendarEvent } from "@/app/utils/types";

export const fakeGoogleCalendarData: GoogleCalendarEvent[] = [
  {
    id: "1",
    summary: "Math 101",
    location:
      '{ "room": "H831", "building": "Hall Building", "campus": "SGW" }',
    start: {
      dateTime: "2025-02-10T09:00:00",
      timeZone: "America/Toronto",
    },
    end: {
      dateTime: "2025-02-10T10:00:00",
      timeZone: "America/Toronto",
    },
  },
  {
    id: "2",
    summary: "Computer Science 101",
    location: "Building B, Room 202",
    start: {
      dateTime: "2025-02-10T11:00:00",
      timeZone: "America/Toronto",
    },
    end: {
      dateTime: "2025-02-10T12:00:00",
      timeZone: "America/Toronto",
    },
  },
  {
    id: "3",
    summary: "Physics 101",
    location: "Building C, Room 303",
    start: {
      dateTime: "2025-02-10T13:00:00",
      timeZone: "America/Toronto",
    },
    end: {
      dateTime: "2025-02-10T14:00:00",
      timeZone: "America/Toronto",
    },
  },
];
