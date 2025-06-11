import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap CDN (moved inside the component to be managed by React)
// Noto Sans Lao font CDN (moved inside the component)

// Shoes data with color themes
const shoes = [
  {
    name: "ມັງກອນ ສີຊົງພູ",
    price: "355,000 ₭",
    img: "https://pngimg.com/d/running_shoes_PNG5816.png",
    color: "#e94bb4",
    bg: "linear-gradient(135deg, #fbeaff 0%, #e94bb4 100%)",
    bubble: "rgba(233,75,180,0.15)",
    btn: "#e94bb4",
  },
  {
    name: "ມັງກອນ ສີຟ້າ",
    price: "355,000 ₭",
    img: "https://pngimg.com/d/running_shoes_PNG5820.png",
    color: "#3bb4e7",
    bg: "linear-gradient(135deg, #eafffb 0%, #3bb4e7 100%)",
    bubble: "rgba(59,180,231,0.15)",
    btn: "#3bb4e7",
  },
  {
    name: "ມັງກອນ ສີຂຽວ",
    price: "355,000 ₭",
    img: "https://pngimg.com/d/running_shoes_PNG5819.png",
    color: "#b4e93b",
    bg: "linear-gradient(135deg, #f7ffea 0%, #b4e93b 100%)",
    bubble: "rgba(180,233,59,0.15)",
    btn: "#b4e93b",
  },
];

// Circle menu items (Lao)
const menuItems = [
  { icon: "👟", label: "ຮອງເທົ້າ" },
  { icon: "🧢", label: "ໝວກ" },
  { icon: "👜", label: "ກະເປົາ" },
  { icon: "🧦", label: "ຖົງຕີນ" },
  { icon: "👕", label: "ເສື້ອ" },
  { icon: "🕶️", label: "ແວ່ນຕາ" },
];

// Bubble animation component
function Bubbles({ color }) {
  const bubbles = [
    { top: "10%", left: "15%", size: 90, delay: "0s" },
    { top: "20%", left: "80%", size: 70, delay: "0.5s" },
    { top: "60%", left: "10%", size: 60, delay: "1s" },
    { top: "70%", left: "70%", size: 100, delay: "1.5s" },
    { top: "40%", left: "50%", size: 50, delay: "0.7s" },
    { top: "80%", left: "40%", size: 40, delay: "1.2s" },
    { top: "30%", left: "60%", size: 60, delay: "0.3s" },
  ];
  return (
    <div style={{ pointerEvents: "none" }}>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="position-absolute rounded-circle"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            background: color,
            opacity: 0.7,
            filter: "blur(1px)",
            animation: `bubbleMove 6s ease-in-out infinite`,
            animationDelay: b.delay,
            zIndex: 0,
          }}
        />
      ))}
      <style>
        {`
        @keyframes bubbleMove {
          0% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.15) translateY(-20px);}
          100% { transform: scale(1) translateY(0);}
        }
        `}
      </style>
    </div>
  );
}

// Circle Product Menu (moves every 1s, smooth effect)
function CircleMenu({ color }) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev + (360 / menuItems.length));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Adjusted radius and center for better mobile fit
  const radius = 70; // Smaller radius for mobile
  const center = 85; // Adjusted center for smaller circle
  const angleStep = (2 * Math.PI) / menuItems.length;

  return (
    <div
      className="position-relative mx-auto mb-5"
      style={{ width: 170, height: 170 }} // Smaller overall size
    >
      <div
        className="rounded-circle position-absolute top-0 start-0"
        style={{
          width: 170, // Smaller circle
          height: 170,
          background: color + "22",
          border: `4px solid ${color}`,
          boxShadow: `0 0 32px 0 ${color}44`,
        }}
      ></div>
      <div
        style={{
          width: 170, // Smaller circle for rotation
          height: 170,
          position: "absolute",
          top: 0,
          left: 0,
          transform: `rotate(${angle}deg)`,
          transition: "transform 0.8s cubic-bezier(.77,0,.18,1.01)",
        }}
      >
        {menuItems.map((item, i) => {
          const angleDeg = (i * 360) / menuItems.length;
          const angleRad = (angleDeg * Math.PI) / 180;
          // Adjust icon positions for smaller circle
          const x = center + radius * Math.cos(angleRad - Math.PI / 2) - 25; // Adjusted offset for icons
          const y = center + radius * Math.sin(angleRad - Math.PI / 2) - 25; // Adjusted offset for icons
          return (
            <div
              key={item.label}
              data-aos="zoom-in"
              className="position-absolute text-center"
              style={{
                left: x,
                top: y,
                width: 50, // Smaller icon size
                height: 50,
                background: color,
                color: "#fff",
                borderRadius: "50%",
                boxShadow: "0 4px 16px #0002",
                border: "2px solid #fff",
                fontWeight: "bold",
                fontSize: 20, // Smaller icon font size
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.8s cubic-bezier(.77,0,.18,1.01)",
                zIndex: 1,
                opacity: 0.9,
                cursor: "pointer",
                fontFamily: "'Noto Sans Lao', sans-serif",
                transform: `rotate(${-angle}deg)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = `rotate(${-angle}deg) scale(1.18)`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = `rotate(${-angle}deg) scale(1)`)
              }
            >
              <div>{item.icon}</div>
              {/* <div style={{ fontSize: 11, fontWeight: 500 }}>{item.label}</div> Optional: smaller label if needed */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShoeSlider({ shoeIdx, setShoeIdx }) {
  const [anim, setAnim] = useState("animate__fadeInRight");

  useEffect(() => {
    setAnim("animate__fadeInRight");
    const t = setTimeout(() => setAnim(""), 700);
    return () => clearTimeout(t);
  }, [shoeIdx]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShoeIdx((prev) => (prev + 1) % shoes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [setShoeIdx]);

  return (
    <div className="position-relative d-flex flex-column align-items-center w-100">
      {" "}
      {/* Added w-100 */}
      <div
        className={`animate__animated ${anim}`}
        style={{
          minHeight: 250, // Adjusted minHeight for mobile
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%", // Ensure container takes full width
        }}
      >
        <img
          src={shoes[shoeIdx].img}
          alt={shoes[shoeIdx].name}
          style={{
            width: "80%", // Made image width responsive
            maxWidth: 320, // Max width for larger screens
            height: "auto", // Maintain aspect ratio
            maxHeight: 220, // Max height for larger screens
            objectFit: "contain",
            filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.12))",
            zIndex: 2,
            transition: "filter 0.3s",
            fontFamily: "'Noto Sans Lao', sans-serif",
          }}
        />
      </div>
      {/* Slider controls - Adjusted positioning for mobile */}
      <button
        className="btn btn-light position-absolute top-50 start-0 translate-middle-y d-none d-sm-block" // Hide on xs, show on sm+
        style={{
          borderRadius: "50%",
          width: 44,
          height: 44,
          left: -30,
          opacity: 0.7,
          fontFamily: "'Noto Sans Lao', sans-serif",
        }}
        onClick={() => setShoeIdx((shoeIdx - 1 + shoes.length) % shoes.length)}
        aria-label="ກັບຄືນ"
        data-aos="fade-right"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <i className="bi bi-chevron-left" style={{ fontSize: 22, color: shoes[shoeIdx].color }} />
      </button>
      <button
        className="btn btn-light position-absolute top-50 end-0 translate-middle-y d-none d-sm-block" // Hide on xs, show on sm+
        style={{
          borderRadius: "50%",
          width: 44,
          height: 44,
          right: -30,
          opacity: 0.7,
          fontFamily: "'Noto Sans Lao', sans-serif",
        }}
        onClick={() => setShoeIdx((shoeIdx + 1) % shoes.length)}
        aria-label="ຖັດໄປ"
        data-aos="fade-left"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <i className="bi bi-chevron-right" style={{ fontSize: 22, color: shoes[shoeIdx].color }} />
      </button>

      {/* Mobile-friendly arrows at the bottom */}
      <div className="d-flex justify-content-center gap-3 mt-4 d-sm-none w-100">
        <button
          className="btn btn-light rounded-circle"
          style={{
            width: 40,
            height: 40,
            opacity: 0.8,
            backgroundColor: shoes[shoeIdx].color + "22", // Lighter background
            border: `2px solid ${shoes[shoeIdx].color}`,
          }}
          onClick={() => setShoeIdx((shoeIdx - 1 + shoes.length) % shoes.length)}
          aria-label="ກັບຄືນ"
        >
          <i className="bi bi-chevron-left" style={{ fontSize: 18, color: shoes[shoeIdx].color }} />
        </button>
        <button
          className="btn btn-light rounded-circle"
          style={{
            width: 40,
            height: 40,
            opacity: 0.8,
            backgroundColor: shoes[shoeIdx].color + "22", // Lighter background
            border: `2px solid ${shoes[shoeIdx].color}`,
          }}
          onClick={() => setShoeIdx((shoeIdx + 1) % shoes.length)}
          aria-label="ຖັດໄປ"
        >
          <i className="bi bi-chevron-right" style={{ fontSize: 18, color: shoes[shoeIdx].color }} />
        </button>
      </div>

      {/* Dots */}
      <div className="d-flex gap-2 mt-3 justify-content-center flex-wrap">
        {" "}
        {/* Added flex-wrap */}
        {shoes.map((s, i) => (
          <span
            key={i}
            onClick={() => setShoeIdx(i)}
            style={{
              width: 14, // Slightly smaller dots
              height: 14,
              borderRadius: "50%",
              background: i === shoeIdx ? s.color : "#eee",
              border: i === shoeIdx ? `2px solid ${s.color}` : "2px solid #eee",
              cursor: "pointer",
              display: "inline-block",
              transition: "all 0.3s",
            }}
            data-aos="zoom-in"
          />
        ))}
      </div>
      {/* Mini product cards - Hidden on very small screens, or adjust layout */}
      <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center d-none d-sm-flex">
        {" "}
        {/* Hide on xs, show on sm+, added flex-wrap */}
        {shoes.map((s, i) => (
          <div
            key={i}
            className="d-flex align-items-center px-2 py-1 shadow-sm"
            style={{
              background: "#fff",
              borderRadius: 12,
              border: i === shoeIdx ? `2px solid ${s.color}` : "2px solid #eee",
              cursor: "pointer",
              minWidth: 100, // Adjusted minWidth
              maxWidth: 150, // Added maxWidth
              transition: "all 0.3s",
              boxShadow: i === shoeIdx ? `0 2px 12px ${s.color}33` : "none",
              fontFamily: "'Noto Sans Lao', sans-serif",
            }}
            onClick={() => setShoeIdx(i)}
            data-aos="fade-up"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span
              style={{
                width: 28, // Smaller icon circle
                height: 28,
                borderRadius: "50%",
                background: s.color,
                display: "inline-block",
                marginRight: 8, // Adjusted margin
                border: "2px solid #fff",
              }}
            >
              <img
                src={s.img}
                alt={s.name}
                style={{
                  width: 24, // Smaller image
                  height: 24,
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))",
                  marginTop: 2,
                }}
              />
            </span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>{s.name}</div>{" "}
              {/* Smaller font */}
              <div style={{ fontWeight: 500, fontSize: 11, color: s.color }}>
                {" "}
                {/* Smaller font */}
                {s.price}
              </div>
            </div>
            <button
              className="btn btn-sm ms-1" // Smaller button and margin
              style={{
                background: s.color,
                color: "#fff",
                borderRadius: "50%",
                width: 24, // Smaller button
                height: 24,
                fontWeight: "bold",
                fontSize: 16, // Smaller font
                border: "none",
                boxShadow: "0 1px 4px #0001",
                fontFamily: "'Noto Sans Lao', sans-serif",
                transition: "transform 0.2s",
              }}
              data-aos="zoom-in"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.18)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Navbar({ color, setActive, sectionRefs }) {
  const navigate = useNavigate();

  const handleMenuClick = (idx) => {
    setActive(idx);
    const ref = sectionRefs[idx];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light py-3 sticky-top" // Added sticky-top
      style={{
        background: "#fff",
        borderBottom: `2px solid ${color}`,
        borderRadius: "0 0 32px 32px",
        boxShadow: "0 2px 16px #0001",
        zIndex: 10,
        fontFamily: "'Noto Sans Lao', sans-serif",
      }}
    >
      <div className="container px-3 px-md-4">
        {" "}
        {/* Adjusted padding */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#" style={{ fontSize: 20 }}>
          {" "}
          {/* Smaller font */}
          <i className="bi bi-bootstrap-reboot me-2" style={{ color }} />
          <span style={{ color }}>SHOX</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {["ໜ້າຫຼັກ", "ກ່ຽວກັບ", "ຮ້ານຄ້າ", "ຕິດຕໍ່"].map((item, i) => (
              <li className="nav-item mx-2" key={item}>
                <a
                  className={`nav-link fw-bold`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(i);
                  }}
                  style={{
                    color: "#222",
                    borderBottom: "none",
                    borderRadius: 0,
                    fontSize: 15, // Slightly smaller font
                    transition: "all 0.2s",
                    fontFamily: "'Noto Sans Lao', sans-serif",
                  }}
                  data-aos="fade-down"
                  onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#222")}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
              {" "}
              {/* Margin top for mobile, margin start for large screens */}
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="btn btn-outline-dark border border-3 border-dark fw-bold w-100" // Full width on mobile
                style={{ fontSize: 18, borderRadius: 24 }} // Slightly smaller font
              >
                ລົງທະບຽນ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// About Us Section
function AboutSection({ color, aboutRef }) {
  return (
    <section ref={aboutRef} className="py-5" style={{ minHeight: 400, fontFamily: "'Noto Sans Lao', sans-serif" }}>
      <div className="container px-4 px-md-5">
        {" "}
        {/* Adjusted padding */}
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
              alt="About us"
              className="img-fluid rounded-4 shadow"
              style={{ border: `4px solid ${color}` }}
            />
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <h2 className="fw-bold mb-3 text-center text-lg-start fs-4" style={{ color: "#fff", textShadow: "0 2px 8px #0002" }}>
              {" "}
              {/* Adjusted font size and alignment */}
              ກ່ຽວກັບ SHOX
            </h2>
            <p className="text-center text-lg-start" style={{ fontSize: 16, color: "#fff", textShadow: "0 2px 8px #0002" }}>
              {" "}
              {/* Adjusted font size and alignment */}
              SHOX ແມ່ນຍີ່ຫໍ້ຮອງເທົ້າທັນສະໄໝ ທີ່ມີຄວາມສະດວກສະບາຍ ແລະ ດີໄຊນເປັນເອກະລັກ. ພວກເຮົາມຸ່ງໝັ້ນສົ່ງມອບປະສົບການສວມໃສ່ທີ່ດີທີ່ສຸດ
              ໃຫ້ທຸກຄົນ ທຸກສະຖານທີ່. ຮອງເທົ້າຂອງພວກເຮົາລວມເອົາເທັກໂນໂລຊີ ແລະ ດີໄຊນເຂົ້າດ້ວຍກັນ.
            </p>
            <ul className="list-unstyled mt-4 ps-0 text-center text-lg-start">
              {" "}
              {/* Removed padding, adjusted alignment */}
              <li className="mb-2">
                <i className="bi bi-check-circle-fill me-2" style={{ color: "#fff" }} /> ວັດຖຸດິບຄຸນນະພາບສູງ
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill me-2" style={{ color: "#fff" }} /> ເທັກໂນໂລຊີຄວາມສະດວກສະບາຍ
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill me-2" style={{ color: "#fff" }} /> ຈັດສົ່ງໄວ ແລະ ຟຣີ
              </li>
              <li>
                <i className="bi bi-check-circle-fill me-2" style={{ color: "#fff" }} /> ບໍລິການລູກຄ້າ 24/7
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <CircleMenu color={color} />
        </div>
      </div>
    </section>
  );
}

// Shop Section
function ShopSection({ color, shoeIdx, setShoeIdx, shopRef }) {
  return (
    <section ref={shopRef} className="py-5" style={{ minHeight: 400, fontFamily: "'Noto Sans Lao', sans-serif" }}>
      <div className="container px-4 px-md-5">
        {" "}
        {/* Adjusted padding */}
        <h2 className="fw-bold mb-4 text-center fs-4" style={{ color: "#fff", textShadow: "0 2px 8px #0002" }}>
          {" "}
          {/* Adjusted font size */}
          ສິນຄ້າທີ່ເປັນທີ່ນິຍົມຫຼາຍໃນຊ່ວງນີ້
        </h2>
        <div className="row justify-content-center">
          {shoes.map((s, i) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={i}>
              {" "}
              {/* Full width on xs, 6 cols on md, 4 cols on lg */}
              <div
                className="card h-100 shadow-lg border-0"
                style={{
                  background: "#fff",
                  borderRadius: 24,
                  boxShadow: i === shoeIdx ? `0 4px 24px ${s.color}33` : "0 2px 12px #0001",
                  border: i === shoeIdx ? `2px solid ${s.color}` : "2px solid #eee",
                  transition: "all 0.3s",
                }}
                data-aos="zoom-in"
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={s.img}
                  alt={s.name}
                  className="card-img-top"
                  style={{
                    height: 160, // Slightly smaller image height
                    objectFit: "contain",
                    background: s.bg,
                    borderRadius: "24px 24px 0 0",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold fs-6">{s.name}</h5>{" "}
                  {/* Smaller font size */}
                  <p className="card-text fw-bold fs-6" style={{ color: s.color }}>
                    {s.price}
                  </p>{" "}
                  {/* Smaller font size */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection({ color, contactRef }) {
  return (
    <section ref={contactRef} className="py-5" style={{ minHeight: 400, fontFamily: "'Noto Sans Lao', sans-serif" }}>
      <div className="container px-4 px-md-5">
        {" "}
        {/* Adjusted padding */}
        <h2 className="fw-bold mb-4 text-center fs-4" style={{ color: "#fff", textShadow: "0 2px 8px #0002" }}>
          {" "}
          {/* Adjusted font size */}
          ຕິດຕໍ່ພວກເຮົາ
        </h2>
        <div className="row justify-content-center">
          <div className="col-auto">
            {" "}
            {/* Use col-auto to keep button width natural but center it */}
            <button
              className="btn btn-success fw-bold border border-3 border-success px-4 py-2"
              style={{ fontSize: 18, borderRadius: 24 }}
            >
              {" "}
              {/* Adjusted font size and padding */}
              ທາງ Whats app
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const App = () => {
  const navigate = useNavigate();
  const [shoeIdx, setShoeIdx] = useState(0);

  // Section refs for scroll
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const shopRef = useRef(null);
  const contactRef = useRef(null);
  const sectionRefs = [homeRef, aboutRef, shopRef, contactRef];

  useEffect(() => {
    document.body.style.background = shoes[shoeIdx].bg;
    // Init AOS
    if (window.AOS) window.AOS.refresh();
    else {
      import("aos/dist/aos.css");
      import("aos").then((AOS) => AOS.init({ duration: 900, once: false, easing: "ease-in-out" }));
    }
    return () => {
      document.body.style.background = "";
    };
  }, [shoeIdx]);

  return (
    <>
      {/* CDN links are best placed in public/index.html or handled by a build tool.
          For a quick test, you can keep them here, but be aware of potential issues
          with React rendering external links this way. */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />

      <Navbar color={shoes[shoeIdx].color} setActive={() => {}} sectionRefs={sectionRefs} />
      <div
        className="container-fluid py-4 py-md-5" // Adjusted vertical padding for mobile
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background: shoes[shoeIdx].bg,
          transition: "background 0.7s",
          fontFamily: "'Noto Sans Lao', sans-serif",
        }}
      >
        <Bubbles color={shoes[shoeIdx].bubble} />
        <div className="container px-3 px-md-5">
          {" "}
          {/* Adjusted horizontal padding for mobile */}
          {/* HOME */}
          <div
            ref={homeRef}
            style={{
              background: "#fff",
              borderRadius: 36,
              boxShadow: "0 8px 32px #0001",
              position: "relative",
              zIndex: 2,
              padding: "2.5rem 1.5rem", // Adjusted padding for mobile
              marginTop: 20, // Adjusted margin
              marginBottom: 20, // Adjusted margin
              fontFamily: "'Noto Sans Lao', sans-serif",
            }}
            data-aos="fade-up"
          >
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
                {" "}
                {/* Centered text on mobile */}
                <div className="animate__animated animate__fadeInLeft">
                  <h2 className="fw-light fs-5" style={{ color: "#444" }}>
                    {" "}
                    {/* Smaller font */}
                    ທ່ານພ້ອມແລ້ວບໍ່ທີ່ຈະ
                  </h2>
                  <h1 className="fw-bold mb-3 fs-3" style={{ color: "#222" }}>
                    {" "}
                    {/* Smaller font */}
                    <span style={{ color: shoes[shoeIdx].color }}>ຊື້ເກີບຜ້າໃໝ່ ທີ່ໃສ່ສະດວກ</span>
                  </h1>
                  <p className="mb-4 fs-6" style={{ color: "#666" }}>
                    {" "}
                    {/* Smaller font */}
                    ຮອງເທົ້າຄຸນນະພາບ ດີໄຊນທັນສະໄໝ ແລະ ສະດວກສະບາຍ ສຳລັບທຸກຄົນ. ສັ່ງຊື້ງ່າຍ ຈັດສົ່ງໄວ ແລະ ບໍລິການດີ.
                  </p>
                  <button
                    className="btn fw-bold px-3 py-2 w-100 w-sm-auto" // Full width on xs, auto width on sm+
                    style={{
                      background: "#fff",
                      color: shoes[shoeIdx].color,
                      border: `2px solid ${shoes[shoeIdx].color}`,
                      borderRadius: 24,
                      fontSize: 18, // Smaller font
                      boxShadow: `0 2px 12px ${shoes[shoeIdx].color}22`,
                      transition: "all 0.2s",
                      fontFamily: "'Noto Sans Lao', sans-serif",
                    }}
                    data-aos="zoom-in"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = shoes[shoeIdx].color;
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.transform = "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.color = shoes[shoeIdx].color;
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    ເຂົ້າສູ່ລະບົບ <i className="bi bi-arrow-right ms-2" />
                  </button>
                </div>
              </div>
              <div className="col-lg-6 d-flex flex-column align-items-center mt-4 mt-lg-0">
                {" "}
                {/* Adjusted margin top for mobile */}
                <ShoeSlider shoeIdx={shoeIdx} setShoeIdx={setShoeIdx} />
              </div>
            </div>
          </div>
          {/* ABOUT */}
          <AboutSection color={shoes[shoeIdx].color} aboutRef={aboutRef} />
          {/* SHOP */}
          <ShopSection color={shoes[shoeIdx].color} shoeIdx={shoeIdx} setShoeIdx={setShoeIdx} shopRef={shopRef} />
          {/* CONTACT */}
          <ContactSection color={shoes[shoeIdx].color} contactRef={contactRef} />
        </div>
      </div>
      {/* AOS Script - Best placed just before the closing </body> tag in public/index.html */}
      {/* <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script> */}
    </>
  );
};

export default App;