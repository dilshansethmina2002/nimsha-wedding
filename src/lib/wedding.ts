// Central wedding configuration — change names, dates, venues here.
export const wedding = {
  bride: { en: "Thathsarani", si: "තත්සරණි" },
  groom: { en: "Gayan", si: "ගයාන්" },
  brideParents: {
    en: "Daughter of Mr. Sanath & Mrs. Mala",
    si: "සනත් මහතාගේ සහ මාලා මහත්මියගේ ආදරණීය දියණිය",
  },
  groomParents: {
    en: "Son of Mr. Ashoka & Mrs. Lalitha",
    si: "අශෝක මහතාගේ සහ ලලිතා මහත්මියගේ ආදරණීය පුත්",
  },
  // 15 October 2026, Poruwa Ceremony at 09:57 AM (Sri Lanka time)
  date: new Date("2026-10-15T09:40:00+05:30"),
  hashtag: "#GayanAndThathsarani2026",

  invitationHeader: { en: "Together with our families", si: "ශ්‍රී  සුබ  මංගලම්" },
  invitationWording: {
    en: "Request the honour of your presence",
    si: "සමග අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් ඔබට කෙරෙන සුහද ඇරයුමයි.",
  },
  invitedBy: {
    en: "To their wedding ceremony.",
    si: "ඔවුන්ගේ මංගල උත්සවය සඳහා.",
  },

  ceremony: {
    title: { en: "The Poruwa Ceremony", si: "පෝරුව මංගල්‍යය" },
    time: "09:40 AM",
    timeSi: "පෙ.ව. 09.40",
    date: "Thursday, October 15, 2026",
    dateSi: "2026 ඔක්තෝබර් මස 15 වන බ්‍රහස්පතින්දා",
    venue: "Hotel Alakamanda",
    venueSi: "Hotel ආලකමන්දා",
    address: "Anuradhapura",
    addressSi: "අනුරාධපුර",
    mapsQuery: "Hotel+Alakamanda+Anuradhapura",
    mapsUrl: "https://maps.app.goo.gl/HvCioLC4vU4XfDiy6?g_st=iw",
  },
  reception: {
    title: { en: "Wedding Ceremony", si: "මංගල උත්සවය" },
    time: "08.30 AM to 03:30 PM",
    timeSi: "පෙ.ව. 08.30 සිට ප.ව. 03.30 දක්වා",
    date: "Thursday, October 15, 2026",
    dateSi: "2026 ඔක්තෝබර් මස 15 වන බ්‍රහස්පතින්දා",
    venue: "Hotel Alakamanda",
    venueSi: "Hotel ආලකමන්දා",
    address: "Anuradhapura",
    addressSi: "අනුරාධපුර",
    mapsQuery: "Hotel+Alakamanda+Anuradhapura",
    mapsUrl: "https://maps.app.goo.gl/HvCioLC4vU4XfDiy6?g_st=iw",
  },
  dressCode: {
    en: "Traditional",
    si: "සාම්ප්‍රදායික ඇඳුම්",
  },
  contact: { name: "Gayan & Thathsarani", phone: "+94 713172985" },

  story: [
    { year: "2019", title: { en: "How We Met", si: "අපි මුණගැහුණා" }, text: { en: "A chance meeting that turned one conversation into endless ones.", si: "එක් කතා බසක් අනන්ත කතාබස් බවට පත් වූ අහඹු හමුවීමක්." } },
    { year: "2021", title: { en: "First Trip Together", si: "පළමු ගමන" }, text: { en: "Watching the sunrise over the hills — that's when we knew.", si: "කඳුකරයේ හිරු උදාව බැලූ දින — එතැනදී අපි දැන ගත්තා." } },
    { year: "2024", title: { en: "The Proposal", si: "යෝජනාව" }, text: { en: "Under a sky full of stars, he asked. She said yes.", si: "තරු පිරුණු අහස යට, ඔහු ඇසුවා. ඇය එකඟ වුණා." } },
    { year: "2026", title: { en: "Forever Begins", si: "සදාකාලය ආරම්භ වේ" }, text: { en: "Today we begin our forever — surrounded by everyone we love.", si: "අද අපගේ සදාකාලය ආරම්භ වේ — අප ආදරය කරන සියල්ලන් මැද." } },
  ],
} as const;

export type Lang = "en" | "si";