const form = document.getElementById("requestForm");
const requestList = document.getElementById("requestList");
const cancelBtn = document.getElementById("cancelBtn");

async function loadRequests() {
  const res = await fetch("/api/requests");
  const requests = await res.json();

  requestList.innerHTML = "";

  requests.forEach(r => {
    requestList.innerHTML += `
      <div class="card">
        <h3>${r.name}</h3>
        <p><b>Email:</b> ${r.email}</p>
        <p><b>Category:</b> ${r.category}</p>
        <p><b>Problem:</b> ${r.description}</p>
        <p><b>Priority:</b> ${r.priority}</p>
        <div class="actions">
          <button onclick="editRequest(${r.id})">Edit</button>
          <button onclick="deleteRequest(${r.id})">Delete</button>
        </div>
      </div>`;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("requestId").value;
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    priority: document.getElementById("priority").value
  };

  const url = id ? `/api/requests/${id}` : "/api/requests";
  const method = id ? "PUT" : "POST";

  await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  form.reset();
  document.getElementById("requestId").value = "";
  cancelBtn.style.display = "none";
  loadRequests();
});

async function editRequest(id) {
  const res = await fetch(`/api/requests/${id}`);
  const r = await res.json();

  document.getElementById("requestId").value = r.id;
  document.getElementById("name").value = r.name;
  document.getElementById("email").value = r.email;
  document.getElementById("category").value = r.category;
  document.getElementById("description").value = r.description;
  document.getElementById("priority").value = r.priority;

  cancelBtn.style.display = "block";
  window.scrollTo(0, 0);
}

async function deleteRequest(id) {
  if (!confirm("Delete this request?")) return;
  await fetch(`/api/requests/${id}`, { method: "DELETE" });
  loadRequests();
}

cancelBtn.addEventListener("click", () => {
  form.reset();
  document.getElementById("requestId").value = "";
  cancelBtn.style.display = "none";
});

loadRequests();
