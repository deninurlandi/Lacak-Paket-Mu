const inputResi = document.querySelector('.input-resi');
const cari = document.querySelector('.cari');
const pilihan = document.querySelector('.pilihan')
const isikanPerjalanan = document.querySelector('.tabel');
const detailResi = document.querySelector('.detail-resi')
cari.addEventListener('click', function(){
   cekData(inputResi, pilihan)
   
})

const kurir = document.querySelectorAll('.pilihan a');
kurir.forEach((a)=>{
   a.addEventListener('click', function(){
      resetData(isikanPerjalanan, pilihan);
      updateExspedisi(a);
   })
})



// function pendukung
function getDetail(curier, resi){
   return fetch(`https://api.binderbyte.com/v1/track?api_key=19f4b5952168422446052b2365e06b7fd84a073ef3fa389a172a9d9911279e8b&courier=${curier}&awb=${resi}`)
   .then(response => response.json())
   .then(response => response.data);
}

function updatePerjalanan(date, desc){
   isikanPerjalanan.innerHTML += `<tr>
   <td class="waktu">${date}</td>
   <td class="perjalanan">${desc}</td>
</tr>`;
}

async function updateExspedisi(linka){
   const detail = await getDetail(linka.getAttribute('id'), inputResi.value);
   const history = detail.history;
   detailResi.style.display = 'block';
   history.forEach(a => updatePerjalanan(a.date, a.desc))
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

function resetData(a, b){
   a.innerHTML= '';
   b.style.display = "none"
}