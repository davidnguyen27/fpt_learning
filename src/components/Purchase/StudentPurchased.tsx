import React, { useEffect, useState } from "react";
import { getItemsByStudent } from "../../services/purchaseService";
import { DataTransfer, Purchase } from "../../models/Purchase";
import Loading from "../Loading/loading";

const StudentPurchased: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        const dataTransfer: DataTransfer = {
          searchCondition: {
            purchase_no: "",
            cart_no: "",
            course_id: "",
            status: "",
            is_deleted: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        };
        const data = await getItemsByStudent(dataTransfer);
        setPurchases(data);
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedItems();
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        List of Purchased Courses
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {purchases.map((purchase) => (
          <div
            key={purchase._id}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105"
          >
            <img
              src={`images/${purchase.course_name}.jpg`}
              alt={purchase.course_name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="mb-2 truncate text-xl font-semibold">
                {purchase.course_name}
              </h2>
              <p className="mb-4 text-gray-600">
                By {purchase.instructor_name}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  ${purchase.price}
                </span>
                <span className="rounded-full bg-blue-500 px-3 py-1 text-sm text-white">
                  {purchase.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPurchased;
