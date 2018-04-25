const getUsersInfo = (err, data) => {
  if (err) {
    throw new Error(err);
  } else {
    const usersData = JSON.parse(data);
    
    usersData.forEach(info => {

      const row = create("section", selector("results"));
      const name = create("label", row);
      const id = create("label", row);
      const deleteButton = create("button", row);

      id.textContent = info.id;
      name.textContent = info.name;
      deleteButton.setAttribute('class', 'btn');
      deleteButton.textContent = "Delete User";

      deleteButton.addEventListener('click', () => {
        window.location.reload();
        fetch("/deleteUser", "POST", JSON.stringify(info.id), results);

      })
    });
  }
};

window.onload = function() {
  fetch("/admin", "GET", null, getUsersInfo);
};
