let shops=[]
let filtered=[]
let index=0
let limit=30

const list=document.getElementById("shop-list")
const search=document.getElementById("search")
const load=document.getElementById("loadMore")
const categories=document.getElementById("categories")

fetch("shops.json")
.then(r=>r.json())
.then(data=>{

shops=data

mergeClicks()

filtered=shops

createCategories()

render()

})

function mergeClicks(){

let stored=JSON.parse(localStorage.getItem("clicks")||"{}")

shops.forEach(shop=>{
shop.clicks+=stored[shop.name]||0
})

shops.sort((a,b)=>b.clicks-a.clicks)

}

function createCategories(){

const cats=[...new Set(shops.map(s=>s.category))]

cats.forEach(c=>{

const btn=document.createElement("span")

btn.className="category"

btn.innerText=c

btn.onclick=()=>filterCategory(c)

categories.appendChild(btn)

})

}

function filterCategory(cat){

list.innerHTML=""
index=0

filtered=shops.filter(s=>s.category==cat)

render()

}

function render(){

const slice=filtered.slice(index,index+limit)

slice.forEach(shop=>createCard(shop))

index+=limit

if(index>=filtered.length)load.style.display="none"

}

function createCard(shop){

const a=document.createElement("a")

a.href=shop.link

a.target="_blank"

a.className="link"

a.onclick=()=>trackClick(shop.name)

a.innerHTML=`

<span>${shop.name}</span>

<span class="badge">Buka</span>

`

list.appendChild(a)

}

function trackClick(name){

let data=JSON.parse(localStorage.getItem("clicks")||"{}")

data[name]=(data[name]||0)+1

localStorage.setItem("clicks",JSON.stringify(data))

}

load.onclick=render

search.oninput=()=>{

list.innerHTML=""
index=0

const q=search.value.toLowerCase()

filtered=shops.filter(s=>s.name.toLowerCase().includes(q))

load.style.display="block"

render()

}
