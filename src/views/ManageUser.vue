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
                    <h1 class=" font-semibold text-black">Nguyen Van A</h1>
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
                            class="block py-2 px-4 text-green-600 bg-green-100 rounded-lg font-medium">
                            Manage Users
                        </router-link>
                    </li>
                    <li>
                        <router-link to="manage-voucher"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
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

            <!-- Form Section -->
            <main class="flex-1 bg-white shadow-lg px-8 py-4">
                <h1 class="text-xl mb-2 font-semibold text-green-800">
                    Manage User
                </h1>
                <ManageUserTable/>
            </main>
        </div>
    </div>
</template>

<script>
import DropboxComponent from "../components/DropdownComponent.vue"; // Import DropboxComponent
import ManageUserTable from "../components/ManageUserTable.vue";

export default {
    name: "NavigationBar",
    components: {
        DropboxComponent,
        ManageUserTable,
    },
    data() {
        return {
            dropdownOptions: [
                { label: "Edit profile", route: "/profile" },
                { label: "My Voucher", route: "/voucher" },
                { label: "Option 3", route: "/option-3" },
            ],
            userAvatar: "https://i.pravatar.cc/100", // Placeholder for user avatar
            userName: "Nguyen Van A", // User's name
        };
    },
};
</script>