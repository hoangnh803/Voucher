<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md h-[600px] flex flex-col">
        <!-- Header -->
        <div class="flex items-center p-4 border-b">
          <div class="w-1/4 bg-purple-100 text-purple-600 text-center py-4 font-bold text-xl rounded-lg">
            {{ coupon.discount }}%<br />off
          </div>
          <div class="flex-grow pl-4">
            <h3 class="font-semibold text-lg">{{ coupon.title }}</h3>
          </div>
        </div>
  
        <!-- Scrollable Content -->
        <div class="flex-grow overflow-y-auto p-4">
          <div class="space-y-4 text-sm text-gray-700">
            <div>
              <h4 class="font-semibold">Valid Period</h4>
              <p>30 Oct 2024 00:00 - 30 Oct 2024 23:59</p>
            </div>
            <div>
              <h4 class="font-semibold">Reward</h4>
              <p>First come first served. Act fast before voucher is used up! 20% off Min. Spend ₫100k Capped at ₫150k</p>
            </div>
            <div>
              <h4 class="font-semibold">Applicable Product</h4>
              <p>Chỉ áp dụng trên App cho một số sản phẩm và một số người dùng tham gia chương trình khuyến mãi nhất định.</p>
              <ul class="list-disc list-inside text-gray-600 mt-2">
                <li>For selected products only, some products are prohibited from promotions due to regulations in your country or because they are member exclusive products.</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Payment</h4>
              <p>All payment methods</p>
            </div>
            <div>
              <h4 class="font-semibold">More Details</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p class="mt-2">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
  
        <!-- Footer -->
        <div class="border-t p-4">
          <button @click="closePopup" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  // Define props
  const props = defineProps({
    coupon: Object // The coupon passed to the modal
  });
  
  // Emit an event to close the popup
  const closePopup = () => {
    emit('close');
  };
  
  // Define the emits
  const emit = defineEmits(['close']);
  </script>
  
  <style scoped>
  /* Custom scrollbar styles */
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: #CBD5E0 #EDF2F7;
  }
  
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #EDF2F7;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: #CBD5E0;
    border-radius: 4px;
  }
  </style>
  