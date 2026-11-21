
if (requireLogin()) {

  const user = getSavedUser();

  const list = document.getElementById("resourceList");
  const message = document.getElementById("message");
  const form = document.getElementById("resourceForm");
  const createSection = document.getElementById("createSection");
  const searchInput = document.getElementById("searchResource");

  const editModal = document.getElementById("editModal");
  const editForm = document.getElementById("editForm");

  let resources = [];

  addLogoutHandler();


  // USER DETAILS
  const initial = (user.name || "U").charAt(0).toUpperCase();

  document.getElementById("sidebarName").textContent = user.name;
  document.getElementById("sidebarRole").textContent = user.role;
  document.getElementById("sidebarAvatar").textContent = initial;
  document.getElementById("currentRole").textContent = user.role;

  if (user.role === "admin") {
    document.getElementById("usersLink").classList.remove("hidden");
  }


  // PERMISSIONS
  const canCreate = ["admin", "moderator"].includes(user.role);

  if (canCreate) {
    createSection.classList.remove("hidden");
  }


  // SAFE ELEMENT CREATION
  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }


  // RESOURCE STATISTICS
  function updateStats() {

    document.getElementById("totalResources").textContent =
      resources.length;

    document.getElementById("myResources").textContent =
      resources.filter(resource => {
        const ownerId = resource.createdBy?._id || resource.createdBy?.id ||
          resource.createdBy;
        return String(ownerId) === String(user.id);
      }).length;

    document.getElementById("resourceCount").textContent =
      `${resources.length} Resources`;
  }


  // RENDER RESOURCES
  function renderResources() {

    const search = searchInput.value.trim().toLowerCase();

    const filtered = resources.filter(resource =>
      resource.title.toLowerCase().includes(search) ||
      resource.description.toLowerCase().includes(search)
    );

    list.replaceChildren();

    if (!filtered.length) {
      list.append(
        createElement(
          "div",
          "resource-empty",
          resources.length ? "No matching resources found." : "No resources available yet."
        )
      );
      return;
    }

    filtered.forEach(resource => {

      const card = createElement("article", "resource-card", "");

      const heading = createElement("h3", "", resource.title);

      const description = createElement(
        "p",
        "resource-description",
        resource.description
      );

      const ownerName =
        resource.createdBy?.name || "Unknown";

      const owner = createElement(
        "div",
        "resource-owner",
        `Created by: ${ownerName}`
      );

      card.append(heading, description, owner);

      const ownerId =
        resource.createdBy?._id ||
        resource.createdBy?.id ||
        resource.createdBy;

      const isOwner = String(ownerId) === String(user.id);

      // Backend permits admin to update/delete any resource,
      // and moderator only their own resources.
      const canManage =
        user.role === "admin" ||
        (user.role === "moderator" && isOwner);

      if (canManage) {

        const actions = createElement("div", "resource-actions", "");

        const editButton = createElement(
          "button",
          "edit-resource",
          "Edit"
        );

        editButton.addEventListener("click", () => openEditModal(resource));

        const deleteButton = createElement(
          "button",
          "delete-resource",
          "Delete"
        );

        deleteButton.addEventListener("click", () => deleteResource(resource._id));

        actions.append(editButton, deleteButton);
        card.append(actions);
      }

      list.append(card);
    });

  }


  // LOAD RESOURCES
  async function loadResources() {

    list.textContent = "Loading resources...";

    try {

      const data = await apiRequest("/resources");

      resources = Array.isArray(data.resource)
        ? data.resource
        : Array.isArray(data.resources)
          ? data.resources
          : [];

      updateStats();
      renderResources();

    } catch (error) {

      list.textContent = "Unable to load resources.";
      showMessage(message, error.message, true);

    }

  }


  // CREATE RESOURCE
  if (form) {

    form.addEventListener("submit", async event => {

      event.preventDefault();

      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();

      if (!title || !description) {
        showMessage(message, "Please fill all fields.", true);
        return;
      }

      const button = document.getElementById("createButton");
      button.disabled = true;

      try {

        const data = await apiRequest("/resources", {
          method: "POST",
          body: JSON.stringify({ title, description })
        });

        form.reset();

        showMessage(message, data.msg || "Resource created successfully!");

        await loadResources();

      } catch (error) {

        showMessage(message, error.message, true);

      } finally {

        button.disabled = false;

      }

    });

  }


  // OPEN EDIT MODAL
  function openEditModal(resource) {

    document.getElementById("editId").value = resource._id;
    document.getElementById("editTitle").value = resource.title;
    document.getElementById("editDescription").value = resource.description;

    editModal.classList.remove("hidden");
  }


  // CLOSE MODAL
  document.getElementById("closeEdit").addEventListener("click", () => {
    editModal.classList.add("hidden");
  });


  editModal.addEventListener("click", event => {
    if (event.target === editModal) {
      editModal.classList.add("hidden");
    }
  });


  // UPDATE RESOURCE
  editForm.addEventListener("submit", async event => {

    event.preventDefault();

    const id = document.getElementById("editId").value;

    const title = document.getElementById("editTitle").value.trim();

    const description =
      document.getElementById("editDescription").value.trim();

    if (!title || !description) {
      showMessage(message, "Please fill all fields.", true);
      return;
    }

    try {

      const data = await apiRequest(`/resources/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description })
      });

      editModal.classList.add("hidden");

      showMessage(message, data.msg || "Resource updated successfully!");

      await loadResources();

    } catch (error) {

      showMessage(message, error.message, true);

    }

  });


  // DELETE RESOURCE
  async function deleteResource(id) {

    if (!confirm("Are you sure you want to delete this resource?")) {
      return;
    }

    try {

      const data = await apiRequest(`/resources/${id}`, {
        method: "DELETE"
      });

      showMessage(message, data.msg || "Resource deleted successfully!");

      await loadResources();

    } catch (error) {

      showMessage(message, error.message, true);

    }

  }


  // SEARCH
  searchInput.addEventListener("input", renderResources);


  // INITIAL LOAD
  loadResources();

}
