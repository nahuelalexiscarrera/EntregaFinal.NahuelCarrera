export const categories = [
  { id: "monitores", label: "Monitores", value: "Monitores" },
  { id: "perifericos", label: "Perifericos", value: "Perifericos" },
  { id: "sillas-gamer", label: "Sillas Gamer", value: "Sillas Gamer" },
  { id: "audio-y-video", label: "Audio y Video", value: "Audio y Video" },
];

export const getCategoryById = (id) => categories.find((cat) => cat.id === id);
