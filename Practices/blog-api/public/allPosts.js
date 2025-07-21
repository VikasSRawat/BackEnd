let currentPage = 1;
const limit = 5;

const postsContainer = document.getElementById("posts-container");
const pageNumber = document.getElementById("page-number");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadPosts();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  loadPosts();
});

async function loadPosts() {
  try {
    const res = await fetch(`/postByPage?page=${currentPage}&limit=${limit}`);
    if (!res.ok) {
      postsContainer.innerHTML = `<p>Error fetching posts</p>`;
      return;
    }

    const data = await res.json();

    
    postsContainer.innerHTML = "";


    data.posts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.content}</p>
        <p><em>Tags: ${post.tags?.join(", ") || "None"}</em></p>
        <hr />
      `;
      postsContainer.appendChild(postDiv);
    });

    pageNumber.textContent = currentPage;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = data.posts.length < limit;

  } catch (error) {
    console.error("Fetch error:", error);
    postsContainer.innerHTML = `<p>Something went wrong!</p>`;
  }
}


loadPosts();
