// pages/awards/TeamAwardDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import PaymentModal from '../../components/awards/PaymentModal';
import ApiService from '../../api/apiService';

const apiService = new ApiService();

const TeamAwardDetailPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const raceId = searchParams.get('raceId');
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);
  const [team, setTeam] = useState({});
  const [currentRace, setCurrentRace] = useState({});
  const fetchData = async () => {
    try {
      // Simulate fetching data from API
      const teamData = await apiService.get(`/dd/${id}`);
      const currentRaceData = await apiService.get(`/gd/${raceId}`);
      setTeam(teamData);
      setCurrentRace(currentRaceData);
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  // Danh sách giải thưởng của đội đua trong giải đua này
  const awards = [
    {
      id: 1,
      ten: 'Vô địch đồng đội',
      giaTri: 200000000,
      moTa: 'Giải thưởng dành cho đội đua vô địch',
      doiTuongNhan: 'Đội đua',
      payments: [
        {
          id: 1,
          soTien: 100000000,
          ngayThanhToan: '2024-02-21',
          noiDung: 'Thanh toán đợt 1',
          phuongThucThanhToan: { id: 2, ten: 'Tiền mặt' }
        },
        {
          id: 2,
          soTien: 50000000,
          ngayThanhToan: '2024-03-15',
          noiDung: 'Thanh toán đợt 2',
          phuongThucThanhToan: { id: 1, ten: 'Chuyển khoản' }
        }
      ]
    }
  ];
  
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
  
  // Calculate total paid amount for an award
  const calculatePaidAmount = (thanhToanGiaiThuongs) => {
    return thanhToanGiaiThuongs.reduce((sum, thanhToanGiaiThuong) => sum + thanhToanGiaiThuong.thanhToan?.soTien, 0);
  };
  
  // Calculate remaining amount to be paid
  const calculateRemainingAmount = (award) => {
    const totalPaid = calculatePaidAmount(award.thanhToanGiaiThuongs);
    return award.giaTri - totalPaid;
  };
  
  const handlePayment = (award) => {
    setSelectedAward(award);
    setShowPaymentModal(true);
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <Link to={`/races/${raceId}/awards`} className="text-blue-600 hover:underline inline-flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Quay lại {currentRace.ten}
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Thông tin đội đua</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Tên đội đua</p>
            <p className="font-medium">{team.ten}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Địa điểm</p>
            <p className="font-medium">{team.quanHuyen?.ten}, {team.quanHuyen?.tinhThanh?.ten}</p>
          </div>
        </div>
        
        {/* Thông tin tài khoản ngân hàng */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-3">Thông tin tài khoản ngân hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Số tài khoản</p>
              <p className="font-medium">{team.taiKhoanNganHang?.soTaiKhoan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tên ngân hàng</p>
              <p className="font-medium">{team.taiKhoanNganHang?.tenNganHang}</p>
            </div>
          </div>
        </div>
        
        {team.moTa && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-500">Mô tả</p>
            <p>{team.moTa}</p>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Danh sách giải thưởng - {currentRace.ten}</h2>
        
        {team.giaiThuongDoiDuas?.length > 0 ? (
          <div className="space-y-6">
            {team.giaiThuongDoiDuas?.map(giaiThuongDoiDua => (
              <div key={giaiThuongDoiDua.giaiThuong?.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{giaiThuongDoiDua.giaiThuong?.ten}</h3>
                    <p className="text-gray-600">{giaiThuongDoiDua.giaiThuong?.moTa}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-sm text-gray-500">Giá trị giải thưởng</p>
                    <p className="font-semibold text-lg">{formatCurrency(giaiThuongDoiDua.giaiThuong?.giaTri)}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Đã thanh toán:</span>
                    <span className="font-medium">{formatCurrency(calculatePaidAmount(giaiThuongDoiDua.giaiThuong?.thanhToanGiaiThuongs))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Còn lại:</span>
                    <span className="font-medium">{formatCurrency(calculateRemainingAmount(giaiThuongDoiDua.giaiThuong))}</span>
                  </div>
                </div>
                
                {giaiThuongDoiDua.giaiThuong?.thanhToanGiaiThuongs?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Lịch sử thanh toán</h4>
                    <div className="max-h-40 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {giaiThuongDoiDua.giaiThuong?.thanhToanGiaiThuongs?.map(thanhToanGiaiThuong => (
                            <tr key={thanhToanGiaiThuong.thanhToan?.id}>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">{formatDate(thanhToanGiaiThuong.thanhToan?.ngayThanhToan)}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">{formatCurrency(thanhToanGiaiThuong.thanhToan?.soTien)}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">{thanhToanGiaiThuong.thanhToan?.phuongThucThanhToan?.ten}</td>
                              <td className="px-3 py-2 text-sm">{thanhToanGiaiThuong.thanhToan?.noiDung}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                <div className="text-right">
                  <button
                    onClick={() => handlePayment(giaiThuongDoiDua.giaiThuong)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    disabled={calculateRemainingAmount(giaiThuongDoiDua.giaiThuong) <= 0}
                  >
                    {calculateRemainingAmount(giaiThuongDoiDua.giaiThuong) <= 0 ? 'Đã thanh toán đủ' : 'Thanh toán'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">Không có giải thưởng nào</p>
        )}
      </div>
      
      {showPaymentModal && selectedAward && (
        <PaymentModal 
          giaiThuong={selectedAward} 
          remainingAmount={calculateRemainingAmount(selectedAward)}
          recipient={{...team, type: 'team'}}
          onClose={() => setShowPaymentModal(false)} 
          onSubmit={()=>{fetchData()}}
        />
      )}
    </div>
  );
};

export default TeamAwardDetailPage;