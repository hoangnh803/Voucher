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
    </div>
</template>

<script>
import DropboxComponent from "../components/DropdownComponent.vue"; // Import DropboxComponent

export default {
  name: "NavigationBar",
  components: {
    DropboxComponent,
  },
  data() {
    return {
      dropdownOptions: [
        { label: "Edit profile", route: "/admin/profile" },
        { label: "Manage Voucher", route: "/admin/manage-voucher" },
        { label: "", route: "/option-3" },
      ],
      userAvatar: "https://i.pravatar.cc/100", // Placeholder for user avatar
      userName: "Nguyen Van A", // User's name
    };
  },
};
</script>

