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
              <router-link to="profile" class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
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
                class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                Manage Voucher
              </router-link>
            </li>
            <li>
              <router-link to="password-security"
                class="block py-2 px-4 text-green-600 bg-green-100 rounded-lg font-medium">
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
          <h1 class="text-xl mb-2 font-semibold text-green-800">Change Password</h1>
  
          <!-- Password Change Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4 px-36 py-4">
            <div v-for="(field, index) in fields" :key="index" class="relative">
              <label :for="field.name" class="block text-sm font-medium text-gray-700">
                {{ field.label }}
              </label>
              <input :type="field.type" :id="field.name" v-model="field.value"
                class="mt-1 block w-full border-gray-500 rounded-md border focus:ring-blue-500 focus:border-blue-500 p-2" />
              <button type="button" @click="toggleVisibility(index)" class="absolute right-3 top-2/3 -translate-y-1/2">
                <EyeOffIcon v-if="field.type === 'password'" class="w-5 h-5 text-gray-500" />
                <EyeIcon v-else class="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Set Password
            </button>
          </form>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import DropboxComponent from "../components/DropdownComponent.vue"; // Import DropboxComponent
  import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-vue-next'
  
  export default {
    name: "NavigationBar",
    components: {
      DropboxComponent,
      EyeIcon,
      EyeOffIcon
    },
    data() {
      return {
        dropdownOptions: [
          { label: "Change Password", route: "/password-security" },
          { label: "My Voucher", route: "/voucher" },
        ],
        userAvatar: "https://i.pravatar.cc/100", // Placeholder for user avatar
        userName: "Nguyen Van A", // User's name
        fields: [
          { name: 'password', label: 'Current Password', type: 'password', value: '' },
          { name: 'newPassword', label: 'New Password', type: 'password', value: '' },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password', value: '' }
        ]
      };
    },
    methods: {
      toggleVisibility(index) {
        this.fields[index].type = this.fields[index].type === 'password' ? 'text' : 'password';
      },
      handleSubmit() {
        // Handle password change logic
        console.log('Password changed:', this.fields.map(field => field.value));
      }
    }
  };
  </script>