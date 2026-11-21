
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Frontend validation
  if (name.length < 3 || name.length > 10) {
    showMessage(message, "Name must be 3 to 10 characters", true);
    return;
  }

  if (password.length < 8) {
    showMessage(message, "Password must be at least 8 characters", true);
    return;
  }

  const userdata = {
    name,
    email,
    password
  };

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userdata)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Registration failed");
    }

    showMessage(message, "Registration successful! Please login.");

    // Signup ke baad login page par bhejo
    registerForm.reset();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);

  } catch (error) {
    showMessage(message, error.message, true);
  }
});
