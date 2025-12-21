// js/header.js (Phiên bản Demo Login/Register)

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const brandName = "VP Computer";

        // --- BƯỚC 1: KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP ---
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        let userAuthHTML = '';
        
        if (currentUser && currentUser.isLoggedIn) {
            // Nếu ĐÃ ĐĂNG NHẬP: Hiện Xin chào + Nút Đăng xuất
            userAuthHTML = `
                <div class="user-auth logged-in" style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: 500; color: #333;">Xin chào, <b style="color: #007bff;">${currentUser.name}</b></span>
                    <a href="#" id="btn-logout" title="Đăng xuất" style="color: #dc3545; margin-left: 5px;">
                        <i class="fas fa-sign-out-alt"></i>
                    </a>
                </div>
            `;
        } else {
            // Nếu CHƯA ĐĂNG NHẬP: Hiện nút cũ
            userAuthHTML = `
                <div class="user-auth">
                   <a href="login.html" class="auth-link"><i class="fas fa-user"></i> Đăng nhập / Đăng ký</a>
                </div>
            `;
        }

        // --- BƯỚC 2: TẠO HTML (Chèn userAuthHTML vào vị trí thích hợp) ---
        const headerHTML = `
            <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>

            <header>
                <div class="container">
                    <a href="index.html" class="logo">
                        <img src="img/logo.png" alt="VP Computer Logo">
                    </a>
                    
                    <nav class="main-nav desktop-nav">
                        <ul>
                            <li><a href="index.html">Trang Chủ</a></li>
                            <li><a href="product.html">Sản Phẩm</a></li>
                            <li><a href="builder.html">Xây Dựng Cấu Hình</a></li>
                            <li><a href="promotion.html">Khuyến Mãi</a></li>
                            <li><a href="contact.html">Liên Hệ</a></li>
                        </ul>
                    </nav>

                    <div class="header-actions">
                        <form action="search.html" method="GET" class="search-bar" id="search-form">
                            <input type="text" name="q" placeholder="Tìm kiếm sản phẩm..." required>
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </form>
                        
                        <a href="#" class="action-icon cart-icon">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-count">0</span>
                        </a>

                        ${userAuthHTML}

                        <button class="hamburger-btn" id="hamburger-btn">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>

                <nav class="mobile-side-menu" id="mobile-nav">
                    <div class="mobile-nav-header">
                        <span class="menu-title">${brandName}</span>
                        <button class="close-btn" id="close-btn">×</button>
                    </div>
                    <ul>
                        <li><a href="index.html"><i class="fas fa-home"></i> Trang Chủ</a></li>
                        <li><a href="product.html"><i class="fas fa-box"></i> Sản Phẩm</a></li>
                        <li><a href="builder.html"><i class="fas fa-cogs"></i> Xây Dựng Cấu Hình</a></li>
                        <li><a href="promotion.html"><i class="fas fa-tags"></i> Khuyến Mãi</a></li>
                        <li><a href="contact.html"><i class="fas fa-envelope"></i> Liên Hệ</a></li>
                        ${!currentUser ? '<li><a href="login.html"><i class="fas fa-user-circle"></i> Đăng Nhập</a></li>' : ''}
                    </ul>
                    <div class="mobile-nav-footer">
                         <a href="#"><i class="fas fa-headset"></i> Lắp đặt phòng net</a>
                         <a href="#"><i class="fas fa-phone-alt"></i> Hotline: 1900 1234</a>
                    </div>
                </nav>
            </header>
        `;

        const fragment = document.createRange().createContextualFragment(headerHTML);
        this.append(fragment);

        // --- BƯỚC 3: GẮN SỰ KIỆN (Side Menu & Logout) ---
        
        // Logic Side Menu (Giữ nguyên)
        const hamburgerBtn = this.querySelector('#hamburger-btn');
        const mobileNav = this.querySelector('#mobile-nav');
        const closeBtn = this.querySelector('#close-btn');
        const overlay = this.querySelector('#mobile-menu-overlay');
        const body = document.body;

        const openMenu = () => {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        };

        hamburgerBtn.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);

        // Logic Active Link (Giữ nguyên)
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = this.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });

        // --- LOGIC MỚI: XỬ LÝ ĐĂNG XUẤT ---
        const logoutBtn = this.querySelector('#btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // 1. Xóa thông tin user
                localStorage.removeItem('currentUser');
                // 2. Thông báo
                alert('Đã đăng xuất thành công!');
                // 3. Tải lại trang để cập nhật Header
                window.location.reload();
            });
        }
    }
}

customElements.define('header-placeholder', HeaderComponent);