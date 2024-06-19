import React, { useState } from "react";
import { Divider, Form, Input, Select, Steps } from "antd";
import TextArea from "antd/es/input/TextArea";

const StepsCreateCourse: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  return (
    <>
      <Steps
        className="my-10"
        current={current}
        onChange={onChange}
        items={[
          {
            title: "Basic",
          },
          {
            title: "Curriculum",
          },
          {
            title: "Media",
          },
          {
            title: "Price",
          },
          {
            title: "Publish",
          },
        ]}
      />
      <Divider />

      <section>
        <h1>
          <i className="fa-solid fa-circle-info"></i> Basic Information
        </h1>
        <div className="bg-slate-200 p-6">
          <Form layout="vertical">
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
              <Form.Item>
                <Select
                  defaultValue="lucy"
                  style={{ width: "100%" }}
                  options={[
                    {
                      label: <span>manager</span>,
                      title: "manager",
                      options: [
                        { label: <span>Jack</span>, value: "Jack" },
                        { label: <span>Lucy</span>, value: "Lucy" },
                      ],
                    },
                    {
                      label: <span>engineer</span>,
                      title: "engineer",
                      options: [
                        { label: <span>Chloe</span>, value: "Chloe" },
                        { label: <span>Lucas</span>, value: "Lucas" },
                      ],
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default StepsCreateCourse;
