// src/mock/mockCourses.ts

export interface Course {
  id: string;
  name: string;
  price: number;
  capacity: number;
  instructor: string;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  startDate: string; // "YYYY-MM-DD"
  location: string;
  tags: string[];
  description: string;
  bookedCount: number;
  difficulty: number; // 1
  image: string; 
}

export const mockCourses: Course[] = [
  {
    id: "course-001",
    name: "K-Kardio",
    price: 12,
    capacity: 20,
    instructor: "Ivy Tan",
    startTime: "18:00",
    endTime: "19:00",
    startDate: "2025-04-20",
    location: "Studio A",
    tags: ["有氧", "舞蹈", "高强度"],
    description: "K-Kardio 是一项结合了有氧运动和舞蹈元素的课程，旨在提高心肺耐力和全身肌肉力量。课程中将使用多种音乐风格，带来愉悦的锻炼体验。",
    bookedCount: 12,
    difficulty: 3,
    image: "./assets/gallery1.jpg"
  },
  {
    id: "course-002",
    name: "Yin Yoga",
    price: 12,
    capacity: 15,
    instructor: "Jason Lim",
    startTime: "19:30",
    endTime: "20:30",
    startDate: "2025-04-20",
    location: "Studio B",
    tags: ["放松", "伸展", "柔软度"],
    description: "Yin Yoga 是一种静态的瑜伽风格，专注于深层组织和关节的拉伸。课程中将使用长时间保持的姿势，帮助提升身体的柔韧性和放松身心。",
    bookedCount: 8,
    difficulty: 2,
    image: "./assets/gallery2.jpg"
  },
  {
    id: "course-003",
    name: "Zumba",
    price: 12,
    capacity: 25,
    instructor: "Carmen Lee",
    startTime: "17:00",
    endTime: "18:00",
    startDate: "2025-04-21",
    location: "Studio A",
    tags: ["舞蹈", "有趣", "燃脂"],
    description: "Zumba 是一种融合了舞蹈和有氧运动的课程，旨在提高身体的动力和身体的燃烧率。课程中将使用多种音乐风格，带来狂欢的舞蹈体验。",
    bookedCount: 22,
    difficulty: 3,
    image: "./assets/gallery3.jpg"
  },
];
