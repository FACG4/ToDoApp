const getUsersInfo = (err, data) => {
  if (err) {
    throw new Error(err);
  } else {
    const usersData = JSON.parse(data);

    console.log(usersData);
    usersData.forEach(info => {

      const admin_name = selector('admin_name');
      if (info.role === 1) {
        admin_name.textContent = `Admin ${info.name}`;
      } else {
        const row = create("section", selector("results"));
        const name = create("label", row);
        const deleteButton = create("button", row);

        name.textContent = info.name;
        deleteButton.setAttribute('class', 'btn');
        deleteButton.textContent = "Delete User";

        deleteButton.addEventListener('click', () => {
          window.location.reload();
          fetch("/deleteUser", "POST", JSON.stringify(info.id), results);
        })
      }
    });
  }
};

window.onload = function() {
  fetch("/admin", "GET", null, getUsersInfo);
};
