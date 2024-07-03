import { ReactNode } from "react";

export type SiderContextType = {
  collapsed: boolean;
  toggleSider: () => void;
};

export type User = {
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
  setUser: (user: User) => void;
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
    title: String;
    description: String;
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

export type Course = {
  id: string;
  courseName: string;
  categoryName: string;
  instructorName: string;
  image: string;
  price: number;
};

export type SignUpPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type SignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type ExtendedJwtPayload = {
  email: string;
  name: string;
  role: string;
  picture: string;
};
