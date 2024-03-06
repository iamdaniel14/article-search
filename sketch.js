
let articleMainContainer=document.querySelector(".article-container");
let beginYear="1990";
let endYear="1991";
let category="travel"


let beginYearInput=document.querySelector("#start-year");
let endYearInput=document.querySelector("#end-year");

const ARTICLE_CATEGORY=document.querySelector("#category");
let article_options= ARTICLE_CATEGORY.options[ARTICLE_CATEGORY.selectedIndex]

async function fetchData(){
try {
    let response=await fetch (`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&begin_date=${beginYear}0101S&end_date=${endYear}1230&page=2&api-key=m2el98Ix9bYGsagBRzWNVuH9ysGouuSs`);
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


// function getValue() {
//     beginYear= beginYearInput.value;
    
//     endYear=endYearInput.value;
//     // articleAwait (beginYear,endYear);
    
    
//     }

async function articleAwait (){
let articles= await fetchData ();
 displayArticles(articles);
}




articleAwait ();




