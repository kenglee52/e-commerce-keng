import { useEffect, useState } from 'react';
import Mynavbar from '../component/Mynavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import html2pdf from 'html2pdf.js';
const History = () => {
    const [orders, setOrders] = useState([]);
    const [userID, setUserID] = useState(null);

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
                  <div id="invoice-content" style="font-family: Noto Sans Lao; font-size: 14px;">
                    <div class="mb-3">
                        <h5 class="text-center fw-bold">ລະຫັດໃບບິນ: ${id}</h5>
                    </div>
                    <div class="mb-3">
                        <h5 class="text-center fw-bold">ວັນທີເດືອນປີ: ${date}</h5>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ສິນຄ້າ</th>
                                <th>ລາຄາ</th>
                                <th>ຈຳນວນ</th>
                                <th>ລາຄາລວມ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${result.map(item => `
                                <tr>
                                    <td>${item.productName}</td>
                                    <td>${item.saleprice.toLocaleString()}</td>
                                    <td>${item.saleQty}</td>
                                    <td>${item.total.toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="text-end fw-bold">
                        ລວມ: ${totalAmount.toLocaleString()} ກີບ
                    </div>
                </div>
            `;

                Swal.fire({
                    html: `
        ${detailHtml}
        <div class="text-center mt-3">
            <button id="downloadPdf" class="btn btn-primary">ພິມໃບບິນ PDF</button>
        </div>
    `,
                    didOpen: () => {
                        document.getElementById('downloadPdf').addEventListener('click', () => {
                            const content = document.getElementById('invoice-content');
                            html2pdf().from(content).set({
                                margin: 0.5,
                                filename: `invoice-${id}.pdf`,
                                html2canvas: { scale: 2 },
                                jsPDF: { unit: 'in', format: 'a5', orientation: 'portrait' }
                            }).save();
                        });
                    },
                    confirmButtonText: 'ຕົກລົງ',
                    width: '100%',
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
            <div className="container shadow-lg mt-3 mb-3">
                <div className="row mt-3 mb-3">
                    <div className="input-group mb-3">
                        <span className="input-group-text border border-info border-3">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                            type="text"
                            className="form-control border border-info border-3 fw-bold"
                            id="searchInput"
                            placeholder='ຄົ້ນຫາລະຫັດໃບບິນ ຫຼື ວັນທີ,ເດືອນ,ປີ'
                        />
                    </div>
                </div>
                <div className="card shadow-lg">
                    <div className="card-header" style={{ backgroundColor: '#e83e8c' }}>
                        <h4 className="text-center fw-bold text-white">ປະຫວັດການສັ່ງຊື້ປະຈຳວັນ</h4>
                    </div>
                    <div className="card-body" style={{fontSize: '14px'}}>
                        <div className="table-responsive" style={{ maxHeight: '670px', overflowY: 'auto' }}>
                            <table className="table table-striped mb-0">
                                <thead className="table-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                    <tr>
                                        <th>ລະຫັດໃບບິນ</th>
                                        <th>ວັນທີ</th>
                                        <th>ເບິ່ງ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.orderID}</td>
                                            <td id='Date'>{formatDate(order.date)}</td>
                                            <td>
                                                <button
                                                    className="btn btn-success btn-md"
                                                    onClick={() => showDetail(order.orderID, formatDate(order.date))}
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-center text-muted">ບໍ່ພົບຂໍ້ມູນການສັ່ງຊື້</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
