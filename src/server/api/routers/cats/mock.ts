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
    photo: "https://api-ninjas.com/images/cats/abyssinian.jpg",
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
    photo: "https://api-ninjas.com/images/cats/abyssinian.jpg",
    adoptionStatus: "Available",
  },
  // Add more Cat objects here
];
