function generateSitemap(shops){

let xml=`<?xml version="1.0" encoding="UTF-8"?>`

xml+=`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

shops.forEach(shop=>{

xml+=`
<url>
<loc>https://link.abdisyaif.com/?shop=${encodeURIComponent(shop.name)}</loc>
</url>
`

})

xml+=`</urlset>`

return xml

}
