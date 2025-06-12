import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// Import AOS library
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Swal from "sweetalert2";
// Import Google Fonts (Noto Sans Lao)
const fontUrl = "https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap";

const Login = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  const navigate = useNavigate();
  const login = async () => {
    try {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // ກວດສອບວ່າ email ຫຼື password ວ່າງ
      if (!email || !password) {
        Swal.fire({
          title: 'ກະລຸນາປ້ອນອີເມວ ແລະ ລະຫັດຜ່ານ',
          icon: 'warning',
          confirmButtonText: 'ຕົກລົງ',
          customClass: {
            popup: 'swal-custom-font',
          }
        });
        return;
      }

      const response = await fetch('https://kengapi.onrender.com/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const result = await response.json();
      if (response.status === 401) {
        Swal.fire({
          title: 'ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
          icon: 'error',
          text: 'ກະລຸນາປ້ອນໃໝ່ອີກຄັ້ງ',
          confirmButtonText: 'ລອງໃໝ່ອີກຄັ້ງ',
          customClass: {
            popup: 'swal-custom-font',
          }
        });
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        return false;
      }
      if (response.status === 500) {
        Swal.fire({
          title: 'ລະບົບມີບັນຫາ',
          icon: 'error',
          text: 'ກະລຸນາເລີ່ມໃໝ່ໃນຄວາມໃຈ',
          confirmButtonText: 'ແນ່ນອນ',
          customClass: {
            popup: 'swal-custom-font',
          }
        });
        return false;
      }
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate("/dashboard");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกัน reload หน้า
    login();
  };

  return (
    <div
      className="vh-100 vw-100 d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(135deg,rgb(79, 175, 182) 0%,rgb(243, 199, 234) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Noto Sans Lao', sans-serif"
      }}
    >
      <div
        className="card shadow-lg p-4 border border-3 border-info"
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(16px)",
          borderRadius: "2rem",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)"
        }}
        data-aos="zoom-in"
      >
        <div className="text-center mb-4" data-aos="fade-down">
          <img
            src="https://img.icons8.com/color/96/000000/shopping-cart.png"
            alt="E-Commerce Logo"
            className="mb-2"
            data-aos="flip-left"
            style={{ background: "rgba(255,255,255,0.7)", borderRadius: "50%", padding: "8px" }}
          />
          <h2 className="fw-bold" style={{ color: "#e75488" }}>ຍິນດີຕ້ອນຮັບ!</h2>
          <p className="text-muted">ເຂົ້າສູ່ບັນຊີຮ້ານຄ້າອອນລາຍຂອງທ່ານ</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3" data-aos="fade-right">
            <label htmlFor="email" className="form-label fw-semibold">
              ອີເມວ
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="ປ້ອນອີເມວ"
              required
              style={{ fontFamily: "'Noto Sans Lao', sans-serif" }}
            />
          </div>
          <div className="mb-3" data-aos="fade-left">
            <label htmlFor="password" className="form-label fw-semibold">
              ລະຫັດຜ່ານ
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="ປ້ອນລະຫັດຜ່ານ"
              required
              style={{ fontFamily: "'Noto Sans Lao', sans-serif" }}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                ຈື່ຈຳຂ້ອຍ
              </label>
            </div>
            <a href="#" className="text-decoration-none" style={{ color: "#e75480" }}>
              ລືມລະຫັດ?
            </a>
          </div>
          <button
            type="button"
            onClick={login}
            className="btn btn-lg w-100"
            style={{
              background: "linear-gradient(90deg, #e75480 0%,rgb(120, 26, 95) 100%)",
              color: "#fff",
              fontWeight: "bold",
              fontFamily: "'Noto Sans Lao', sans-serif",
              boxShadow: "0 4px 12px rgba(231,84,128,0.15)"
            }}
            data-aos="zoom-in-up"
          >
            ເຂົ້າລະບົບ
          </button>
        </form>
        <div className="text-center mt-4" data-aos="fade-up">
          <span className="text-muted">ຍັງບໍ່ມີບັນຊີ?</span>
          <Link to="/register" className="ms-2 text-decoration-none fw-semibold" style={{ color: "#e75480" }}>
            ສະໝັກບັນຊີ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
