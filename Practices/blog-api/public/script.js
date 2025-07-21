document.addEventListener("DOMContentLoaded",()=>{
    const form = document.getElementById("postForm");
    form.addEventListener("submit", async (e) => {
    console.log("Submitting form");
    
  e.preventDefault();
  const form = e.target;
  id = form.id.value;
  const title = form.title.value;
  const content = form.content.value;
  const author = form.author.value;
  const tagString = form.tags.value;

  const tags = tagString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag);

  const postData = {
    id  ,
    title,
    content,
    author,
    tags,
  };
  form.reset();
  const resMessage = document.getElementById("responseMessage");
  try {
    const res = await fetch("/addPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    console.log(res);
    
    const text = await res.text();
    if (res.status === 201) {
      resMessage.textContent = "✅ " + JSON.parse(text).message;
      resMessage.style.color = "green";
    } else {
      resMessage.textContent = "❌ " + text;
      resMessage.style.color = "red";
    }
  } catch (error) {
    resMessage.textContent = "❌ Something went wrong";
    resMessage.style.color = "red";
  }
})
});
