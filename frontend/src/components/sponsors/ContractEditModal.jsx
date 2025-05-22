import React, { useEffect, useState } from 'react';
import ApiService from '../../api/apiService';

const apiService = new ApiService();

const ContractEditModal = ({ contract, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        ngayBatDau: contract.ngayBatDau,
        ngayKetThuc: contract.ngayKetThuc,
        giaTri: contract.giaTri,
        noiDung: contract.noiDung,
        loaiTaiTroId: contract.loaiTaiTro.id
    });

    const [sponsorshipTypes, setSponsorshipTypes] = useState([]);

    const fetchData = async () => {
        try {
            const types = await apiService.get('/ltt');
            if (types) {
                setSponsorshipTypes(types);
            }
        } catch (error) {
            console.error('Error fetching sponsorship types:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Chuẩn bị dữ liệu để gửi lên server

        const { loaiTaiTroId, ...updatedContract } = formData;
        updatedContract.giaTri = parseInt(formData.giaTri);

        sponsorshipTypes.forEach(type => {
            if (type.id === parseInt(loaiTaiTroId)) {
                updatedContract.loaiTaiTro = { id: type.id };
            }
        });

        updatedContract.id = contract.id;
        console.log('Updating contract:', updatedContract);

        // Gọi hàm xử lý lưu từ component cha
        onSubmit(updatedContract);
    };

    useEffect(() => {
        fetchData();
    }, []);

    function convertDateFormat(dateString) {
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Chỉnh sửa hợp đồng tài trợ</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="loaiTaiTroId" className="block text-sm font-medium text-gray-700 mb-1">Loại tài trợ</label>
                            <select
                                id="loaiTaiTroId"
                                name="loaiTaiTroId"
                                value={formData.loaiTaiTroId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">-- Chọn loại tài trợ --</option>
                                {sponsorshipTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="giaTri" className="block text-sm font-medium text-gray-700 mb-1">Giá trị hợp đồng (VNĐ)</label>
                            <input
                                type="number"
                                id="giaTri"
                                name="giaTri"
                                value={formData.giaTri}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="ngayBatDau" className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
                            <input
                                type="date"
                                id="ngayBatDau"
                                name="ngayBatDau"
                                value={convertDateFormat(formData.ngayBatDau)}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="ngayKetThuc" className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
                            <input
                                type="date"
                                id="ngayKetThuc"
                                name="ngayKetThuc"
                                value={convertDateFormat(formData.ngayKetThuc)}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="noiDung" className="block text-sm font-medium text-gray-700 mb-1">Nội dung hợp đồng</label>
                        <textarea
                            id="noiDung"
                            name="noiDung"
                            value={formData.noiDung}
                            onChange={handleChange}
                            rows="5"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContractEditModal;