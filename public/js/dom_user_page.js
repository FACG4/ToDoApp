const logout_user_btn = selector('logout_user');
const user_name = selector('username');
const bio = selector('bio');
const input_list_item = selector('input_list_item');
const add_list_item = selector('button_list_item');
let id = '';

const getUserItems = (error, data) => {
  if (error) {
    throw new Error(error);
  } else {
    const userItems = JSON.parse(data);

    const listOfItems = create('ul', selector('results'));
    userItems.forEach(info => {

      const item = create("li", listOfItems);
      item.textContent = info.todoitem;
      const deleteItem = create("button", item);
      deleteItem.textContent = 'Delete';
      deleteItem.addEventListener('click', (e) => {
        window.location.reload();
        fetch("/deleteItem", "POST", JSON.stringify(info.listid), results);
      });

    });
  }

}

const getUserName = (err, data) => {
  if (err) throw new Error(err);
  else {
    const userItems = JSON.parse(data);
    console.log(userItems);
    user_name.textContent = 'Hi '+userItems[0].name;
    bio.textContent = 'Bio: '+userItems[0].bio;
    id = userItems[0].id;
  }
}


add_list_item.addEventListener('click', (e) => {
  e.preventDefault();
  const dataItem = {
    item: input_list_item.value,
    id: id
  }
  fetchObj("/addItem", "POST", JSON.stringify(dataItem), (error, results) => {
    if (error) {
      console.log(error);
    } else {
      if (results === 200) {
        window.location.reload();
      }
    }
  })
})


window.onload = function() {
  fetch("/itemsForUser", "GET", null, getUserItems);
  fetch("/getUserName", "GET", null, getUserName);
};
