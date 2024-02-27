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

      <div style="background: #00529b;" class="text-white text-center p-2 text-lg font-bold">Payment Success</div>
      <div class="p-2">
        <div class="flex justify-center">
          <div style="width:150px" class="mb-5 mt-10">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 50 50" xml:space="preserve">
              <circle style="fill:#25AE88;" cx="25" cy="25" r="25" />
              <polyline
                style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
                points="
	38,15 22,33 12,25 " />
            </svg></div>
        </div>
        <div class="font-bold text-lg text-center pt-2">transaksi autodebet anda berhasil diproses</div>
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
