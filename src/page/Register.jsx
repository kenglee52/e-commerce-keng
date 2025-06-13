import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './App.css';
import { Link } from 'react-router-dom';
const Register = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const navigate = useNavigate();
  const register = async () => {
    const name = document.getElementById('name').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const tel = document.getElementById('tel').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // ກວດສອບຄ່າຫວ່າງ
    if (!name || !gender || !tel || !email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'ຂໍ້ມູນຍັງປ້ອນບໍ່ຄົບ',
        text: 'ກະລຸນາແ້ອນຂໍ້ມູນໃຫ້ຄົບທຸກຊ່ອງ',
        confirmButtonText: 'ຕົກລົງ',
        customClass: {
          popup: 'swal-custom-font'
        }
      })
      return;
    }

    // ກວດສອບ Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ',
        text: 'ກະລຸນາປ້ອນຮູບແບບອີເມວໃໝ່ໃຫ້ຖືກຕ້ອງ',
        confirmButtonText: 'ຕົກລົງ',
        customClass: {
          popup: 'swal-custom-font'
        }
      })
      return;
    }

    // ກວດສອບເບີໂທ: ຕ້ອງເປັນ 020xxxxxxxx ທັງໝົດ 11 ຕົວ
    const telRegex = /^020\d{8}$/;
    if (!telRegex.test(tel)) {
      Swal.fire({
        icon: 'warning',
        title: 'ຮູບແບບເບີໂທບໍ່ຖືກຕ້ອງ',
        text: 'ກະລຸນາປ້ອນຮູບແບບເບີໂທໃຫ້ຄົບ 11 ຕົວ (020XXXXXXXX)',
        confirmButtonText: 'ຕົກລົງ',
        customClass: {
          popup: 'swal-custom-font'
        }
      })
      return;
    }

    // ກວດສອບ Password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: 'warning',
        title: 'ຮູບແບບລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
        text: 'ກະລຸນາປ້ອນຮູບແບບລະຫັດຜ່ານໃໝ່ໃຫ້ຖືກຕ້ອງ',
        confirmButtonText: 'ຕົກລົງ',
        customClass: {
          popup: 'swal-custom-font'
        }
      })
      return;
    }

    try {
      const response = await fetch('https://kengapi.onrender.com/api/register', {
        method: 'POST',
        body: JSON.stringify({ name, gender, tel, email, password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

      const result = await response.json();

      if (response.status === 200) {
        alert(result.message); // ສຳເລັດ
        navigate('/'); // 👉 ໄປຫາ App.jsx
      } else {
        alert(result.message); // ລົ້ມເຫຼວ
      }

    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'ມີຂໍ້ຜິດພາດໃນການລົງທະບຽນ',
        text: 'ກະລຸນາລອງໃໝ່ອີກຄັ້ງ',
        confirmButtonText: 'ຕົກລົງ',
        customClass: {
          popup: 'swal-custom-font'
        }
      });
    }
  };

  return (
    <>
      <style>
        {`
          :root {
            --bs-primary: #e83e6c;
            --bs-primary-rgb: 232, 62, 140;
          }

          @keyframes animatedBackground {
            0% {
              background: linear-gradient(135deg, #f9c5d1, #fbc2eb);
            }
            33% {
              background: linear-gradient(135deg, #eafffb, #3bb4e7);
            }
            66% {
              background: linear-gradient(135deg, #f7ffea, #b4e93b);
            }
            100% {
              background: linear-gradient(135deg, #f9c5d1, #fbc2eb);
            }
          }

          .animated-bg {
            animation: animatedBackground 12s infinite ease-in-out;
          }

          .btn-pink {
            background-color: #e83e8c;
            color: white;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(232, 62, 140, 0.4);
          }

          .btn-pink:hover {
            background-color: #e83e6c;
            transform: scale(1.03);
            box-shadow: 0 6px 14px rgba(214, 51, 132, 0.6);
          }

          .form-control {
            transition: all 0.3s ease;
            background-color: #ffffffcc;
          }

          .form-control:focus {
            border-color: #e83e6c;
            box-shadow: 0 0 0 0.2rem rgba(232, 62, 140, 0.25);
          }

          .card-glass {
            background-color: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border-radius: 1.5rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          }

          .form-icon {
            margin-right: 10px;
            color: #e83e6c;
          }
        `}
      </style>

      <div className="min-vh-100 d-flex align-items-center animated-bg" style={{ fontFamily: '"Noto Sans Lao", sans-serif' }}>
        <div className="container" style={{margin: '15px 15px'}}>
          <div className="row shadow-lg card-glass overflow-hidden">
            {/* Left Panel */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 text-white bg-primary" data-aos="fade-right">
              <h2 className="mb-3"><i className="fas fa-hand-sparkles me-2"></i>ຍິນດີຕ້ອນຮັບ!</h2>
              <p className="text-center">
                ລົງທະບຽນເພື່ອຮ່ວມປະສົບການຊື້ຂາຍອັນສຸດຍອດ ກັບຮ້ານຄ້າອອນລາຍຂອງພວກເຮົາ
              </p>
              <img
                src="https://digitalmarketingindonesia.com/wp-content/uploads/2023/12/Screenshot-2023-12-21-210124.webp"
                alt="Welcome"
                className="img-fluid rounded shadow mt-3"
              />
            </div>

            {/* Right Panel */}
            <div className="col-md-6 mt-3" data-aos="fade-left">
              <h3 className="text-center mb-4"><i className="fas fa-user-plus me-2"></i>ລົງທະບຽນບັນຊີໃໝ່</h3>
              <form>
                <div className="mb-3">
                  <label className="form-label"><i className="fas fa-user form-icon"></i>ຊື່ ແລະ ນາມສະກຸນ</label>
                  <input id='name' type="text" className="form-control border border-3 border-info" placeholder="ປ້ອນຊື່ ແລະ ນາມສະກຸນ" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><i className="fas fa-venus-mars form-icon"></i>ເພດ</label>
                  <select id='gender' className="form-control border border-3 border-info">
                    <option value="ຊາຍ">ຊາຍ</option>
                    <option value="ຍິງ">ຍິງ</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label"><i className="fas fa-phone form-icon"></i>ເບີໂທລະສັບ</label>
                  <input id='tel' type="number" className="form-control border border-3 border-info" placeholder="020XXXXXXXX" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><i className="fas fa-envelope form-icon"></i>ອີເມວ</label>
                  <input id='email' type="email" className="form-control border border-3 border-info" placeholder="example@gmail.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><i className="fas fa-lock form-icon"></i>ລະຫັດຜ່ານ</label>
                  <input id='password' type="password" className="form-control border border-3 border-info" placeholder="********" />
                </div>
                <button type="button" onClick={register} className="btn btn-pink w-100 fw-bold">
                  <i className="fas fa-user-check me-2"></i>ລົງທະບຽນ
                </button>
              </form>
              <p className="mt-3 text-center text-muted">
                ມີບັນຊີແລ້ວ?{' '}
                <Link to="/login" className="text-decoration-none">
                  <i className="fas fa-sign-in-alt me-1"></i>ເຂົ້າລະບົບ
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
