const inputResi = document.querySelector('.input-resi');
const cari = document.querySelector('.cari');
const pilihan = document.querySelector('.pilihan')
const isikanPerjalanan = document.querySelector('.tabel');
const detailResi = document.querySelector('.detail-resi');
const handleErr = document.querySelector('.handle-error')
inputResi.addEventListener('change', function(){
   cekData(inputResi, pilihan)
   
})

const kurir = document.querySelectorAll('.pilihan a');
kurir.forEach((a)=>{
   a.addEventListener('click', function(){
      resetData(isikanPerjalanan, pilihan, handleErr);
      updateExspedisi(a);
   })
})



// function pendukung
function getDetail(curier, resi){
   return fetch(`https://api.binderbyte.com/v1/track?api_key=19f4b5952168422446052b2365e06b7fd84a073ef3fa389a172a9d9911279e8b&courier=${curier}&awb=${resi}`)
   .then(response => response.json())
   .then(response => response);
}

function updatePerjalanan(date, desc){
   isikanPerjalanan.innerHTML += `<tr>
   <td class="waktu">${date}</td>
   <td class="perjalanan">${desc}</td>
</tr>`;
}



async function updateExspedisi(linka){
   const detail = await getDetail(linka.getAttribute('id'), inputResi.value);
   if(detail.status === 200){
      detailResi.style.display = 'block';
      const history = detail.data.history;
      const pPenj = document.querySelector('.status-ok')
      const summary = detail.data.summary;
      const detailApi = detail.data.detail;

      pPenj.innerHTML = `<p class="p-ket">
      Selamat!!. Paket dengan nomor resi <strong>${summary.awb}</strong> dengan ekspedisi <strong>${summary.courier}</strong> berstatus <strong>${summary.status}</strong>. klik dibawah ini untuk info lebih lanjut
    </p>`
      const detailResimu = document.querySelector('.detail-resimu');
      detailResimu.innerHTML = `<table class="table table-bordered">
      <tr>
        <td>Exspedisi</td>
        <td>:</td>
        <td>${summary.courier}</td>
      </tr>
      <tr>
        <td>No Resi</td>
        <td>:</td>
        <td>${summary.awb}</td>
      </tr>
      <tr>
        <td>Tanggal Dikirim</td>
        <td>:</td>
        <td>${history[history.length-1].date}</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>:</td>
        <td>${summary.status}</td>
      </tr>
      
      <tr>
        <td>Dikirim Oleh</td>
        <td>:</td>
        <td>${detailApi.shipper} ${detailApi.origin}</td>
      </tr>
      <tr>
        <td>Dikirim Ke</td>
        <td>:</td>
        <td>${detailApi.receiver} ${detailApi.destination}</td>
      </tr>
    </table>`


      history.forEach(a => updatePerjalanan(a.date, a.desc))
   }else{
      handleErr.style.display = 'block'
      const kotakErr = document.querySelector('.kotak-err')
      kotakErr.innerHTML = ` <img src="img/err.png" class="d-block mx-auto" />
      <div class="bg-warning-subtle rounded-bottom">
        <p class="p-error p-2">
          Maaf....! data nomor Resi <strong>${inputResi.value}</strong> tidak ditemukan,
          pastikan kembali pilih jenis ekspedisi yang benar, dan paastikan
          kembali nomor resi anda benar
        </p>
      </div>`



   }
   // const history = detail.history;
   // detailResi.style.display = 'block';
   // history.forEach(a => updatePerjalanan(a.date, a.desc))
}

function cekData(a, b){
   if(a.value.length <5){
      a.value = '';
      a.placeholder = 'Masukan resi yang benar ya cin..';
      a.style.boxShadow = '0 0 8px 0 rgba(255, 0, 0, 0.9)';
      b.style.display = "none"
   }
   else{
      detailResi.style.display= 'none'
      b.style.display = "none"
      setTimeout(()=>{
         b.style.display = "block"
      },300)
      a.style.boxShadow = 'inherit'
      a.placeholder = 'Masukan Resi Anda';
   }
}

function resetData(a, b, c){
   a.innerHTML = ''
   b.style.display = "none";
   c.style.display = 'none';

}