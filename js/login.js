// js/login.js - Demo Logic Đăng nhập/Đăng ký

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOGIC SLIDER (Giữ nguyên từ code cũ của bạn) ---
    const sliderContainer = document.querySelector('.login-slider');
    if (sliderContainer) {
        const slides = sliderContainer.querySelectorAll('.slide');
        const slideCount = slides.length;
        let currentIndex = 0;
        let autoPlayInterval;

        function goToSlide(index) {
            currentIndex = (index + slideCount) % slideCount;
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentIndex].classList.add('active');
        }

        function startAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 3000);
        }

        if(slideCount > 0) {
            goToSlide(0);
            startAutoPlay();
        }
    }

    // --- 2. LOGIC ĐĂNG NHẬP / ĐĂNG KÝ (DEMO) ---
    
    // Tìm form Đăng nhập (dựa trên class trong file login.html)
    const loginForm = document.querySelector('.form-box.login form');
    // Tìm form Đăng ký (dựa trên class trong file signup.html)
    const registerForm = document.querySelector('.form-box.register form');

    // XỬ LÝ ĐĂNG NHẬP
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn load lại trang
            
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');

            // Kiểm tra rỗng cơ bản
            if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
                alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
                return;
            }

            // Giả lập lấy tên từ email (vì form đăng nhập không có nhập tên)
            // Ví dụ: email là "tuandung@gmail.com" -> Tên là "tuandung"
            let customerName = emailInput.value.split('@')[0];

            // Lưu trạng thái vào LocalStorage
            const user = {
                name: customerName,
                email: emailInput.value,
                isLoggedIn: true
            };
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Thông báo và chuyển hướng
            alert("Đăng nhập thành công!");
            window.location.href = 'index.html';
        });
    }

    // XỬ LÝ ĐĂNG KÝ
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn load lại trang

            const nameInput = document.getElementById('register-name');
            const emailInput = document.getElementById('register-email');
            const passwordInput = document.getElementById('register-password');

            // Kiểm tra rỗng cơ bản
            if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            // Lưu trạng thái vào LocalStorage
            const user = {
                name: nameInput.value, // Lấy tên thật người dùng nhập
                email: emailInput.value,
                isLoggedIn: true
            };
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Thông báo và chuyển hướng
            alert("Đăng ký thành công! Chào mừng " + user.name);
            window.location.href = 'index.html';
        });
    }
});