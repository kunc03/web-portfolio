import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import kopiq from "@/public/kopiQ.png";
import jprefund from "@/public/jprefund.png";
import manrisk from "@/public/manrisk.png";
import dclinic from "@/public/dclinic.png";
import rentCar from "@/public/rentCar.png";
import shopper from "@/public/shopper.png";
import gachaEndoji from "@/public/gacha-endoji.png";
import gachaRogaining from "@/public/rogaining.png";
import aichiGurutto from "@/public/aichi-gurutto.png";
import store from "@/public/store.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experiences",
    hash: "#experiences",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    date: "Jul 2024 – Sep 2024",
    title: "Frontend Developer Intern",
    company: "PT Dynamic Talenta Navigator",
    location: "Onsite · Semarang, Indonesia",
    description:
      "Contributed to the development of web features using Next.js, Zustand, Zod, and Shadcn UI. Focused on building reusable components and handling form validation with modern best practices.",
    techStack: ["Next.js", "Zustand", "Zod", "Tailwind CSS", "Shadcn UI", "i18n"],
    icon: "pi pi-book",
  },
  {
    date: "Oct 2024 – Present",
    title: "Frontend Developer",
    company: "PT Dynamic Talenta Navigator",
    location: "Onsite · Semarang, Indonesia",
    description:
      "Led frontend development for modern web applications using Next.js, Nuxt.js, and Angular. Integrated component libraries like PrimeVue, focusing on performance and maintainability.",
    techStack: [
      "Nuxt.js",
      "Angular",
      "Tailwind CSS",
      "Pinia",
      "PrimeVue",
      "Service Workers",
      "Angular"
    ],
    icon: "pi pi-briefcase",
  },
] as const;

export const projectsData = [
  {
    title: "Aichi Gurutto",
    description:
      "An interactive gacha web app, allowing users to earn points and unlock characters for voucher rewards.",
    tags: [
      "Nuxt.js",
      "Tailwind CSS",
      "Pinia",
      "Service Workers",
      "PrimeVue",
      "Swiper",
    ],
    imageUrl: aichiGurutto,
    linkUrl: "https://aichi-gurutto.dela-kuji.jp/",
  },
  {
    title: "Rogaining Endoji",
    description:
      "A custom gacha app, combining exploration with point-based rewards and collectible characters.",
    tags: [
      "Nuxt.js",
      "Tailwind CSS",
      "Pinia",
      "Service Workers",
      "PrimeVue",
      "Swiper",
    ],
    imageUrl: gachaRogaining,
    linkUrl: "https://rogaining-endoji.dela-kuji.jp/",
  },
  {
    title: "Endoji Shotengai",
    description:
      "A gacha-based web app, where users engage with the area to collect characters and redeem prizes.",
    tags: [
      "Nuxt.js",
      "Tailwind CSS",
      "Pinia",
      "Service Workers",
      "PrimeVue",
      "Swiper",
    ],
    imageUrl: gachaEndoji,
    linkUrl: "https://endo-ji-shotengai.dela-kuji.jp/",
  },
  {
    title: "SIMRIS Infovesta",
    description:
      "A web to manage and display data with tables and charts, making it easier to view and organize investment data.",
    tags: [
      "Nuxt.js",
      "Tailwind CSS",
      "Pinia",
      "html2canvas",
      "jspdf",
      "PrimeVue",
      "chart.js",
      "date-fns",
    ],
    imageUrl: manrisk,
    linkUrl: "https://manrisk-test.vercel.app/",
  },
  {
    title: "Diamond Clinic",
    description:
      "A web that showcases various skincare and beauty treatments with images.",
    tags: ["Nuxt.js", "Tailwind CSS", "Pinia", "Service Workers", "PrimeVue"],
    imageUrl: dclinic,
    linkUrl: "https://clinic-test-v1.vercel.app/",
  },
  {
    title: "JPrefund",
    description:
      "A web that allows international tourists shopping in Japan to easily claim tax refunds by submitting purchase details online.",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Zod",
      "Zustand",
      "Framer Motion",
      "GSAP",
      "@zxing/browser",
    ],
    imageUrl: jprefund,
    linkUrl: "https://jprefund-test.vercel.app/",
  },
  {
    title: "Kunc Store",
    description:
      "An online shop website that showcases products, authentication, search, product details, and payment. Additionally, I will add an admin dashboard.",
    tags: ["Next.Js", "Tailwind CSS"],
    imageUrl: store,
    linkUrl: "https://kunc-store.vercel.app/",
  },
  {
    title: "OLShop",
    description:
      "The website for this online store showcases product details, alongside user-friendly cart, signIn and signOut functionalities and payment features seamlessly directing users to WhatsApp.",
    tags: ["Next.Js", "Tailwind CSS"],
    imageUrl: shopper,
    linkUrl: "https://olshop.vercel.app/",
  },
  {
    title: "Rent Car",
    description:
      "Showcases comprehensive car details, spanning from vehicle type, model, and year onwards. Leveraging an open-source API, it epitomizes innovation and accessibility in the automotive realm",
    tags: ["Next.Js", "Tailwind css"],
    imageUrl: rentCar,
    linkUrl: "https://car-showcase-eight-hazel.vercel.app/",
  },
  {
    title: "Kedai KopiQ",
    description:
      "This project is my first website when I was learning the basics of web programming.",
    tags: ["HTML", "CSS", "Javascript"],
    imageUrl: kopiq,
    linkUrl: "https://kopiq.vercel.app/",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Git",
  "Tailwind",
  "Prisma",
  "Framer Motion",
  "Zod",
  "Zustand",
  "Pinia",
  "Vue.js",
  "Nuxt.js",
  "Angular",
  "Bootstrap",
  "PrimeVue",
  "Shadcn UI",
  "Service Workers",
  "Internationalization (i18n)",
] as const;
