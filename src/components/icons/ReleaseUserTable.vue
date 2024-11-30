<template>
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
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 table-fixed">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="w-8 px-3 py-3">
                            <input type="checkbox" class="rounded" />
                        </th>
                        <th scope="col"
                            class="w-80 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            @click="changeSort('name')">
                            User
                            <span>{{ sortKey === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
                        </th>
                        <th scope="col"
                            class="w-60 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            @click="changeSort('phone')">
                            Phone number
                            <span>{{ sortKey === 'phone' ? (sortDirection === 'asc' ? '↑' : '↓') : '' }}</span>
                        </th>
                        <th scope="col"
                            class="w-80 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in filteredAndSortedUsers" :key="user.id" class="hover:bg-gray-50">
                        <td class="w-12 px-6 py-4 ">
                            <input type="checkbox" v-model="selectedUsers" :value="user.id" class="rounded" />
                        </td>
                        <td class="w-48 px-6 py-4">
                            <div class="flex items-center">
                                <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full" />
                                <span class="ml-3 font-medium text-gray-900">{{ user.name }}</span>
                            </div>
                        </td>
                        <td class="w-44 px-6 py-4 text-gray-500">{{ user.phone }}</td>
                        <td class="w-48 px-6 py-4 text-gray-500">{{ user.email }}</td>
                        <td class="w-28 px-6 py-4 text-gray-500">{{ user.date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits, watch } from 'vue';
import {
    Search as SearchIcon,
} from 'lucide-vue-next';

const users = ref([
    { id: 1, name: 'Andrew Bojonegles', status: 'Active', phone: '+79000101101', email: 'abc@gmail.com', date: '23/09/2022', avatar: '/placeholder.svg' },
    { id: 2, name: 'Jane Doe', status: 'Blocked', phone: '+123456789', email: 'jane@example.com', date: '24/10/2022', avatar: '/placeholder.svg' },
]);

const searchQuery = ref('');
const sortKey = ref('');
const sortDirection = ref('asc');
const selectedUsers = ref([]);
// Trong script setup của ReleaseUserTable
const emit = defineEmits(['update:selected'])
watch(selectedUsers, (newValue) => {
    emit('update:selected', newValue)
})

// Lọc chỉ người dùng có trạng thái Active
const activeUsers = computed(() => {
    return users.value.filter(user => user.status === 'Active');
});

// Lọc và tìm kiếm
const filteredAndSortedUsers = computed(() => {
    const filtered = activeUsers.value.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.phone.includes(searchQuery.value)
    );

    if (!sortKey.value) return filtered;

    return filtered.sort((a, b) => {
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
</script>