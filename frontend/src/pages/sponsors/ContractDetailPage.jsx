import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ContractEditModal from '../../components/sponsors/ContractEditModal';
import ApiService from '../../api/apiService';

const apiService = new ApiService();

const ContractDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [contractData, setContractData] = useState({});

    const fetchData = async () => {
        try {
            const response = await apiService.get(`/hdtt/${id}`);
            if (response) {
                setContractData(response);
            }
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
    }

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN').format(date);
    };

    // Hàm xử lý ký hợp đồng
    const handleSignContract = async () => {
        if (window.confirm('Bạn có chắc chắn muốn ký hợp đồng này?')) {
            const today = new Date().toISOString().split('T')[0];
            // Giả lập API call để cập nhật hợp đồng
            contractData.ngayKy = today;
            contractData.trangThai = 'completed';
            try {
                const response = await apiService.put(`/hdtt/update/${contractData.id}`, contractData);
                if (response) {
                    console.log('Contract signed successfully');
                    fetchData();
                }
            } catch (error) {
                console.error('Error signing contract:', error);
            }
        }
    };

    // Hàm xử lý cập nhật hợp đồng
    const handleUpdateContract = async (updatedData) => {
        try {
            const response = await apiService.put(`/hdtt/update/${contractData.id}`, updatedData);
            if (response) {
                fetchData();
            }
        } catch (error) {
            console.error('Error updating contract:', error);
        }
        setShowEditModal(false);
    };

    const handleDeleteContract = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này? Hành động này không thể hoàn tác.')) {
            console.log('Deleting contract:', contractData.id);
            try {
                const response = await apiService.delete(`/hdtt/delete/${contractData.id}`);
                if (response) {
                    console.log('Contract deleted successfully');
                    navigate(`/sponsors/${contractData.nhaTaiTro?.id}`, { state: { needReload: true } });
                }
            } catch (error) {
                console.error('Error deleting contract:', error);
            }
        }
    };

    const getNow = () => {
        const now = new Date();
        const formatted = now.toLocaleDateString('en-US');
        return formatted.replace(/\//g, '-');
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="mb-6">
                <Link to={`/sponsors/${contractData.nhaTaiTro?.id}`} className="text-blue-600 hover:underline inline-flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Quay lại {contractData.nhaTaiTro?.ten}
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-2xl font-bold">Chi tiết hợp đồng tài trợ</h1>

                    {/* Các nút thao tác với hợp đồng */}
                    <div className="flex space-x-2">
                        {contractData.trangThai !== 'completed' && (
                            <>
                                <button
                                    onClick={handleSignContract}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    Ký hợp đồng
                                </button>
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={handleDeleteContract}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Xóa
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Thông tin hợp đồng</h2>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Loại tài trợ</p>
                                <p className="font-medium">{contractData.loaiTaiTro?.ten}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Giá trị hợp đồng</p>
                                <p className="font-medium">{formatCurrency(contractData.giaTri)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Thời gian hiệu lực</p>
                                <p className="font-medium">{formatDate(contractData.ngayBatDau)} - {formatDate(contractData.ngayKetThuc)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Trạng thái</p>
                                <p className="font-medium">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${contractData.trangThai === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {contractData.trangThai === 'completed' ? 'Đã ký' : 'Chưa ký'}
                                    </span>
                                </p>
                            </div>
                            {contractData.ngayKy && (
                                <div>
                                    <p className="text-sm text-gray-500">Ngày ký hợp đồng</p>
                                    <p className="font-medium">{formatDate(contractData.ngayKy)}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4">Thông tin nhà tài trợ</h2>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Tên nhà tài trợ</p>
                                <p className="font-medium">{contractData.nhaTaiTro?.ten}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Lĩnh vực</p>
                                <p className="font-medium">{contractData.nhaTaiTro?.linhVuc}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Người đại diện</p>
                                <p className="font-medium">{contractData.nhaTaiTro?.tenNguoiDaiDien}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{contractData.nhaTaiTro?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Điện thoại</p>
                                <p className="font-medium">{contractData.nhaTaiTro?.dienThoai}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-lg font-semibold mb-2">Nội dung hợp đồng</h2>
                    <div className="bg-gray-50 p-4 rounded">
                        <p>{contractData.noiDung}</p>
                    </div>
                </div>
            </div>

            {/* Modal chỉnh sửa hợp đồng */}
            {showEditModal && (
                <ContractEditModal
                    contract={contractData}
                    onSubmit={handleUpdateContract}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </div>
    );
};

export default ContractDetailPage;