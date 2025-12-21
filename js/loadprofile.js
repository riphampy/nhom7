import { auth, db} from './login.js';
import { showToast } from './toast.js';
import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Khai báo các Element theo ID trong profile.html
const profileForm = document.getElementById('profile-form');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profilePhone = document.getElementById('profile-phone');
const profilePhotoUrl = document.getElementById('profile-photo-url');
const profileImg = document.getElementById('profile-img');
const contactForm = document.getElementById('contact_form');
const applyForm = document.getElementById('recruitment-form');
const checkoutForm = document.getElementById('checkout-form');
// Tải dữ liệu người dùng khi trang load
if(profileForm) {
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Hiển thị dữ liệu từ Firebase Auth
        profileEmail.value = user.email || "";
        profileName.value = user.displayName || "";
        profilePhotoUrl.value = user.photoURL || "";
        profileImg.src = user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=random`;

        // Lấy số điện thoại từ Firestore
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
                const data = userSnap.data();
                if (profilePhone) profilePhone.value = data.phoneNumber || "";
                // Nếu Firestore có username chính xác hơn Auth, cập nhật lại ô nhập
                if (data.username && !user.displayName) {
                    profileName.value = data.username;
                }
            }
        } catch (error) {
            console.error("Lỗi lấy dữ liệu Firestore:", error);
        }
    } else {
        // Nếu chưa đăng nhập, chuyển về trang login
        window.location.href = "login.html";
    }
});
}

// Xử lý khi nhấn nút "Cập nhật thông tin"
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const user = auth.currentUser;
        if (!user) return;

        const newName = profileName.value.trim();
        const newPhone = profilePhone.value.trim();
        const newPhoto = profilePhotoUrl.value.trim();

        try {
            // Cập nhật Firebase Auth (Tên và Ảnh đại diện)
            await updateProfile(user, {
                displayName: newName,
                photoURL: newPhoto
            });

            // Cập nhật Firestore (Tên và Số điện thoại)
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                username: newName,
                phoneNumber: newPhone,
                photoURL: newPhoto,
                updatedAt: new Date()
            }, { merge: true });

            // Cập nhật hiển thị ảnh ngay lập tức
            if (newPhoto) profileImg.src = newPhoto;

            showToast("Cập nhật hồ sơ thành công! 🎉");
            
            // Reload nhẹ để header cập nhật thông tin mới
            setTimeout(() => {
                window.location.href = 'profile.html' ;
            }, 1000);

        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            showToast("Cập nhật thất bại: " + error.message);
        }
    });
}

if(contactForm) {
    onAuthStateChanged(auth, async (user) => {
    if (user) {
        const contactNameInput = document.getElementById('name');
        const contactEmailInput = document.getElementById('email');

        if (contactEmailInput) {
                contactEmailInput.value = user.email || "";
            }
        if (contactNameInput) {
                contactNameInput.value = user.displayName || "";
            }  
    } else {
    }
});
if(applyForm) {
    onAuthStateChanged(auth, async (user) => {
    if (user) {
        const contactNameInput = document.getElementById('app-name');
        const contactEmailInput = document.getElementById('app-email');
        const contactPhoneInput = document.getElementById('app-phone');

        if (contactEmailInput) {
                contactEmailInput.value = user.email || "";
            }
        if (contactNameInput) {
                contactNameInput.value = user.displayName || "";
            }
        if (ContactPhoneInput){
            contactPhoneInput.value = user.phoneNumber || "";
        }
    } else {
    }
});
if(checkoutForm) {
    onAuthStateChanged(auth, async (user) => {
    if (user) {
        const contactNameInput = document.getElementById('fullname');
        const contactEmailInput = document.getElementById('email');
        const contactPhoneInput = document.getElementById('phone');

        if (contactEmailInput) {
                contactEmailInput.value = user.email || "";
            }
        if (contactNameInput) {
                contactNameInput.value = user.displayName || "";
            }
        if (ContactPhoneInput){
            contactPhoneInput.value = user.phoneNumber || "";
        }
    } else {
    }
});
};
