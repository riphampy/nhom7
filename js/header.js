// js/header.js
import { auth } from './login.js'; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const brandName = "Protech Computer";
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
                        <div class="user-auth">
                          
                        </div>
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
                    </ul>
                </nav>
            </header>
        `;

        const fragment = document.createRange().createContextualFragment(headerHTML);
        this.append(fragment);

        // --- Logic UI (Menu & Active Link) ---
        this.setupMenuLogic();
        
        // --- Logic Auth (Quan trọng) ---
        this.setupAuthListener();
    }

    setupMenuLogic() {
        const hamburgerBtn = this.querySelector('#hamburger-btn');
        const mobileNav = this.querySelector('#mobile-nav');
        const closeBtn = this.querySelector('#close-btn');
        const overlay = this.querySelector('#mobile-menu-overlay');

        const toggleMenu = (isOpen) => {
            mobileNav.classList.toggle('active', isOpen);
            overlay.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        hamburgerBtn.addEventListener('click', () => toggleMenu(true));
        closeBtn.addEventListener('click', () => toggleMenu(false));
        overlay.addEventListener('click', () => toggleMenu(false));
    }

    setupAuthListener() {
        const userAuthContainer = this.querySelector('.user-auth');

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userName = user.displayName || "Người dùng";
                const userPhoto = user.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=random`;

                userAuthContainer.innerHTML = `
                    <div class="user-logged">
                        <img src="${userPhoto}" alt="Avatar" class="user-avatar">
                        <span class="user-name">${userName}</span>
                        <div class="user-dropdown">
                            <a href="profile.html"><i class="fas fa-user-circle"></i> Hồ sơ cá nhân</a>
                            <a href="#" id="btn-logout-header"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
                        </div>
                    </div>
                `;

                this.querySelector('#btn-logout-header').addEventListener('click', (e) => {
                    e.preventDefault();
                    signOut(auth).then(() => window.location("index.html"));
                });
            } else {
                userAuthContainer.innerHTML = `
                    <a href="login.html" class="auth-link"><i class="fas fa-user"></i> Đăng nhập / Đăng ký</a>
                `;
            }
        });
    }
}

customElements.define('header-placeholder', HeaderComponent);
