import { useParams, Link } from "react-router-dom";
import { courses } from "../mocks/courses";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((item:any) => item.id === id);

  if (!course) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>找不到该课程。</p>
        <Link to="/courses" className="text-blue-500 underline">
          返回课程列表
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Link to="/courses" className="text-blue-500 underline mb-4 inline-block">
        返回课程列表
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={course.image} alt={course.title} className="rounded-lg w-full" />

        <div>
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-pink-500 text-xl mb-4">{course.price}</p>
          <p className="text-gray-700 mb-6">{course.description}</p>

          <Link
            to="/reserve"
            className="bg-pink-500 text-white py-3 px-6 rounded-lg inline-block"
          >
            立即预约
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
