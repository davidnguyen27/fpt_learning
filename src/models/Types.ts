import { ReactNode } from "react";

export type SiderContextType = {
  collapsed: boolean;
  toggleSider: () => void;
};

export type User = {
  id: string;
  email: string;
  password: string;
  role: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  registrationDate: string;
  image: string;
  status: boolean;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type SiderProviderProps = {
  children: ReactNode;
};

export type HelpSubTabProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export type CourseBoxProps = {
  courseData: {
    id: string;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  categoryId: string;
  price: string;
  students: string[];
  instructor: string;
  };
};

export type CourseSubTabProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  courseData: {
    content: string[];
  };
};

export type CourseHelpProps = {
  helpData: {
    title: String;
  };
};

export type HelpCardProps = {
  iconClass: string;
  title: string;
  description: string;
};

export type InstructorChannelProps = {
  instructor: string;
  students: number;
  likes: number;
  dislikes: number;
  shares: number;
};

export type SocialMedias = {
  github: string;
  facebook: string;
};

export type StudentProfileData = {
  title: string;
  description: string;
  avatarUrl: string;
  dateOfBirth: string;
  address: string;
  socialMedias: SocialMedias;
};

export interface Category {
  categoryId: string;
  name: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  categoryId: string;
  price: string;
  students: string[];
  instructor: string;
}