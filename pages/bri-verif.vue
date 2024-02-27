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

      <div style="background: #00529b;" class="text-white text-center p-2 text-lg font-bold">Verifikasi Payment BRI</div>
      <div class="p-2">
        <div class="flex justify-center">
          <img src="@/assets/image/kotak-masuk.png" style="width:150px" />
        </div>
        <div class="font-bold text-md text-center pt-2">Masukkan OTP yang Anda terima dari Bank BRI</div>
        <div style="display: flex; flex-direction: row;justify-content: center;" class="mt-5 mb-5">
          <v-otp-input ref="otpInput" input-classes="otp-input" separator="-" :num-inputs="4"
            @on-change="handleOnChange" @on-complete="handleOnComplete" :should-auto-focus="true"
            :is-input-num="true" />
        </div>
        <button class="w-full rounded-full text-white p-3 text-md font-bold mt-3"
          :disabled="pageStatus == 'verification-load'" @click="processAutoDebet"
          style="background-color: #f47735;">{{ pageStatus == 'verification-load' ? 'Transaksi Anda Sedang Diproses' : 'Verifikasi' }}</button>
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
      this.single.trxno = this.$route.query.trxno;
    },
    methods: {
        handleOnComplete(value) {
        this.single.otp = value;
      },
      handleOnChange(value) {
        this.single.otp = value;
      },
      processAutoDebet() {
        if (!this.single.otp || this.single.otp.length != 4) {
          return false;
        }
        const data = {
          'otpcode': this.single.otp,
          'trxno': this.single.trxno,

        }      
        this.pageStatus = 'verification-load';
        const formData = JSON.stringify(data);
        Api().post('autodebetprocessbri2', formData)
          .then(response => {


            if (response.data.success) {
              this.$router.push({
                path: '/payment-success',
              })

            } else {
              this.pageStatus = 'standby';
              this.$toast.error(response.data.message);
            }

          }).catch(error => {
            this.pageStatus = 'standby';
            this.$axioshandler(error);
          });
      }
    }
  }

</script>
