import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faShoppingCart, faSearch, faFilter, faMobile, faTablet, faDesktop } from '@fortawesome/free-solid-svg-icons';
import Mynavbar from '../component/Mynavbar';
import Swal from 'sweetalert2';
import './App.css';

const styles = {
    productImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '12px',
        transition: 'transform 0.3s ease'
    },
    productImageMobile: {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '8px',
        flexShrink: 0
    },
    card: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        border: 'none',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
    },
    cardHover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    },
    cardBody: {
        padding: '1rem'
    },
    cardBodyMobile: {
        padding: '0.75rem'
    },
    totalPrice: {
        fontWeight: 'bold',
        fontSize: '1.25rem',
        color: '#333'
    },
    scrollArea: {
        maxHeight: '70vh',
        overflowY: 'auto',
        paddingRight: '5px'
    },
    scrollAreaMobile: {
        maxHeight: '50vh',
        overflowY: 'auto'
    },
    banner: {
        width: '100%',
        height: '160px',
        objectFit: 'cover',
        borderRadius: '16px',
        marginBottom: '1rem',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
    },
    bannerMobile: {
        height: '120px',
        borderRadius: '12px'
    },
    mobileProductCard: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem',
        gap: '0.75rem',
        marginBottom: '0.75rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #f0f0f0'
    },
    mobileProductInfo: {
        flex: 1,
        minWidth: 0
    },
    mobileProductActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: '80px'
    },
    quantityInput: {
        width: '60px',
        padding: '0.25rem',
        textAlign: 'center',
        border: '2px solid #e9ecef',
        borderRadius: '6px',
        fontSize: '0.9rem'
    },
    quantityInputMobile: {
        width: '50px',
        padding: '0.2rem',
        fontSize: '0.8rem'
    },
    addButton: {
        background: 'linear-gradient(135deg, #ffc107, #ff8f00)',
        border: 'none',
        borderRadius: '8px',
        padding: '0.5rem 1rem',
        color: 'white',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(255, 193, 7, 0.3)'
    },
    addButtonMobile: {
        padding: '0.4rem 0.8rem',
        fontSize: '0.8rem',
        borderRadius: '6px'
    },
    filterButton: {
        borderRadius: '20px',
        padding: '0.4rem 1rem',
        margin: '0.2rem',
        border: '2px solid #dee2e6',
        backgroundColor: 'transparent',
        transition: 'all 0.3s ease'
    },
    filterButtonActive: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        color: 'white',
        transform: 'scale(1.05)'
    },
    orderSection: {
        position: 'sticky',
        top: '20px',
        height: 'fit-content'
    },
    orderSectionMobile: {
        position: 'relative',
        marginTop: '1rem'
    },
    searchInput: {
        padding: '0.75rem 1rem',
        border: '2px solid #007bff',
        fontSize: '1rem',
        transition: 'all 0.3s ease'
    },
    searchInputMobile: {
        padding: '0.6rem 0.8rem',
        fontSize: '0.9rem'
    },
    priceText: {
        color: '#28a745',
        fontWeight: 'bold',
        fontSize: '1.1rem'
    },
    priceTextMobile: {
        fontSize: '0.9rem'
    },
    table: {
        fontSize: '0.9rem'
    },
    tableMobile: {
        fontSize: '0.8rem'
    },
    headerCard: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '1rem',
        color: 'white',
        marginBottom: '1rem'
    },
    headerCardMobile: {
        padding: '0.75rem',
        borderRadius: '12px'
    }
};

function generateOrderCode() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const orderCode = `${day}${month}${year}${hours}${minutes}${seconds}`;
    return orderCode;
}

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    // Check screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const saveOrder = async () => {
        try {
            const userID = document.getElementById('cusID').value;
            const orderID = document.getElementById('bill').value;
            const date = document.getElementById('date').value;
            const response = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                body: JSON.stringify({
                    orderID, date, userID
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            alert(error);
        }
    }

    const expend = async () => {
        const amount = document.getElementById('amount').value;
        const id = document.getElementById('cusID').value;
        const money = parseFloat(amount.replace(/,/g, ''));

        try {
            const response = await fetch('http://localhost:3000/api/takeoutmoney', {
                method: 'PUT',
                body: JSON.stringify({ money, id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 400 || response.status === 404) {
                Swal.fire({
                    title: 'ເງິນໃນບັນຊີບໍ່ພຽງພໍ!',
                    icon: 'warning',
                    text: 'ກະລຸນາເຕີມເງິນເຂົ້າບັນຊີຂອງທ່ານ',
                    confirmButtonText: 'ຢືນຢັນ',
                    customClass: {
                        popup: 'swal-custom-font',
                    }
                });
                return false;
            }

            if (response.status === 200) {
                const result = await response.json();
                return true;
            } else {
                alert('Failed to record expenditure');
                return false;
            }
        } catch (error) {
            console.error('Error recording expenditure:', error);
            return false;
        }
    };

    const saveDetail = async () => {
        const orderID = document.getElementById('bill').value;

        for (const item of orderList) {
            const detail = {
                orderID: orderID,
                productID: item.id,
                saleQty: item.quantity,
                total: item.price * item.quantity
            };
            try {
                const response = await fetch('http://localhost:3000/api/detail', {
                    method: 'POST',
                    body: JSON.stringify(detail),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.status === 200) {
                    console.log(`Saved detail for product ${item.id}`);
                } else {
                    console.error(`Failed to save detail for product ${item.id}`);
                }
            } catch (error) {
                console.error(`Error saving detail for product ${item.id}:`, error);
            }
            const quantity = item.quantity;
            const productID = item.id;
            try {
                await fetch('http://localhost:3000/api/editproduct', {
                    method: 'PUT',
                    body: JSON.stringify({ quantity, productID }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            } catch (error) {
                alert(error);
            }
        }
    }

    const Payment = async () => {
        try {
            const orderID = document.getElementById('bill').value;
            const money = document.getElementById('amount').value;
            const amount = parseFloat(money.replace(/,/g, ''));
            await fetch('http://localhost:3000/api/payment', {
                method: 'POST',
                body: JSON.stringify({ orderID, amount }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            alert(error);
        }
    }

    const saveOrderDetail = async () => {
        const success = await expend();
        if (!success) {
            return;
        }
        await saveOrder();
        await saveDetail();
        await Payment();
        Swal.fire({
            title: 'ການສັ່ງຊື້ຂອງທ່ານສຳເລັດ',
            icon: 'success',
            text: 'ພວກເຮົາຈະຈັດສິນຄ້າສົ່ງໃຫ້ທ່ານໃຫ້ໄວທີ່ສຸດ',
            confirmButtonText: 'ຕົກລົງ',
            customClass: {
                popup: 'swal-custom-font',
            }
        }).then(() => {
            window.location.reload();
        });

        setOrderList([]);
    };

   const showConfirmDialog = () => {
        const sumprice = Number(document.getElementById('amount').value.replace(/,/g, ''));

        if (sumprice === 0 || isNaN(sumprice)) {
            Swal.fire({
                title: 'ບໍ່ມີລາຍການສິນຄ້າ',
                icon: 'warning',
                text: 'ກະລຸນາເພີ່ມລາຍການສິນຄ້າ',
                confirmButtonText: 'ຢືນຢັນ',
                customClass: {
                    popup: 'swal-custom-font',
                }
            });
            return;
        }

        const billCode = document.getElementById("bill")?.value || "N/A";
        const billDate = document.getElementById("date")?.value || new Date().toLocaleDateString();
        const orderHtml = `
    <div style="text-align: left;">
      <p><strong>ລະຫັດໃບບິນ:</strong> ${billCode}</p>
      <p><strong>ວັນທີ:</strong> ${billDate}</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead>
          <tr>
            <th style="border-bottom: 1px solid #ccc;">ລະຫັດສິນຄ້າ</th>
            <th style="border-bottom: 1px solid #ccc;">ສິນຄ້າ</th>
            <th style="border-bottom: 1px solid #ccc;">ລາຄາ</th>
            <th style="border-bottom: 1px solid #ccc;">ຈຳນວນ</th>
            <th style="border-bottom: 1px solid #ccc;">ລວມ</th>
          </tr>
        </thead>
        <tbody>
          ${orderList.map(item => `
            <tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.price.toLocaleString()}</td>
              <td>${item.quantity}</td>
              <td>${(item.price * item.quantity).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div style="margin-top: 30px; font-weight: bold; text-align: right">ລວມທັງໝົດ: ${calculateTotal().toLocaleString()} ກີບ</div>
    </div>
  `;

        Swal.fire({
            title: 'ໃບບິນຊຳລະເງິນ',
            html: orderHtml,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'ບັນທຶກ',
            cancelButtonText: 'ຍົກເລີກ',
            width: '500px',
            customClass: {
                title: 'swal-custom-font',
                htmlContainer: 'swal-custom-font',
                confirmButton: 'swal-custom-font',
                cancelButton: 'swal-custom-font',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                saveOrderDetail();
            }
        });
    };

    const checkProductQty = async (id) => {
        try {
            const response = await fetch('http://localhost:3000/api/checkproduct', {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                const qty = data.qty;
                return qty > 20;
            } else {
                console.error('Request failed with status:', response.status);
                return false;
            }
        } catch (error) {
            console.log('Error checking product quantity:', error);
            return false;
        }
    };

    useEffect(() => {
        const datenow = new Date();
        const date = datenow.toISOString().split('T')[0];
        document.getElementById('date').value = date;
        document.getElementById('bill').value = generateOrderCode();
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            document.getElementById('cusID').value = user.userID;
            document.getElementById('user').textContent = user.userName;
        }
        AOS.init({ duration: 800 });

        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => {
                const productsWithImages = data.map(prod => {
                    let imageSrc = '';

                    if (prod.image && prod.image.data) {
                        const base64String = btoa(
                            new Uint8Array(prod.image.data).reduce(
                                (data, byte) => data + String.fromCharCode(byte), ''
                            )
                        );
                        imageSrc = `data:image/jpeg;base64,${base64String}`;
                    }

                    return {
                        id: prod.productID || prod.id || '',
                        name: prod.productName || prod.name || '',
                        type: prod.categoryName ? String(prod.categoryName) : prod.type || '',
                        unit: prod.unitName ? String(prod.unitName) : prod.unit || '',
                        price: prod.saleprice || prod.price || 0,
                        image: imageSrc || '',
                        qty: prod.qty || 0,
                        imprice: prod.imprice || 0
                    };
                });
                setProducts(productsWithImages);
            })
            .catch(err => console.error('Failed to fetch products:', err));
    }, []);

    const handleQuantityChange = (productId, value) => {
        setQuantities(prev => ({ ...prev, [productId]: value }));
    };

    const addToOrder = async (product, quantity) => {
        if (quantity <= 0) return;

        const isAvailable = await checkProductQty(product.id);
        if (!isAvailable) {
            Swal.fire({
                title: 'ຕ້ອງຂໍອະໄພດ້ວຍ!',
                icon: 'warning',
                text: 'ລາຍການນີ້ສິນຄ້າໃກ້ໝົດແລ້ວ ບໍ່ພຽງພໍໃຫ້ສັ່ງຊື້',
                confirmButtonText: 'ຕົກລົງ',
                customClass: {
                    popup: 'swal-custom-font',
                }
            });
            return;
        }

        const existing = orderList.find(item => item.id === product.id);
        if (existing) {
            setOrderList(orderList.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            setOrderList([...orderList, { ...product, quantity }]);
        }
    };

    const removeFromOrder = (productId) => {
        setOrderList(orderList.filter(item => item.id !== productId));
    };

    const clearOrder = () => setOrderList([]);

    const calculateTotal = () => orderList.reduce((total, item) => total + item.price * item.quantity, 0);

    const filteredProducts = products.filter(product => {
        const matchesSearch = Object.values(product).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesSearch && (filterType === '' || product.type === filterType);
    });
    const uniqueTypes = [...new Set(products.map(p => p.type))];

    const renderMobileProduct = (product) => {
        const quantity = quantities[product.id] || 1;
        return (
            <div key={product.id} style={styles.mobileProductCard}>
                {product.image ? (
                    <img src={product.image} style={styles.productImageMobile} alt={product.name} />
                ) : (
                    <div style={{ 
                        ...styles.productImageMobile, 
                        backgroundColor: '#f8f9fa', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        color: '#6c757d'
                    }}>
                        ບໍ່ມີຮູບ
                    </div>
                )}
                <div style={styles.mobileProductInfo}>
                    <h6 className="mb-1 fw-bold" style={{ fontSize: '0.9rem' }}>{product.name}</h6>
                    <p className="mb-1 text-muted" style={{ fontSize: '0.75rem' }}>
                        ລະຫັດ: {product.id} | {product.type}
                    </p>
                    <p className="mb-0" style={{ ...styles.priceText, ...styles.priceTextMobile }}>
                        {product.price.toLocaleString()} ກີບ/{product.unit}
                    </p>
                </div>
                <div style={styles.mobileProductActions}>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                        style={{ ...styles.quantityInput, ...styles.quantityInputMobile }}
                    />
                    <button 
                        style={{ ...styles.addButton, ...styles.addButtonMobile }}
                        onClick={() => addToOrder(product, quantity)}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        <FontAwesomeIcon icon={faPlus} /> ເພີ່ມ
                    </button>
                </div>
            </div>
        );
    };

    const renderDesktopProduct = (product) => {
        const quantity = quantities[product.id] || 1;
        return (
            <div key={product.id} className="card mb-3" style={styles.card}>
                <div className="row g-0 align-items-center">
                    <div className="col-md-3 text-center p-2">
                        {product.image ? (
                            <img src={product.image} style={styles.productImage} alt={product.name} />
                        ) : (
                            <div style={{ 
                                ...styles.productImage, 
                                backgroundColor: '#f8f9fa', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: '#6c757d'
                            }}>
                                ບໍ່ມີຮູບພາບ
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <div className="card-body" style={styles.cardBody}>
                            <h5 className="card-title mb-2">{product.name}</h5>
                            <p className="card-text mb-1">
                                <small className="text-muted">ລະຫັດ: {product.id}</small>
                            </p>
                            <p className="card-text mb-1">
                                <span className="badge bg-secondary">{product.type}</span>
                            </p>
                            <p className="card-text mb-0" style={styles.priceText}>
                                {product.price.toLocaleString()} ກີບ/{product.unit}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex flex-column align-items-center p-3">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                            className="form-control mb-2 text-center"
                            style={styles.quantityInput}
                        />
                        <button 
                            style={styles.addButton}
                            onClick={() => addToOrder(product, quantity)}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 4px 15px rgba(255, 193, 7, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 2px 8px rgba(255, 193, 7, 0.3)';
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} className="me-1" /> ເພີ່ມ
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ fontFamily: 'Noto Sans Lao', backgroundColor: '#f8f9ff', minHeight: '100vh' }}>
            <Mynavbar />
            <div className={`mt-3 ${isMobile ? 'mx-2' : 'mx-4'}`}>
                <div className={`row ${isMobile ? 'g-2' : 'g-4'}`}>
                    <div className={isMobile ? 'col-12' : 'col-md-7'}>
                        {/* Banner */}
                        <img 
                            src="https://www.shutterstock.com/image-vector/shopping-online-on-phone-podium-260nw-1886650081.jpg" 
                            alt="banner" 
                            style={isMobile ? { ...styles.banner, ...styles.bannerMobile } : styles.banner}
                            data-aos="fade-down"
                        />
                        
                        {/* Search */}
                        <div className="input-group mb-3" data-aos="fade-right">
                            <span className="input-group-text" style={{ 
                                background: 'linear-gradient(135deg, #007bff, #0056b3)',
                                border: 'none',
                                color: 'white'
                            }}>
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                            <input
                                type="text"
                                className="form-control fw-bold"
                                placeholder="ຄົ້ນຫາສິນຄ້າ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={isMobile ? { ...styles.searchInput, ...styles.searchInputMobile } : styles.searchInput}
                            />
                        </div>

                        {/* Filter buttons */}
                        <div className={`mb-3 ${isMobile ? 'text-center' : ''}`} data-aos="fade-left">
                            <button 
                                style={{
                                    ...styles.filterButton,
                                    ...(filterType === '' ? styles.filterButtonActive : {})
                                }}
                                onClick={() => setFilterType('')}
                            >
                                <FontAwesomeIcon icon={faFilter} className="me-1" /> ທັງໝົດ
                            </button>
                            {uniqueTypes.map(type => (
                                <button 
                                    key={type} 
                                    style={{
                                        ...styles.filterButton,
                                        ...(filterType === type ? styles.filterButtonActive : {})
                                    }}
                                    onClick={() => setFilterType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* Products */}
                        <div 
                            style={isMobile ? styles.scrollAreaMobile : styles.scrollArea} 
                            data-aos="zoom-out"
                        >
                            {filteredProducts.length === 0 ? (
                                <div className="text-center p-4">
                                    <FontAwesomeIcon icon={faSearch} size="3x" className="text-muted mb-3" />
                                    <p className="h5 text-muted">ບໍ່ພົບສິນຄ້າທີ່ຄົ້ນຫາ</p>
                                </div>
                            ) : (
                                filteredProducts.map(product => 
                                    isMobile ? renderMobileProduct(product) : renderDesktopProduct(product)
                                )
                            )}
                        </div>
                    </div>

                    {/* Order section */}
                    <div className={isMobile ? 'col-12' : 'col-md-5'}>
                        <div style={isMobile ? styles.orderSectionMobile : styles.orderSection}>
                            {/* Header */}
                            <div style={isMobile ? { ...styles.headerCard, ...styles.headerCardMobile } : styles.headerCard} data-aos="fade-down">
                                <h5 className="fw-bold text-center mb-2">
                                    <FontAwesomeIcon icon={isMobile ? faMobile : faDesktop} className="me-2" />
                                    ຜູ້ໃຊ້ລະບົບ: <span id="user" className='text-warning'></span>
                                </h5>
                            </div>

                            <h4 className='fw-bold text-center mb-3' data-aos="fade-left">
                                <FontAwesomeIcon icon={faShoppingCart} className="me-2 text-primary" />
                                ລາຍການທີ່ສັ່ງຊື້
                            </h4>

                            <div className="card shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }} data-aos="fade-left">
                                <div className="card-header" style={{ 
                                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                                    border: 'none',
                                    padding: isMobile ? '0.75rem' : '1rem'
                                }}>
                                    <div className="form-group mb-3">
                                        <label className="fw-bold text-primary">
                                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                                            ໄອດີລູກຄ້າ:
                                        </label>
                                        <input type="text" className="form-control mt-1" readOnly id='cusID' style={{ 
                                            borderRadius: '8px',
                                            border: '2px solid #dee2e6'
                                        }} />
                                    </div>
                                    <div className="row g-2">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className='fw-bold text-primary'>ລະຫັດໃບບິນ:</label>
                                                <input type="text" className="form-control mt-1" id="bill" readOnly style={{ 
                                                    borderRadius: '8px',
                                                    border: '2px solid #dee2e6',
                                                    fontSize: isMobile ? '0.8rem' : '1rem'
                                                }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className='fw-bold text-primary'>ປີ-ເດືອນ-ວັນທີ:</label>
                                                <input type="text" className="form-control mt-1" id="date" readOnly style={{ 
                                                    borderRadius: '8px',
                                                    border: '2px solid #dee2e6',
                                                    fontSize: isMobile ? '0.8rem' : '1rem'
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order table */}
                                <div className="table-responsive">
                                    <table className={`table table-striped m-0 ${isMobile ? 'table-sm' : ''}`} style={isMobile ? styles.tableMobile : styles.table}>
                                        <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
                                            <tr>
                                                <th style={{ border: 'none', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>ລະຫັດ</th>
                                                <th style={{ border: 'none', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>ຊື່ສິນຄ້າ</th>
                                                {!isMobile && <th style={{ border: 'none', fontSize: '0.9rem' }}>ລາຄາ</th>}
                                                <th style={{ border: 'none', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>ຈຳນວນ</th>
                                                <th style={{ border: 'none', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>ລວມ</th>
                                                <th style={{ border: 'none', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>ຈັດການ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderList.length === 0 ? (
                                                <tr>
                                                    <td colSpan={isMobile ? "5" : "6"} className="text-center py-4">
                                                        <FontAwesomeIcon icon={faShoppingCart} size="2x" className="text-muted mb-2" />
                                                        <p className="text-muted mb-0">ບໍ່ມີລາຍການສັ່ງຊື້</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                orderList.map(item => (
                                                    <tr key={item.id} style={{ borderLeft: '4px solid #007bff' }}>
                                                        <td style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>{item.id}</td>
                                                        <td style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                                                            <div className="fw-bold">{item.name}</div>
                                                            {isMobile && (
                                                                <small className="text-muted">
                                                                    {item.price.toLocaleString()} ກີບ
                                                                </small>
                                                            )}
                                                        </td>
                                                        {!isMobile && (
                                                            <td style={{ fontSize: '0.8rem', color: '#28a745', fontWeight: 'bold' }}>
                                                                {item.price.toLocaleString()}
                                                            </td>
                                                        )}
                                                        <td style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                                                            <span className="badge bg-primary">{item.quantity}</span>
                                                        </td>
                                                        <td style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#28a745', fontWeight: 'bold' }}>
                                                            {(item.price * item.quantity).toLocaleString()}
                                                        </td>
                                                        <td>
                                                            <button 
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => removeFromOrder(item.id)}
                                                                style={{ 
                                                                    borderRadius: '20px',
                                                                    padding: isMobile ? '0.2rem 0.5rem' : '0.3rem 0.6rem',
                                                                    fontSize: isMobile ? '0.7rem' : '0.8rem'
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                                {!isMobile && ' ຍົກເລີກ'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Total and actions */}
                                <div className="card-footer" style={{ 
                                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                                    border: 'none',
                                    padding: isMobile ? '0.75rem' : '1rem'
                                }}>
                                    <div className={`${isMobile ? 'd-block' : 'd-flex justify-content-between align-items-center'}`}>
                                        <div className={`${isMobile ? 'mb-3' : ''}`}>
                                            <h5 className="fw-bold text-primary mb-2">ລວມທັງໝົດ:</h5>
                                            <input 
                                                type="text" 
                                                id='amount' 
                                                readOnly 
                                                className="form-control fw-bold text-success" 
                                                value={`${calculateTotal().toLocaleString()}`}
                                                style={{ 
                                                    borderRadius: '8px',
                                                    border: '2px solid #28a745',
                                                    fontSize: isMobile ? '1rem' : '1.2rem',
                                                    textAlign: 'center',
                                                    backgroundColor: '#f8fff8'
                                                }}
                                            />
                                        </div>
                                        <div className={`${isMobile ? 'd-flex gap-2' : ''}`}>
                                            <button 
                                                className={`btn btn-outline-danger ${isMobile ? 'flex-fill' : 'btn-lg me-3'}`} 
                                                onClick={clearOrder}
                                                style={{ 
                                                    borderRadius: '25px',
                                                    fontWeight: 'bold',
                                                    padding: isMobile ? '0.6rem' : '0.5rem 2rem'
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="me-1" />
                                                {isMobile ? 'ລ້າງ' : 'ລ້າງລາຍການ'}
                                            </button>
                                            <button 
                                                className={`btn btn-success ${isMobile ? 'flex-fill' : 'btn-lg'}`} 
                                                onClick={showConfirmDialog}
                                                style={{ 
                                                    borderRadius: '25px',
                                                    fontWeight: 'bold',
                                                    background: 'linear-gradient(135deg, #28a745, #20c997)',
                                                    border: 'none',
                                                    padding: isMobile ? '0.6rem' : '0.5rem 2rem',
                                                    boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'scale(1.05)';
                                                    e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'scale(1)';
                                                    e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
                                                {isMobile ? 'ຊຳລະ' : 'ຊຳລະເງິນ'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for mobile optimizations */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .swal2-popup {
                        font-size: 0.9rem !important;
                    }
                    
                    .table-responsive {
                        font-size: 0.8rem;
                    }
                    
                    .btn {
                        transition: all 0.3s ease;
                    }
                    
                    .card {
                        transition: all 0.3s ease;
                    }
                    
                    .card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                    }
                }
                
                .swal-custom-font {
                    font-family: 'Noto Sans Lao', sans-serif !important;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #007bff, #0056b3);
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #0056b3, #004085);
                }
                
                /* Animation classes */
                .fade-in {
                    animation: fadeIn 0.5s ease-in;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .pulse {
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;