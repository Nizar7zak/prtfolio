export interface Experience {
  id: string;
  title: string;
  /** Short name shown in the IDE list (matches design) */
  company: string;
  /** Full legal / LinkedIn company name */
  companyFull: string;
  location: string;
  country: string;
  countryFlag: string;
  website: string;
  linkedIn: string;
  /** Local logo path from company site or GitHub README assets */
  logo: string;
  stack: string[];
  period: {
    start: { month: string; year: string };
    end: { month: string; year: string } | "current";
  };
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  liveUrl: string;
  githubUrl?: string;
  description: string;
  platform: "Next.js" | "Framer" | "TypeScript" | "Three.js" | "Other";
  year: { start: number; end: number };
  /** Local card image from GitHub profile README assets */
  image: string;
  /** Real site screenshot or logo for preview when iframe is blocked */
  previewImage?: string;
  /** Centered logo preview instead of full-bleed image */
  previewMode?: "cover" | "logo";
  /** False when the live site blocks iframe embedding (X-Frame-Options) */
  iframePreview?: boolean;
}

export interface Skill {
  category: "Programming" | "Libraries/Frameworks" | "Tools/Platforms";
  level?: "Proficient" | "Experienced" | "Familiar";
  items: Array<{ name: string; proficiency?: number }>;
}

export type SkillIconId =
  | "nextjs"
  | "nodejs"
  | "aws"
  | "javascript"
  | "typescript"
  | "html"
  | "css"
  | "python"
  | "github"
  | "claude"
  | "vercel"
  | "docker"
  | "sql"
  | "react";

export interface SkillCard {
  name: string;
  proficiency: number;
  icon: SkillIconId;
}

export interface Recommendation {
  name: string;
  title: string;
  company: string;
  context: string;
  quote: string;
  linkedIn?: string;
  photo: string;
}

export interface Certification {
  year: number;
  title: string;
  credlyUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: { start: number; end: number };
  location: string;
}

// Personal info — from resume + GitHub README
export const personalInfo = {
  name: "Nezar",
  lastName: "Zakout",
  title: "AI Engineer",
  tagline: "Turning Complex Ideas into Scalable Digital Solutions",
  email: "nizar7zakout@gmail.com",
  phone: "+201004834232",
  phoneDisplay: "+20 100 483 4232",
  location: "Ismailia, Egypt",
  languages: ["English", "Deutsche", "Arabic"] as const,
  github: "https://github.com/Nizar7zak",
  githubUsername: "Nizar7zak",
  linkedin: "https://www.linkedin.com/in/nezar-zakout",
  portfolio: "https://nizar-portfolio.vercel.app",
  avatar: "/profile.jpg",
};

export type SemanticToken =
  | { kind: "text"; value: string }
  | { kind: "fn"; value: string }
  | { kind: "ty"; value: string }
  | { kind: "num"; value: string };

/** About bio with intentional syntax tokens — not auto-highlighted prose */
export const aboutBio: SemanticToken[] = [
  {
    kind: "text",
    value:
      "Being a developer isn't about focusing on tools and features, it's about solving problems that create real value for the business. I'm ",
  },
  { kind: "fn", value: "Nezar" },
  { kind: "text", value: ", a " },
  { kind: "ty", value: "Full-Stack Developer" },
  { kind: "text", value: " & " },
  { kind: "ty", value: "Certified AWS Cloud" },
  {
    kind: "text",
    value:
      ". I thrive where impact meets innovation, bringing a broad skillset and a genuine passion for solving real-world challenges. I've taught over ",
  },
  { kind: "num", value: "200" },
  {
    kind: "text",
    value:
      " students in cloud and full-stack software engineering, and I have hands-on experience scaling applications with ",
  },
  { kind: "ty", value: "React" },
  { kind: "text", value: ", " },
  { kind: "ty", value: "Next.js" },
  { kind: "text", value: ", " },
  { kind: "ty", value: "Node.js" },
  { kind: "text", value: ", and " },
  { kind: "ty", value: "AWS" },
  {
    kind: "text",
    value:
      ". Whether it's automating systems or mentoring the next generation of developers, I'm driven by efficiency, lifelong learning, and imagination.",
  },
];

// Experience — from resume + GitHub README timeline (Nizar7zak/Nizar7zak)
export const experiences: Experience[] = [
  {
    id: "bayzat",
    title: "AI Engineer",
    company: "Bayzat",
    companyFull: "Bayzat",
    location: "Remote · Dubai, UAE",
    country: "UAE",
    countryFlag: "🇦🇪",
    website: "https://www.bayzat.com/",
    linkedIn: "https://www.linkedin.com/company/bayzat/",
    logo: "/assets/experience/bayzat.svg",
    stack: ["Next.js", "TypeScript", "AI"],
    period: {
      start: { month: "September", year: "2025" },
      end: "current",
    },
    bullets: [
      "Built and maintained full-stack features using Next.js and React for Bayzat's work-life platform, delivering scalable and performant user-facing modules.",
      "Collaborated across the stack, from REST API design and database integration on the backend to component architecture and state management on the frontend.",
      "Improved code quality and developer experience by refactoring legacy modules, introducing reusable component patterns, and enforcing consistent TypeScript practices.",
    ],
  },
  {
    id: "metachain",
    title: "AI Engineer",
    company: "Metachain",
    companyFull: "Metachain",
    location: "Remote · Egypt",
    country: "Egypt",
    countryFlag: "🇪🇬",
    website: "https://www.evnno.com/",
    linkedIn: "https://www.linkedin.com/company/m3tachain/",
    logo: "/assets/experience/metachain.png",
    stack: ["SaaS", "OpenAI", "AWS"],
    period: {
      start: { month: "May", year: "2024" },
      end: { month: "August", year: "2025" },
    },
    bullets: [
      "Built evnno — AI landing page platform for freelancers (Next.js, Stripe, Vercel, AI generation).",
      "Built Dozny — AI campaign and creative platform for creators (Next.js, OpenAI, AWS, Stripe).",
      "Full-stack ownership: frontend, backend, database, and production deployments.",
    ],
  },
  {
    id: "all-tech",
    title: "AR Developer",
    company: "All-Tech",
    companyFull: "A-LL Creative Technology",
    location: "Fribourg, Switzerland",
    country: "Switzerland",
    countryFlag: "🇨🇭",
    website: "https://a-ll.tech/",
    linkedIn: "https://www.linkedin.com/company/a-ll-creative-technology/",
    logo: "/assets/experience/all-tech.svg",
    stack: ["Web AR", "Three.js", "Swift"],
    period: {
      start: { month: "April", year: "2023" },
      end: { month: "October", year: "2023" },
    },
    bullets: [
      "Developed multiple AR environments with 8thWall for Swiss events, including museum showcases.",
      "Investigated a solution for AR from scratch using React Three Fiber, enabling the team to avoid 8thWall costs.",
      "Built a native solution using Swift and App Clip to address iOS limitations where React Three Fiber does not support AR.",
    ],
  },
  {
    id: "gsg",
    title: "AWS Credited Instructor",
    company: "Gaza Sky Geeks",
    companyFull: "Gaza Sky Geeks",
    location: "Gaza, Palestine",
    country: "Palestine",
    countryFlag: "🇵🇸",
    website: "https://gazaskygeeks.com/",
    linkedIn: "https://www.linkedin.com/company/gaza-sky-geeks/",
    logo: "/assets/experience/gsg.png",
    stack: ["AWS", "React", "Teaching"],
    period: {
      start: { month: "March", year: "2022" },
      end: { month: "October", year: "2023" },
    },
    bullets: [
      "Instructed over 150 students in AWS Cloud Computing, facilitating their preparation for the AWS Cloud Practitioner certification.",
      "Taught full-stack web development focusing on React for the front end and Express.js for the back end, emphasizing teamwork and collaborative project participation.",
      "Mentored junior developers and guided learners through their tech careers.",
    ],
  },
];

// Projects — card images from github.com/Nizar7zak/Nizar7zak assets/cards
export const projects: Project[] = [
  {
    id: "emergency-committee",
    name: "Emergency Committee",
    liveUrl: "https://www.gazauniversities.org",
    githubUrl: "https://github.com/Nizar7zak/Emergency-Committee",
    description:
      "Unified platform for Gaza's university emergency committee. Coordinates international support, updates, priorities, and research portal for higher education in Gaza.",
    platform: "Next.js",
    year: { start: 2024, end: 2024 },
    image: "/assets/cards/gaza-committee.png",
  },
  {
    id: "herfa",
    name: "Herfa",
    liveUrl: "https://herfa-ymtv.vercel.app",
    githubUrl: "https://github.com/Nizar7zak/herfa",
    description:
      "Creative startup website for the Saudi market. Elegant scroll-based layout with smooth section reveals. Built with Next.js and React.",
    platform: "Next.js",
    year: { start: 2024, end: 2024 },
    image: "/assets/cards/herfa.png",
  },
  {
    id: "4co",
    name: "4co",
    liveUrl: "https://www.4co.sa",
    githubUrl: "https://github.com/Nizar7zak/4co",
    description:
      "Integrated events and marketing agency site. Exhibitions, conferences, event management, and production services. Bilingual EN/AR.",
    platform: "Next.js",
    year: { start: 2024, end: 2024 },
    image: "/assets/cards/4co.png",
  },
  {
    id: "iminds",
    name: "iMinds",
    liveUrl: "https://www.iminds.sa",
    description: "Saudi business marketing site built on Framer.",
    platform: "Framer",
    year: { start: 2024, end: 2024 },
    image: "/assets/cards/iminds.png",
  },
  {
    id: "cons",
    name: "Cons",
    liveUrl: "https://www.cons.sa",
    description: "Saudi business marketing site built on Framer.",
    platform: "Framer",
    year: { start: 2024, end: 2024 },
    image: "/assets/cards/cons.png",
  },
  {
    id: "azr",
    name: "AZR",
    liveUrl: "https://azr-brown.vercel.app",
    githubUrl: "https://github.com/Nizar7zak/azr",
    description:
      "Corporate website with contact forms, Google Maps integration, and admin dashboard. Built with Next.js.",
    platform: "Next.js",
    year: { start: 2024, end: 2024 },
    image: "/assets/cards/azr.png",
  },
  {
    id: "saqeefa",
    name: "Saqeefa",
    liveUrl: "https://saqeefa-ch26.com",
    githubUrl: "https://github.com/Nizar7zak/saqeefa-ch26",
    description:
      "Saqeefa Summer Festival 2026 — Chapter 26 B2B sponsorship landing page and lead capture.",
    platform: "Next.js",
    year: { start: 2025, end: 2025 },
    image: "/assets/cards/saqeefa.png",
  },
  {
    id: "loi",
    name: "LOI",
    liveUrl: "https://www.loi.sa",
    githubUrl: "https://github.com/Nizar7zak/Loi",
    description:
      "LOI Legal Services. Saudi law firm site with services, competencies, blog, and super-admin dashboard. Bilingual EN/AR.",
    platform: "Next.js",
    year: { start: 2024, end: 2024 },
    image: "/assets/cards/loi.png",
  },
  {
    id: "evnno",
    name: "evnno",
    liveUrl: "https://www.evnno.com",
    githubUrl: "https://github.com/GigGenZ/Evnno",
    description:
      "AI landing page platform. Turns business data into paid landing pages for freelancers. Next.js, Stripe, Vercel deploys, AI generation.",
    platform: "Next.js",
    year: { start: 2024, end: 2025 },
    image: "/assets/cards/evnno.png",
    previewImage: "/assets/previews/evnno-logo.png",
    previewMode: "logo",
    iframePreview: false,
  },
  {
    id: "dozny",
    name: "Dozny",
    liveUrl: "https://www.dozny.com",
    githubUrl: "https://github.com/GigGenZ/Nano",
    description:
      "AI campaign and creative platform for creators selling to clients. Share a board, get paid, deliver the full pack.",
    platform: "Next.js",
    year: { start: 2024, end: 2025 },
    image: "/assets/cards/dozny.png",
    previewImage: "/assets/previews/dozny-logo.svg",
    previewMode: "logo",
    iframePreview: false,
  },
  {
    id: "bouncegame",
    name: "BounceGame",
    liveUrl: "https://bounce-game-roan.vercel.app",
    githubUrl: "https://github.com/Nizar7zak/BounceGame",
    description: "Interactive bounce game web app.",
    platform: "Three.js",
    year: { start: 2023, end: 2023 },
    image: "/assets/cards/bouncegame.png",
  },
  {
    id: "gamehub",
    name: "GameHub",
    liveUrl: "https://game-hub-zeta-lilac-15.vercel.app",
    githubUrl: "https://github.com/Nizar7zak/gameHub",
    description:
      "Modern responsive gaming web app. Pulls from RAWG API to showcase popular, upcoming, and new video games.",
    platform: "TypeScript",
    year: { start: 2023, end: 2023 },
    image: "/assets/cards/gamehub.png",
  },
];

// Recommendations — full text from LinkedIn (nezar-zakout/details/recommendations)
// Photos from GitHub profile README assets/testimonials
export const recommendationsLinkedInUrl =
  "https://www.linkedin.com/in/nezar-zakout/details/recommendations/";

export const recommendations: Recommendation[] = [
  {
    name: "Ahmed Abdelrahman",
    title: "Chief Technology Officer (CTO)",
    company: "Bayzat",
    context: "My CTO at Bayzat — LinkedIn recommendation",
    quote:
      "Nezar is one of the most talented and optimistic engineer I worked with. He has a can-do attitude and never shy from jumping into the waters and learning and doing new things. He is always a head of the curve with an outstanding people skills and technical knowledge. We are very lucky to have Nezar in the team and looking forward to achieving great things together",
    linkedIn: "https://www.linkedin.com/in/aabdelrahmanm/",
    photo: "/assets/testimonials/ahmed-abdelrahman.jpg",
  },
  {
    name: "Tom Duggan",
    title: "Senior Software Engineer",
    company: "Anduril Industries",
    context: "Mentor",
    quote:
      "I've been mentoring Nizar for two months and he's shown a drive to learn new technologies and apply them to real-world problems. Additionally, Nizar shows great initiative with his team and seeks to lift his colleagues up as he learns new tools. Nizar is committed to self-improvement in his coding journey, is thoughtful and pragmatic in how he spends his coding time, and asks the right questions.",
    linkedIn: "https://www.linkedin.com/in/tomduggan85/",
    photo: "/assets/testimonials/tom-duggan.jpg",
  },
  {
    name: "Laurent Rime",
    title: "CEO",
    company: "A-LL Creative Technology",
    context: "Supervisor during internship (Web AR / Swift)",
    quote:
      "I am thrilled to compose this glowing recommendation letter for Nezar, who served as an intern at A-LL Creative Technology for a duration of four months. Throughout his internship, Nezar demonstrated exceptional dedication, enthusiasm, and an impressive ability to research and develop in the Web AR domain.\n\nAs an intern, Nezar's main responsibility was to delve into the exciting world of Augmented Reality and become proficient in Swift programming language from the ground up. I am delighted to confirm that he not only accomplished this task but also surpassed our expectations with his rapid progress and innovative thinking.\n\nDuring his time at A-LL Creative Technology, Nezar exhibited an eagerness to embrace new challenges. He consistently exhibited a passion for learning and displayed a remarkable ability to absorb complex concepts quickly.\n\nIn summary, I wholeheartedly and without reservation recommend Nezar for any future endeavors. I have no doubt that he will continue to excel and make significant contributions in any field that are proposed to him.",
    linkedIn: "https://www.linkedin.com/in/laurent-rime-31714b16/",
    photo: "/assets/testimonials/laurent-rime.jpg",
  },
];

// Education
export const education: Education[] = [
  {
    degree: "Bachelor's in Engineering",
    institution: "University of Palestine",
    period: { start: 2013, end: 2018 },
    location: "Palestine",
  },
  {
    degree: "Web Development Diploma",
    institution: "Gaza Sky Geeks (Code Academy)",
    period: { start: 2021, end: 2021 },
    location: "Palestine",
  },
];

// Certifications
export const certifications: Certification[] = [
  {
    year: 2023,
    title: "AWS Certified Developer – Associate",
    credlyUrl:
      "https://credly.com/badges/6035d571-3bfd-42b3-bce7-bf5b8e37ae32",
  },
  {
    year: 2022,
    title: "AWS Certified Cloud Practitioner",
    credlyUrl:
      "https://credly.com/badges/787ad5b5-cea7-4c0f-84db-a804a7e123a2",
  },
  {
    year: 2022,
    title: "AWS Certified Solutions Architect – Associate",
    credlyUrl:
      "https://credly.com/badges/86e4acda-da36-4c17-ad5a-3e004e38d257/public_url",
  },
  {
    year: 2022,
    title: "AWS re/Start Accredited Instructor",
    credlyUrl:
      "https://credly.com/badges/8bd81c16-646e-430b-bdfe-1af02fe9a2f1/linked_in_profile",
  },
];

// Skills grid — matches portfolio design mock
export const skillCards: SkillCard[] = [
  { name: "Next.js", proficiency: 95, icon: "nextjs" },
  { name: "Node.js", proficiency: 90, icon: "nodejs" },
  { name: "AWS", proficiency: 88, icon: "aws" },
  { name: "JavaScript", proficiency: 70, icon: "javascript" },
  { name: "TypeScript", proficiency: 80, icon: "typescript" },
  { name: "HTML", proficiency: 99, icon: "html" },
  { name: "CSS", proficiency: 98, icon: "css" },
  { name: "Python", proficiency: 95, icon: "python" },
  { name: "GitHub", proficiency: 95, icon: "github" },
  { name: "Claude", proficiency: 95, icon: "claude" },
  { name: "Vercel", proficiency: 95, icon: "vercel" },
  { name: "Docker", proficiency: 95, icon: "docker" },
  { name: "SQL", proficiency: 95, icon: "sql" },
  { name: "React", proficiency: 95, icon: "react" },
];

// Legacy grouped skills (reference)
export const skills: Skill[] = [
  {
    category: "Programming",
    items: [
      { name: "JavaScript", proficiency: 95 },
      { name: "TypeScript", proficiency: 88 },
      { name: "HTML", proficiency: 99 },
      { name: "CSS", proficiency: 98 },
      { name: "SQL", proficiency: 85 },
    ],
  },
  {
    category: "Libraries/Frameworks",
    items: [
      { name: "React.js", proficiency: 95 },
      { name: "Next.js", proficiency: 95 },
      { name: "Node.js", proficiency: 90 },
      { name: "Express.js", proficiency: 85 },
      { name: "React Three Fiber", proficiency: 80 },
      { name: "Three.js", proficiency: 80 },
      { name: "Zustand", proficiency: 90 },
      { name: "Redux", proficiency: 85 },
      { name: "React Query", proficiency: 85 },
    ],
  },
  {
    category: "Tools/Platforms",
    items: [
      { name: "AWS", proficiency: 88 },
      { name: "Git/GitHub", proficiency: 95 },
      { name: "GitHub Actions", proficiency: 90 },
      { name: "Docker", proficiency: 85 },
      { name: "Vercel", proficiency: 95 },
      { name: "Framer", proficiency: 80 },
      { name: "Claude", proficiency: 90 },
    ],
  },
];
