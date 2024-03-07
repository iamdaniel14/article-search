
let articleMainContainer=document.querySelector(".article-container");
let beginYear="2000";
let endYear="2001";
let category="travel";
let page=0;
let beginYearInput=document.querySelector("#start-year");
let endYearInput=document.querySelector("#end-year");
const NEXT_BUTTON=document.querySelector("#next-page-button");
NEXT_BUTTON.addEventListener("click",()=>{
page++;
console.log(page);
articleAwait ();
});


const PREV_BUTTON=document.querySelector("#prev-page-button");
PREV_BUTTON.addEventListener("click",()=>{

if(!page<0) { 
page--;
}
console.log(page);
articleAwait ();

})




async function fetchData(){
try {
    let response=await fetch (`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&begin_date=${beginYear}0101S&end_date=${endYear}1230&page=${page}&api-key=m2el98Ix9bYGsagBRzWNVuH9ysGouuSs`);
    let json = await response.json ();
    console.log ("data is fetched");
   
return json.response.docs ;

}catch (err){
console.log ("data is not fetched");
console.error (err)
}
}

function displayArticles (articles){

    articleMainContainer.innerHTML="";

for (let article of articles){ 
let articleSubContainer=document.createElement("div"); //creating sub container for each article
articleSubContainer.classList.add("article-sub-container");


let writer=document.createElement('p');
writer.innerHTML=article.byline.original;
writer.classList.add('writer');
articleSubContainer.appendChild(writer);

let pubDate=document.createElement('p');
pubDate.innerHTML="Published:" +article.pub_date;
pubDate.classList.add('pub-date');
articleSubContainer.appendChild(pubDate);



let title=document.createElement('h1');
title.innerHTML=article.abstract;
title.classList.add('title');
articleSubContainer.appendChild(title)

let snippet=document.createElement('p');
snippet.innerHTML=article.snippet;
snippet.classList.add('snippet');
articleSubContainer.appendChild(snippet);
articleMainContainer.appendChild (articleSubContainer);


let paragraph=document.createElement('p');
paragraph.innerHTML=article.lead_paragraph;
paragraph.classList.add('paragraph');
articleSubContainer.appendChild(paragraph);


let source=document.createElement('p');
source.innerHTML="Source:" +article.source;
source.classList.add('source');
articleSubContainer.appendChild(source);



let articleLink=document.createElement ("a");
articleLink.setAttribute("href",article.web_url);
articleLink.innerHTML="Read more";
articleLink.classList.add("read-more")
articleSubContainer.appendChild(articleLink);
articleMainContainer.appendChild (articleSubContainer)

    
 }

}


let submitButton=document.querySelector("#my-form")
submitButton.addEventListener ("submit",(event)=>{
event.preventDefault();
console.log(beginYearInput.value);
 beginYear=beginYearInput.value;
endYear=endYearInput.value;

    
const ARTICLE_CATEGORY=document.querySelector("#category");
let article_options= ARTICLE_CATEGORY.options[ARTICLE_CATEGORY.selectedIndex];
console.log(article_options.value);
category=article_options.value;

const ARTICLE_CATEGORY_TITLE=document.querySelector("#article-category-title");
ARTICLE_CATEGORY_TITLE.innerHTML=article_options.value;

articleAwait ();
})


async function articleAwait (){
 let articles= await fetchData ();
 displayArticles(articles);
}


let links=document.querySelectorAll(".pages");

function changePage (event){
links.forEach(p=>{
p.classList.remove("active");
console.log (event.target.value);

    
    }) ;
page=event.target.value;
console.log (page);

articleAwait ();
event.target.classList.add("active");
    }

articleAwait ();




