/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
   Global variables that store the DOM elements 
   needed to reference and/or manipulate. 
***/
const listItems = document.querySelector('.student-list').children;
const itemsPerPage = 10;

/*** 
   `showPage` function hides all of the items in the 
   list except for ten you want to show.
***/
function showPage(list, page) {
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = page * itemsPerPage;

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }
}

showPage(listItems, 1);

/*** 
   Creates the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(list) {
  let numOfPages = list.length / itemsPerPage;
  let page = document.querySelector('.page');
  let div = document.createElement('div');
  let pageLinks = `<ul>`;

  // loops through the number of pages and adds a link 
  for (let i = 0; i < numOfPages; i++) {
    if (i === 0) {
      pageLinks += `
    <li>
      <a class="active" href="#">${i + 1}</a>
    </li>`
    } else {
      pageLinks += `
    <li>
      <a href="#">${i + 1}</a>
    </li>`
    }
  }
  pageLinks += `
  </ul>`;
  // adds links to the div and appends it to the page
  div.innerHTML = pageLinks;
  div.className = 'pagination';
  page.appendChild(div);

  // Gives the links a click event listener and opens the coresponding page
  let links = div.querySelectorAll('a');
  for (let i = 0; i < links.length; i++) {
    (function () {
      links[i].addEventListener('click', (e) => {
        for (let j = 0; j < links.length; j++) {
          links[j].className = '';
        }
        e.target.className = 'active';
        showPage(listItems, e.target.textContent);
      },false)
    })();
  }
}

appendPageLinks(listItems);

/*
 * Creates a search bar, appends it to the top of the page,
 * then listens for any submit events by the user and 
 * calls the `searchItem` function
 */
function appendSearchBar() {
  const header = document.querySelector('.page-header');
  const searchDiv = document.createElement('form');
  searchDiv.innerHTML = `<input placeholder="Search for students..."><button>Search</button>`;
  searchDiv.className = 'student-search';
  header.appendChild(searchDiv);

  searchDiv.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchValue = e.target[0].value;
    searchItem(listItems, searchValue);
    e.target[0].value = '';
  });
}

/*
 * Takes the input from the user and displays any of the 
 * names that any similar combination of letters in the name
 * also changes the paginator to reflect the amount of results
 * https://www.w3schools.com/howto/howto_js_filter_lists.asp was used for help
 */
function searchItem(list, searchValue) {
  let h3, txtValue, filter, page, div, alert;
  let searchResults = [];
  page = document.querySelector('.page');
  filter = searchValue.toUpperCase();
  for (let i = 0; i < list.length; i++) {
    h3 = list[i].getElementsByTagName('h3')[0];
    txtValue = h3.textContent || h3.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      searchResults.push(list[i]);
    } else {
      list[i].style.display = 'none';
    }
  }
  showPage(searchResults, 1);

  // checks if there are 0 results and displays message if true
  if (searchResults.length < 1 || searchResults === undefined) {
    if (page.children[2].className !== 'alert') {
      div = document.createElement('div');
      div.className = 'alert';
      alert = document.createElement('h1');
      alert.textContent = 'No results matched your search';
      div.appendChild(alert);
      page.appendChild(div);
    }
  } else if (page.children[2].className === 'alert') {
      page.children[2].remove();
  }
  

  document.querySelector('.pagination').remove();
  appendPageLinks(searchResults);

}


appendSearchBar();