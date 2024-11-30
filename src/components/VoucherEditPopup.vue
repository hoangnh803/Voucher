<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl w-full max-w-md">
      <!-- Header -->
      <div class="p-6 pb-0">
        <h2 class="text-xl font-semibold">
          {{ props.isCreating ? 'Tạo Voucher' : 'Chỉnh sửa Voucher' }}
        </h2>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-6">
          <!-- Voucher Name -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">
              Tên voucher
            </label>
            <input type="text" v-model="voucherName"
              :placeholder="props.isCreating ? 'Nhập tên voucher mới' : 'Nhập tên voucher'"
              class="w-full border-gray-300 border-b focus:border-green-500 focus:ring-0 px-0 pb-2" />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea v-model="description" rows="4"
              :placeholder="props.isCreating ? 'Nhập mô tả cho voucher mới' : 'Nhập mô tả voucher'"
              class="w-full border-gray-300 border-b focus:border-green-500 focus:ring-0 px-0 pb-2 resize-none" />
          </div>

          <!-- Discount -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">Giảm</label>
            <div class="flex items-center gap-2">
              <select v-model="discountType"
                class="border-gray-300 border-b focus:border-green-500 focus:ring-0 px-0 pb-1">
                <option value="%">%</option>
                <option value="VND">VND</option>
              </select>
              <input type="number" v-model="discountValue"
                class="flex-grow border-gray-300 border-b focus:border-green-500 focus:ring-0 px-0 pb-2" />
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 mt-8">
          <button type="button" @click="$emit('close')"
            class="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg">
            Hủy
          </button>
          <button type="submit" class="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg">
            {{ props.isCreating ? 'Tạo' : 'Lưu' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["close", "save"]);
const props = defineProps({
  isCreating: Boolean,
  voucher: Object,
});

const voucherName = ref("");
const description = ref("");
const discountType = ref("%");
const discountValue = ref(0);

watch(
  () => props.voucher,
  (voucher) => {
    if (voucher) {
      voucherName.value = voucher.title || "";
      description.value = voucher.description || "";
      discountType.value = voucher.discount?.type || "%";
      discountValue.value = voucher.discount?.value || 0;
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit("save", {
    id: props.voucher?.id || null,
    title: voucherName.value,
    description: description.value,
    discount: {
      type: discountType.value,
      value: discountValue.value,
    },
  });
};
</script>

<style scoped>
/* Remove number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
