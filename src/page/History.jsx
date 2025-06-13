import { useEffect, useState } from 'react';
import Mynavbar from '../component/Mynavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import html2pdf from 'html2pdf.js';

const History = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [userID, setUserID] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserID(user.userID);
        }
    }, []);

    useEffect(() => {
        const LoadData = async () => {
            try {
                const response = await fetch(`https://kengapi.onrender.com/api/order/${userID}`, {
                    method: 'GET',
                });
                const result = await response.json();
                if (response.status === 200) {
                    setOrders(result);
                    setFilteredOrders(result);
                }
            } catch (error) {
                alert("Error loading data: " + error.message);
            }
        };

        if (userID) {
            LoadData();
        }
    }, [userID]);

    const formatDate = (isoDate) => {
        const d = new Date(isoDate);
        return d.toLocaleDateString('lo-LA'); 
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        if (value === '') {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order => {
                const orderID = order.orderID.toString().toLowerCase();
                const formattedDate = formatDate(order.date).toLowerCase();
                const searchValue = value.toLowerCase();
                
                return orderID.includes(searchValue) || formattedDate.includes(searchValue);
            });
            setFilteredOrders(filtered);
        }
    };

    const showDetail = async (id, date) => {
        try {
            const response = await fetch('https://kengapi.onrender.com/api/orderdetail', {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            if (response.status === 200 && Array.isArray(result)) {
                const totalAmount = result.reduce((sum, item) => sum + item.total, 0);
                const detailHtml = `
                  <div id="invoice-content" style="font-family: Noto Sans Lao; font-size: 12px;">
                    <div class="mb-2">
                        <h6 class="text-center fw-bold">ລະຫັດໃບບິນ: ${id}</h6>
                    </div>
                    <div class="mb-2">
                        <h6 class="text-center fw-bold">ວັນທີເດືອນປີ: ${date}</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th style="font-size: 11px;">ສິນຄ້າ</th>
                                    <th style="font-size: 11px;">ລາຄາ</th>
                                    <th style="font-size: 11px;">ຈຳນວນ</th>
                                    <th style="font-size: 11px;">ລາຄາລວມ</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${result.map(item => `
                                    <tr>
                                        <td style="font-size: 10px; word-break: break-word;">${item.productName}</td>
                                        <td style="font-size: 10px;">${item.saleprice.toLocaleString()}</td>
                                        <td style="font-size: 10px;">${item.saleQty}</td>
                                        <td style="font-size: 10px;">${item.total.toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="text-end fw-bold" style="font-size: 12px;">
                        ລວມ: ${totalAmount.toLocaleString()} ກີບ
                    </div>
                </div>
            `;

                Swal.fire({
                    html: `
        ${detailHtml}
        <div class="text-center mt-3">
            <button id="downloadPdf" class="btn btn-primary btn-sm">ພິມໃບບິນ PDF</button>
        </div>
    `,
                    didOpen: () => {
                        document.getElementById('downloadPdf').addEventListener('click', () => {
                            const content = document.getElementById('invoice-content');
                            html2pdf().from(content).set({
                                margin: 0.3,
                                filename: `invoice-${id}.pdf`,
                                html2canvas: { scale: 1.5 },
                                jsPDF: { unit: 'in', format: 'a5', orientation: 'portrait' }
                            }).save();
                        });
                    },
                    confirmButtonText: 'ຕົກລົງ',
                    width: window.innerWidth < 768 ? '95%' : '80%',
                    customClass: {
                        popup: 'swal-custom-font'
                    }
                });

            } else {
                Swal.fire('Error', 'No detail found', 'error');
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <div style={{ fontFamily: 'Noto Sans Lao' }}>
            <Mynavbar />
            <div className="container-fluid px-2 px-md-3">
                <div className="shadow-lg mt-2 mt-md-3 mb-2 mb-md-3">
                    <div className="row mt-2 mt-md-3 mb-2 mb-md-3 mx-1 mx-md-0">
                        <div className="input-group mb-2 mb-md-3">
                            <span className="input-group-text border border-info border-3">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                            <input
                                type="text"
                                className="form-control border border-info border-3 fw-bold"
                                id="searchInput"
                                placeholder='ຄົ້ນຫາລະຫັດໃບບິນ ຫຼື ວັນທີ,ເດືອນ,ປີ'
                                style={{ fontSize: window.innerWidth < 768 ? '14px' : '16px' }}
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="card shadow-lg mx-1 mx-md-0">
                        <div className="card-header" style={{ backgroundColor: '#e83e8c' }}>
                            <h4 className="text-center fw-bold text-white d-none d-md-block">
                                ປະຫວັດການສັ່ງຊື້ປະຈຳວັນ
                            </h4>
                            <h6 className="text-center fw-bold text-white d-block d-md-none">
                                ປະຫວັດການສັ່ງຊື້ປະຈຳວັນ
                            </h6>
                        </div>
                        <div className="card-body p-1 p-md-3" style={{fontSize: window.innerWidth < 768 ? '12px' : '14px'}}>
                            <div className="table-responsive" style={{ 
                                maxHeight: window.innerWidth < 768 ? '500px' : '670px', 
                                overflowY: 'auto' 
                            }}>
                                <table className="table table-striped mb-0">
                                    <thead className="table-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                        <tr>
                                            <th style={{ 
                                                fontSize: window.innerWidth < 768 ? '12px' : '14px',
                                                padding: window.innerWidth < 768 ? '8px 4px' : '12px 8px'
                                            }}>
                                                ລະຫັດໃບບິນ
                                            </th>
                                            <th style={{ 
                                                fontSize: window.innerWidth < 768 ? '12px' : '14px',
                                                padding: window.innerWidth < 768 ? '8px 4px' : '12px 8px'
                                            }}>
                                                ວັນທີ
                                            </th>
                                            <th style={{ 
                                                fontSize: window.innerWidth < 768 ? '12px' : '14px',
                                                padding: window.innerWidth < 768 ? '8px 4px' : '12px 8px',
                                                width: window.innerWidth < 768 ? '60px' : 'auto'
                                            }}>
                                                ເບິ່ງ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrders.map((order, index) => (
                                            <tr key={index}>
                                                <td style={{ 
                                                    fontSize: window.innerWidth < 768 ? '11px' : '13px',
                                                    padding: window.innerWidth < 768 ? '8px 4px' : '12px 8px',
                                                    wordBreak: 'break-word'
                                                }}>
                                                    {order.orderID}
                                                </td>
                                                <td id='Date' style={{ 
                                                    fontSize: window.innerWidth < 768 ? '11px' : '13px',
                                                    padding: window.innerWidth < 768 ? '8px 4px' : '12px 8px'
                                                }}>
                                                    {formatDate(order.date)}
                                                </td>
                                                <td style={{ 
                                                    padding: window.innerWidth < 768 ? '4px 2px' : '12px 8px'
                                                }}>
                                                    <button
                                                        className={`btn btn-success ${window.innerWidth < 768 ? 'btn-sm' : 'btn-md'}`}
                                                        onClick={() => showDetail(order.orderID, formatDate(order.date))}
                                                        style={{
                                                            fontSize: window.innerWidth < 768 ? '10px' : '14px',
                                                            padding: window.innerWidth < 768 ? '4px 8px' : '6px 12px'
                                                        }}
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredOrders.length === 0 && searchTerm && (
                                            <tr>
                                                <td colSpan="3" className="text-center text-muted" style={{
                                                    padding: '20px',
                                                    fontSize: window.innerWidth < 768 ? '12px' : '14px'
                                                }}>
                                                    ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ "{searchTerm}"
                                                </td>
                                            </tr>
                                        )}
                                        {orders.length === 0 && !searchTerm && (
                                            <tr>
                                                <td colSpan="3" className="text-center text-muted" style={{
                                                    padding: '20px',
                                                    fontSize: window.innerWidth < 768 ? '12px' : '14px'
                                                }}>
                                                    ບໍ່ພົບຂໍ້ມູນການສັ່ງຊື້
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
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
                    
                    .table-responsive {
                        font-size: 11px;
                    }
                    
                    .input-group-text {
                        padding: 0.5rem 0.75rem;
                    }
                    
                    .form-control {
                        padding: 0.5rem 0.75rem;
                    }
                }
                
                @media (max-width: 576px) {
                    .container-fluid {
                        padding-left: 8px;
                        padding-right: 8px;
                    }
                    
                    .card {
                        margin-left: 0;
                        margin-right: 0;
                    }
                    
                    .table th,
                    .table td {
                        padding: 0.25rem 0.15rem;
                        font-size: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default History;
