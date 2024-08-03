import React, { useEffect, useState } from "react";
import { getItemsByStudent } from "../../services/purchaseService";
import { DataTransfer, Purchase } from "../../models/Purchase";
import { Spin } from "antd"; 

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
      <div className="flex justify-center items-center mt-24">
        <Spin size="large" />
      </div>
    );

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {purchases.map((purchase) => (
          <div
            key={purchase._id}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105"
          >
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold h-24">
                {purchase.course_name}
              </h2>
              <p className="mb-4 flex">
                By: <div className="ml-2 font-semibold text-blue-500">{purchase.instructor_name}</div>
              </p>
              <p className="mb-4 flex">
                No: <div className="ml-2 text-[#d4380d]">{purchase.purchase_no}</div>
              </p>
              <p className="mb-4 text-gray-600">
                Created At: {new Date(purchase.created_at).toLocaleDateString()}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  ${purchase.price_paid.toFixed(2)}
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
