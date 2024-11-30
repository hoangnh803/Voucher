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
                        <router-link to="/profile"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Edit Profile
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/notifications"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Notifications
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/voucher"
                            class="block py-2 px-4 text-green-600 bg-green-100 rounded-lg font-medium">
                            My Voucher
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/password-security"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Password & Security
                        </router-link>
                    </li>
                </ul>
            </aside>

            <!-- Coupon List -->
            <main class="flex-1 bg-white shadow-lg px-8 py-4">
                <h1 class="text-xl mb-2 font-semibold text-green-800">My Vouchers</h1>

                <!-- Tabs -->
                <div class="flex space-x-4 mb-4 border-b">
                    <button @click="activeTab = 'all'" :class="{'pb-2 border-b-2 border-blue-500 text-blue-500': activeTab === 'all', 'text-gray-500 hover:text-blue-500': activeTab !== 'all'}">All Coupons ({{ coupons.length }})</button>
                    <button @click="activeTab = 'invalid'" :class="{'pb-2 border-b-2 border-blue-500 text-blue-500': activeTab === 'invalid', 'text-gray-500 hover:text-blue-500': activeTab !== 'invalid'}">Invalid Voucher</button>
                    <button @click="activeTab = 'used'" :class="{'pb-2 border-b-2 border-blue-500 text-blue-500': activeTab === 'used', 'text-gray-500 hover:text-blue-500': activeTab !== 'used'}">Used Voucher</button>
                </div>

                <!-- Voucher List -->
                <div class="space-y-4">
                    <VoucherItem 
                        v-for="coupon in filteredCoupons" 
                        :key="coupon.id" 
                        :coupon="coupon"
                        @show-detail="openDetailPopup" />
                </div>
            </main>
            <!-- Modal for Coupon Detail -->
    <VoucherDetailPopup 
      v-if="showPopup" 
      :coupon="selectedCoupon" 
      @close="closePopup" />
        </div>
    </div>
</template>

<script>
import DropboxComponent from "../components/DropdownComponent.vue"; // Import DropboxComponent
import VoucherItem from "../components/VoucherItem.vue"; // Import VoucherItem
import VoucherDetailPopup from "../components/VoucherDetailPopup.vue"; // Import CouponDetailPopup

export default {
    name: "VoucherPage",
    components: {
        DropboxComponent,
        VoucherItem, // Register the VoucherItem component
        VoucherDetailPopup
    },
    data() {
        return {
            dropdownOptions: [
                { label: "Edit Profile", route: "/profile" },
                { label: "My Voucher", route: "/voucher" },
                { label: "Option 3", route: "/option-3" },
            ],
            userAvatar: "https://i.pravatar.cc/100", // Placeholder for user avatar
            userName: "Nguyen Van A", // User's name
            activeTab: 'all', // Track the active tab
            coupons: [
                {
                    id: 1,
                    discount: 20,
                    title: "20% Off Voucher | Denny's Rewards Program",
                    description: "Denny's is offering 20% off your next visit when you join their Rewards Program!",
                    verified: true,
                    usedToday: "422 used today"
                },
                {
                    id: 2,
                    discount: 5,
                    title: "Extra $5 Off $25",
                    description: "Denny's is offering $5 off online orders of $25 or more! Delivery is free when you spend $5 or more.",
                    verified: false,
                    usedToday: "422 used today"
                },
                {
                    id: 3,
                    discount: 25,
                    title: "Official Page For Denny's Current Promotions",
                    description: "This is the official page for the currently running promotions from Denny's. Find out how to sign up for rewards, get birthday treats, and more!",
                    verified: true,
                    usedToday: "422 used today"
                }
            ],
            showPopup: false, // Initialize showPopup to false
    selectedCoupon: null, // To store selected coupon details
        };
    },
    computed: {
        filteredCoupons() {
            switch (this.activeTab) {
                case 'invalid':
                    return this.coupons.filter(coupon => !coupon.verified);
                case 'used':
                    return this.coupons.filter(coupon => coupon.usedToday);
                case 'all':
                default:
                    return this.coupons;
            }
        }
    },
    methods: {
    openDetailPopup(coupon) {
      this.selectedCoupon = coupon; // Set the selected coupon
      this.showPopup = true; // Show the popup
    },
    closePopup() {
      this.showPopup = false; // Close the popup
      this.selectedCoupon = null; // Clear selected coupon
    }
  }
};
</script>
