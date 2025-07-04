<script setup lang="ts">
import qrCode from "@/assets/images/sample-qr.png";
import gpay from "@/assets/images/icon-gpay.png";
import phonepe from "@/assets/images/icon-phonepe.png";
import amazonPay from "@/assets/images/icon-amazon-pay.png";
import bhim from "@/assets/images/icon-bhim.png";
import paytm from "@/assets/images/icon-paytm.png";
</script>

<template>
  <div class="text-center">
    Scan and pay <span class="font-bold">&#8377; 399</span>
  </div>
  <figure class="max-w-[200px] mx-auto">
    <img :src="qrCode" alt="qr" />
  </figure>
  <div class="payment-seperation text-center my-2">OR pay via</div>
  <div class="flex gap-3">
    <div class="text-center border border-gray-200 rounded-md p-3 grow-1">
      UPI ID: <b>john.doe@oksbi</b>
    </div>
    <div class="text-center border border-gray-200 rounded-md p-3 grow-1">
      Mob: <b>756985XXXX</b>
    </div>
  </div>
  <div class="text-center text-sm mt-3">
    To pay using any UPI apps on your phone
  </div>
  <div class="flex justify-center gap-3 mt-2">
    <img :src="gpay" alt="gpay" class="w-7" />
    <img :src="phonepe" alt="phonepe" class="w-7" />
    <img :src="amazonPay" alt="amazon pay" class="w-7" />
    <img :src="bhim" alt="bhim" class="w-7" />
    <img :src="paytm" alt="paytm" class="w-7" />
  </div>
  <div class="bg-amber-100 p-3 text-sm rounded-md mt-3">
    It is <strong>mandatory</strong> to share the
    <strong>payment screenshot</strong> to the whatsapp number
    <strong>756985XXXX</strong> for order confirmation. and enter the
    transaction ID below. then confirm on whatsapp(optional).
  </div>
</template>
