// src/mocks/courses.ts
export type Course = {
  id: string
  title: string
  price: string
  description: string
  image: string
}

export const courses: Course[] = [
  {
    id: "1",
    title: "K-Kardio 健身舞",
    price: "RM50/堂",
    description: "动感燃脂课程，适合所有健身水平",
    image: "/assets/k-kardio.jpg"
  },
  {
    id: "2",
    title: "Tabata 高强度训练",
    price: "RM60/堂",
    description: "短时间高效训练",
    image: "/assets/tabata.jpg"
  },
  {
    id: "3",
    title: "瑜伽课程",
    price: "RM55/堂",
    description: "提升身体柔软度与平衡感",
    image: "/assets/yoga.jpg"
  },
]
