<template>
    <div>
      <div id="overlay" @click="offModalAutoDebet()">
      </div>
      <div id="modal-term-dialog" @click="offModalAutoDebet()">
        <div class="modal" id="modal-term" @click.stop="">
          <div class="header" id="header">
            <div class="text-lg text-center p-2 font-semibold">Syarat Dan ketentuan</div>
          </div>
          <div class="body p-2">
            <template v-if="pageStatus == 'term-load'">
              <div class="flex justify-center mt-5 mb-5">
                <loader-component></loader-component>
              </div>
            </template>
            <template v-else>
              <div v-html="term"></div>
            </template>
            <button type="button" @click="single.autoDebet = true;offModalAutoDebet()"
              class="w-full rounded-lg text-white p-2 text-md font-bold pointer mt-3"
              style="background-color: #f47735;">Setuju</button>
            <button type="button" @click="offModalAutoDebet"
              class="pointer w-full rounded-lg text-black bg-gray-300 mt-3 p-2 text-md font-bold">Kembali</button>
          </div>
        </div>
      </div>
  
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
        <template v-if="flag == 'form'">
          <div style="background: #00529b;" class="text-white text-center p-2 text-lg font-bold">Form Auto Debet</div>
          <div class="p-3">
            <!-- <div class="mb-3">
              <div class="font-medium">Nama</div>
              <input type="text" class="w-full p-3 border-gray-300 rounded-xl border" style="outline: none !important;"
                :disabled="pageStatus == 'otp-load'" v-model="single.name" placeholder="Nama Anda">
            </div>
            <div class="mb-3">
              <div class="font-medium">No. HP</div>
              <input type="number" class="w-full p-3 border-gray-300 rounded-xl border" style="outline: none !important;"
                :disabled="pageStatus == 'otp-load'" v-model="single.phone" placeholder="081x xxxx xxxx">
            </div> -->
            <div class="mb-3">
              <div class="font-medium">SMC ID</div>
              <input type="number" class="w-full p-3 border-gray-300 rounded-xl border" style="outline: none !important;"
                @input="showPacketPayment = false" disabled v-model="single.smcid"
                placeholder="800x xxxx xxxx xxxx">
            </div>
            <button class="w-full rounded-full text-white p-3 text-md font-bold" @click="getPacket"
              v-if="!showPacketPayment" :disabled="!single.smcid"
              style="background-color: rgb(244, 119, 53);">Lanjutkan</button>
          </div>
          <div v-if="showPacketPayment" style=" background-image: linear-gradient(to right, #2f6bff , #9a27f6)"
            class="text-white p-2">
            <div class="font-bold text-md">{{ title }}</div>
            <div class="pt-1 text-sm">{{subtitle}}</div>
          </div>
          <div class="p-2" v-if="showPacketPayment">
            <template v-if="pageStatus == 'list-load'">
              <div class="flex justify-center mt-3">
                <loader-component></loader-component>
              </div>
            </template>
            <template v-else>
              <template v-for="a in listPacket">
                <div class="font-bold text-sm pb-2">{{a.nama}}</div>
                <div class="flex flex-wrap">
                  <div class="w-1/3 p-1 column-product pointer" v-for="b in a.paket"
                    @click="pageStatus == 'payment-load' || pageStatus == 'otp-load' ? '' : single.packet = b.paketid;getListPayment()"
                    :class="single.packet == b.paketid ? 'active' : ''">
                    <div class="border-2 border-gray-300 rounded-xl p-1 mt-3 mb-3 relative w-full box">
                      <div class="label-discount"
                        style="position:absolute;background-color: #00529b;color:#fff;padding:2px 6px;border-radius:5px;font-size:10px;font-weight:bold;top:-16px;left:5px;">
                        Promo</div>
                      <div
                        class="text-center border-b-2 font-medium border-gray-300 text-gray-600 pb-1 mb-1 text text-xs">
                        {{b.masaaktif}}
                      </div>
                      <div class="text-center text-gray-500 line-through text" style="font-size:11px">{{b.harganormal}}
                      </div>
                      <div class="text-center font-bold text-xs text" style="color:#f47735;">{{b.harga}}</div>
                    </div>
                  </div>
                </div>
              </template>
            </template>
            <div class="flex border-b border-gray-300 pb-5 mb-5 items-center">
              <div class="checkbox-auto pointer mr-3 rounded-lg" @click="clickedAutoDebet"
                :class="single.autoDebet ? 'active' : ''">
                <i class="bi bi-check"></i>
              </div>
              <div class="text-black font-medium text-sm">Saya Setuju Auto Debet</div>
            </div>
            <div class="text-md font-semibold pt-3">Pilih Pembayaran</div>
            <template v-if="pageStatus == 'payment-load'">
              <div class="flex justify-center mt-5 mb-5">
                <loader-component></loader-component>
              </div>
            </template>
            <template v-else>
              <div class="flex justify-between items-center mt-5 border-b border-gray-200 pb-5" v-for="a in listPayment"
                @click="pageStatus == 'otp-load' ? '' : single.payment = a.paymentid">
                <div class="flex items-center">
                  <div style="width:70px">
                    <img :src="a.iconurl" style="max-width:50px;width:auto;">
                  </div>
                  <div class="font-semibold text-lg" style="padding-left: 10px;">{{a.paymentname}}</div>
                </div>
                <div>
                  <div class="radio-payment" :class="single.payment == a.paymentid ? 'active' : ''">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
      <div class="fixed border-gray-300 border-t py-5 bottom-0 bg-white px-3 w-full" style="max-width:480px;"
        v-if="showPacketPayment">
        <button class="w-full rounded-full text-white p-3 text-md font-bold" v-if="flag == 'form'" @click="toStepPayment"
          :disabled="pageStatus == 'otp-load'"
          style="background-color: #f47735;">{{pageStatus == 'otp-load' ? 'Memproses...' : 'Pembayaran'}}</button>
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
          showPacketPayment: false,
          flag: 'form',
          term: '',
          listPacket: [],
          listPayment: [],
          title: '',
          subtitle: '',
          timerOtp: '',
          availableOtp: '',
          intervalOtp: '',
          single: {
            name: '',
            phone: '',
            smcid: '',
            packet: '',
            autoDebet: false,
            payment: '',
            otp: '',
            trxno: '',
          }
        }
      },
      mounted() {
        this.getPacket();
        this.single.smcid = this.$route.params.id;
      },
      methods: {
        getPacket() {
          this.pageStatus = 'list-load';
          this.showPacketPayment = true;
          this.single.payment = '';
          this.single.packet = '';

          let params = {
            smcid: this.single.smcid
          }
          Api().get('paket',{
            params
          })
            .then(response => {
              this.pageStatus = 'standby';
  
              if (response.data.success) {
                this.listPacket = response.data.data.paketsubs;
                if (response.data.data.paketsubs.length > 0) {
                  if (response.data.data.paketsubs[0].paket.length > 0) {
                    this.single.packet = response.data.data.paketsubs[0].paket[0].paketid;
                    this.getListPayment();
                  }
                }
                this.title = response.data.data.paketsubstitle;
                this.subtitle = response.data.data.paketsubssubtitle;
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
        clickedAutoDebet() {
          if (this.pageStatus == 'otp-load') {
            return false;
          }
          if (this.single.autoDebet) {
            this.single.autoDebet = false;
            return false;
          }
          this.getTerm();
          document.getElementById("overlay").style.display = "block";
          setTimeout(() => {
            document.getElementById('modal-term-dialog').style.display = "block";
          }, 300);
  
        },
        offModalAutoDebet() {
          document.getElementById("overlay").style.display = "none";
          document.getElementById('modal-term-dialog').style.display = "none";
        },
        getListPayment() {
  
          this.single.payment = '';
          this.listPayment = [];
          let params = {
            paketid: this.single.packet,
            smcid: this.single.smcid
          }
  
  
          this.pageStatus = 'payment-load';
          Api().get('paymentoptautodebet', {
              params
            })
            .then(response => {
              this.pageStatus = 'standby';
  
              if (response.data.success) {
                this.listPayment = response.data.data.payment;
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
        getTerm() {
          this.pageStatus = 'term-load';
          Api().get('termautodebet')
            .then(response => {
              this.pageStatus = 'standby';
  
              if (response.data.success) {
                this.term = response.data.data.content;
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
        toStepPayment() {
          if (this.timerOtp) {
            return false;
          }
          if (this.pageStatus == 'otp-load') {
            return false;
          }
  
          if (this.pageStatus == 'payment-load') {
            return false;
          }
  
  
        //   if (!this.single.name) {
        //     this.$toast.error('Nama tidak boleh kosong', {
        //       position: "top-center",
        //       duration: 3000
        //     });
        //     return false;
        //   }
        //   if (!this.single.phone) {
        //     this.$toast.error('No HP tidak boleh kosong', {
        //       position: "top-center",
        //       duration: 3000
        //     });
        //     return false;
        //   }
        //   if (!this.single.smcid || this.single.smcid.length != 16) {
        //     this.$toast.error('Panjang karakter SMC ID harus 16 karakter', {
        //       position: "top-center",
        //       duration: 3000
        //     });
        //     return false;
        //   }
  
          if (!this.single.packet) {
            this.$toast.error('Pilih paket dahulu!', {
              position: "top-center",
              duration: 3000
            });
            return false;
          }
  
          if (!this.single.payment) {
            this.$toast.error('Pilih pembayaran dahulu!', {
              position: "top-center",
              duration: 3000
            });
            return false;
          }
  
          if (!this.single.autoDebet) {
            this.$toast.error('Auto Debet harus tercentang!', {
              position: "top-center",
              duration: 3000
            });
            return false;
          }
  
          this.pageStatus = 'otp-load';
            
          let refferalCode = this.$route.params.id;
  
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
  
                this.$router.push({
                  path: '/verification',
                  query: {
                    'username': this.single.name,
                    'hpno': this.single.phone,
                    'smcid': this.single.smcid,
                    'paketid': this.single.packet,
                    'paymentid': this.single.payment,
                    'referalcode': refferalCode,
                    'trxno': response.data.data.trxno
                  }
                })
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
      }
    }
  
  </script>
  