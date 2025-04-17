import { Link } from "react-router-dom";
import { courses } from "../mocks/courses";

const Courses = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">课程介绍</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((item:any) => (
          <Link
            key={item.id}
            to={`/courses/${item.id}`}
            className="border rounded-lg overflow-hidden shadow hover:scale-105 transition"
          >
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-pink-500">{item.price}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
