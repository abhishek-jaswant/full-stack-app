
function getToken() {
  return localStorage.getItem("token");
}

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function requireLogin() {
  if (!getToken() || !getSavedUser()) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
showMessage
function showMessage(element, message, isError = false) {
  if (!element) return;

  element.textContent = message;
  element.style.color = isError ? "#dc2626" : "#16a34a";
}

async function apiRequest(path, options = {}) {
  const headers = {
    ...options.headers
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      headers
    }
  );

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    logout();
    throw new Error(data.msg || "Session expired. Please login again.");
  }

  if (!response.ok) {
    throw new Error(data.msg || "Something went wrong");
  }

  return data;
}

function addLogoutHandler() {
  const button = document.getElementById("logoutBtn");

  if (button) {
    button.addEventListener("click", logout);
  }
}
