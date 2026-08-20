import { wedding } from "./wedding";

const pad = (n: number) => String(n).padStart(2, "0");
const toICSDate = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

export const buildGoogleCalendarUrl = () => {
  const start = wedding.date;
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.bride.en} & ${wedding.groom.en} — Wedding`,
    dates: `${toICSDate(start)}/${toICSDate(end)}`,
    details: `Join us as we celebrate our wedding. ${wedding.hashtag}`,
    location: `${wedding.ceremony.venue}, ${wedding.ceremony.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
};

export const downloadICS = () => {
  const start = wedding.date;
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${wedding.bride.en} & ${wedding.groom.en} — Wedding`,
    `DESCRIPTION:Join us as we celebrate our wedding. ${wedding.hashtag}`,
    `LOCATION:${wedding.ceremony.venue}\\, ${wedding.ceremony.address}`,
    "BEGIN:VALARM",
    "TRIGGER:-P2D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Wedding in 2 days!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.bride.en}-${wedding.groom.en}-wedding.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
