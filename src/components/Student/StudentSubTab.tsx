import React, { useEffect } from "react";
import { Button, Form, Input, notification } from "antd";
import { getUserDetail, updateUser } from "../../services/usersService";
import { formatDate } from "../../utils/formatDate";
import { UserData } from "../../models/Types";
import Tiny from "../../app/Editor/RichTextEditor";
import StudentPurchased from "../Purchase/StudentPurchased";

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
        <Form.Item
          label="Description"
          name="description"
          valuePropName="value"
          getValueFromEvent={(e: any) => e.target.getContent()}
        >
          <Tiny
            value={form.getFieldValue('description') || ''}
            onChange={(value: any) => form.setFieldsValue({ description: value })}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit" className="float-right mt-6">
            Update
          </Button>
        </Form.Item>
      </Form>
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
          className={`px-4 py-2 ${activeTab === "purchased" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("purchased")}
        >
          Purchased
        </button>
      </div>
      <div>
        {activeTab === "about" && <AboutTabContent />}
        {activeTab ==="purchased" && <StudentPurchased />}
      </div>
    </div>
  );
};

export default StudentProfileSubTab;
