import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import kopiq from '@/public/kopiQ.png';
import word from '@/public/data.png';
import excel from '@/public/excel5.png';
import dashboard from '@/public/dashboard.png';
import webImg from '@/public/web.png';
import webPortfolio from '@/public/webPortfolio.png';
import rentCar from '@/public/rentCar.png';
import shopper from @/public/shopper.png;

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Skills',
    hash: '#skills',
  },
  // {
  //   name: 'Experience',
  //   hash: '#experience',
  // },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const;

export const experiencesData = [
  {
    title: 'Graduated bootcamp',
    location: 'Miami, FL',
    description: 'I graduated after 6 months of studying. I immediately found a job as a front-end developer.',
    icon: React.createElement(LuGraduationCap),
    date: '2019',
  },
  {
    title: 'Front-End Developer',
    location: 'Orlando, FL',
    description: 'I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.',
    icon: React.createElement(CgWorkAlt),
    date: '2019 - 2021',
  },
  {
    title: 'Full-Stack Developer',
    location: 'Houston, TX',
    description: "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: '2021 - present',
  },
] as const;

export const projectsData = [
  // {
  //   title: 'Data Processing',
  //   description: 'Processing research data on the influence of adding cinnamon powder doses on the growth of tiger grouper fish, January 2023.',
  //   tags: ['Microsoft Excel'],
  //   imageUrl: excel,
  //   linkUrl: '/',
  // },
  // {
  //   title: 'Shrimp Breeding Report',
  //   description: 'Creating a Report on the Results of Giant Prawn Breeding during the Internship at BRPI Subang, West Java, January 2022.',
  //   tags: ['Microsoft Word'],
  //   imageUrl: word,
  //   linkUrl: '/',
  // },
  {
    title: 'OLShop',
    description: 'The website for this online store showcases product details, alongside user-friendly cart and payment features seamlessly directing users to WhatsApp. Furthermore, it also includes signIn and signOut functionalities.',
    tags: ['Next.Js', 'Tailwind CSS', 'Firebase'],
    imageUrl: shopper,
    linkUrl: 'https://olshop.vercel.app/',
  },
  {
    title: 'Rent Car',
    description: 'This website exclusively showcases comprehensive car details, spanning from vehicle type, model, and year onwards. Leveraging an open-source API, it epitomizes innovation and accessibility in the automotive realm',
    tags: ['Typescript', 'Next.Js', 'Tailwind'],
    imageUrl: rentCar,
    linkUrl: 'https://car-showcase-eight-hazel.vercel.app/',
  },
  {
    title: 'Web Animelist',
    description: 'Project ini merupakan project frontend web development pertama saya walaupun belum sempurna tapi setidaknya saya sudah cukup memahami tugas frontend web developer',
    tags: ['React', 'Next.js', 'Tailwind'],
    imageUrl: webImg,
    linkUrl: 'https://animelistbgs.vercel.app/',
  },
  {
    title: 'Kedai KopiQ',
    description: 'This project is my first website when I was learning the basics of web programming.',
    tags: ['HTML', 'CSS', 'Javascript'],
    imageUrl: kopiq,
    linkUrl: 'https://kopiq.vercel.app/',
  },
  {
    title: 'Responsive Dashboard',
    description: 'I created a responsive dashboard project to sharpen my basic skills in HTML, CSS, and JavaScript. Although this project is not yet perfect, at least I have a good understanding of layouting.',
    tags: ['HTML', 'CSS', 'Javascript'],
    imageUrl: dashboard,
    linkUrl: 'https://dashboard1-xi.vercel.app/',
  },
  {
    title: 'Web Portfolio',
    description: 'I crafted an simple web portfolio utilizing HTML, CSS, and JavaScript. My learning journey was guided by insightful video tutorials available on YouTube.',
    tags: ['HTML', 'CSS', 'Javascript'],
    imageUrl: webPortfolio,
    linkUrl: 'https://web-psmpl.vercel.app/',
  },
  
] as const;

export const skillsData = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  // 'Node.js',
  'Git',
  'Tailwind',
  'Prisma',
  // 'MongoDB',
  // 'Redux',
  // 'GraphQL',
  // 'Apollo',
  // 'Express',
  // 'PostgreSQL',
  // 'Python',
  // 'Django',
  'Framer Motion',
  'Microsoft Word',
  'Microsoft Excel',
  'Corel Draw',
  'Affinity Designer',
] as const;
