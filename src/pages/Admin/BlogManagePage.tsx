import AdminLayout from "../../components/Layout/AdminLayout";
import TableBlogs from "../../components/Tables/TableBlogs";

const BlogManagePage = () => {
  return (
    <AdminLayout>
      <section>
        <h1 className="mb-10 text-xl font-bold">Blog Management</h1>
      </section>
      <TableBlogs />
    </AdminLayout>
  );
};

export default BlogManagePage;
