/* ---------- ЭЛЕМЕНТЫ ---------- */

const searchInput = document.getElementById("search");
const mainHeader = document.getElementById("main-header");

const allTab = document.getElementById("all-tab");
const favTab = document.getElementById("fav-tab");

const shopsContainer = document.getElementById("shops");
const details = document.getElementById("shop-details");

const shopCoverImg = document.getElementById("shop-cover-img");
const shopCoverTitle = document.getElementById("shop-cover-title");
const shopDescription = document.getElementById("shop-description");
const shopStatus = document.getElementById("shop-status");
const shopTime = document.getElementById("shop-time");
const shopAddress = document.getElementById("shop-address");
const shopImages = document.getElementById("shop-images");
const shopTelegram = document.getElementById("shop-telegram");
const backBtn = document.getElementById("back-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

/* ---------- СОСТОЯНИЕ ---------- */

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentView = "all";

/* ---------- ДАННЫЕ ---------- */

const shops = [
  {
    id: 1,
    name: "Магазин 1",
    description: "Одежда и аксессуары для повседневной жизни.",
    workTime: "09:00 – 18:00",
    address: "Тотурбиева, напротив Севиллы",
    telegram: "https://t.me/monreall",
    cover: "covers/1.jpg",
    images: [
      "images/shop.jpeg",
      "images/shop.jpeg",
      "images/shop.jpeg"
    ]
  },
  {
    id: 2,
    name: "Магазин 2",
    description: "Магазин сотовой связи.",
    workTime: "10:00 – 20:00",
    address: "Напротив ТЦ Джинан",
    telegram: "https://t.me/monreall",
    cover: "covers/2.jpg",
    images: [
      "images/mobile.jpg",
      "images/mobile.jpg",
      "images/mobile.jpg"
    ]
  },
  {
    id: 3,
    name: "Магазин 3",
    description: "Кофейня с авторскими напитками.",
    workTime: "11:00 – 22:00",
    address: "Возле ворот главного рынка",
    telegram: "https://t.me/monreall",
    cover: "covers/3.jpg",
    images: [
      "images/coffee.jpg",
      "images/coffee.jpg",
      "images/coffee.jpg"
    ]
  }
];

/* ---------- ОТКРЫТО / ЗАКРЫТО ---------- */

function isShopOpen(workTime) {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  const [start, end] = workTime.split(" – ");
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  const startTotal = startH * 60 + startM;
  const endTotal = endH * 60 + endM;
  const currentTotal = currentHours * 60 + currentMinutes;

  return currentTotal >= startTotal && currentTotal <= endTotal;
}

/* ---------- ИЗБРАННОЕ ---------- */

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  applyFilters();
}

/* ---------- РЕНДЕР ---------- */

function renderShops(list = shops) {
  shopsContainer.innerHTML = "";

  if (list.length === 0) {
    shopsContainer.innerHTML = "<p style='padding:20px;'>Нет магазинов</p>";
    return;
  }

  list.forEach(shop => {

    const open = isShopOpen(shop.workTime);
    const status = open
      ? '<span class="open">🟢 Открыто</span>'
      : '<span class="closed">🔴 Закрыто</span>';

    const isFav = favorites.includes(shop.id);
    const heart = isFav ? "❤️" : "🤍";

    const card = document.createElement("div");
    card.className = "shop-card";

    card.innerHTML = `
      <div class="favorite">${heart}</div>
      <img src="${shop.cover}">
      <div class="shop-info">
        <h3>${shop.name}</h3>
        <p>${status}</p>
        <p>${shop.description}</p>
        <p>⏰ ${shop.workTime}</p>
        <p>📍 ${shop.address}</p>
      </div>
    `;

    card.querySelector(".favorite").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(shop.id);
    });

    card.onclick = () => openShop(shop);
    shopsContainer.appendChild(card);
  });
}

/* ---------- ОТКРЫТИЕ МАГАЗИНА ---------- */

function openShop(shop) {
  shopsContainer.classList.add("hidden");
  details.classList.remove("hidden");
  mainHeader.classList.add("hidden");

  const open = isShopOpen(shop.workTime);
  const status = open
    ? '<span class="open">🟢 Открыто</span>'
    : '<span class="closed">🔴 Закрыто</span>';

  shopCoverImg.src = shop.cover;
  shopCoverTitle.textContent = shop.name;
  shopDescription.textContent = shop.description;
  shopStatus.innerHTML = status;
  shopTime.textContent = shop.workTime;
  shopAddress.textContent = shop.address;
  shopTelegram.href = shop.telegram;

  shopImages.innerHTML = "";

  shop.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";

    img.addEventListener("click", () => {
      lightboxImg.src = src;
      lightbox.classList.remove("hidden");
    });

    shopImages.appendChild(img);
  });
}

/* ---------- НАЗАД ---------- */

backBtn.onclick = () => {
  details.classList.add("hidden");
  shopsContainer.classList.remove("hidden");
  mainHeader.classList.remove("hidden");
};

/* ---------- LIGHTBOX ---------- */

lightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

/* ---------- ВКЛАДКИ ---------- */

allTab.addEventListener("click", () => {
  currentView = "all";
  allTab.classList.add("active");
  favTab.classList.remove("active");
  applyFilters();
});

favTab.addEventListener("click", () => {
  currentView = "favorites";
  favTab.classList.add("active");
  allTab.classList.remove("active");
  applyFilters();
});

/* ---------- ФИЛЬТР ---------- */

function applyFilters() {
  const query = searchInput.value.toLowerCase();

  let filtered = shops.filter(shop =>
    shop.name.toLowerCase().includes(query) ||
    shop.description.toLowerCase().includes(query)
  );

  if (currentView === "favorites") {
    filtered = filtered.filter(shop =>
      favorites.includes(shop.id)
    );
  }

  renderShops(filtered);
}

/* ---------- ПОИСК ---------- */

searchInput.addEventListener("input", applyFilters);

/* ---------- СТАРТ ---------- */

renderShops();