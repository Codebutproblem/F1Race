// pages/awards/RacerAwardDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import PaymentModal from '../../components/awards/PaymentModal';
import ApiService from '../../api/apiService';

const apiService = new ApiService();

const RacerAwardDetailPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const raceId = searchParams.get('raceId');

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);

  const [racer, setRacer] = useState({});
  const [currentRace, setCurrentRace] = useState({});

  const fetchData = async () => {
    try {
      // Simulate fetching data from API
      const racerData = await apiService.get(`/td/${id}`);
      const currentRaceData = await apiService.get(`/gd/${raceId}`);
      setRacer(racerData);
      setCurrentRace(currentRaceData);
    } catch (error) {
      console.error('Error fetching racer data:', error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

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
  const calculatePaidAmount = (payments) => {
    return payments?.reduce((sum, payment) => sum + payment.thanhToan?.soTien, 0);
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
        <h1 className="text-2xl font-bold mb-4">Thông tin tay đua</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Tên tay đua</p>
            <p className="font-medium">{racer.thanhVien?.ten}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ngày sinh</p>
            <p className="font-medium">{formatDate(racer.thanhVien?.ngaySinh)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Số năm kinh nghiệm</p>
            <p className="font-medium">{racer.namKinhNghiem} năm</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{racer.thanhVien?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Điện thoại</p>
            <p className="font-medium">{racer.thanhVien?.dienThoai}</p>
          </div>
        </div>

        {/* Thông tin tài khoản ngân hàng */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-3">Thông tin tài khoản ngân hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Số tài khoản</p>
              <p className="font-medium">{racer.taiKhoanNganHang?.soTaiKhoan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tên ngân hàng</p>
              <p className="font-medium">{racer.taiKhoanNganHang?.tenNganHang}</p>
            </div>
          </div>
        </div>

        {racer.thanhVien?.ghiChu && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-500">Ghi chú</p>
            <p>{racer.thanhVien?.ghiChu}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Danh sách giải thưởng - {currentRace.ten}</h2>

        {racer.giaiThuongTayDuas?.length > 0 ? (
          <div className="space-y-6">
            {racer.giaiThuongTayDuas?.map(giaiThuongTayDua => (
              <div key={giaiThuongTayDua.giaiThuong?.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{giaiThuongTayDua.giaiThuong?.ten}</h3>
                    <p className="text-gray-600">{giaiThuongTayDua.giaiThuong?.moTa}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-sm text-gray-500">Giá trị giải thưởng</p>
                    <p className="font-semibold text-lg">{formatCurrency(giaiThuongTayDua.giaiThuong?.giaTri)}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Đã thanh toán:</span>
                    <span className="font-medium">{formatCurrency(calculatePaidAmount(giaiThuongTayDua.giaiThuong?.thanhToanGiaiThuongs))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Còn lại:</span>
                    <span className="font-medium">{formatCurrency(calculateRemainingAmount(giaiThuongTayDua.giaiThuong))}</span>
                  </div>
                </div>
                {giaiThuongTayDua.giaiThuong?.thanhToanGiaiThuongs?.length > 0 && (
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
                          {giaiThuongTayDua.giaiThuong?.thanhToanGiaiThuongs?.map(thanhToanGiaiThuong => 
                            <tr key={thanhToanGiaiThuong.thanhToan?.id}>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">{formatDate(thanhToanGiaiThuong.thanhToan?.ngayThanhToan)}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">{formatCurrency(thanhToanGiaiThuong.thanhToan?.soTien)}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">{thanhToanGiaiThuong.thanhToan?.phuongThucThanhToan?.ten}</td>
                                <td className="px-3 py-2 text-sm">{thanhToanGiaiThuong.thanhToan?.noiDung}</td>
                              </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="text-right">
                  <button
                    onClick={() => handlePayment(giaiThuongTayDua.giaiThuong)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    disabled={calculateRemainingAmount(giaiThuongTayDua.giaiThuong) <= 0}
                  >
                    {calculateRemainingAmount(giaiThuongTayDua.giaiThuong) <= 0 ? 'Đã thanh toán đủ' : 'Thanh toán'}
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
          recipient={{ ...racer, type: 'racer' }}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={()=>{fetchData()}}
        />
      )}
    </div>
  );
};

export default RacerAwardDetailPage;