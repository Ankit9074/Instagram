document.getElementById('username-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const errorMessage = document.getElementById('error-message');

  // Clear any previous error messages
  errorMessage.textContent = '';

  try {
    const response = await fetch(`/scrape?username=${username}`);
    if (!response.ok) throw new Error('Failed to fetch data');

    const { profileImage: imgUrl, fullName } = await response.json();

    // Redirect to data.html with query parameters
    window.location.href = `data.html?profileImage=${encodeURIComponent(imgUrl)}&fullName=${encodeURIComponent(fullName)}`;
  } catch (error) {
    errorMessage.textContent = 'Error fetching data. Try again!';
  }
});



// Loader Css 
document.getElementById("username-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById("username").value.trim();
  if (!username) {
      alert("Please enter a username.");
      return;
  }

  showLoader();

  // Simulating an API call (replace with your actual fetching logic)
  setTimeout(() => {
      // Hide the loader and display results (this would be replaced with real API data)
      hideLoader();
      
      // Example of what you would do with the fetched data
      document.getElementById("profile-name").textContent = "John Doe";  // Example
      document.getElementById("follower-count").textContent = "123K Followers";  // Example
      document.getElementById("profile-image").src = "https://via.placeholder.com/300";  // Example image
      document.getElementById("result").style.display = "block"; // Show result
  }, 3000); // Simulate a 3-second delay
});

// Functions to show and hide the loader
function showLoader() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("result").style.display = "none";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

