import React, { useEffect, useState } from 'react';
import { getItemsByStudent } from '../../services/purchaseService'; // Adjust the import path accordingly
import '../../styles/studentPurchase.css'; // Make sure to create this CSS file for styling
import { DataTransfer, Purchase } from '../../models/Purchase';
import Loading from '../Loading/loading';

const StudentPurchased: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        const dataTransfer: DataTransfer = {
            searchCondition: {
                purchase_no: '',
                cart_no: '',
                course_id: '',
                status: '',
                is_deleted: false
            },
            pageInfo: {
                pageNum: 1,
                pageSize: 10
            }
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

  if (loading) return <div><Loading /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="purchased-container">
      {purchases.map((purchase) => (
        <div key={purchase._id} className="purchase-item">
          <img src={`images/${purchase.course_name}.jpg`} alt={purchase.course_name} className="purchase-image"/>
          <div className="purchase-details">
            <h2>{purchase.course_name}</h2>
            <p>By {purchase.instructor_name}</p>
            <div className="purchase-footer">
              <span className="purchase-price">${purchase.price}</span>
              <span className="purchased">{purchase.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentPurchased;
