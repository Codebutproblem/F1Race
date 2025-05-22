// pages/awards/SeasonListPage.js
import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../api/apiService';

const apiService = new ApiService();

const SeasonListPage = () => {
    const [seasons, setSeasons] = useState([]);

    const fecthData = async () => {
        try {
            const data = await apiService.get('/mg');
            data.forEach(item => {
                const date = new Date();
                const startDate = new Date(item.ngayBatDau);
                const endDate = new Date(item.ngayKetThuc);
                if(item.endDate > date) {
                    item.trangThai = -1;
                }else if(date >= startDate && date <= endDate) {
                    item.trangThai = 0;
                }else {
                    item.trangThai = 1;
                }
            })
            setSeasons(data);
        } catch (error) {
            console.error('Error fetching seasons:', error);
        }
    }
    useEffect(() => {
        fecthData();
    }, []);

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN').format(date);
    };

    // Get season status
    const getSeasonStatus = (status) => {
        switch (status) {
            case 1:
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Đã kết thúc</span>;
            case 0:
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Đang diễn ra</span>;
            case -1:
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Chưa bắt đầu</span>;
            default:
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Không xác định</span>;
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">Quản lý Giải thưởng - Danh sách Mùa giải</h1>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên mùa giải</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Năm</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {seasons.map(season => (
                            <tr key={season.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{season.ten}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{season.nam}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {formatDate(season.ngayBatDau)} - {formatDate(season.ngayKetThuc)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getSeasonStatus(season.trangThai)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500 max-w-xs truncate">{season.moTa}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        to={`/seasons/${season.id}`}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Chi tiết
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SeasonListPage;