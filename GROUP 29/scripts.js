document.addEventListener("DOMContentLoaded", function() {
  const apiKey = "ccdff9e324904ad0b3d47b32adfa8feb";
  const topHeadlinesUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  const businessSourcesUrl = `https://newsapi.org/v2/top-headlines/sources?category=business&apiKey=${apiKey}`;
  
  fetch(topHeadlinesUrl)
    .then(response => response.json())
    .then(data => displayNews(data.articles))
    .catch(error => console.error("Error fetching top headlines data: ", error));

  fetch(businessSourcesUrl)
    .then(response => response.json())
    .then(data => displayBusinessSources(data.sources))
    .catch(error => console.error("Error fetching business sources data: ", error));
});

function displayNews(articles) {
  const topHeadlines = document.getElementById("top-headlines");

  articles.forEach(article => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article");

    const titleElement = document.createElement("h2");
    titleElement.textContent = article.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = article.description;

    const linkElement = document.createElement("a");
    linkElement.textContent = "Read more";
    linkElement.href = article.url;

    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    articleElement.appendChild(linkElement);

    topHeadlines.appendChild(articleElement);
  });
}

function displayBusinessSources(sources) {
  const businessSources = document.getElementById("business-sources-list");

  sources.forEach(source => {
    const sourceElement = document.createElement("div");
    sourceElement.classList.add("source");

    const nameElement = document.createElement("h2");
    nameElement.textContent = source.name;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = source.description;

    const linkElement = document.createElement("a");
    linkElement.textContent = "Explore more";
    linkElement.href = source.url;

    sourceElement.appendChild(nameElement);
    sourceElement.appendChild(descriptionElement);
    sourceElement.appendChild(linkElement);

    businessSources.appendChild(sourceElement);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const businessForm = document.getElementById("business-form");

  businessForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    // Here you can handle the data submitted and add it to the page or perform other actions as needed.
    // For example, you can create a new element and append it to the business sources section to display the posted content.

    const businessSources = document.getElementById("business-sources-list");

    const newPostElement = document.createElement("div");
    newPostElement.classList.add("post");

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const contentElement = document.createElement("p");
    contentElement.textContent = content;

    newPostElement.appendChild(titleElement);
    newPostElement.appendChild(contentElement);

    businessSources.appendChild(newPostElement);

    // Optionally, you can also send the data to a server using fetch() or other methods for server-side handling.
  });
});
// Function to save preferred news categories to localStorage
function savePreferredCategories() {
  const checkboxes = document.querySelectorAll('input[name="categories"]');
  const preferredCategories = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      preferredCategories.push(checkbox.value);
    }
  });
  localStorage.setItem('preferredCategories', JSON.stringify(preferredCategories));
}

// Function to load and apply preferred news categories from localStorage
function applyPreferredCategories() {
  const storedCategories = localStorage.getItem('preferredCategories');
  if (storedCategories) {
    const preferredCategories = JSON.parse(storedCategories);
    const checkboxes = document.querySelectorAll('input[name="categories"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = preferredCategories.includes(checkbox.value);
    });
  }
}

// Apply the preferred news categories on page load
document.addEventListener('DOMContentLoaded', applyPreferredCategories);
