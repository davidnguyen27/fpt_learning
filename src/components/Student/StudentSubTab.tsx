import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { getUserDetail, updateUser } from "../../services/usersService";
import { formatDate } from "../../utils/formatDate";
import { UserData } from "../../models/Types";
import Tiny from "../../app/Editor/RichTextEditor";
import StudentPurchased from "../Purchase/StudentPurchased";
import Subscriptions from "../../hooks/supscription/Subscriptions";

interface StudentProfileSubTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StudentProfileSubTab: React.FC<StudentProfileSubTabProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [initialDescription, setInitialDescription] = useState<string>("");

  const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = storedUser?.data?._id;

  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (userId && token) {
        const userData = await getUserDetail(userId);
        if (userData?.description) {
          setInitialDescription(userData.description);
        }
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
      setEditing(false); // Hide the form and show the edit button again
      await fetchUserData(); // Refresh user data
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
      {!editing ? (
        <div>
          <p>
            <strong>Description:</strong> {initialDescription}
          </p>
          <Button
            type="primary"
            onClick={() => setEditing(true)}
            className="float-right mt-6"
          >
            Edit
          </Button>
        </div>
      ) : (
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
          <Form.Item name="phone_number" label="Phone">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="avatar" label="Avatar">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="video" label="Video">
            <Input size="large" placeholder="https://youtube.com" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Tiny
              value={form.getFieldValue("description") || ""}
              onChange={(value: string) =>
                form.setFieldsValue({ description: value })
              }
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="float-right mt-6"
            >
              Update
            </Button>
            <Button
              type="default"
              onClick={() => setEditing(false)}
              className="float-right mr-4 mt-6"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
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
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === "Supscriptions" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("supscriptions")}
        >
          Supscriptions
        </button>
      </div>
      <div>
        {activeTab === "about" && <AboutTabContent />}
        {activeTab === "purchased" && <StudentPurchased />}
        {activeTab === "supscriptions" && <Subscriptions />}
      </div>
    </div>
  );
};

export default StudentProfileSubTab;
