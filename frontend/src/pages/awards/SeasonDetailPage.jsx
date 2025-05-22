// pages/awards/SeasonDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApiService from '../../api/apiService';

const apiService = new ApiService();
const SeasonDetailPage = () => {
    const { id } = useParams();

    const [season, setSeason] = useState({});
    const [races, setRaces] = useState([]);
    const fetchData = async () => {
        try {
            const seasonData = await apiService.get(`/mg/${id}`);
            const date = new Date();
            const startDate = new Date(seasonData.ngayBatDau);
            const endDate = new Date(seasonData.ngayKetThuc);
            if (seasonData.endDate > date) {
                seasonData.trangThai = -1;
            } else if (date >= startDate && date <= endDate) {
                seasonData.trangThai = 0;
            } else {
                seasonData.trangThai = 1;
            }
            const racesData = await apiService.get(`/gd/mg/${id}`);
            setSeason(seasonData);
            setRaces(racesData);
        } catch (error) {
            console.error('Error fetching season data:', error);
        }
    }
    useEffect(() => {
        fetchData();
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

    // Get race status
    const getRaceStatus = (status) => {
        return status === 1 ?
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Đã kết thúc</span> :
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Đang diễn ra</span>;
    };

    return (
        <div className="container mx-auto px-4">
            <div className="mb-6">
                <Link to="/seasons" className="text-blue-600 hover:underline inline-flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Quay lại danh sách mùa giải
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-bold">{season.ten}</h1>
                    {getSeasonStatus(season.trangThai)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <p className="text-sm text-gray-500">Năm</p>
                        <p className="font-medium">{season.nam}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Ngày bắt đầu</p>
                        <p className="font-medium">{formatDate(season.ngayBatDau)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Ngày kết thúc</p>
                        <p className="font-medium">{formatDate(season.ngayKetThuc)}</p>
                    </div>
                </div>

                {season.moTa && (
                    <div>
                        <p className="text-sm text-gray-500">Mô tả</p>
                        <p>{season.moTa}</p>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Danh sách giải đua</h2>

                {races.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên giải đua</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa điểm</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {races.map(race => (
                                    <tr key={race.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{race.ten}</div>
                                            <div className="text-sm text-gray-500">{race.muaGiai?.ten}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {formatDate(race.ngayBatDau)} - {formatDate(race.ngayKetThuc)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{race.tinhThanh?.ten}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getRaceStatus(race.trangThai)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500 max-w-xs truncate">{race.moTa}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                to={`/races/${race.id}/awards`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Xem giải thưởng
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center py-4 text-gray-500">Chưa có giải đua nào trong mùa giải này</p>
                )}
            </div>
        </div>
    );
};

export default SeasonDetailPage;