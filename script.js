const shopsContainer = document.getElementById("shops");
const details = document.getElementById("shop-details");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filters button");
const backBtn = document.getElementById("back-btn");
const navFav = document.getElementById("nav-fav");
const navShops = document.getElementById("nav-shops");

let currentType = "all";
let currentView = "shops";
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const shops = [
  {
    id: 1,
    name: "Магазин 1",
    type: "Одежда",
    description: "Одежда и аксессуары.",
    workTime: "09:00 – 18:00",
    address: "Центр",
    telegram: "https://t.me/monreall",
    cover: "https://picsum.photos/300/200?1"
  },
  {
    id: 2,
    name: "Магазин 2",
    type: "Электроника",
    description: "Техника и гаджеты.",
    workTime: "10:00 – 20:00",
    address: "Джинан",
    telegram: "https://t.me/monreall",
    cover: "https://picsum.photos/300/200?2"
  },
  {
    id: 3,
    name: "Магазин 3",
    type: "Кофе",
    description: "Кофейня.",
    workTime: "11:00 – 22:00",
    address: "Рынок",
    telegram: "https://t.me/monreall",
    cover: "https://picsum.photos/300/200?3"
  }
];

function isOpen(workTime) {
  const now = new Date();
  const [start, end] = workTime.split(" – ");
  const [sH, sM] = start.split(":").map(Number);
  const [eH, eM] = end.split(":").map(Number);

  const current = now.getHours()*60 + now.getMinutes();
  const startMin = sH*60 + sM;
  const endMin = eH*60 + eM;

  return current >= startMin && current <= endMin;
}

function render(list) {
  shopsContainer.innerHTML = "";

  list.sort((a,b) => isOpen(b.workTime) - isOpen(a.workTime));

  list.forEach(shop => {
    const card = document.createElement("div");
    card.className = "shop-card";

    const open = isOpen(shop.workTime);
    const heart = favorites.includes(shop.id) ? "❤️" : "🤍";

    card.innerHTML = `
      <div class="favorite">${heart}</div>
      <img src="${shop.cover}">
      <h3>${shop.name}</h3>
      <p class="${open ? "open" : "closed"}">
        ${open ? "Открыто" : "Закрыто"}
      </p>
    `;

    card.querySelector(".favorite").onclick = (e) => {
      e.stopPropagation();
      toggleFav(shop.id);
    };

    card.onclick = () => openDetails(shop);
    shopsContainer.appendChild(card);
  });
}

function applyFilters() {
  let filtered = shops;

  if (currentView === "favorites") {
    filtered = filtered.filter(s => favorites.includes(s.id));
  }

  if (currentType !== "all") {
    filtered = filtered.filter(s => s.type === currentType);
  }

  const query = searchInput.value.toLowerCase();
  filtered = filtered.filter(s =>
    s.name.toLowerCase().includes(query)
  );

  render(filtered);
}

function toggleFav(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  applyFilters();
}

function openDetails(shop) {
  document.getElementById("main-header").classList.add("hidden");
  shopsContainer.classList.add("hidden");
  details.classList.remove("hidden");

  document.getElementById("shop-name").textContent = shop.name;
  document.getElementById("shop-description").textContent = shop.description;
  document.getElementById("shop-time").textContent = shop.workTime;
  document.getElementById("shop-address").textContent = shop.address;
  document.getElementById("shop-telegram").href = shop.telegram;

  const open = isOpen(shop.workTime);
  document.getElementById("shop-status").textContent =
    open ? "🟢 Открыто" : "🔴 Закрыто";
}

backBtn.onclick = () => {
  details.classList.add("hidden");
  shopsContainer.classList.remove("hidden");
  document.getElementById("main-header").classList.remove("hidden");
};

filterButtons.forEach(btn => {
  btn.onclick = () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    applyFilters();
  };
});

searchInput.addEventListener("input", applyFilters);

navFav.onclick = () => {
  currentView = "favorites";
  navFav.classList.add("active");
  navShops.classList.remove("active");
  applyFilters();
};

navShops.onclick = () => {
  currentView = "shops";
  navShops.classList.add("active");
  navFav.classList.remove("active");
  applyFilters();
};

render(shops);
