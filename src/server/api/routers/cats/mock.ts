import { type Cat } from "~/Types";

export const cats: Cat[] = [
  {
    id: "1",
    name: "Minou",
    birthDate: new Date(2019, 5, 15),
    breed: "Siamese",
    gender: "Male",
    city: "Paris",
    description: "Minou is a playful and affectionate cat.",
    photo: "link_to_minou_photo.jpg",
    adoptionStatus: "Available",
  },
  {
    id: "2",
    name: "Felix",
    birthDate: new Date(2020, 2, 10),
    breed: "Maine Coon",
    gender: "Male",
    city: "Lyon",
    description: "Felix is a gentle giant with a heart of gold.",
    photo: "link_to_felix_photo.jpg",
    adoptionStatus: "Available",
  },
  // Add more Cat objects here
];
