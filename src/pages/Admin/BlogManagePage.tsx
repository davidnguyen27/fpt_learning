import TableBlogs from "../../components/Tables/TableBlogs";
import ModalCreateBlog from "../../components/Modal/ModalCreateBlog";
import { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";

const BlogManagePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">Blog Management</h1>
      </section>
      <div className="mt-4 bg-slate-200 p-4">
        <input
          style={{ width: "100%" }}
          type="text"
          placeholder="Search by phone..."
          className="h-8 rounded-md pl-8 text-xs"
        />
      </div>
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center">
          <i className="fa-solid fa-filter"></i>
          <div className="mx-4">
            Title name:
            <select className="ml-2" title="Category">
              <option value="">Web Development</option>
              <option value="instructor">Business</option>
              <option value="student">Design</option>
            </select>
          </div>
        </div>
        <div>
          <button
            className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium hover:bg-amber-600"
            onClick={() => setIsOpen(true)}
          >
            Create blog
          </button>
          <ModalCreateBlog isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <TableBlogs />
    </MainLayout>
  );
};

export default BlogManagePage;
