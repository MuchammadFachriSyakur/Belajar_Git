//toggle
const toggle = document.getElementById('toggle');
const span1 = document.querySelector(".container nav .toggle span:nth-child(1)");
const span2 = document.querySelector(".container nav .toggle span:nth-child(2)");
const span3 = document.querySelector(".container nav .toggle span:nth-child(3)");
const hilang = document.querySelector(".container nav .list");

toggle.addEventListener("click", (e)=>{
  toggle.classList.toggle('tKlik');
  span1.classList.toggle('span1');
  span2.classList.toggle('span2');
  span3.classList.toggle('span3');
  hilang.classList.toggle('muncul');
});
//toggle end

//slider halaman1
let s_i = 0;
const images = [];

images[0] = "bg-gambar.jpg";
images[1] = "bg-gambar1.jpg";
images[2] = "bg-gambar2.jpg";
images[3] = "bg-gambar3.jpg";

function slider(){
  document.slide.src = images[s_i];
  if(s_i < images.length - 1){
    s_i++;
  }else{
    s_i = 0;
  }
  setTimeout(slider, 1250);
}
window.onload = slider;
//slider halaman1 end

//scroll 
window.addEventListener("scroll", (e)=>{
  const teksHome = document.querySelector(".container .halaman1 .teks-sambutan p");
  const teksHome1 = teksHome.getBoundingClientRect().bottom;
  const game = document.querySelectorAll(".container .halaman2 section.game .item");
  const layar = window.innerHeight;
  
  game.forEach((div, index)=>{
    const game1 = div.getBoundingClientRect().top;
    const waktu = index * 0.25;
    if(game1 <= layar){
      div.classList.add('gaktif');
      if(index == 0){
        div.style.transition = `all 1s ease-in-out`;
      }else{
        div.style.transition = `all ${index}s ease-in-out`;
      }
    }else{
      div.classList.remove('gaktif');
    }
  });
  
  if(layar > teksHome1){
    teksHome.classList.add('tHak');
  }
});
// scroll end

//loading 
window.addEventListener("DOMContentLoaded",(l)=>{
  const teksHome = document.querySelectorAll(".container .halaman1 .teks-sambutan p");
  const gambar = document.querySelector(".container .halaman1 .gambar");
  gambar.classList.toggle('gambAktif');
  teksHome.forEach((p)=>{
    p.classList.toggle('tHak');
  });
});
//loading DOMContentLoaded


const sosmed = document.querySelectorAll(".container footer .sosmed .nama-sosmed");
sosmed.forEach((item)=>{
  item.addEventListener("click", (e)=>{
    const alert = document.createElement('div');
    const info = 'Website ini hanya website statis demo e-commerce,jadi mungkin ada beberapa item yang kurang berguna,semoga pemberitahuan ini berguna dan mohon maaf jika fitur kurang menarik,kami sedang mencoba dalam pengembangan.';
    alert.className = 'alert';
    alert.innerHTML = `
    <div class="alert">
  <div class="alert-content">
    <span id="tutup">&times;</span>
    <p class="alert-danger">Pemberitahuan🗣️</p>
    <p>${info}</p>
  </div>
</div>
    `;
    document.body.appendChild(alert);
    const tutupke = document.querySelector(".alert .alert-content span#tutup");
    tutupke.addEventListener("click", (e)=>{
      const div = document.querySelector(".alert");
      document.body.removeChild(div);
    });
  });
});

let tmbl = 0;
const keranjang = [];
const total_belanja = 0;

function tambahkanProdukKeKeranjang(namaProduk, hargaProduk) {
  tmbl++;

  const confirm = window.confirm(`Apakah anda ingin membeli ${namaProduk} dengan harga ${hargaProduk}`);

  if (confirm) {
    const produkDitemukan = keranjang.find((produk) => produk.namaProduk === namaProduk);

    if (produkDitemukan) {
      produkDitemukan.jumlah++;
    } else {
      keranjang.push({
        namaProduk,
        hargaProduk,
        jumlah: 1,
      });
    }

    updateKeranjang();
  }
}

function updateKeranjang() {
  const tempat_produk = document.querySelector(".container .daftar-keranjang .list-barang");
  const total_belanja1 = document.querySelector(".container .daftar-keranjang .totalnya");
  const total_belanja = document.querySelector(".container .daftar-keranjang .list-barang .total_belanja");
  const t_button = document.querySelector(".container .daftar-keranjang .checkout");
  const checkout = document.querySelector(".container .daftar-keranjang .checkout");
  t_button.classList.add("cAktif");

  tempat_produk.innerHTML = "";
  let total = 0;

  keranjang.forEach((produk) => {
    const div = document.createElement("div");
    div.classList.add("item");
    const jml_ttl = produk.jumlah * produk.hargaProduk;
    div.innerHTML = `
      <div class="produk">
        <p>Nama Produk: ${produk.namaProduk}</p>
        <p>Harga: Rp.${produk.hargaProduk.toLocaleString("id-ID")}</p>
        <p>Total produk: ${produk.jumlah}x</p>
        <p>Total harga Rp.${jml_ttl.toLocaleString("id-ID")}</p>
        <button id="del">Hapus</button>
      </div>
    `;
    tempat_produk.appendChild(div);
    total += (produk.jumlah * produk.hargaProduk);
  });

  const it = document.getElementById("keranjang");

  window.scrollTo({
    top: it.offsetTop,
    left: 0,
  });

  total_belanja1.textContent = `Total keranjang anda ${total.toLocaleString("id-ID")}`;
  checkout.innerHTML = "Chekout";

  sessionStorage.setItem("keranjang", JSON.stringify(keranjang));
  hapusKeranjang();
}

function hapusKeranjang() {
  const button = document.querySelectorAll(".container .daftar-keranjang .list-barang .item .produk button");

  button.forEach((item) => {
    item.addEventListener("click", (e) => {
      const parent = e.target.parentElement.parentElement;
      parent.remove();
      keranjang.pop(item);
    });
  });
  
}

function cekout(){
  window.location.href = "keranjang.html";
}