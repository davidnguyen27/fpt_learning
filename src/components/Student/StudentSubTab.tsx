import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getUserDetail, updateUser } from "../../services/usersService";
import { formatDate } from "../../utils/formatDate";
import { UserData } from "../../models/Types";
import Tiny from "../../app/Editor/RichTextEditor";
import StudentPurchased from "../Purchase/StudentPurchased";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SubscriptionsForSubcriber from "../Subscription/SubscriptionsForSubcriber";
import Loading from "../Loading/loading";
import { useAuth } from "../../app/context/AuthContext";
import SubscriptionsForInstructor from "../Subscription/SubscriptionsForInstructor";

interface StudentProfileSubTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StudentProfileSubTab: React.FC<StudentProfileSubTabProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { getRole } = useAuth();
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [initialDescription, setInitialDescription] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = storedUser?.data?._id;
  const userRole = getRole(); 

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
        if (userData?.avatar) {
          setAvatarUrl(userData.avatar);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [form, userId]);

  const handleUpdate = async (values: Partial<UserData>) => {
    try {
      let updatedValues = { ...values };
      if (avatarUrl) {
        updatedValues.avatar = avatarUrl;
      }
      await updateUser(userId, updatedValues);
      notification.success({
        message: "Success",
        description: "User profile updated successfully",
      });
      setEditing(false);
      await fetchUserData();
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async ({ file }: any) => {
    const storageRef = ref(storage, `avatars/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setAvatarUrl(url);
      notification.success({
        message: "Upload Successful",
        description: "Avatar has been uploaded successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Upload Failed",
        description: "Unable to upload avatar. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  if (loading) return <div><Loading/></div>;

  const renderTabs = () => (
    <>
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
        className={`px-4 py-2 ${activeTab === "following" ? "bg-gray-200" : ""}`}
        onClick={() => setActiveTab("following")}
      >
        Following
      </button>
      {userRole === "instructor" && (
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === "follower" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("follower")}
        >
          Followers
        </button>
      )}
    </>
  );
  
  const AboutTabContent = () => (
    <div className="p-3">
      <h1 className="text-2xl font-semibold mb-5">About Me</h1>
      {!editing ? (
        <div>
            <span dangerouslySetInnerHTML={{ __html: initialDescription }} />
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
            <Upload
              customRequest={handleUpload}
              listType="picture"
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
            {avatarUrl && (
              <>
                <img src={avatarUrl} alt="avatar" width="100" onClick={handlePreview} style={{ cursor: 'pointer' }} />
                <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
                  <img alt="avatar" style={{ width: '100%' }} src={avatarUrl} />
                </Modal>
              </>
            )}
          </Form.Item>
          <Form.Item name="video" label="Video">
            <Input size="large" placeholder="https://youtube.com" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <Tiny
              value={form.getFieldValue('description') || ''}
              onChange={(value: string) => form.setFieldsValue({ description: value })}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Button type="primary" htmlType="submit" className="float-right mt-6">
              Update
            </Button>
            <Button
              type="default"
              onClick={() => setEditing(false)}
              className="float-right mt-6 mr-4"
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
        {renderTabs()}
      </div>
      <div>
        {activeTab === "about" && <AboutTabContent />}
        {activeTab === "purchased" && <StudentPurchased />}
        {activeTab === "following" && <SubscriptionsForSubcriber />}
        {activeTab === "follower" && userRole === "instructor" && <SubscriptionsForInstructor />}
      </div>
    </div>
  );
};

export default StudentProfileSubTab;
