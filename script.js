let posts = JSON.parse(localStorage.getItem('posts')) || [];

function publishPost() {
    const title = document.getElementById('titleInput').value;
    const category = document.getElementById('categoryInput').value;
    const content = document.getElementById('contentInput').value;

    if (title && category && content) {
        const newPost = {
            title,
            category,
            content,
            id: Date.now()
        };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
        clearForm();
    } else {
        alert("Please fill in all fields.");
    }
}

function displayPosts(filter = "All") {
    const blogSection = document.getElementById('blogPosts');
    blogSection.innerHTML = "";

    // Filter posts based on category selection
    const filteredPosts = filter === "All" ? posts : posts.filter(post => post.category === filter);

    if (filteredPosts.length === 0) {
        blogSection.innerHTML = "<p>No posts available.</p>";
    } else {
        filteredPosts.forEach(post => {
            blogSection.innerHTML += `
                <div class="blog-card">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button onclick="deletePost(${post.id})">Delete</button>
                </div>
            `;
        });
    }
}

function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}

function filterPosts() {
    const category = document.getElementById('filterCategory').value;
    displayPosts(category);
}

function clearForm() {
    document.getElementById('titleInput').value = "";
    document.getElementById('categoryInput').value = "Technology";
    document.getElementById('contentInput').value = "";
}

// Initial Load
displayPosts();
