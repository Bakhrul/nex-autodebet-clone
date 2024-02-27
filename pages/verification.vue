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
      <template v-if="flag == 'mandiri-form'">
        <div style="background: #00529b;" class="text-white text-center p-2 text-lg font-bold">Form Payment Mandiri</div>
        <div class="p-2">
          <div class="mb-3 mt-3">
            <div class="font-medium mb-2">Masukkan 4 nomor terakhir kartu debit mandiri</div>
            <div style="display: flex; flex-direction: row;justify-content: center;">
              <v-otp-input ref="otpInput" input-classes="otp-input" separator="-" :num-inputs="4"
                @on-change="handleOnChangeMandiri" @on-complete="handleOnCompleteMandiri" :should-auto-focus="true"
                :is-input-num="true" />
            </div>
          </div>
          <div class="mb-3">
            <div class="font-medium mb-2">Masukkan No HP Mbanking Mandiri </div>

            <input type="number" class="w-full p-3 border-gray-300 rounded-xl border" v-model="single.mandiri.hpno"
              style="outline: none !important;" placeholder="081xxxxx">
          </div>
          <div class="mb-3">
            <div class="font-medium mb-2">Masukkan Email Mbanking Mandiri</div>
            <input type="email" class="w-full p-3 border-gray-300 rounded-xl border" v-model="single.mandiri.email"
              style="outline: none !important;" placeholder="jhon@gmail.com">
          </div>
          <button class="w-full rounded-full text-white p-3 text-md font-bold mt-3"
            :disabled="!single.mandiri.hpno || !single.mandiri.cardno || !single.mandiri.email || pageStatus == 'verification-load'"
            @click="flag = 'payment'" style="background-color: #f47735;">Selanjutnya</button>
        </div>
      </template>
      <template v-if="flag == 'bri-form'">
        <div style="background: #00529b;" class="text-white text-center p-2 text-lg font-bold">Form Payment BRI</div>
        <div class="p-2">
          <div class="mb-3 mt-3">
            <div class="font-medium mb-2">Masukkan 4 nomor terakhir kartu debit BRI</div>
            <div style="display: flex; flex-direction: row;justify-content: center;">
              <v-otp-input ref="otpInput" input-classes="otp-input" separator="-" :num-inputs="4"
                @on-change="handleOnChangeBri" @on-complete="handleOnCompleteBri" :should-auto-focus="true"
                :is-input-num="true" />
            </div>
          </div>
          <div class="mb-3">
            <div class="font-medium mb-2">Masukkan No HP Mbanking BRI </div>

            <input type="number" class="w-full p-3 border-gray-300 rounded-xl border" v-model="single.bri.hpno"
              style="outline: none !important;" placeholder="081xxxxx">
          </div>
          <div class="mb-3">
            <div class="font-medium mb-2">Masukkan Email Mbanking BRI</div>
            <input type="email" class="w-full p-3 border-gray-300 rounded-xl border" v-model="single.bri.email"
              style="outline: none !important;" placeholder="jhon@gmail.com">
          </div>
          <button class="w-full rounded-full text-white p-3 text-md font-bold mt-3"
            :disabled="!single.bri.hpno || !single.bri.cardno || !single.bri.email || pageStatus == 'verification-load'"
            @click="flag = 'payment'" style="background-color: #f47735;">Selanjutnya</button>
        </div>
      </template>
      <template v-if="flag == 'payment'">
        <div style="background: #00529b;" class="text-white text-center p-2 text-lg font-bold">Verifikasi</div>
        <div class="p-2">
          <div class="flex justify-center">
            <img src="@/assets/image/kotak-masuk.png" style="width:150px" />
          </div>
          <div class="font-bold text-md text-center pt-2">Masukkan Kode Verifikasi</div>
          <div class="text-center text-xs">Kode Verifikasi telah dikirimkan melalui SMS ke <span
              class="font-bold">{{single.phone}}</span></div>
          <div style="display: flex; flex-direction: row;justify-content: center;" class="mt-5 mb-5">
            <v-otp-input ref="otpInput" input-classes="otp-input" separator="-" :num-inputs="4"
              @on-change="handleOnChange" @on-complete="handleOnComplete" :should-auto-focus="true"
              :is-input-num="true" />
          </div>
          <button class="w-full rounded-full text-white p-3 text-md font-bold mt-3"
            :disabled="pageStatus == 'verification-load'" @click="processAutoDebet"
            style="background-color: #f47735;">{{ pageStatus == 'verification-load' ? 'Transaksi Anda Sedang Diproses' : 'Verifikasi' }}</button>
          <div class="text-center pt-3" v-if="timerOtp">Mohon Menunggu <span class="font-bold">{{ timerOtp }}</span>
            untuk mengirim ulang</div>
          <div style="color:#00529b;" class="text-center font-bold pt-3 pointer" @click="toStepPayment">
            {{pageStatus == 'otp-load' ? 'Memproses..' : 'Kirim Ulang'}}
          </div>
        </div>
      </template>
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

        flag: 'payment',
        timerOtp: '',
        availableOtp: '',
        intervalOtp: '',
        single: {
          mandiri: {
            cardno: '',
            hpno: '',
            email: ''
          },
          bri: {
            cardno: '',
            hpno: '',
            email: ''
          },
          refferalCode: '',
          name: '',
          phone: '',
          smcid: '',
          packet: '',
          payment: '',
          otp: '',
          trxno: '',
        }
      }
    },
    mounted() {
      this.single.name = this.$route.query.username;
      this.single.phone = this.$route.query.hpno;
      this.single.smcid = this.$route.query.smcid;
      this.single.packet = this.$route.query.paketid;
      this.single.payment = this.$route.query.paymentid;
      this.single.trxno = this.$route.query.trxno;
      this.single.refferalCode = this.$route.query.referalcode;
      if (this.single.payment == 'MANDIRI') {
        this.flag = 'mandiri-form'
      } else if (this.single.payment == 'BRI') {
        this.flag = 'bri-form'
      }
    },
    methods: {
      toStepPayment() {
        if (this.timerOtp) {
          return false;
        }
        if (this.pageStatus == 'otp-load') {
          return false;
        }

        this.pageStatus = 'otp-load';

        let params = (new URL(document.location)).searchParams;
        let refferalCode = params.get("refcode");

        const data = {
          'username': this.single.name,
          'hpno': this.single.phone,
          'smcid': this.single.smcid,
          'paketid': this.single.packet,
          'paymentid': this.single.payment,
          'referalcode': refferalCode,
        }

        const formData = JSON.stringify(data);
        Api().post('sendotp', formData)
          .then(response => {
            this.pageStatus = 'standby';

            if (response.data.success) {
              this.availableOtp = this.$moment().add(60, 'seconds');
              setTimeout(() => {
                this.countDownOTP();
              }, 100);
              clearInterval(this.intervalOtp);
              this.flag = 'payment';
              this.single.trxno = response.data.data.trxno;
            } else {
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 3000
              });
            }

          }).catch(error => {
            this.pageStatus = 'standby';
            this.$axioshandler(error);
          });
      },
      handleOnComplete(value) {
        this.single.otp = value;
      },
      handleOnChange(value) {
        this.single.otp = value;
      },

      handleOnCompleteMandiri(value) {
        this.single.mandiri.cardno = value;
      },
      handleOnChangeMandiri(value) {
        this.single.mandiri.cardno = value;
      },
      handleOnCompleteBri(value) {
        this.single.bri.cardno = value;
      },
      handleOnChangeBri(value) {
        this.single.bri.cardno = value;
      },
      countDownOTP() {

        if (this.availableOtp) {

          const availableDate = this.$moment(this.availableOtp);
          const currentDate = this.$moment().format();
          const diffTime = availableDate.diff(currentDate, 'seconds');
          let duration = moment.duration(diffTime * 1000, 'milliseconds');
          const interval = 1000;
          const that = this;
          this.intervalOtp = setInterval(function () {
            duration = moment.duration(duration - interval, 'milliseconds');
            const minutes = duration.minutes() < 10 ? '0' + duration.minutes() : duration
              .minutes();
            const seconds = duration.seconds() < 10 ? '0' + duration.seconds() : duration
              .seconds();
            if (duration._milliseconds <= 0) {
              that.timerOtp = '';
            } else {
              that.timerOtp = minutes + " : " + seconds;
            }
          }, interval);
        } else {
          this.timerOtp = '';
        }
      },
      processAutoDebet() {
        if (!this.single.otp || this.single.otp.length != 4) {
          return false;
        }
        const data = {
          'otpcode': this.single.otp,
          'trxno': this.single.trxno,

        }

        let checkoutUrl = '';

        if (this.single.payment == 'SHOPPEE') {
          checkoutUrl = 'autodebetprocessshopee';
        } else if (this.single.payment == 'DANA') {
          checkoutUrl = 'autodebetprocessdana';
        } else if (this.single.payment == 'MANDIRI') {
          checkoutUrl = 'autodebetprocessmandiri';
          data.cardno = this.single.mandiri.cardno
          data.hpno = this.single.mandiri.hpno
          data.email = this.single.mandiri.email
        } else if (this.single.payment == 'OVO') {
          checkoutUrl = 'autodebetprocessovo';
        } else if (this.single.payment == 'BRI') {
          checkoutUrl = 'autodebetprocessbri1';
          data.cardno = this.single.bri.cardno
          data.hpno = this.single.bri.hpno
          data.email = this.single.bri.email
        } else {
          return false;
        }
        this.pageStatus = 'verification-load';
        const formData = JSON.stringify(data);
        Api().post(checkoutUrl, formData)
          .then(response => {


            if (response.data.success) {
                if (this.single.payment == 'BRI') {
                    this.$router.push({
                        path: '/bri-verif',
                        query:{
                            trxno: this.single.trxno
                        }
                    })
                }else{
                    window.location.href = response.data.data.urlcheckout;
                }
              
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
