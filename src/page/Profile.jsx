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
            <div className="mt-3" style={{ marginLeft: 15, marginRight: 15 }}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-header bg-info text-center">
                                <h4 className='mt-2 fw-bold text-white'>ຂໍ້ມູນສ່ວນຕົວ</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group mb-3">
                                    <label className='fw-bold'>ໝາຍເລກໄອດີ:</label>
                                    <input readOnly type="text" id='userID' className="form-control fw-bold" value={user.userID} style={{ maxWidth: 200 }} />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h5 className='fw-bold'>ຊື່ ແລະ ນາມສະກຸນ: <span className='text-success'>{user.userName}</span></h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className='fw-bold'>ເພດ: <span className='text-success'>{user.gender}</span></h5>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h5 className='fw-bold'>ເບີໂທລະສັບ: <span className='text-success'>{user.tel}</span></h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className='fw-bold'>ອີເມວ: <span className='text-success'>{user.email}</span></h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="mb-3 mt-3">
                                    <h4 className="text-center fw-bold">ປ່ຽນລະຫັດຜ່ານ</h4>
                                </div>
                                <div className="mb-3">
                                    <label className="fw-bold">ລະຫັດຜ່ານເກົ່າ</label>
                                    <input type="password" className="form-control fw-bold border border-2 border-info" placeholder='ກະລຸນາປ້ອນລະຫັດຜ່ານເກົ່າ' />
                                </div>
                                <div className="mb-3">
                                    <label className="fw-bold">ສ້າງລະຫັດຜ່ານໃໝ່</label>
                                    <input type="text" className="form-control fw-bold border border-2 border-info" placeholder='ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່' />
                                </div>
                                <button className="btn btn-info btn-lg w-100 mb-3 fw-bold text-white">ປ່ຽນລະຫັດຜ່ານ</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-header bg-success">
                                <h4 className="mt-2 text-center fw-bold text-white">ກະເປົາເງິນ</h4>
                            </div>
                            <div className="card-body">
                                <div className="container">
                                    <h5 className="text-center fw-bold">
                                        ຈຳນວນເງິນໃນບັນຊີ:
                                    </h5>
                                    <input type="text" readOnly className="form-control text-center fw-bold mb-5" id="amount" />
                                    <div className="card shadow-lg">
                                        <div className="mt-3 mb-3">
                                            <h5 className='text-center fw-bold text-danger'>ຝາກເງິນ ແລະ ຖອນເງິນ</h5>
                                        </div>
                                        <div className="row mt-3 mb-3 container">
                                            <div className="form-group">
                                                <label className="fw-bold">ຈຳນວນເງິນ</label>
                                                <input type="number" ref={moneyInputRef} className="form-control fw-bold border border-2 border-success" placeholder='ປ້ອນຈຳນວນເງິນ' />
                                            </div>
                                        </div>
                                        <div className="container mt-5">
                                            <button className="btn btn-success mb-3 btn-lg w-100" onClick={addMoney}>ເຕີມເງິນ</button>
                                            <button className="btn btn-danger mb-5 btn-lg w-100" onClick={TakeoutMoney}>ຖອນເງິນ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
