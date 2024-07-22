import React, { useEffect } from "react";
import StudentCourseCard from "./StudentCourseCard";
import { Button, Form, Input, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getUserDetail, updateUser } from "../../services/usersService";
import { formatDate } from "../../utils/formatDate";
import { UserData } from "../../models/Types";

interface StudentProfileSubTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StudentProfileSubTab: React.FC<StudentProfileSubTabProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [form] = Form.useForm();
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = storedUser?.data?._id;

  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (userId && token) {
        const userData = await getUserDetail(userId, token);

        if (userData?.dob) {
          userData.dob = formatDate(userData.dob.toString());
        }

        form.setFieldsValue(userData);
      } else {
        console.error("User data or token is missing in sessionStorage");
      }
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [form, userId]);

  const handleUpdate = async (values: Partial<UserData>) => {
    try {
      await updateUser(userId, values);
      notification.success({
        message: "Success",
        description: "User profile updated successfully",
      });

      // Fetch lại dữ liệu người dùng sau khi cập nhật thành công
      await fetchUserData();
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };

  const AboutTabContent = () => (
    <div className="p-3">
      <h1 className="text-2xl font-semibold">Your profile</h1>
      <Form
        form={form}
        className="mt-8"
        layout="horizontal"
        labelCol={{ span: 2 }}
        onFinish={handleUpdate}
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item name="dob" label="Date of Birth">
          <Input type="date" size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input size="large" placeholder="email@example.com" />
        </Form.Item>
        <Form.Item name="phone_number" label="Phone">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="video" label="Video">
          <Input size="large" placeholder="https://youtube.com" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} size="large" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit" className="float-right mt-6">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const MyCourseSubTabContent = () => (
    <div>
      <div className="mb-2 mt-3 flex w-full justify-between">
        <h1 className="text-l font-semibold">Newest Courses</h1>
        <a
          href="/student-course-list-page"
          className="font-light hover:text-amber-600"
        >
          See all
        </a>
      </div>
      <div className="grid grid-cols-4 gap-3 rounded-md max-md:grid-cols-1 max-md:gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <StudentCourseCard key={index} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-5">
      <div className="flex justify-self-end border-b-2 border-gray-200 font-semibold">
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === "about" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === "myCourse" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("myCourse")}
        >
          My Courses
        </button>
      </div>
      <div>
        {activeTab === "about" && <AboutTabContent />}
        {activeTab === "myCourse" && <MyCourseSubTabContent />}
      </div>
    </div>
  );
};

export default StudentProfileSubTab;
