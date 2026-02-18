const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter-btn");
const shopsGrid = document.getElementById("shops-grid");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentView = "all";
let currentFilter = "all";

const shops = [

  {
    id: 1,
    name: "Zara",
    type: "Одежда",
    description: "Магазин современной одежды.",
    workTime: "09:00 – 18:00",
    address: "ул. Тотурбиева 12",
    cover: "covers/1.jpg"
  },

  {
    id: 2,
    name: "iPhone Store",
    type: "Электроника",
    description: "Продажа смартфонов и аксессуаров.",
    workTime: "10:00 – 20:00",
    address: "ТЦ Джинан",
    cover: "covers/2.jpg"
  },

  {
    id: 3,
    name: "Coffee House",
    type: "Кофе",
    description: "Авторский кофе и десерты.",
    workTime: "11:00 – 22:00",
    address: "Центральная улица",
    cover: "covers/3.jpg"
  },
  {
    id: 4,
    name: "Coffee House",
    type: "Кофе",
    description: "Авторский кофе и десерты.",
    workTime: "11:00 – 22:00",
    address: "Центральная улица",
    cover: "covers/3.jpg"
  },
  {
    id: 5,
    name: "Coffee House",
    type: "Кофе",
    description: "Авторский кофе и десерты.",
    workTime: "11:00 – 22:00",
    address: "Центральная улица",
    cover: "covers/3.jpg"
  },
  {
    id: 6,
    name: "Coffee House",
    type: "Кофе",
    description: "Авторский кофе и десерты.",
    workTime: "11:00 – 22:00",
    address: "Центральная улица",
    cover: "covers/3.jpg"
  },
  {
    id: 7,
    name: "Coffee House",
    type: "Кофе",
    description: "Авторский кофе и десерты.",
    workTime: "11:00 – 22:00",
    address: "Центральная улица",
    cover: "covers/3.jpg"
  },
  {
    id: 8,
    name: "Coffee House",
    type: "Кофе",
    description: "Авторский кофе и десерты.",
    workTime: "11:00 – 22:00",
    address: "Центральная улица",
    cover: "covers/3.jpg"
  },
  

];
function isShopOpen(time){
  const now = new Date();
  const [start,end] = time.split(" – ");
  const [sH,sM] = start.split(":").map(Number);
  const [eH,eM] = end.split(":").map(Number);
  const current = now.getHours()*60+now.getMinutes();
  return current >= sH*60+sM && current <= eH*60+eM;
}

function renderShops() {
  shopsGrid.innerHTML = "";

  let list = shops;

  if(currentFilter !== "all"){
    list = list.filter(shop => shop.type === currentFilter);
  }

  list.forEach(shop => {

    const status = isShopOpen(shop.workTime)
      ? '<span class="open">🟢 Открыто</span>'
      : '<span class="closed">🔴 Закрыто</span>';

    const card = document.createElement("div");
    card.className = "shop-card";

    card.innerHTML = `
      <img src="${shop.cover}">
      <div class="shop-info">
        <h3>${shop.name}</h3>
        <p>${status}</p>
        <p>${shop.type}</p>
      </div>
    `;

    shopsGrid.appendChild(card);
  });
}

/* Фильтры */
filterButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.type;
    renderShops();
  });
});

/* Поиск */
searchInput.addEventListener("input",()=>{
  const query = searchInput.value.toLowerCase();
  const filtered = shops.filter(shop =>
    shop.name.toLowerCase().includes(query)
  );
  shopsGrid.innerHTML="";
  filtered.forEach(shop=>{
    const card=document.createElement("div");
    card.className="shop-card";
    card.innerHTML=`
      <img src="${shop.cover}">
      <div class="shop-info">
        <h3>${shop.name}</h3>
      </div>
    `;
    shopsGrid.appendChild(card);
  });
});

renderShops();