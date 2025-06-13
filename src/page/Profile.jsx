import React, { useEffect, useState, useRef } from 'react';
import Mynavbar from '../component/Mynavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Swal from 'sweetalert2';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [money, setMoney] = useState('');
    const moneyInputRef = useRef();

    const addMoney = async () => {
        try {
            const amount = moneyInputRef.current.value;
            if (!amount || isNaN(amount)) {
                Swal.fire({
                    title: 'ແຈ້ງເຕືອນ!',
                    icon: 'warning',
                    text: 'ກະລຸນາປ້ອນຈຳນວນເງິນກ່ອນ',
                    confirmButtonText: 'ຢືນຢັນ',
                    width: window.innerWidth < 768 ? '90%' : '400px',
                    customClass: {
                        popup: 'swal-custom-font',
                    }
                })
                return;
            }

            const response = await fetch('https://kengapi.onrender.com/api/addmoney', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ money: amount, id: user.userID })
            });

            const result = await response.json();

            if (response.status === 200) {
                Swal.fire({
                    title: 'ສຳເລັດ',
                    icon: 'success',
                    text: 'ເຕີມເງິນສຳເລັດ',
                    confirmButtonText: 'ຢືນຢັນ',
                    width: window.innerWidth < 768 ? '90%' : '400px',
                    customClass: {
                        popup: 'swal-custom-font',
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => {
                            alert('ເຮົາໄດ້ຫັກເງິນຈາກ BCL ONE ຂອງທ່ານມາເຕີມໃສ່ລະບົບແລ້ວ');
                        }, 300);
                    }
                });

                setMoney(result.money);
                moneyInputRef.current.value = '';
                const updatedUser = { ...user, money: result.money };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                alert(result.message || 'Failed to add money');
            }
        } catch (error) {
            alert(error.message || 'Network error');
        }
    };

    const TakeoutMoney = async () => {
        try {
            const amount = moneyInputRef.current.value;
            if (!amount || isNaN(amount)) {
                Swal.fire({
                    title: 'ແຈ້ງເຕືອນ!',
                    icon: 'warning',
                    text: 'ກະລຸນາປ້ອນຈຳນວນເງິນກ່ອນ',
                    confirmButtonText: 'ຢືນຢັນ',
                    width: window.innerWidth < 768 ? '90%' : '400px',
                    customClass: {
                        popup: 'swal-custom-font',
                    }
                })
                return;
            }

            const response = await fetch('https://kengapi.onrender.com/api/takeoutmoney', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ money: amount, id: user.userID })
            });

            const result = await response.json();
            if (response.status === 200) {
                Swal.fire({
                    title: 'ສຳເລັດ',
                    icon: 'success',
                    text: 'ຖອນເງິນສຳເລັດ',
                    confirmButtonText: 'ຢືນຢັນ',
                    width: window.innerWidth < 768 ? '90%' : '400px',
                    customClass: {
                        popup: 'swal-custom-font',
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => {
                            alert('ເຮົາໄດ້ຖອນເງິນເຂົ້າ BCL ONE ຂອງທ່ານແລ້ວ')
                        }, 300);                  
                    }
                })
                setMoney(result.money);
                moneyInputRef.current.value = '';
                const updatedUser = { ...user, money: result.money };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                alert(result.message || 'Failed to add money');
            }
        } catch (error) {
            alert(error.message || 'Network error');
        }
    };

    const showMoney = async () => {
        const id = document.getElementById('userID').value;
        try {
            const response = await fetch(`https://kengapi.onrender.com/api/money/${id}`, {
                method: 'GET'
            });
            const result = await response.json();
            if (response.status === 200) {
                document.getElementById('amount').value = Number(result.money).toLocaleString() + "  ກີບ";
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setMoney(parsedUser.money);
        }
    }, []);

    useEffect(() => {
        if (user && user.userID) {
            showMoney();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: '"Noto Sans Lao", sans-serif' }}>
            <Mynavbar />
            <div className="container-fluid mt-2 mt-md-3 px-2 px-md-3">
                <div className="row g-2 g-md-3">
                    {/* Profile Information Card */}
                    <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                        <div className="card shadow-lg h-100">
                            <div className="card-header bg-info text-center py-2 py-md-3">
                                <h4 className='mt-1 mt-md-2 fw-bold text-white d-none d-md-block'>ຂໍ້ມູນສ່ວນຕົວ</h4>
                                <h6 className='mt-1 fw-bold text-white d-block d-md-none'>ຂໍ້ມູນສ່ວນຕົວ</h6>
                            </div>
                            <div className="card-body p-2 p-md-3">
                                <div className="form-group mb-2 mb-md-3">
                                    <label className='fw-bold' style={{ fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>
                                        ໝາຍເລກໄອດີ:
                                    </label>
                                    <input 
                                        readOnly 
                                        type="text" 
                                        id='userID' 
                                        className="form-control fw-bold" 
                                        value={user.userID} 
                                        style={{ 
                                            maxWidth: window.innerWidth < 768 ? '100%' : 200,
                                            fontSize: window.innerWidth < 768 ? '12px' : '14px'
                                        }} 
                                    />
                                </div>
                                
                                <div className="row mb-2 mb-md-3">
                                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                                        <h5 className='fw-bold d-none d-md-block'>
                                            ຊື່ ແລະ ນາມສະກຸນ: <span className='text-success'>{user.userName}</span>
                                        </h5>
                                        <div className='d-block d-md-none'>
                                            <small className='fw-bold' style={{ fontSize: '12px' }}>ຊື່ ແລະ ນາມສະກຸນ:</small>
                                            <div className='text-success fw-bold' style={{ fontSize: '13px' }}>{user.userName}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <h5 className='fw-bold d-none d-md-block'>
                                            ເພດ: <span className='text-success'>{user.gender}</span>
                                        </h5>
                                        <div className='d-block d-md-none'>
                                            <small className='fw-bold' style={{ fontSize: '12px' }}>ເພດ:</small>
                                            <div className='text-success fw-bold' style={{ fontSize: '13px' }}>{user.gender}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row mb-2 mb-md-3">
                                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                                        <h5 className='fw-bold d-none d-md-block'>
                                            ເບີໂທລະສັບ: <span className='text-success'>{user.tel}</span>
                                        </h5>
                                        <div className='d-block d-md-none'>
                                            <small className='fw-bold' style={{ fontSize: '12px' }}>ເບີໂທລະສັບ:</small>
                                            <div className='text-success fw-bold' style={{ fontSize: '13px' }}>{user.tel}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <h5 className='fw-bold d-none d-md-block'>
                                            ອີເມວ: <span className='text-success'>{user.email}</span>
                                        </h5>
                                        <div className='d-block d-md-none'>
                                            <small className='fw-bold' style={{ fontSize: '12px' }}>ອີເມວ:</small>
                                            <div className='text-success fw-bold' style={{ fontSize: '13px' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="card-footer p-2 p-md-3">
                                <div className="mb-2 mb-md-3 mt-1 mt-md-3">
                                    <h4 className="text-center fw-bold d-none d-md-block">ປ່ຽນລະຫັດຜ່ານ</h4>
                                    <h6 className="text-center fw-bold d-block d-md-none">ປ່ຽນລະຫັດຜ່ານ</h6>
                                </div>
                                <div className="mb-2 mb-md-3">
                                    <label className="fw-bold" style={{ fontSize: window.innerWidth < 768 ? '13px' : '16px' }}>
                                        ລະຫັດຜ່ານເກົ່າ
                                    </label>
                                    <input 
                                        type="password" 
                                        className="form-control fw-bold border border-2 border-info" 
                                        placeholder='ກະລຸນາປ້ອນລະຫັດຜ່ານເກົ່າ' 
                                        style={{ fontSize: window.innerWidth < 768 ? '12px' : '14px' }}
                                    />
                                </div>
                                <div className="mb-2 mb-md-3">
                                    <label className="fw-bold" style={{ fontSize: window.innerWidth < 768 ? '13px' : '16px' }}>
                                        ສ້າງລະຫັດຜ່ານໃໝ່
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control fw-bold border border-2 border-info" 
                                        placeholder='ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່' 
                                        style={{ fontSize: window.innerWidth < 768 ? '12px' : '14px' }}
                                    />
                                </div>
                                <button 
                                    className={`btn btn-info ${window.innerWidth < 768 ? 'btn-md' : 'btn-lg'} w-100 mb-2 mb-md-3 fw-bold text-white`}
                                    style={{ fontSize: window.innerWidth < 768 ? '13px' : '16px' }}
                                >
                                    ປ່ຽນລະຫັດຜ່ານ
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Wallet Card */}
                    <div className="col-12 col-lg-6">
                        <div className="card shadow-lg h-100">
                            <div className="card-header bg-success py-2 py-md-3">
                                <h4 className="mt-1 mt-md-2 text-center fw-bold text-white d-none d-md-block">ກະເປົາເງິນ</h4>
                                <h6 className="mt-1 text-center fw-bold text-white d-block d-md-none">ກະເປົາເງິນ</h6>
                            </div>
                            <div className="card-body p-2 p-md-3">
                                <div className="container-fluid px-1 px-md-3">
                                    <h5 className="text-center fw-bold d-none d-md-block">
                                        ຈຳນວນເງິນໃນບັນຊີ:
                                    </h5>
                                    <div className="text-center fw-bold d-block d-md-none mb-2" style={{ fontSize: '14px' }}>
                                        ຈຳນວນເງິນໃນບັນຊີ:
                                    </div>
                                    <input 
                                        type="text" 
                                        readOnly 
                                        className="form-control text-center fw-bold mb-3 mb-md-5" 
                                        id="amount" 
                                        style={{ 
                                            fontSize: window.innerWidth < 768 ? '14px' : '16px',
                                            padding: window.innerWidth < 768 ? '8px' : '12px'
                                        }}
                                    />
                                    
                                    <div className="card shadow-lg">
                                        <div className="mt-2 mt-md-3 mb-2 mb-md-3">
                                            <h5 className='text-center fw-bold text-danger d-none d-md-block'>
                                                ຝາກເງິນ ແລະ ຖອນເງິນ
                                            </h5>
                                            <div className='text-center fw-bold text-danger d-block d-md-none' style={{ fontSize: '14px' }}>
                                                ຝາກເງິນ ແລະ ຖອນເງິນ
                                            </div>
                                        </div>
                                        <div className="row mt-2 mt-md-3 mb-2 mb-md-3 px-2 px-md-3">
                                            <div className="form-group">
                                                <label className="fw-bold" style={{ fontSize: window.innerWidth < 768 ? '13px' : '16px' }}>
                                                    ຈຳນວນເງິນ
                                                </label>
                                                <input 
                                                    type="number" 
                                                    ref={moneyInputRef} 
                                                    className="form-control fw-bold border border-2 border-success" 
                                                    placeholder='ປ້ອນຈຳນວນເງິນ' 
                                                    style={{ 
                                                        fontSize: window.innerWidth < 768 ? '12px' : '14px',
                                                        padding: window.innerWidth < 768 ? '8px' : '12px'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="px-2 px-md-3 mt-3 mt-md-5">
                                            <button 
                                                className={`btn btn-success mb-2 mb-md-3 ${window.innerWidth < 768 ? 'btn-md' : 'btn-lg'} w-100`} 
                                                onClick={addMoney}
                                                style={{ fontSize: window.innerWidth < 768 ? '13px' : '16px' }}
                                            >
                                                ເຕີມເງິນ
                                            </button>
                                            <button 
                                                className={`btn btn-danger mb-3 mb-md-5 ${window.innerWidth < 768 ? 'btn-md' : 'btn-lg'} w-100`} 
                                                onClick={TakeoutMoney}
                                                style={{ fontSize: window.innerWidth < 768 ? '13px' : '16px' }}
                                            >
                                                ຖອນເງິນ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 767px) {
                    .swal-custom-font {
                        font-size: 12px !important;
                    }
                    
                    .card-header h4,
                    .card-header h6 {
                        margin-bottom: 0;
                    }
                    
                    .form-control {
                        font-size: 12px;
                    }
                    
                    .btn {
                        font-size: 13px;
                        padding: 8px 16px;
                    }
                }
                
                @media (max-width: 576px) {
                    .container-fluid {
                        padding-left: 8px;
                        padding-right: 8px;
                    }
                    
                    .card-body,
                    .card-footer {
                        padding: 0.75rem 0.5rem;
                    }
                    
                    .form-control,
                    .btn {
                        font-size: 11px;
                    }
                    
                    h5, h6 {
                        font-size: 13px;
                    }
                    
                    small {
                        font-size: 11px;
                    }
                }
                
                @media (min-width: 992px) {
                    .row > .col-lg-6:first-child {
                        padding-right: 0.75rem;
                    }
                    
                    .row > .col-lg-6:last-child {
                        padding-left: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Profile;
