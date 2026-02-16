const searchInput = document.getElementById("search");
const mainHeader = document.getElementById("main-header");

const allTab = document.getElementById("all-tab");
const favTab = document.getElementById("fav-tab");

const filterButtons = document.querySelectorAll(".filter-btn");

const navMain = document.getElementById("nav-main");
const navFavBottom = document.getElementById("nav-fav-bottom");

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

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentView = "all";
let currentType = "all";

const shops = [
  {
    id: 1,
    name: "Магазин 1",
    type: "Одежда",
    description: "Одежда и аксессуары для повседневной жизни.",
    workTime: "09:00 – 18:00",
    address: "Тотурбиева, напротив Севиллы",
    telegram: "https://t.me/monreall",
    cover: "covers/1.jpg",
    images: ["images/shop.jpeg","images/shop.jpeg","images/shop.jpeg"]
  },
  {
    id: 2,
    name: "Магазин 2",
    type: "Электроника",
    description: "Магазин сотовой связи.",
    workTime: "10:00 – 20:00",
    address: "Напротив ТЦ Джинан",
    telegram: "https://t.me/monreall",
    cover: "covers/2.jpg",
    images: ["images/mobile.jpg","images/mobile.jpg","images/mobile.jpg"]
  },
  {
    id: 3,
    name: "Магазин 3",
    type: "Кофе",
    description: "Кофейня с авторскими напитками.",
    workTime: "11:00 – 22:00",
    address: "Возле ворот главного рынка",
    telegram: "https://t.me/monreall",
    cover: "covers/3.jpg",
    images: ["images/coffee.jpg","images/coffee.jpg","images/coffee.jpg"]
  }
];

function isShopOpen(workTime) {
  const now = new Date();
  const [start, end] = workTime.split(" – ");
  const [sH, sM] = start.split(":").map(Number);
  const [eH, eM] = end.split(":").map(Number);
  const current = now.getHours()*60 + now.getMinutes();
  return current >= sH*60+sM && current <= eH*60+eM;
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  applyFilters();
}

function renderShops(list = shops) {
  shopsContainer.innerHTML = "";

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

    card.querySelector(".favorite").onclick = (e) => {
      e.stopPropagation();
      toggleFavorite(shop.id);
    };

    card.onclick = () => openShop(shop);
    shopsContainer.appendChild(card);
  });
}

function openShop(shop) {
  shopsContainer.classList.add("hidden");
  details.classList.remove("hidden");
  mainHeader.classList.add("hidden");

  shopCoverImg.src = shop.cover;
  shopCoverTitle.textContent = shop.name;
  shopDescription.textContent = shop.description;
  shopTime.textContent = shop.workTime;
  shopAddress.textContent = shop.address;
  shopTelegram.href = shop.telegram;

  shopStatus.innerHTML = isShopOpen(shop.workTime)
    ? '<span class="open">🟢 Открыто</span>'
    : '<span class="closed">🔴 Закрыто</span>';

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

backBtn.onclick = () => {
  details.classList.add("hidden");
  shopsContainer.classList.remove("hidden");
  mainHeader.classList.remove("hidden");
};

lightbox.onclick = () => {
  lightbox.classList.add("hidden");
};

function applyFilters() {
  const query = searchInput.value.toLowerCase();

  let filtered = shops.filter(shop =>
    shop.name.toLowerCase().includes(query) ||
    shop.description.toLowerCase().includes(query)
  );

  if (currentType !== "all") {
    filtered = filtered.filter(shop => shop.type === currentType);
  }

  if (currentView === "favorites") {
    filtered = filtered.filter(shop =>
      favorites.includes(shop.id)
    );
  }

  renderShops(filtered);
}

searchInput.addEventListener("input", applyFilters);

filterButtons.forEach(btn => {
  btn.onclick = () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    applyFilters();
  };
});

navMain.onclick = () => {
  currentView = "all";
  navMain.classList.add("active");
  navFavBottom.classList.remove("active");
  applyFilters();
};

navFavBottom.onclick = () => {
  currentView = "favorites";
  navFavBottom.classList.add("active");
  navMain.classList.remove("active");
  applyFilters();
};

renderShops();
