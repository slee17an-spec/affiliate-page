function cleanName(name){

return name
.replace(/[_\.]/g," ")
.replace(/[^\w\s]/gi,"")
.replace(/\s+/g," ")
.trim()

}

function detectCategory(name){

name=name.toLowerCase()

if(name.includes("skin") || name.includes("beauty"))
return "kecantikan"

if(name.includes("gadget") || name.includes("tech"))
return "elektronik"

if(name.includes("food") || name.includes("dapoer"))
return "makanan"

if(name.includes("fashion") || name.includes("outfit") || name.includes("store"))
return "fashion"

return "lainnya"

}

function processCSV(){

const file=document.getElementById("csvFile").files[0]

const reader=new FileReader()

reader.onload=function(e){

const rows=e.target.result.split("\n")

let data=[]

rows.forEach(r=>{

const cols=r.split(",")

const name=cleanName(cols[0])
const link=cols[1]

if(!name || !link) return

data.push({

name:name,
link:link,
category:detectCategory(name),
clicks:0

})

})

document.getElementById("output").value=
JSON.stringify(data,null,2)

}

reader.readAsText(file)

}
