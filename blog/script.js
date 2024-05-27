const postsPerPage = 6;
let currentPage = 1;
let blogPosts = []; // Initialize blog posts data as an empty array

async function fetchBlogPostsData() {
  try {
    const response = await fetch('/data/blog.json'); // Fetch JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts data');
    }
    blogPosts = await response.json(); // Parse JSON response
    displayBlogPosts();
    displayPagination();
  } catch (error) {
    console.error('Error fetching blog posts data:', error);
  }
}

function displayBlogPosts() {
  const container = document.getElementById("blog-posts");
  container.innerHTML = "";

  // Calculate the start and end indices of the current page's posts
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, blogPosts.length);

  // Loop through the subset of blog posts for the current page
  for (let i = startIndex; i < endIndex; i++) {
    const post = blogPosts[i];
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");
    postElement.innerHTML = `
      <a href="/news/${post.slug}"> <!-- Link to individual blog post page -->
        <img src="${post.thumbnail}" alt="${post.title}">
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <div class="post-date-btn">
          <div class="post-btn"> <a href="/news/${post.slug}"><button>Više</button></a></div>
          <div class="post-date"><h5>${post.date}</h5></div>
        </div>
      </a>
    `;
    container.appendChild(postElement);
  }
}

function displayPagination() {
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const maxButtons = 3; // Max number of buttons to show around the current page
  const halfMaxButtons = Math.floor(maxButtons / 2);

  if (totalPages <= 1) return; // No pagination needed if there's only one page

  // Add "Prev" button
  if (currentPage > 1) {
    const prevButton = createPaginationButton(currentPage - 1, "<");
    paginationContainer.appendChild(prevButton);
  }

  // Calculate start and end page numbers for pagination buttons
  let startPage = Math.max(1, currentPage - halfMaxButtons);
  let endPage = Math.min(totalPages, currentPage + halfMaxButtons);

  // Ensure there are at least maxButtons pages shown if possible
  if (startPage > 1) {
    paginationContainer.appendChild(createPaginationButton(1));
    if (startPage > 2) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      paginationContainer.appendChild(dots);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = createPaginationButton(i);
    paginationContainer.appendChild(button);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      paginationContainer.appendChild(dots);
    }
    paginationContainer.appendChild(createPaginationButton(totalPages));
  }

  // Add "Next" button
  if (currentPage < totalPages) {
    const nextButton = createPaginationButton(currentPage + 1, ">");
    paginationContainer.appendChild(nextButton);
  }

  highlightCurrentPageButton();
}

function highlightCurrentPageButton() {
  const buttons = document.querySelectorAll(".pagination button");
  buttons.forEach((button) => {
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function createPaginationButton(pageNumber, text = null) {
  const button = document.createElement("button");
  button.textContent = text ? text : pageNumber;
  if (pageNumber === currentPage) {
    button.classList.add("active");
  }
  button.addEventListener("click", () => {
    currentPage = pageNumber;
    displayBlogPosts();
    displayPagination(); // Re-render pagination after changing page
    highlightCurrentPageButton();
  });
  return button;
}

fetchBlogPostsData(); // Call fetchBlogPostsData to initiate fetching data and updating the page
