<template>
    <div class="min-h-screen bg-white">
        <!-- Navigation Bar -->
        <nav :class="['border-b border-white/10 fixed w-full top-0 z-50 transition-colors duration-300 bg-[#1F485B]']">
            <div class="max-w-8xl mx-auto px-4">
                <div class="flex h-12 items-center justify-between">
                    <!-- Logo-->
                    <div class="flex items-center space-x-8">
                        <router-link to="/" class="flex-shrink-0 flex items-center">
                            <img loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ab3e43e40c7dd847fe5a21db0f8195405101e87f2adb96472ed98b714c6bfd1?placeholderIfAbsent=true&apiKey=e6fddaa1b53f41878d251139a58c0a7a"
                                class="object-contain max-w-full aspect-[1.17] w-20" alt="Company logo" />
                        </router-link>
                    </div>
                    <!-- Dropbox -->
                    <DropboxComponent :options="dropdownOptions" :avatarUrl="userAvatar" :userName="userName"
                        @option-click="handleDropdownOption" />
                </div>
            </div>
        </nav>

        <!-- Header Section -->
        <header class="relative bg-green-200 h-24 mt-12 p-4">
            <!-- Cover Image -->
            <div class="absolute inset-0">
                <img src="https://via.placeholder.com/1200x300" alt="Cover" class="object-cover w-full h-full" />
            </div>
            <!-- Avatar and User Info -->
            <div class="absolute bottom-[-70px] left-8 flex items-center space-x-4">
                <!-- Avatar -->
                <div class="relative w-24 h-24 border-4 border-white rounded-full overflow-hidden shadow-lg">
                    <img src="https://i.pravatar.cc/150" alt="Avatar" class="object-cover w-full h-full" />
                    <button
                        class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
                <!-- User Info -->
                <div>
                    <h1 class="font-semibold text-black">{{ userName }}</h1>
                    <p class="text-xs text-black">Your account is ready, you can now apply for advice.</p>
                </div>
            </div>
        </header>

        <!-- Main Content Section -->
        <div class="mt-12 flex p-4">
            <!-- Sidebar -->
            <aside class="w-64 bg-white p-4">
                <ul class="space-y-2">
                    <li>
                        <router-link to="profile"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Edit Profile
                        </router-link>
                    </li>
                    <li>
                        <router-link to="manage-user"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Manage Users
                        </router-link>
                    </li>
                    <li>
                        <router-link to="manage-voucher"
                            class="block py-2 px-4 text-green-600 bg-green-100 rounded-lg font-medium">
                            Manage Voucher
                        </router-link>
                    </li>
                    <li>
                        <router-link to="password-security"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Password & Security
                        </router-link>
                    </li>
                    <li>
                        <router-link to="redemption-history"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Redemption History
                        </router-link>
                    </li>
                </ul>
            </aside>

            <!-- Coupon List -->
            <main class="flex-1 bg-white shadow-lg px-8 py-4">
                <div v-if="!isReleasePage">
                    <h1 class="text-xl mb-2 font-semibold text-green-800">Manage Vouchers</h1>


                    <!-- Toolbar Section (Filter & Actions) -->
                    <div class="flex items-center justify-between p-4 mb-4 bg-white shadow-sm rounded-lg">
                        <!-- Filter Dropdown -->
                        <div class="relative">
                            <select v-model="activeTab"
                                class="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[150px]">
                                <option value="all">Tất cả</option>
                                <option value="active">Đang hoạt động</option>
                                <option value="expired">Đã kết thúc</option>
                                <option value="inactive">Không hoạt động</option>
                            </select>
                            <ChevronDown
                                class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-3">
                            <button @click="openCreatePopup"
                                class="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                <User class="w-5 h-5" />
                                Tạo voucher
                            </button>
                            <button :disabled="!selectedVouchers.length" @click="goToReleasePage"
                                class="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                <User class="w-5 h-5" />
                                Phát hành
                            </button>
                        </div>
                    </div>


                    <!-- Voucher List -->
                    <div class="space-y-4">
                        <VoucherItemAdmin v-for="coupon in filteredCoupons" :key="coupon.id" :coupon="coupon"
                            @show-detail="openDetailPopup" @edit-voucher="openEditPopup"
                            @toggle-selection="toggleVoucherSelection" />
                    </div>
                </div>
                <div v-else>
                    <!-- Header -->
                    <div class="p-4">
                        <h1 class="text-lg font-medium">Phát hành Voucher</h1>
                        <!-- Voucher IDs -->
                        <div class="mb-4">
                            <h2 class="text-sm font-semibold text-gray-700">Danh sách voucher đã chọn:</h2>
                            <ul class="list-disc ml-6 mt-2">
                                <li v-for="voucherId in selectedVouchers" :key="voucherId"
                                    class="text-gray-600 cursor-pointer" @click="openDetailPopupById(voucherId)">
                                    Voucher ID: {{ voucherId }}
                                </li>
                            </ul>
                        </div>
                        <div class="flex gap-8">
                            <div>
                                <label>Ngày hiệu lực</label>
                                <input type="date" v-model="effectiveDate" class="border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label>Ngày hết hạn</label>
                                <input type="date" v-model="expiryDate" class="border rounded px-3 py-2" />
                            </div>
                        </div>
                    </div>

                    <!-- User Table -->
                    <ReleaseUserTable :users="users" @update:selected="updateSelectedUsers" />

                    <!-- Footer -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-end gap-4">
                        <button class="bg-red-500 text-white px-6 py-2 rounded" @click="goBackToList">
                            Quay lại
                        </button>
                        <button class="bg-green-500 text-white px-6 py-2 rounded" @click="confirmRelease">
                            Xác nhận
                        </button>
                    </div>
                </div>


            </main>
            <!-- Modal for Coupon Detail -->
            <VoucherDetailPopup v-if="showDetailPopup" :coupon="selectedCoupon" @close="closeDetailPopup" />

            <!-- Modal for Coupon Edit -->
            <VoucherEditPopup v-if="showEditPopup" :isCreating="isCreatingVoucher" :voucher="selectedCoupon"
                @close="closeEditPopup" @save="saveVoucher" />
        </div>
    </div>
</template>

<script>
import DropboxComponent from "../components/DropdownComponent.vue"; // Import DropdownComponent đúng
import VoucherItemAdmin from "../components/VoucherItemAdmin.vue"; // Import đúng VoucherItemAdmin
import VoucherDetailPopup from "../components/VoucherDetailPopup.vue"; // Import đúng Detail Popup
import VoucherEditPopup from "../components/VoucherEditPopup.vue"; // Import đúng Edit Popup

import { ChevronDown, User } from 'lucide-vue-next'
import ReleaseUserTable from "@/components/icons/ReleaseUserTable.vue";


export default {
    name: "VoucherPage",
    components: {
        DropboxComponent,
        VoucherItemAdmin,
        VoucherDetailPopup,
        VoucherEditPopup,
        ChevronDown,
        User,
        ReleaseUserTable
    },
    data() {
        return {
            dropdownOptions: [
                { label: "Edit Profile", route: "/profile" },
                { label: "My Voucher", route: "/manage-voucher" },
                { label: "Option 3", route: "/option-3" },
            ],
            userAvatar: "https://i.pravatar.cc/100",
            userName: "Nguyen Van A",
            activeTab: "all",
            coupons: [
                { id: 1, discount: 10, title: "Voucher A", description: "Description A", status: "active" },
                { id: 2, discount: 20, title: "Voucher B", description: "Description B", status: "expired" },
                { id: 3, discount: 15, title: "Voucher C", description: "Description C", status: "inactive" },
            ],
            showDetailPopup: false,
            showEditPopup: false,
            selectedCoupon: null,
            isCreatingVoucher: false,
            isReleasePage: false, // Điều khiển hiển thị giao diện phát hành
            selectedVouchers: [], // Các voucher đã chọn
            effectiveDate: null,
            expiryDate: null,
            selectedUsers: [],
            users: [ // Dữ liệu người dùng mẫu
                { id: 1, name: "Nguyễn Văn A" },
                { id: 2, name: "Trần Thị B" },
                { id: 3, name: "Lê Hoàng C" },
            ],
        };
    },
    computed: {
        filteredCoupons() {
            return this.activeTab === "all"
                ? this.coupons
                : this.coupons.filter((coupon) => coupon.status === this.activeTab);
        },
    },
    methods: {
        openCreatePopup() {
            this.selectedCoupon = {
                id: null,
                title: "",
                description: "",
                discount: { type: "%", value: 0 },
                status: "inactive",
            };
            this.isCreatingVoucher = true;
            this.showEditPopup = true;
        },
        openDetailPopup(coupon) {
            this.selectedCoupon = coupon;
            this.showDetailPopup = true;
        },
        openEditPopup(coupon) {
            this.selectedCoupon = { ...coupon };
            this.isCreatingVoucher = false;
            this.showEditPopup = true;
        },
        closeDetailPopup() {
            this.showDetailPopup = false;
            this.selectedCoupon = null;
        },
        closeEditPopup() {
            this.showEditPopup = false;
            this.selectedCoupon = null;
        },
        saveVoucher(voucher) {
            if (this.isCreatingVoucher) {
                voucher.id = Date.now();
                this.coupons.push(voucher);
            } else {
                const index = this.coupons.findIndex((c) => c.id === voucher.id);
                if (index !== -1) this.coupons.splice(index, 1, voucher);
            }
            this.closeEditPopup();
        },
        toggleVoucherSelection(voucherId) {
            if (this.selectedVouchers.includes(voucherId)) {
                this.selectedVouchers = this.selectedVouchers.filter(id => id !== voucherId);
            } else {
                this.selectedVouchers.push(voucherId);
            }
        },
        goToReleasePage() {
            if (this.selectedVouchers.length) {
                this.isReleasePage = true;
            } else {
                alert("Vui lòng chọn ít nhất một voucher để phát hành!");
            }
        },
        goBackToList() {
            this.isReleasePage = false;
            // Reset dữ liệu khi quay lại
            this.effectiveDate = null;
            this.expiryDate = null;
            this.selectedUsers = [];
        },
        // Cập nhật người dùng đã chọn
        updateSelectedUsers(selected) {
            this.selectedUsers = selected;
        },
        confirmRelease() {
            console.log("Voucher đã chọn:", this.selectedVouchers);
            console.log("Ngày hiệu lực:", this.effectiveDate);
            console.log("Ngày hết hạn:", this.expiryDate);
            console.log("Người dùng đã chọn:", this.selectedUsers);
            // Kiểm tra xem các trường có bị thiếu không
            if (!this.effectiveDate || !this.expiryDate || this.selectedUsers.length === 0) {
                let missingFields = [];

                // Kiểm tra ngày hiệu lực
                if (!this.effectiveDate || isNaN(Date.parse(this.effectiveDate))) {
                    missingFields.push('Ngày hiệu lực');
                }

                // Kiểm tra ngày hết hạn
                if (!this.expiryDate || isNaN(Date.parse(this.expiryDate))) {
                    missingFields.push('Ngày hết hạn');
                }

                // Kiểm tra người dùng đã chọn
                if (this.selectedUsers.length === 0) {
                    missingFields.push('Người dùng');
                }

                // Thông báo nếu có trường thiếu
                if (missingFields.length > 0) {
                    alert("Vui lòng điền đầy đủ thông tin bắt buộc: " + missingFields.join(', ') + "!");
                    return;
                }
            }

            // Kiểm tra ngày hiệu lực phải trước ngày hết hạn
            if (new Date(this.effectiveDate) > new Date(this.expiryDate)) {
                alert("Ngày hiệu lực không thể sau ngày hết hạn!");
                return;
            }

            // Kiểm tra nếu ngày hết hạn có hợp lệ (nếu ngày hiệu lực sau ngày hết hạn, không phát hành được)
            if (new Date(this.effectiveDate) >= new Date(this.expiryDate)) {
                alert("Ngày hiệu lực không thể sau hoặc trùng với ngày hết hạn!");
                return;
            }

            // Nếu các kiểm tra hợp lệ, hiển thị thông tin voucher và thực hiện hành động phát hành
            

            // Thực hiện hành động phát hành voucher (ví dụ, gọi API hoặc các xử lý khác)
            // Sau đó quay lại giao diện danh sách
            this.goBackToList();
        },
        // Mở popup chi tiết voucher
        openDetailPopupById(voucherId) {
            // Tìm voucher trong mảng coupons dựa trên ID
            this.selectedCoupon = this.coupons.find(coupon => coupon.id === voucherId);
            // Hiển thị popup chi tiết voucher
            this.showDetailPopup = true;
        },
    },
};
</script>