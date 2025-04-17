import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">be studio 健身 · 舞蹈 · 美丽</h1>
          <p className="text-gray-500 mb-6">为你的健康与美丽赋能</p>
          <img src="/assets/banner.jpg" alt="banner" className="mx-auto rounded-lg" />
        </div>
      </section>

      {/* 快速入口 */}
      <section className="py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/reserve" className="bg-pink-500 text-white py-6 rounded-lg text-center">
            预约课程
          </Link>
          <Link to="/courses" className="bg-purple-500 text-white py-6 rounded-lg text-center">
            查看课程
          </Link>
          <Link to="/account" className="bg-blue-500 text-white py-6 rounded-lg text-center">
            我的账户
          </Link>
        </div>
      </section>

      {/* be studio 简介 */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">关于 be studio</h2>
          <p className="text-gray-600">
            我们致力于打造舒适的健身、美容、舞蹈课程空间，为每一位客户提供最好的服务体验。
          </p>
        </div>
      </section>

      {/* 图片展示 */}
      <section className="py-10">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-2">
          <img src="/assets/env1.jpg" alt="env" className="rounded-lg" />
          <img src="/assets/env2.jpg" alt="env" className="rounded-lg" />
          <img src="/assets/env3.jpg" alt="env" className="rounded-lg" />
          <img src="/assets/env4.jpg" alt="env" className="rounded-lg" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 be studio 版权所有
      </footer>
    </div>
  );
};

export default Home;
