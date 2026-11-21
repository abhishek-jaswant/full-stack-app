
if (requireLogin()) {

  const form = document.getElementById("profileForm");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const message = document.getElementById("message");

  addLogoutHandler();

  let currentUser = getSavedUser();

  // SHOW PROFILE INFORMATION

function displayProfile(user) {

  // Sidebar information
  document.getElementById("sidebarRole").textContent = user.role;
  document.getElementById("sidebarName").textContent = user.name;

  // Profile banner information
  document.getElementById("displayName").textContent = user.name;
  document.getElementById("displayEmail").textContent = user.email;
  document.getElementById("displayRole").textContent = user.role;

  // Account information
  document.getElementById("accountRole").textContent = user.role;

  // Avatar
  const initial = user.name.charAt(0).toUpperCase();

  document.getElementById("profileAvatar").textContent = initial;
  document.getElementById("sidebarAvatar").textContent = initial;

  // Form fields
  nameInput.value = user.name;
  emailInput.value = user.email;

  // Admin access
  if (user.role === "admin") {
    document.getElementById("usersLink").classList.remove("hidden");
  }
}



  // LOAD PROFILE
  async function loadProfile() {

    try {

      const data = await apiRequest("/users/profile");

      const user = data.user;

      currentUser = {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      localStorage.setItem(
        "user",
        JSON.stringify(currentUser)
      );

      displayProfile(currentUser);

    } catch (error) {

      showMessage(message, error.message, true);

    }

  }


  // UPDATE PROFILE
  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const payload = {
      name,
      email
    };

    if (password.trim()) {
      payload.password = password;
    }

    try {

      const data = await apiRequest("/users/profile", {
        method: "PUT",
        body: JSON.stringify(payload)
      });

      currentUser = {
        id: data.user.id || data.user._id || currentUser.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role
      };

      localStorage.setItem(
        "user",
        JSON.stringify(currentUser)
      );

      passwordInput.value = "";

      displayProfile(currentUser);

      showMessage(message, data.msg || "Profile updated successfully!");

    } catch (error) {

      showMessage(message, error.message, true);

    }

  });


  // RESET FORM
  form.addEventListener("reset", () => {

    setTimeout(() => {
      nameInput.value = currentUser.name;
      emailInput.value = currentUser.email;
      passwordInput.value = "";
    }, 0);

  });


  loadProfile();

}
