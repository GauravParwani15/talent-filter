
export interface User {
  id: string;
  email: string;
  role: 'talent' | 'recruiter' | 'admin';
}

export interface Skill {
  name: string;
  years: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  technologies: string[];
}

export interface TalentProfile {
  id: string;
  userId: string;
  fullName: string;
  headline: string;
  skills: Skill[];
  totalYearsOfExperience: number;
  location: string;
  availability: 'full-time' | 'part-time' | 'contract' | 'freelance';
  expectedCompensation?: string;
  contactInfo: {
    email: string;
    phone?: string;
    linkedinUrl?: string;
    githubUrl?: string;
  };
  projects: Project[];
  avatar?: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface RecruiterProfile {
  userId: string;
  companyName: string;
  bookmarkedProfiles: string[];
}

export interface SearchFilters {
  location?: string;
  availability?: string;
  experienceMin?: number;
  experienceMax?: number;
}
