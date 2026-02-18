const searchInput = document.getElementById("search");
const mainHeader = document.getElementById("main-header");

const shopsGrid = document.getElementById("shops-grid");

const navMain = document.getElementById("nav-main");
const navFav = document.getElementById("nav-fav");

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
const favBtn = document.getElementById("fav-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentView = "all";
let currentShopId = null;

/* ---------- 13 МАГАЗИНОВ ---------- */

const shops = [];

for (let i = 1; i <= 13; i++) {
  shops.push({
    id: i,
    name: `Магазин ${i}`,
    description: "Описание магазина и его ассортимента.",
    workTime: i % 2 === 0 ? "09:00 – 18:00" : "10:00 – 20:00",
    address: "г. Хасавюрт",
    telegram: "https://t.me/monreall",
    cover: "covers/1.jpg",
    images: [
      "images/shop.jpeg",
      "images/shop.jpeg",
      "images/shop.jpeg"
    ]
  });
}

/* ---------- ОТКРЫТО / ЗАКРЫТО ---------- */

function isShopOpen(workTime) {
  const now = new Date();
  const [start, end] = workTime.split(" – ");
  const [sH, sM] = start.split(":").map(Number);
  const [eH, eM] = end.split(":").map(Number);
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= sH * 60 + sM && current <= eH * 60 + eM;
}

/* ---------- РЕНДЕР ---------- */

function renderShops(list = shops) {
  shopsGrid.innerHTML = "";

  let displayList = list;

  if (currentView === "favorites") {
    displayList = displayList.filter(shop =>
      favorites.includes(shop.id)
    );
  }

  displayList.forEach(shop => {

    const open = isShopOpen(shop.workTime);
    const status = open
      ? '<span class="open">🟢 Открыто</span>'
      : '<span class="closed">🔴 Закрыто</span>';

    const card = document.createElement("div");
    card.className = "shop-card";

    card.innerHTML = `
        <img src="${shop.cover}">
        <div class="shop-info">
          <h3>${shop.name}</h3>
          <p>${status}</p>
  </div>
    `;

    card.onclick = () => openShop(shop);
    shopsGrid.appendChild(card);
  });
}

/* ---------- ОТКРЫТИЕ ---------- */

function openShop(shop) {
  shopsContainer.classList.add("hidden");
  details.classList.remove("hidden");
  mainHeader.classList.add("hidden");

  details.classList.add("fade-in");

  currentShopId = shop.id;

  shopCoverImg.src = shop.cover;
  shopCoverTitle.textContent = shop.name;
  shopDescription.textContent = shop.description;
  shopTime.textContent = shop.workTime;
  shopAddress.textContent = shop.address;
  shopTelegram.href = shop.telegram;

  shopStatus.innerHTML = isShopOpen(shop.workTime)
    ? '<span class="open">🟢 Открыто</span>'
    : '<span class="closed">🔴 Закрыто</span>';

  if (favorites.includes(shop.id)) {
    favBtn.textContent = "❤️";
    favBtn.classList.add("active");
  } else {
    favBtn.textContent = "🤍";
    favBtn.classList.remove("active");
  }

  shopImages.innerHTML = "";

  shop.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => {
      lightboxImg.src = src;
      lightbox.classList.remove("hidden");
    };
    shopImages.appendChild(img);
  });
}

/* ---------- ИЗБРАННОЕ ---------- */

favBtn.onclick = () => {
  if (!currentShopId) return;

  if (favorites.includes(currentShopId)) {
    favorites = favorites.filter(id => id !== currentShopId);
  } else {
    favorites.push(currentShopId);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  if (favorites.includes(currentShopId)) {
    favBtn.textContent = "❤️";
    favBtn.classList.add("active");
  } else {
    favBtn.textContent = "🤍";
    favBtn.classList.remove("active");
  }

  renderShops();
};

/* ---------- НАЗАД ---------- */

backBtn.onclick = () => {
  details.classList.add("hidden");
  shopsContainer.classList.remove("hidden");
  mainHeader.classList.remove("hidden");
};

/* ---------- LIGHTBOX ---------- */

lightbox.onclick = () => {
  lightbox.classList.add("hidden");
};

/* ---------- ПОИСК ---------- */

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = shops.filter(shop =>
    shop.name.toLowerCase().includes(query) ||
    shop.description.toLowerCase().includes(query)
  );

  renderShops(filtered);
});

/* ---------- НИЖНЯЯ НАВИГАЦИЯ ---------- */

navMain.onclick = () => {
  currentView = "all";
  navMain.classList.add("active");
  navFav.classList.remove("active");
  renderShops();
};

navFav.onclick = () => {
  currentView = "favorites";
  navFav.classList.add("active");
  navMain.classList.remove("active");
  renderShops();
};

renderShops();