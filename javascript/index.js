let quotesE = document.getElementById("quotes");
let loader = document.querySelector(".loader");
let page = 1;
let limit = 25;
let total = 0;

// to get the quotes from api
const getQuotes = async (page, limit) => {
  // making api call for fetch data
  try {
    const url = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
    let res = await fetch(url);
    let data = await res.json();
    console.log("data:", data);

    return data;
  } catch (e) {
    console.log("error:", e); // if api fails to fetch print error
  }
};
// getQuotes(page,limit)

//display function to display the data from api
const displayQuotes = (quotes) => {
//   console.log("quotes:", quotes);
  quotes.forEach((elem) => {
    const quoteDiv = document.createElement("blockquote");

    quoteDiv.innerHTML = `
      <span>${elem.id}.</span>
      ${elem.quote}
      <footer>${elem.author}</footer>
      `;

    quotesE.append(quoteDiv);
  });
};

//hide the loader element when page is loading
const hideLoader = () => {
  loader.classList.remove("show");
  
};

//show the loader after response get
const showLoader = () => {
  loader.classList.add("show");
};

//more quotes to show when scrolling, it return only boolean value
const moreQuotes = (page, limit, total) => {
  let startInd = (page - 1) * (limit + 1);
  return total == 0 || startInd < total;
};

//load quotes

const loadQuotes = (page, limit) => {
  //show loader before
  showLoader();

  setTimeout(async () => {
    try {
      if (moreQuotes(page, limit, total)) {
        const res = await getQuotes(page, limit);

        //passing the response to display the quotes
        displayQuotes(res.data);

        //updating the total value
        total = res.total;
  
      }
    } catch (e) {
      console.log("error:", e);
    } finally {
      hideLoader();
    }
  }, 500);
};

//adding scroll event when page is load
window.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // console.log('scrollTop:', scrollTop)

    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      moreQuotes(page, limit, total)
    ) {
      page++;
      loadQuotes(page, limit);
    }
  },
  {
    passive: true,
  }
);

loadQuotes(page, limit);

console.log(total)
//becuase that api has only 115 items so after that im hiding my loader
if(total == 115){
    hideLoader();
}


