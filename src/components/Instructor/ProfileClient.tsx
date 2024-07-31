import { useState } from "react";
import { Button } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import useDetailUser from "../../hooks/user/useDetailUser";

const ProfileClient: React.FC<{
  courseId: string | undefined;
  userId: string;
}> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<"about" | "courses">("about");
  const { user } = useDetailUser(userId);

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-gray-800 p-6 text-white">
        <div className="flex flex-wrap">
          <div className="mb-6 w-full pr-0 lg:mb-0 lg:w-1/2 lg:pr-6">
            <div className="flex flex-col items-center">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="mb-4 h-32 w-32 rounded-full"
              />
              <h1 className="mb-2 text-3xl font-bold">{user?.name}</h1>
              <p className="mb-4 text-xl">{user?.description}</p>
            </div>
            <div className="flex justify-between rounded-lg bg-gray-700 p-4">
              {/* {Object.entries(instructor.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-lg font-bold">
                          {value.toLocaleString()}
                        </p>
                        <p className="text-xs">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                      </div>
                    ))} */}
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center pl-0 lg:w-1/2 lg:pl-6">
            <div className="mb-6 flex justify-center">
              <div className="flex space-x-4">
                <InstagramOutlined className="text-2xl" />
                <FacebookOutlined className="text-2xl" />
                <LinkedinOutlined className="text-2xl" />
                <YoutubeOutlined className="text-2xl" />
                <TwitterOutlined className="text-2xl" />
              </div>
            </div>
            <div className="mb-6 flex justify-center space-x-4">
              <Button type="primary" danger size="large" className="w-32">
                Subscribe
              </Button>
              <Button
                size="large"
                className="w-32 border-white bg-gray-600 text-white hover:bg-gray-700"
              >
                Report
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex">
          <button
            className={`mr-4 pb-2 text-lg ${activeTab === "about" ? "border-b-2 border-red-500 font-bold" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={`pb-2 text-lg ${activeTab === "courses" ? "border-b-2 border-red-500 font-bold" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
        </div>
        {activeTab === "about" && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Detailed Information</h2>
            <p className="text-lg">{user?.description}</p>
            {/* Add more detailed information here */}
          </div>
        )}
        {activeTab === "courses" && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">My Courses</h2>
            {/* Add course list or grid here */}
            <p className="text-lg">List of courses goes here...</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileClient;
