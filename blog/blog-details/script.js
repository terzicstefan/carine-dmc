// Fetching data from JSON file
fetch('/data/blog.json')
.then(response => response.json())
.then(data => {
  // Selecting the container element
  const container = document.getElementById('latest-posts-container');

  // Looping through the first three items in the data array
  for (let i = 0; i < 3; i++) {
    const post = data[i];

    // Creating elements for post details
    const postContainer = document.createElement('div');
    postContainer.classList.add('post');

    // Creating div for image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image-div');

    const thumbnail = document.createElement('img');
    thumbnail.src = post.thumbnail;
    thumbnail.classList.add('thumbnail');
    imageDiv.appendChild(thumbnail);

    // Creating div for title and content
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content-div');

    // Creating clickable title
    const titleLink = document.createElement('a');
    titleLink.href = post.learnMoreUrl;
    titleLink.target = "_blank"; // Open link in a new tab

    const title = document.createElement('h2');
    title.textContent = post.title;
    titleLink.appendChild(title);

    // Creating div for date and icon
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date-div');

    const dateIcon = document.createElement('img');
    dateIcon.src = "/images/green-date.png";
    dateIcon.classList.add('date-icon');

    const date = document.createElement('p');
    date.textContent = post.date;

    // Appending elements to the date div
    dateDiv.appendChild(dateIcon);
    dateDiv.appendChild(date);

    // Appending elements to the content div
    contentDiv.appendChild(titleLink);
    contentDiv.appendChild(dateDiv);

    // Appending divs to the post container
    postContainer.appendChild(imageDiv);
    postContainer.appendChild(contentDiv);

    // Appending the post container to the main container
    container.appendChild(postContainer);
  }
})
.catch(error => console.error('Error fetching data:', error));