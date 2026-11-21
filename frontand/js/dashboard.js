
if (requireLogin()) {

  const savedUser = getSavedUser();

  const message = document.getElementById("message");
  const sidebar = document.getElementById("sidebar");

  // LOGOUT
  addLogoutHandler();

  // MOBILE SIDEBAR
  document.getElementById("menuBtn").addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // CURRENT DATE
  document.getElementById("currentDate").textContent =
    new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });

  // ROLE BASED UI
  const isAdmin = savedUser.role === "admin";

  if (isAdmin) {
    document.getElementById("usersLink").classList.remove("hidden");
    document.getElementById("manageUsersCard").classList.remove("hidden");
    document.getElementById("usersStatCard").classList.remove("hidden");
  }

  // SHOW USER DETAILS
  function showUser(user) {

    document.getElementById("username").textContent = user.name;

    document.getElementById("userrole").textContent = user.role;

    document.getElementById("sidebarName").textContent = user.name;

    document.getElementById("sidebarRole").textContent = user.role;

    document.getElementById("sidebarAvatar").textContent =
      user.name.charAt(0).toUpperCase();

    document.getElementById("topAvatar").textContent =
      user.name.charAt(0).toUpperCase();
  }

  showUser(savedUser);


  // GET PROFILE
  async function loadProfile() {

    try {

      const data = await apiRequest("/users/profile");

      if (data.user) {

        const updatedUser = {
          id: data.user._id || data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        showUser(updatedUser);
      }

    } catch (error) {

      showMessage(message, error.message, true);

    }
  }


  // GET RESOURCES
  async function loadDashboardResources() {

    try {

      const data = await apiRequest("/resources");

      const resources = data.resource || data.resources || [];

      // TOTAL RESOURCES
      document.getElementById("totalResources").textContent =
        resources.length;

      // MY RESOURCES
      const myResources = resources.filter(resource => {

        const ownerId =
          resource.createdBy?._id ||
          resource.createdBy?.id;

        return ownerId === savedUser.id;

      });

      document.getElementById("myResources").textContent =
        myResources.length;

      // RECENT RESOURCES
      const recentContainer =
        document.getElementById("recentResources");

      recentContainer.replaceChildren();

      if (resources.length === 0) {

        recentContainer.innerHTML =
          '<div class="empty-state">No resources available yet.</div>';

        return;
      }

      const recent = [...resources]
        .sort((a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
        )
        .slice(0, 4);

      recent.forEach(resource => {

        const card = document.createElement("article");

        card.className = "recent-card";

        const title = document.createElement("h3");
        title.textContent = resource.title;

        const description = document.createElement("p");
        description.textContent = resource.description;

        const owner = document.createElement("p");
        owner.className = "recent-owner";

        owner.textContent =
          `Created by: ${resource.createdBy?.name || "Unknown"}`;

        card.append(title, description, owner);

        recentContainer.append(card);

      });

    } catch (error) {

      showMessage(message, error.message, true);

      document.getElementById("recentResources").textContent =
        "Unable to load resources.";

    }

  }


  // GET ALL USERS (ADMIN ONLY)
  async function loadTotalUsers() {

    if (!isAdmin) return;

    try {

      const data = await apiRequest("/users");

      document.getElementById("totalUsers").textContent =
        data.users.length;

    } catch (error) {

      showMessage(message, error.message, true);

    }

  }


  // LOAD DASHBOARD
  async function initDashboard() {

    await Promise.allSettled([
      loadProfile(),
      loadDashboardResources(),
      loadTotalUsers()
    ]);

  }

  initDashboard();

}
