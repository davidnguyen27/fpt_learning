import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

interface FormCreateCourseProp {
  goToNextStep: () => void;
}

const FormCreateCourse: React.FC<FormCreateCourseProp> = ({ goToNextStep }) => {
  return (
    <>
      <h1 className="text-base font-medium">
        <i className="fa-solid fa-circle-info"></i> Basic Information
      </h1>
      <Form layout="vertical">
        <div className="bg-slate-200 p-6">
          <Form.Item
            label="Course Title *"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input
              className="text-sm"
              size="large"
              placeholder="Course title here"
            />
          </Form.Item>
          <Form.Item
            label="Short Description *"
            rules={[{ required: true, message: "Required!" }]}
          >
            <TextArea rows={4} placeholder="Item description here..." />
          </Form.Item>
          <Form.Item
            label="Course Description *"
            rules={[{ required: true, message: "Required!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item
              label="What will students learn in your course? *"
              rules={[{ required: true, message: "Required!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Requirement *"
              rules={[{ required: true, message: "Required!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item label="Close Caption *">
              <Select
                defaultValue="Select Audio"
                style={{ width: "100%" }}
                options={[
                  { value: "beginner", label: "English" },
                  { value: "intermediate", label: "Vietnamese" },
                  { value: "expert", label: "मानक हिन्दी" },
                  { value: "expert", label: "Française" },
                  { value: "expert", label: "한국어" },
                  { value: "expert", label: "中国话" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Course Category *">
              <Select
                defaultValue="Web Development"
                style={{ width: "100%" }}
                options={[
                  { value: "beginner", label: "Business" },
                  { value: "intermediate", label: "Graphic Design" },
                  { value: "expert", label: "Marketing" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item label="Course level *">
              <Select
                defaultValue="Nothing selected"
                style={{ width: "100%" }}
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "expert", label: "Expert" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Audio Language *">
              <Select
                defaultValue="Select Audio *"
                style={{ width: "100%" }}
                options={[
                  { value: "beginner", label: "English" },
                  { value: "intermediate", label: "Vietnamese" },
                  { value: "expert", label: "मानक हिन्दी" },
                  { value: "expert", label: "Française" },
                  { value: "expert", label: "한국어" },
                  { value: "expert", label: "中国话" },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-end mt-6"> {/* Updated to justify-end */}
          <button
            className="text-white bg-red-500 px-10 py-3 hover:bg-red-600"
            onClick={goToNextStep}
          >
            Next
          </button>
        </div>
      </Form>
    </>
  );
};

export default FormCreateCourse;
