
let articleMainContainer=document.querySelector(".article-container");


async function fetchData (){
try {
    let response=await fetch ("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=m2el98Ix9bYGsagBRzWNVuH9ysGouuSs");
    let json = await response.json ();

    console.log ("data is fetched");
    console.log (json.response.docs[2].lead_paragraph);
    console.log (json.response.docs[2].snippet);
    console.log (json.response.docs[2].abstract);

    return json.response.docs ;

}catch (err){
    console.log ("data is not fetched");
    console.error (err)
}
}

function displayArticles (articles){

for (let article of articles){ 
let articleSubContainer=document.createElement("div"); //creating sub container for each article

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
source.innerHTML=article.source;
source.classList.add('source');
articleSubContainer.appendChild(source);

let articleLink=document.createElement ("a");
articleLink.setAttribute("href",article.web_url);
articleLink.innerHTML="read more";
articleSubContainer.appendChild(articleLink);



// let articleImg=document.createElement('img');
// articleImg.setAttribute ('src',article.multimedia[0].url);
// articleImg.classList.add('images');
// articleSubContainer.appendChild(articleImg);

articleMainContainer.appendChild (articleSubContainer)
    
    
    }

}


async function articleAwait  () {
let articles= await fetchData ();
 displayArticles(articles);

}

articleAwait ();