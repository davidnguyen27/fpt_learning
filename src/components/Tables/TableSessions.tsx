import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Table, Spin, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTransfer } from "../../models/Session";
import useSessionData from "../../hooks/session/useSessionData";
import { useState, useMemo } from "react";
import ModalAddSession from "../Modal/ModalAddSession";
import useDeleteSession from "../../hooks/session/useDeleteSession";
import ModalEditSession from "../Modal/ModalEditSession";
import Search from "antd/es/input/Search";

interface DataType {
  key: string;
  name: string;
  course_id: string;
  created_at: Date;
  updated_at: Date;
  position_order: number;
}

const TableSessions = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const handleSuccess = () => {
    refetchData();
  };

  const handleDelete = (sessionId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this course?",
      onOk: () => deleteSession(sessionId),
    });
  };

  const handleEdit = (sessionId: string) => {
    setEditingSessionId(sessionId);
    setOpenEdit(true);
  };

  const searchCondition = useMemo(
    () => ({
      keyword: searchKeyword,
      course_id: "",
      course_name: "",
      is_position_order: true,
      is_delete: false,
    }),
    [searchKeyword],
  );

  const pageInfo = useMemo(
    () => ({
      pageNum: 1,
      pageSize: 10,
    }),
    [],
  );

  const dataTransfer: DataTransfer = useMemo(
    () => ({
      searchCondition,
      pageInfo,
    }),
    [searchCondition, pageInfo],
  );

  const { data, loading, error, refetchData } = useSessionData(dataTransfer);
  const { deleteSession } = useDeleteSession(refetchData);

  if (error) {
    return <div>{error}</div>;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Session Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Course Id",
      dataIndex: "course_id",
      key: "course_id",
      width: 100,
    },   
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 150,
    },
    {
      title: "Position",
      dataIndex: "position_order",
      key: "position_order",
      width: 80,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <>
          <FormOutlined
            onClick={() => handleEdit(record.key)}
            className="mx-2 cursor-pointer text-blue-500"
          />
          <DeleteOutlined
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(record.key)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="my-3 flex items-center justify-between">
        <Search
          onSearch={handleSearch}
          placeholder="Search by keyword"
          allowClear
          style={{ width: 300 }}
        />
        <button
          onClick={() => setOpenAdd(true)}
          className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Add Session
        </button>
      </div>
      <Spin spinning={loading}>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: true }} // Enables horizontal scrolling
          />
        </div>
      </Spin>
      <ModalAddSession
        open={openAdd}
        setOpen={setOpenAdd}
        onSuccess={handleSuccess}
      />
      <ModalEditSession
        open={openEdit}
        setOpen={setOpenEdit}
        sessionId={editingSessionId}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default TableSessions;
