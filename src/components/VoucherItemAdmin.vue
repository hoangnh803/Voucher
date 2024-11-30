<template>
  <div class="flex items-stretch border rounded-lg shadow-sm overflow-hidden relative">
    <!-- Discount Section -->
    <div class="w-[12.5%] bg-purple-100 content-center text-purple-600 text-center py-4 font-bold text-xl relative">
      <span class="">{{ coupon.discount }}%<br />off</span>
      <template v-if="coupon.status === 'active'">
        <div class="absolute top-1 left-1 text-green-600 text-xs font-semibold">
          Đang phát hành
        </div>
      </template>
      <template v-else-if="coupon.status === 'expired'">
        <div class="absolute top-1 left-1 text-red-600 text-xs font-semibold">
          Hết hạn
        </div>
      </template>
      <template v-else>
        <input type="checkbox" :checked="selected" @change="$emit('toggle-selection', coupon.id)"
          class="absolute top-1 left-1 w-4 h-4 cursor-pointer" />
      </template>
    </div>

    <!-- Details Section -->
    <div class="w-[62.5%] px-4 py-2">
      <h3 class="font-semibold text-lg">{{ coupon.title }}</h3>
      <p class="text-gray-600 mt-2 truncate-2-lines">{{ coupon.description }}</p>
    </div>

    <!-- Action Section -->
    <div class="w-[25%] flex flex-col justify-center px-4 py-2">
      <!-- Detail Button -->
      <button @click="showDetail" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-2">
        Detail
      </button>

      <!-- Edit and Delete Buttons -->
      <div class="flex items-center gap-2">
        <button @click="editVoucher" :disabled="isActive" :class="[
          'w-full py-2 rounded-lg',
          isActive ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white',
        ]">
          Chỉnh sửa
        </button>
        <button @click="deleteVoucher" :disabled="isActive" :class="[
          'w-full py-2 rounded-lg',
          isActive ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white',
        ]">
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["show-detail", "edit-voucher", "delete-voucher"]);
const props = defineProps({
  coupon: {
    type: Object,
    required: true,
  },
});

const showDetail = () => emit("show-detail", props.coupon);
const editVoucher = () => emit("edit-voucher", props.coupon);
const deleteVoucher = () => emit("delete-voucher", props.coupon);

const isActive = computed(() => props.coupon.status === "active");
</script>

<style scoped>
/* Truncate description to 2 lines and add ellipsis for overflow */
p.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* Limits the text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>