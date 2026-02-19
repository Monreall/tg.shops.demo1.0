const shopsGrid=document.getElementById("shops-grid");
const details=document.getElementById("shop-details");

const shopCoverImg=document.getElementById("shop-cover-img");
const shopCoverTitle=document.getElementById("shop-cover-title");
const shopStatus=document.getElementById("shop-status");
const shopTime=document.getElementById("shop-time");
const shopAddress=document.getElementById("shop-address");
const shopImages=document.getElementById("shop-images");
const shopTelegram=document.getElementById("shop-telegram");

const favBtn=document.getElementById("fav-btn");
const backBtn=document.getElementById("back-btn");

const navMain=document.getElementById("nav-main");
const navFav=document.getElementById("nav-fav");

const filterButtons=document.querySelectorAll(".filter-btn");
const mainPage=document.querySelector("main");
const searchInput=document.getElementById("search");

let favorites=JSON.parse(localStorage.getItem("favorites"))||[];
let currentView="all";
let currentFilter="all";
let currentShopId=null;

/* ---------- МАГАЗИНЫ ---------- */

const shops=[
{
id:1,
name:"Zara",
type:"Одежда",
workTime:"09:00 – 18:00",
address:"Тотурбиева",
telegram:"https://t.me/monreall",
cover:"covers/2.jpg",
images:[
"images/shop.jpeg",
"images/shop.jpeg"
]
},
{
id:2,
name:"Varim",
type:"Коффейня",
workTime:"09:00 – 18:00",
address:"Тотурбиева",
telegram:"https://t.me/monreall",
cover:"covers/1.jpg",
images:[
"images/coffee.jpg",
"images/coffee.jpg"
]
}
];

/* ---------- ОТКРЫТО ---------- */

function isShopOpen(time){
const now=new Date();
const[start,end]=time.split(" – ");
const[sH,sM]=start.split(":").map(Number);
const[eH,eM]=end.split(":").map(Number);
const current=now.getHours()*60+now.getMinutes();
return current>=sH*60+sM && current<=eH*60+eM;
}

/* ---------- РЕНДЕР ---------- */

function renderShops(list=shops){

shopsGrid.innerHTML="";

list.forEach(shop=>{

const status=isShopOpen(shop.workTime)
?'<span class="open">🟢 Открыто</span>'
:'<span class="closed">🔴 Закрыто</span>';

const card=document.createElement("div");
card.className="shop-card";

card.innerHTML=`
<img src="${shop.cover}">
<div class="shop-info">
<h3>${shop.name}</h3>
<p>${status}</p>
</div>
`;

card.onclick=()=>openShop(shop);
shopsGrid.appendChild(card);

});
}

/* ---------- ОТКРЫТЬ ---------- */

function openShop(shop){

mainPage.classList.add("hidden");
details.classList.remove("hidden");

currentShopId=shop.id;

shopCoverImg.src=shop.cover;
shopCoverTitle.textContent=shop.name;
shopTime.textContent=shop.workTime;
shopAddress.textContent=shop.address;
shopTelegram.href=shop.telegram;

shopStatus.innerHTML=isShopOpen(shop.workTime)
?'<span class="open">🟢 Открыто</span>'
:'<span class="closed">🔴 Закрыто</span>';

shopImages.innerHTML="";

shop.images.forEach(src=>{
const img=document.createElement("img");
img.src=src;
shopImages.appendChild(img);
});

/* избранное */

if(favorites.includes(shop.id)){
favBtn.textContent="❤️";
favBtn.classList.add("active");
}else{
favBtn.textContent="🤍";
favBtn.classList.remove("active");
}

}

/* ---------- ИЗБРАННОЕ ---------- */

favBtn.addEventListener("click",(e)=>{

e.stopPropagation();

if(!currentShopId)return;

if(favorites.includes(currentShopId))
favorites=favorites.filter(id=>id!==currentShopId);
else
favorites.push(currentShopId);

localStorage.setItem("favorites",JSON.stringify(favorites));

if(favorites.includes(currentShopId)){
favBtn.textContent="❤️";
favBtn.classList.add("active");
}else{
favBtn.textContent="🤍";
favBtn.classList.remove("active");
}

/* 💓 ПУЛЬС */
favBtn.classList.remove("pulse");
void favBtn.offsetWidth;
favBtn.classList.add("pulse");

});

/* ---------- ПОИСК + ФИЛЬТР ---------- */

function applyFilters(){

let filtered=shops;

if(currentFilter!=="all"){
filtered=filtered.filter(shop=>shop.type===currentFilter);
}

const query=searchInput.value.toLowerCase();

filtered=filtered.filter(shop=>
shop.name.toLowerCase().includes(query)
);

if(currentView==="favorites"){
filtered=filtered.filter(shop=>
favorites.includes(shop.id)
);
}

renderShops(filtered);
}

/* ---------- СОБЫТИЯ ---------- */

searchInput.addEventListener("input",applyFilters);

filterButtons.forEach(btn=>{
btn.onclick=()=>{
document.querySelector(".filter-btn.active").classList.remove("active");
btn.classList.add("active");
currentFilter=btn.dataset.type;
applyFilters();
};
});

navMain.onclick=()=>{
currentView="all";
applyFilters();
};

navFav.onclick=()=>{
currentView="favorites";
applyFilters();
};

backBtn.onclick=()=>{
details.classList.add("hidden");
mainPage.classList.remove("hidden");
};

/* ---------- СТАРТ ---------- */

applyFilters();