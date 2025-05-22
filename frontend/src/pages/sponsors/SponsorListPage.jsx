import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SponsorCreateModal from '../../components/sponsors/SponsorCreateModal';
import ApiService from '../../api/apiService';

const apiService = new ApiService();

const SponsorListPage = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [sponsors, setSponsors] = useState([]);

    const location = useLocation();

    const fetchData = async () => {
        try {
            const response = await apiService.get('/ntt');
            if (response) {
                setSponsors(response);
            }
        } catch (error) {
            console.error('Error fetching sponsors:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [location.state]);

    const handleSponsorCreate = async (newSponsor) => {
        try {
            const response = await apiService.post('/ntt/create', newSponsor);
            if (response) {
                fetchData();
            }
            setShowCreateModal(false);
        } catch (error) {
            console.error('Error creating sponsor:', error);
        }
    }

    // // Fixed data simulating API response
    // const sponsors = [
    //     {
    //         id: 1,
    //         ten: 'Red Bull',
    //         linhVuc: 'Đồ uống',
    //         email: 'contact@redbull.com',
    //         dienThoai: '0901234567',
    //         tenNguoiDaiDien: 'Nguyễn Văn A'
    //     },
    //     {
    //         id: 2,
    //         ten: 'Shell',
    //         linhVuc: 'Năng lượng',
    //         email: 'info@shell.com',
    //         dienThoai: '0908765432',
    //         tenNguoiDaiDien: 'Trần Thị B'
    //     },
    //     {
    //         id: 3,
    //         ten: 'Pirelli',
    //         linhVuc: 'Lốp xe',
    //         email: 'support@pirelli.com',
    //         dienThoai: '0903456789',
    //         tenNguoiDaiDien: 'Lê Văn C'
    //     },
    // ];

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Danh sách nhà tài trợ</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Thêm mới nhà tài trợ
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên nhà tài trợ</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lĩnh vực</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điện thoại</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người đại diện</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sponsors && sponsors.length > 0 ? (
                            sponsors.map(sponsor => (
                                <tr key={sponsor.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{sponsor.ten}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{sponsor.linhVuc}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{sponsor.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{sponsor.dienThoai}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{sponsor.tenNguoiDaiDien}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/sponsors/${sponsor.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Chi tiết
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                    Không có nhà tài trợ nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showCreateModal && (
                <SponsorCreateModal onClose={() => setShowCreateModal(false)} onSubmit={handleSponsorCreate} />
            )}
        </div>
    );
};

export default SponsorListPage;