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

const exam = {
  nom: "test",
  id_modele: 1,
  color: colors[Math.round(Math.random() * Object.keys(colors).length - 1)],
  id_praticien: 1,
  id_profession: 1,
  id_lieu: 1,
  id_motif: 1,
  id_specialtite: 1,
  fixedExamPosition: true,
  position: 1,
};

export const rdvData = {
  id: 1,
  groupe_rdv: 1,
  nom_model: "test",
  groups: {
    group0: { exams: [exam, exam, exam, exam] },
    group1: { exams: [exam, exam] },
    group2: { exams: [exam] },
    group3: { exams: [exam, exam, exam] },
  },
  exams: [exam, exam, exam, exam, exam],
  exam: exam
};

export const fakeModel = [
  { value: "", text: "" },
  { value: "modele_1", text: "Protocole d'IVT" },
  { value: "modele_2", text: "Modele 2" },
  { value: "modele_3", text: "Modele 3" },
];
