import colors from "./colors";

export const fakeData = {
  id: 1,
  label: "Emam",
  specialtite: "Spécialité",
  motif: "Motif",
  praticien: "Praticien",
  lieu: "Lieu",
  color: colors[Math.round(Math.random() * Object.keys(colors).length - 1)],
};

// const examList = [
//     { value: 'exam_one', text: 'Exam1' },
//     { value: 'exam_two', text: 'Exam2' },
//     { value: 'exam_three', text: 'Exam3' },
// ];

export const listMotif = [
  { vqlue: "", text: "" },
  { value: "motif_one", text: "IVT antiVEGF" },
  { value: "motif_two", text: "Motif2" },
  { value: "motif_three", text: "Motif3" },
];

export const listSpecialite = [
  { value: "", text: "" },
  { value: "specialite_one", text: "Ophtalmologie" },
  { value: "specialite_two", text: "Spécialité2" },
  { value: "specialite_thr", text: "Spécialité3" },
];

export const listPraticien = [
  { value: "", text: "" },
  { value: "praticien_one", text: "Dr.Dupont" },
  { value: "praticien_two", text: "Praticien2" },
  { value: "praticien_thr", text: "Praticien3" },
];

export const listLieu = [
  { value: "", text: "" },
  { value: "lieu_one", text: "Centre Perpignan" },
  { value: "lieu_two", text: "Lieu2" },
  { value: "lieu_thr", text: "Lieu3" },
];
