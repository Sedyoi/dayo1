document.addEventListener("DOMContentLoaded", () => {

  // SYSTEM INFO
  const systemData = {
    browser: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    online: navigator.onLine
  };

  localStorage.setItem("systemData", JSON.stringify(systemData));

  const saved = JSON.parse(localStorage.getItem("systemData"));

  document.getElementById("system-info").innerHTML = `
    <p><b>Browser:</b> ${saved.browser}</p>
    <p><b>Platform:</b> ${saved.platform}</p>
    <p><b>Language:</b> ${saved.language}</p>
    <p><b>Status:</b> ${saved.online ? "Online" : "Offline"}</p>
  `;

  const commentsBlock = document.getElementById("comments");

  function addComment(name, email, phone, text) {
    const div = document.createElement("div");
    div.className = "comment-card";

    div.innerHTML = `
      <b>${name}</b>
      <p>${text}</p>
      <small>${email} | 📞 ${phone}</small>
    `;

    commentsBlock.prepend(div);
  }


  fetch("https://jsonplaceholder.typicode.com/posts/5/comments")
    .then(res => res.json())
    .then(data => {
      data.slice(0, 3).forEach(c => {
        addComment(c.name, c.email, "-", c.body);
      });
    });


  const form = document.getElementById("comment-form");

  form.addEventListener("submit", function() {

    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const phone = form.elements["phone"].value;
    const message = form.elements["message"].value;

    addComment(name, email, phone, message);

    closeModal();
  });

  // MODAL
  const modal = document.getElementById("modal");

  setTimeout(() => {
    modal.style.display = "flex";
  }, 3000);

  document.getElementById("close-btn").onclick = closeModal;

  window.onclick = function(e) {
    if (e.target === modal) {
      closeModal();
    }
  };


  const toggleBtn = document.getElementById("theme-toggle");

  function updateBtn() {
    toggleBtn.textContent = document.body.classList.contains("dark")
      ? "Світла тема"
      : "Темна тема";
  }

  const hour = new Date().getHours();

  if (hour < 7 || hour > 21) {
    document.body.classList.add("dark");
  }

  updateBtn();

  toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");
    updateBtn();
  };

});

// GLOBAL
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}