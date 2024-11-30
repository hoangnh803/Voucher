<template>
    <!-- User Information Modal or Section -->
    <div v-if="selectedUser" class="z-50 fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white shadow-lg p-8 rounded-lg max-w-3xl w-full">
        <!-- Form Section -->
        <h1 class="text-xl mb-2 font-semibold text-green-800">
          User Profile
        </h1>
        <form class="grid grid-cols-2 gap-6">
          <!-- Personal Info -->
          <div>
            <h3 class="text-gray-600 font-semibold mb-2">Personal</h3>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">First Name</label>
              <input type="text" :value="selectedUser.name.split(' ')[0]"
                class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Surname</label>
              <input type="text" :value="selectedUser.name.split(' ')[1]"
                class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">National Code</label>
              <input type="text" :value="selectedUser.nationalCode || ''"
                class="w-full border border-gray-300 p-2 rounded-lg" disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Date of Birth</label>
              <input type="date" :value="selectedUser.dob || ''" class="w-full border border-gray-300 p-2 rounded-lg"
                disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Gender</label>
              <select class="w-full border border-gray-300 p-2 rounded-lg" :value="selectedUser.gender || ''" disabled>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-gray-600 font-semibold mb-2">Contact</h3>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Email</label>
              <input type="email" :value="selectedUser.email" class="w-full border border-gray-300 p-2 rounded-lg"
                disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Phone Number</label>
              <input type="tel" :value="selectedUser.phone" class="w-full border border-gray-300 p-2 rounded-lg"
                disabled />
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">Country</label>
              <select class="w-full border border-gray-300 p-2 rounded-lg" :value="selectedUser.country || ''" disabled>
                <option>Select</option>
                <option>USA</option>
                <option>Canada</option>
                <option>UK</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="block text-gray-500 mb-2">City</label>
              <input type="text" :value="selectedUser.city" class="w-full border border-gray-300 p-2 rounded-lg"
                disabled />
            </div>
          </div>
        </form>

        <!-- Back Button -->
        <div class="mt-4 flex justify-end">
          <button type="button" @click="closeUserProfile"
            class="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium">
            Back
          </button>
        </div>
      </div>
    </div>
  <div class="p-6">
  
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex-1 max-w-2xl">
        <div class="relative">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input v-model="searchQuery" type="text" placeholder="Search"
            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <select class="border rounded-lg px-3 py-2">
          <option>All</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
        <button class="text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
          <MoreVerticalIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 table-fixed">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="w-12 px-6 py-3">
              <input type="checkbox" class="rounded" />
            </th>
            <th scope="col"
              class="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('name')">
              User
              <span>{{ sortKey === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-28 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('status')">
              Status
              <span>{{ sortKey === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('phone')">
              Phone number
              <span>{{ sortKey === 'phone' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('email')">
              Email
              <span>{{ sortKey === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-28 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('date')">
              Date
              <span>{{ sortKey === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col"
              class="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="changeSort('activity')">
              Activity
              <span>{{ sortKey === 'activity' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
            </th>
            <th scope="col" class="w-16 px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in sortedUsers" :key="user.id" class="hover:bg-gray-50">
            <td class="w-12 px-6 py-4">
              <input type="checkbox" class="rounded" />
            </td>
            <td class="w-48 px-6 py-4">
              <div class="flex items-center">
                <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full" />
                <span class="ml-3 font-medium text-blue-500 hover:underline cursor-pointer"
                  @click="viewUserDetails(user)">
                  {{ user.name }}
                </span>
              </div>
            </td>
            <td class="w-28 px-6 py-4">
              <span class="px-2 py-1 text-sm rounded-full"
                :class="user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                {{ user.status }}
              </span>
            </td>
            <td class="w-44 px-6 py-4 text-gray-500">{{ user.phone }}</td>
            <td class="w-48 px-6 py-4 text-gray-500">{{ user.email }}</td>
            <td class="w-28 px-6 py-4 text-gray-500">{{ user.date }}</td>
            <td class="w-40 px-6 py-4 text-gray-500">{{ user.activity }}</td>
            <td class="w-20 px-6 py-4">
              <button class="text-red-600 hover:underline" v-if="user.status === 'Active'" @click="blockUser(user.id)">
                Block
              </button>
              <button class="text-green-600 hover:underline" v-else @click="activateUser(user.id)">
                Activate
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  Search as SearchIcon,
  MoreVertical as MoreVerticalIcon,
} from 'lucide-vue-next';

const users = ref([
  { id: 1, name: 'Andrew Bojonegles', status: 'Active', phone: '+79000101101', email: 'abc@gmail.com', date: '23/09/2022', activity: '2 days ago', avatar: '/placeholder.svg' },
  { id: 2, name: 'Jane Doe', status: 'Blocked', phone: '+123456789', email: 'jane@example.com', date: '24/10/2022', activity: '1 day ago', avatar: '/placeholder.svg' },
]);

const searchQuery = ref('');
const sortKey = ref('');
const sortDirection = ref('asc');
const router = useRouter();
const selectedUser = ref(null);


const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.phone.includes(searchQuery.value)
  );
});

const sortedUsers = computed(() => {
  const usersToSort = [...filteredUsers.value];
  if (!sortKey.value) return usersToSort;

  return usersToSort.sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (typeof aValue === 'string') {
      return sortDirection.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue;
  });
});

function changeSort(key) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
}

function blockUser(userId) {
  const user = users.value.find((u) => u.id === userId);
  if (user) user.status = 'Blocked';
}

function activateUser(userId) {
  const user = users.value.find((u) => u.id === userId);
  if (user) user.status = 'Active';
}



function viewUserDetails(user) {
  selectedUser.value = user;
}
function closeUserProfile() {
  selectedUser.value = null;
}
</script>