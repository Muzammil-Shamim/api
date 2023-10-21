// Define the URL for the user API
const USER_API_URL = "https://jsonplaceholder.typicode.com/users";

// Get references to the DOM elements
const main = document.getElementById("userData");
const loader = document.getElementById("loader");

// Check if the 'main' element exists
if (main) {
    // Display the loader while fetching data
    loader.style.display = "block";

    // Fetch user data from the API using async/await
    async function fetchUserData() {
        try {
            const response = await fetch(USER_API_URL);

            if (response.ok) {
                const userData = await response.json();

                // Generate the HTML for the user table
                const userTableHTML = userData
                    .map((user) => `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.website}</td>
                            <td>${user.phone}</td>
                            <td>
                                <button type="button" class="btn btn-primary" onclick="seePost(${user.id})">See Post</button>
                            </td>
                        </tr>`
                    )
                    .join("");

                // Update the 'main' element with the user table HTML
                main.innerHTML = userTableHTML;
            } else {
                console.error("Failed to fetch user data. Status: " + response.status);
            }
        } catch (error) {
            console.error("An error occurred while fetching or displaying user data:", error);
        } finally {
            // Hide the loader when the operation is completed
            loader.style.display = "none";
        }
    }

    // Function to navigate to the 'post.html' with a user ID parameter
    function seePost(userId) {
        location.href = `post.html?id=${userId}`;
    }

    // Call the function to fetch and display user data
    fetchUserData();
} else {
    console.error("Element with id 'userData' not found.");
}
