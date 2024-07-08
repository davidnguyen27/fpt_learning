import React, { useEffect, useState } from 'react';
import { UserData, UserDetailProp } from '../../models/Types';
import { getUserDetail } from '../../services/usersService';

interface UserDetailProps extends UserDetailProp {
    token: string; // Thêm token từ props
}

const UserDetail: React.FC<UserDetailProps> = ({ _id, token }) => {
    const [userDetail, setUserDetail] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const userData = await getUserDetail(_id, token); // Thêm token vào phương thức gọi
                setUserDetail(userData);
            } catch (error) {
                setError('Failed to fetch user detail');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, [_id, token]); // Trigger lại fetchUserDetail khi userId hoặc token thay đổi

    if (loading) {
        return <div>Loading user detail...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!userDetail) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h2>User Detail</h2>
            <p>Name: {userDetail.name}</p>
            <p>Email: {userDetail.email}</p>
            {/* Hiển thị các thông tin chi tiết khác của người dùng */}
        </div>
    );
};

export default UserDetail;
