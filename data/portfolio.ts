// src/data/portfolio.ts

export const portfolioData = {
  meta: {
    title: "Muhamad Amrizal | 3D Portfolio",
    description: "Portofolio interaktif Muhamad Amrizal. Senior Creative Developer & Web Programmer.",
  },
  lobby: {
    title: "Hello There, Welcome to my website!",
    subtitle: "I am a young programmer with sufficient experience and have created several projects, for now I only focus on web applications.",
    images: {
      profile: "/foto.png",
      logo: "/logo.png"
    }
  },
  about: {
    title: "About My Self",
    details: {
      Name: "Muhamad Amrizal",
      BirthDay: "20 Agustus 1998",
      City: "Tangerang, Indonesia",
      Email: "rizalam708@gmail.com",
      LanguageProgram: "HTML, CSS, JavaScript",
      Framework: "Next.js, Vue.js, Express.js, Tailwind CSS",
      Library: "React.js, Axios, Sequelize"
    }
  },
  projects: [
    {
      id: "al-mustofa",
      title: "AL-MUSTOFA",
      description: "al-mustofa web sell",
      publishDate: "07/02/2024",
      link: "https://al-mustofa.vercel.app/",
      image: "/company.png"
    },
    {
      id: "hyundai",
      title: "Hyundai Gowa Tangerang",
      description: "Hyundai Gowa Web Sell",
      publishDate: "20/06/2023",
      link: "https://hyundai-prm.vercel.app/",
      image: "/hyundai.svg"
    },
    {
      id: "dgmall",
      title: "DGMall Syariah",
      description: "DGMall Web Help",
      publishDate: "01/01/2023",
      link: "https://dgmall.id/help",
      image: "/dgmall.png"
    },
    {
      id: "audiocare",
      title: "Audio Care",
      description: "test hearing web",
      publishDate: "30/09/2026",
      link: "https://audiocare-kappa.vercel.app/",
      image: "/audio_icon.png"
    }
  ],
  history: {
    experience: [
      {
        date: "25/02/2022 - 01/01/2024",
        company: "PT.DGP NET INTERKONTINENTAL",
        role: "Junior Front-End",
        points: ["Fix some minor bugs", "Create new feature", "Deployment project to main master"]
      }
    ],
    education: [
      {
        year: "2013-2016",
        degree: "Senior High School IPA",
        institution: "SMAN 14 Tangerang, Indonesia"
      },
      {
        year: "2016-2021",
        degree: "Bachelor of Computer Science",
        institution: "Universitas Pamulang, South Tangerang, Indonesia"
      }
    ],
    certification: [
      {
        year: "2020",
        title: "Software Development Fundamentals (Programmer)",
        issuer: "National Professional Certification Board (BNSP)",
        id: "ID 620102514400017452019"
      },
      {
        year: "2024",
        title: "Fundamentals Course",
        issuer: "Certificate of attendance for Intro to Software Engineering"
      }
    ]
  },
  footer: {
    copyright: "© 2024 Muhamad Amrizal",
    contact: "rizalam708@gmail.com"
  }
};