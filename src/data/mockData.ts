
import { TalentProfile } from '../types';

export const mockProfiles: TalentProfile[] = [
  {
    id: "1",
    userId: "user1",
    fullName: "Alex Morgan",
    headline: "Full-stack Developer specializing in React and Node.js",
    skills: [
      { name: "React", years: 4 },
      { name: "TypeScript", years: 3 },
      { name: "Node.js", years: 5 },
      { name: "GraphQL", years: 2 },
      { name: "MongoDB", years: 4 }
    ],
    totalYearsOfExperience: 5,
    location: "San Francisco, CA",
    availability: "full-time",
    expectedCompensation: "$120,000 - $150,000",
    contactInfo: {
      email: "alex.morgan@example.com",
      phone: "+1 (555) 123-4567",
      linkedinUrl: "https://linkedin.com/in/alexmorgan",
      githubUrl: "https://github.com/alexmorgan"
    },
    projects: [
      {
        id: "p1",
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB",
        url: "https://github.com/alexmorgan/ecommerce",
        technologies: ["React", "Node.js", "MongoDB", "Express"]
      },
      {
        id: "p2",
        title: "Task Management App",
        description: "Developed a real-time task management application with React and Firebase",
        url: "https://taskapp.example.com",
        technologies: ["React", "Firebase", "Tailwind CSS"]
      }
    ],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dateCreated: "2023-01-15T00:00:00Z",
    dateUpdated: "2023-06-20T00:00:00Z"
  },
  {
    id: "2",
    userId: "user2",
    fullName: "Sam Taylor",
    headline: "Frontend Developer with expertise in UI/UX design",
    skills: [
      { name: "React", years: 3 },
      { name: "JavaScript", years: 5 },
      { name: "CSS/SCSS", years: 6 },
      { name: "Figma", years: 3 },
      { name: "Next.js", years: 2 }
    ],
    totalYearsOfExperience: 6,
    location: "New York, NY",
    availability: "contract",
    expectedCompensation: "$90 - $110 per hour",
    contactInfo: {
      email: "sam.taylor@example.com",
      linkedinUrl: "https://linkedin.com/in/samtaylor",
      githubUrl: "https://github.com/samtaylor"
    },
    projects: [
      {
        id: "p3",
        title: "Finance Dashboard",
        description: "Designed and implemented a finance analytics dashboard with complex data visualizations",
        url: "https://dashboard.example.com",
        technologies: ["React", "D3.js", "Tailwind CSS"]
      }
    ],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dateCreated: "2023-02-10T00:00:00Z",
    dateUpdated: "2023-07-05T00:00:00Z"
  },
  {
    id: "3",
    userId: "user3",
    fullName: "Jordan Lee",
    headline: "Senior Backend Engineer with focus on scalable systems",
    skills: [
      { name: "Go", years: 4 },
      { name: "Java", years: 7 },
      { name: "AWS", years: 5 },
      { name: "Kubernetes", years: 3 },
      { name: "PostgreSQL", years: 6 }
    ],
    totalYearsOfExperience: 8,
    location: "Seattle, WA",
    availability: "full-time",
    expectedCompensation: "$160,000 - $190,000",
    contactInfo: {
      email: "jordan.lee@example.com",
      phone: "+1 (555) 987-6543",
      linkedinUrl: "https://linkedin.com/in/jordanlee",
      githubUrl: "https://github.com/jordanlee"
    },
    projects: [
      {
        id: "p4",
        title: "Distributed Data Processing System",
        description: "Architected and implemented a high-throughput data processing system handling millions of events per minute",
        technologies: ["Go", "Kafka", "AWS", "Kubernetes"]
      },
      {
        id: "p5",
        title: "API Gateway",
        description: "Developed a custom API gateway for microservices architecture",
        url: "https://github.com/jordanlee/apigateway",
        technologies: ["Java", "Spring Boot", "Docker"]
      }
    ],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dateCreated: "2022-11-05T00:00:00Z",
    dateUpdated: "2023-08-15T00:00:00Z"
  },
  {
    id: "4",
    userId: "user4",
    fullName: "Taylor Johnson",
    headline: "Machine Learning Engineer with computer vision expertise",
    skills: [
      { name: "Python", years: 5 },
      { name: "TensorFlow", years: 3 },
      { name: "PyTorch", years: 2 },
      { name: "Computer Vision", years: 4 },
      { name: "MLOps", years: 1 }
    ],
    totalYearsOfExperience: 5,
    location: "Boston, MA",
    availability: "part-time",
    expectedCompensation: "$140,000 - $160,000 (full-time equivalent)",
    contactInfo: {
      email: "taylor.johnson@example.com",
      linkedinUrl: "https://linkedin.com/in/taylorjohnson"
    },
    projects: [
      {
        id: "p6",
        title: "Object Detection System",
        description: "Built a real-time object detection system for retail environments",
        technologies: ["Python", "TensorFlow", "OpenCV"]
      },
      {
        id: "p7",
        title: "Medical Image Analysis",
        description: "Developed deep learning models for medical image analysis to assist diagnoses",
        url: "https://medicalai.example.org",
        technologies: ["Python", "PyTorch", "DICOM"]
      }
    ],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dateCreated: "2023-03-22T00:00:00Z",
    dateUpdated: "2023-07-30T00:00:00Z"
  },
  {
    id: "5",
    userId: "user5",
    fullName: "Casey Rivera",
    headline: "DevOps Engineer specializing in cloud infrastructure",
    skills: [
      { name: "AWS", years: 6 },
      { name: "Terraform", years: 4 },
      { name: "Docker", years: 5 },
      { name: "Kubernetes", years: 3 },
      { name: "CI/CD", years: 5 }
    ],
    totalYearsOfExperience: 7,
    location: "Austin, TX",
    availability: "freelance",
    expectedCompensation: "$120 - $150 per hour",
    contactInfo: {
      email: "casey.rivera@example.com",
      phone: "+1 (555) 456-7890",
      githubUrl: "https://github.com/caseyrivera"
    },
    projects: [
      {
        id: "p8",
        title: "Cloud Migration",
        description: "Led migration of legacy infrastructure to AWS for a financial services company",
        technologies: ["AWS", "Terraform", "Docker", "Python"]
      },
      {
        id: "p9",
        title: "CI/CD Pipeline Automation",
        description: "Designed and implemented automated deployment pipelines for microservices architecture",
        url: "https://github.com/caseyrivera/cicd-templates",
        technologies: ["GitHub Actions", "AWS CodePipeline", "Kubernetes"]
      }
    ],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dateCreated: "2023-01-08T00:00:00Z",
    dateUpdated: "2023-08-01T00:00:00Z"
  },
  {
    id: "6",
    userId: "user6",
    fullName: "Morgan Campbell",
    headline: "Mobile App Developer with iOS and Android experience",
    skills: [
      { name: "Swift", years: 4 },
      { name: "Kotlin", years: 3 },
      { name: "React Native", years: 2 },
      { name: "Firebase", years: 3 },
      { name: "UI/UX Design", years: 2 }
    ],
    totalYearsOfExperience: 5,
    location: "Portland, OR",
    availability: "full-time",
    expectedCompensation: "$130,000 - $155,000",
    contactInfo: {
      email: "morgan.campbell@example.com",
      linkedinUrl: "https://linkedin.com/in/morgancampbell",
      githubUrl: "https://github.com/morgancampbell"
    },
    projects: [
      {
        id: "p10",
        title: "Health & Fitness App",
        description: "Developed a cross-platform fitness tracking app with social features",
        url: "https://fitapp.example.com",
        technologies: ["React Native", "Firebase", "Redux"]
      },
      {
        id: "p11",
        title: "Augmented Reality Shopping",
        description: "Created an iOS app allowing users to visualize products in their space using AR",
        technologies: ["Swift", "ARKit", "SceneKit"]
      }
    ],
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    dateCreated: "2023-02-28T00:00:00Z",
    dateUpdated: "2023-06-15T00:00:00Z"
  }
];

// Tags for skills categorization
export const skillCategories = [
  "Frontend", "Backend", "Mobile", "DevOps", 
  "Data Science", "Design", "Database", "Cloud",
  "Programming Languages", "Frameworks", "Tools"
];

// Locations for filters
export const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Seattle, WA",
  "Austin, TX",
  "Boston, MA",
  "Portland, OR",
  "Chicago, IL",
  "Los Angeles, CA",
  "Denver, CO",
  "Atlanta, GA",
  "Remote"
];

// Availability options
export const availabilityOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" }
];
