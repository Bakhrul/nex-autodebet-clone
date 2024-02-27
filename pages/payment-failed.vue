<template>
  <div>
    <div class="relative" style="padding-bottom: 150px;">
      <div class="flex justify-center items-center p-2">
        <div class="border-r border-gray-300 pr-3">
          <img src="@/assets/image/logo.jpg" style="width:70px" />
        </div>
        <div class="flex flex-wrap items-center">
          <img src="@/assets/image/premier-league.png" style="width:45px" />
          <img src="@/assets/image/liga-1.png" style="width:45px" />
          <img src="@/assets/image/champions-league.png" style="width:45px" />
          <img src="@/assets/image/pro-liga.png" style="width:45px" />
        </div>

      </div>

      <div style="background: #00529b;" class="text-white text-center p-2 text-lg font-bold">Payment Failed</div>
      <div class="p-2">
        <div class="flex justify-center">
          <div style="width:150px" class="mb-5 mt-10">
            <svg fill="#000000" width="150px" height="150px" viewBox="0 -8 528 528" xmlns="http://www.w3.org/2000/svg">
              <title>fail</title>
              <path
                d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z" />
            </svg></div>
        </div>
        <div class="font-bold text-lg text-center pt-2">transaksi autodebet anda gagal diproses</div>
      </div>

    </div>

  </div>
</template>

<script>
  import moment from "moment";
  import Api from "@/services/api";
  import Loading from '~/components/Loading.vue';
  import OtpInput from "@bachdgvn/vue-otp-input";
  export default {
    components: {
      'loader-component': Loading,
      'v-otp-input': OtpInput
    },
    data() {
      return {
        pageStatus: 'standby',

        single: {
          otp: '',
          trxno: '',
        }
      }
    },
    mounted() {

    },
    methods: {}
  }

</script>
