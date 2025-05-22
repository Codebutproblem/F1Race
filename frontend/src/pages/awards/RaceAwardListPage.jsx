
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApiService from '../../api/apiService';

const apiService = new ApiService();

const RaceAwardListPage = () => {
    const { raceId } = useParams();
    const [activeTab, setActiveTab] = useState('racers');

    // Fixed data simulating API response
    const [race, setRace] = useState({});
    const [racers, setRacers] = useState([]);
    const [teams, setTeams] = useState([]);
    const fecthData = async () => {
        try {
            // Simulate fetching
            const raceData = await apiService.get(`/gd/${raceId}`);
            const racersData = await apiService.get(`/td/gd/${raceId}`);
            const teamsData = await apiService.get(`/dd/gd/${raceId}`);
            setRace(raceData);
            setRacers(racersData);
            setTeams(teamsData);
        } catch (error) {
            console.error('Error fetching', error);
        }
    }
    useEffect(() => {
        fecthData();
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

    return (
        <div className="container mx-auto px-4">
            <div className="mb-6">
                <Link to={`/seasons/${race.muaGiai?.id}`} className="text-blue-600 hover:underline inline-flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Quay lại {race.muaGiai?.ten}
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl font-bold mb-4">Giải thưởng - {race.ten}</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Thời gian</p>
                        <p className="font-medium">{formatDate(race.ngayBatDau)} - {formatDate(race.ngayKetThuc)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Địa điểm</p>
                        <p className="font-medium">{race.tinhThanh?.ten}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Mùa giải</p>
                        <p className="font-medium">{race.muaGiai?.ten}</p>
                    </div>
                </div>

                {race.moTa && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Mô tả</p>
                        <p>{race.moTa}</p>
                    </div>
                )}
            </div>

            <div className="flex border-b mb-6">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'racers'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('racers')}
                >
                    Tay Đua có giải thưởng
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'teams'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('teams')}
                >
                    Đội Đua có giải thưởng
                </button>
            </div>

            {activeTab === 'racers' ? (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên tay đua</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liên hệ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kinh nghiệm</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giải thưởng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng giá trị</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {racers.map(racer => (
                                <tr key={racer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{racer.thanhVien?.ten}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{racer.thanhVien?.email}</div>
                                        <div className="text-sm text-gray-500">{racer.thanhVien?.dienThoai}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{racer.namKinhNghiem} năm</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {racer.giaiThuongTayDuas?.map((giaiThuongTayDua, index) => (

                                                <div key={giaiThuongTayDua?.giaiThuong?.id} className={index > 0 ? 'mt-1' : ''}>
                                                    {giaiThuongTayDua?.giaiThuong?.ten}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {formatCurrency(racer.giaiThuongTayDuas?.reduce((sum, giaiThuongTayDua) => sum + giaiThuongTayDua.giaiThuong?.giaTri, 0))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/race-awards/racer/${racer.id}?raceId=${race.id}`} className="text-blue-600 hover:text-blue-900">
                                            Chi tiết
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên đội đua</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa điểm</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giải thưởng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng giá trị</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teams.map(team => (
                                <tr key={team.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{team.ten}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{team.quanHuyen?.ten}, {team.quanHuyen?.tinhThanh?.ten}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 max-w-xs truncate">{team.moTa}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {team.giaiThuongDoiDuas?.map((giaiThuongDoiDua, index) => (
                                                <div key={giaiThuongDoiDua.giaiThuong?.id} className={index > 0 ? 'mt-1' : ''}>
                                                    {giaiThuongDoiDua.giaiThuong?.ten}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {formatCurrency(team.giaiThuongDoiDuas?.reduce((sum, giaiThuongDoiDua) => sum + giaiThuongDoiDua.giaiThuong?.giaTri, 0))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/race-awards/team/${team.id}?raceId=${race.id}`} className="text-blue-600 hover:text-blue-900">
                                            Chi tiết
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RaceAwardListPage;