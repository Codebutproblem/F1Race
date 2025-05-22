import React, { use, useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import ContractCreateModal from '../../components/sponsors/ContractCreateModal';
import SponsorEditModal from '../../components/sponsors/SponsorEditModal';
import ApiService from '../../api/apiService';

const apiService = new ApiService();

const SponsorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showContractModal, setShowContractModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [sponsor, setSponsor] = useState({});

  const [contracts, setContracts] = useState([]);

  const fetchData = async () => {
    try {
      const sponsor = await apiService.get(`/ntt/${id}`);
      if (sponsor) {
        setSponsor(sponsor);
      }
      const contracts = await apiService.get(`/hdtt/ntt/${id}`);
      if (contracts) {
        setContracts(contracts);
      }
    } catch (error) {
      console.error('Error fetching sponsor:', error);
    }
  };

  // const contracts = [
  //   {
  //     id: 1,
  //     ngayBatDau: '2024-01-01',
  //     ngayKetThuc: '2024-12-31',
  //     giaTri: 500000000,
  //     noiDung: 'Tài trợ cho mùa giải 2024',
  //     trangThai: 'Đã ký',
  //     ngayKy: '2023-11-15',
  //     loaiTaiTro: { id: 1, ten: 'Tài trợ chính' }
  //   },
  //   {
  //     id: 2,
  //     ngayBatDau: '2025-01-01',
  //     ngayKetThuc: '2025-12-31',
  //     giaTri: 700000000,
  //     noiDung: 'Tài trợ cho mùa giải 2025',
  //     trangThai: 'Chưa ký',
  //     ngayKy: null,
  //     loaiTaiTro: { id: 2, ten: 'Tài trợ phụ' }
  //   }
  // ];

  const handleDeleteSponsor = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhà tài trợ này?')) {
      // Simulating API call
      console.log('Deleting sponsor:', id);
      try {
        const response = apiService.delete(`/ntt/delete/${id}`);
        if (response) {
          console.log('Sponsor deleted successfully');
          navigate('/sponsors', { state: { needReload: true } });
        }
      } catch (error) {
        console.error('Error deleting sponsor:', error);
      }

    }
  };

  const handleEditSponsor = async (updatedSponsor) => {
    // Simulating API call
    console.log('Updating sponsor:', updatedSponsor);
    try {
      const response = await apiService.put(`/ntt/update/${sponsor.id}`, updatedSponsor);
      if (response) {
        setSponsor(response);
        // Optionally, you can show a success message or redirect
        console.log('Sponsor updated successfully');
      }

    } catch (error) {
      console.error('Error updating sponsor:', error);
    }
    setShowEditModal(false);
  };

  const handleCreateContract = async (newContract) => {
    // Simulating API call
    try {
      const response = await apiService.post(`/hdtt/create`, newContract);
      if (response) {
        fetchData();
        console.log('Contract created successfully');
      }
    } catch (error) {
      console.error('Error creating contract:', error);
    }
    setShowContractModal(false);
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const isEnableToDelete = () => {
    contracts.forEach(contract => {
      if (contract.trangThai === 'completed') {
        return false;
      }
    });
    return true;
  }

  useEffect(() => {
    fetchData();
  }, [location.state]);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <Link to="/sponsors" className="text-blue-600 hover:underline inline-flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Quay lại danh sách nhà tài trợ
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{sponsor.ten}</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Chỉnh sửa
            </button>
            {!contracts.some(contract => contract.trangThai === 'completed') && (
              <button
                onClick={handleDeleteSponsor}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Lĩnh vực</p>
            <p className="font-medium">{sponsor.linhVuc}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Người đại diện</p>
            <p className="font-medium">{sponsor.tenNguoiDaiDien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{sponsor.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Điện thoại</p>
            <p className="font-medium">{sponsor.dienThoai}</p>
          </div>
        </div>

        {sponsor.ghiChu && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">Ghi chú</p>
            <p>{sponsor.ghiChu}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Hợp đồng tài trợ</h2>
          <button
            onClick={() => setShowContractModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Thêm hợp đồng mới
          </button>
        </div>

        {contracts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại tài trợ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contracts.map(contract => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.ngayBatDau.slice(0, 10)} - {contract.ngayKetThuc.slice(0, 10)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.loaiTaiTro.ten}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(contract.giaTri)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contract.trangThai === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {contract.trangThai === 'completed' ? 'Đã ký' : 'Chưa ký'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/contracts/${contract.id}`} className="text-blue-600 hover:text-blue-900">
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">Chưa có hợp đồng tài trợ nào</p>
        )}
      </div>

      {showContractModal && (
        <ContractCreateModal
          sponsorId={sponsor.id}
          onClose={() => setShowContractModal(false)}
          onSubmit={handleCreateContract}
        />
      )}

      {showEditModal && (
        <SponsorEditModal
          sponsor={sponsor}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditSponsor}
        />
      )}
    </div>
  );
};

export default SponsorDetailPage;