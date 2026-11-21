if (requireLogin()) {

  const user = getSavedUser();

  const list = document.getElementById("usersList");
  const message = document.getElementById("message");

  const searchInput = document.getElementById("searchUsers");
  const roleFilter = document.getElementById("roleFilter");

  let users = [];

  addLogoutHandler();

  // ADMIN CHECK
  if (user.role !== "admin") {
    showMessage(message, "Access denied. Admin only.", true);
    list.innerHTML = "";
  } else {

    // SIDEBAR
    document.getElementById("sidebarName").textContent = user.name;
    document.getElementById("sidebarRole").textContent = user.role;
    document.getElementById("sidebarAvatar").textContent =
      user.name.charAt(0).toUpperCase();

    // SAFE ELEMENT
    function el(tag, className, text) {
      const element = document.createElement(tag);
      element.className = className;
      element.textContent = text;
      return element;
    }

    // STATISTICS
    function updateStats() {

      document.getElementById("totalUsers").textContent =
        users.length;

      document.getElementById("adminCount").textContent =
        users.filter(u => u.role === "admin").length;

      document.getElementById("moderatorCount").textContent =
        users.filter(u => u.role === "moderator").length;

      document.getElementById("regularCount").textContent =
        users.filter(u => u.role === "user").length;

      document.getElementById("usersTotalBadge").textContent =
        `${users.length} Users`;
    }

    // RENDER TABLE
    function renderUsers() {

      const search = searchInput.value.trim().toLowerCase();
      const selectedRole = roleFilter.value;

      const filtered = users.filter(account => {

        const matchesSearch =
          account.name.toLowerCase().includes(search) ||
          account.email.toLowerCase().includes(search);

        const matchesRole =
          selectedRole === "all" ||
          account.role === selectedRole;

        return matchesSearch && matchesRole;

      });

      list.replaceChildren();

      if (!filtered.length) {

        const row = el("tr", "", "");
        const cell = el("td", "table-loading", "No users found.");

        cell.colSpan = 5;
        row.append(cell);
        list.append(row);

        return;
      }

      filtered.forEach(account => {

        const row = document.createElement("tr");

        // USER
        const userCell = document.createElement("td");

        const userWrapper = el("div", "user-name-cell", "");

        const avatar = el(
          "div",
          "user-table-avatar",
          account.name.charAt(0).toUpperCase()
        );

        const name = el("strong", "", account.name);

        userWrapper.append(avatar, name);
        userCell.append(userWrapper);

        // EMAIL
        const emailCell = el("td", "", account.email);

        // ROLE
        const roleCell = document.createElement("td");

        const badge = el(
          "span",
          `role-badge role-${account.role}`,
          account.role
        );

        roleCell.append(badge);

        // STATUS
        const statusCell = el(
          "td",
          "account-active",
          "● Active"
        );

        // ACTION
        const actionCell = document.createElement("td");

        const select = document.createElement("select");
        select.className = "role-select";

        ["user", "moderator", "admin"].forEach(role => {

          const option = document.createElement("option");

          option.value = role;
          option.textContent =
            role.charAt(0).toUpperCase() + role.slice(1);

          select.append(option);

        });

        select.value = account.role;

        const saveButton = el(
          "button",
          "update-role-btn",
          "Update"
        );

        const isSelf =
          String(account._id || account.id) === String(user.id);

        if (isSelf) {
          select.disabled = true;
          saveButton.disabled = true;
          saveButton.textContent = "Current Admin";
        }

        saveButton.addEventListener("click", async () => {

          if (select.value === account.role) {
            showMessage(message, "Please select a different role.", true);
            return;
          }

          saveButton.disabled = true;

          try {

            const result = await apiRequest(
              `/users/${account._id || account.id}/role`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  role: select.value
                })
              }
            );

            showMessage(message, result.msg);

            await loadUsers();

          } catch (error) {

            showMessage(message, error.message, true);

          } finally {

            saveButton.disabled = false;

          }

        });

        actionCell.append(select, saveButton);

        row.append(
          userCell,
          emailCell,
          roleCell,
          statusCell,
          actionCell
        );

        list.append(row);

      });

    }

    // GET ALL USERS
    async function loadUsers() {

      list.innerHTML = `
        <tr>
          <td colspan="5" class="table-loading">
            Loading users...
          </td>
        </tr>
      `;

      try {

        const data = await apiRequest("/users");

        users = Array.isArray(data.users) ? data.users : [];

        updateStats();
        renderUsers();

      } catch (error) {

        showMessage(message, error.message, true);

      }

    }

    // SEARCH
    searchInput.addEventListener("input", renderUsers);

    // FILTER
    roleFilter.addEventListener("change", renderUsers);

    // INITIAL LOAD
    loadUsers();

  }

}