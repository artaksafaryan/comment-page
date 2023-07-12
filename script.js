// Retrieve existing user data from local storage or initialize an empty array
let users = JSON.parse(localStorage.getItem("users")) || [];
// Get DOM elements
const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal-parent");
const closeModal = document.getElementById("close");
const addUser = document.getElementById("add-user");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const save = document.getElementById("save");
const tbody = document.querySelector("tbody");

openModal.onclick = () => {
  modal.style.display = "flex";
};

closeModal.onclick = () => {
  modal.style.display = "none";
};
function drawUserList() {
  tbody.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.innerHTML = users[i].id;

    const tdFirstName = document.createElement("td");
    tdFirstName.innerHTML = users[i].firstName;

    const tdLastName = document.createElement("td");
    tdLastName.innerHTML = users[i].lastName;

    const tdEmail = document.createElement("td");
    tdEmail.innerHTML = users[i].email;

    const tdAction = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = () => {
      modal.style.display = "flex";
      firstName.value = users[i].firstName;
      lastName.value = users[i].lastName;
      email.value = users[i].email;
      addUser.style.display = "none";
      closeModal.style.display = "none";
      save.style.display = "flex";
      save.onclick = () => {
        users[i].firstName = firstName.value;
        users[i].lastName = lastName.value;
        users[i].email = email.value;
        localStorage.setItem("users", JSON.stringify(users));
        drawUserList();
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        modal.style.display = "";
        addUser.style.display = "";
        closeModal.style.display = "inline";
        save.style.display = "none";
      };
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      tbody.removeChild(tr);
      users.splice(i, 1);
      localStorage.setItem("users", JSON.stringify(users));
    });

    tdAction.append(editButton, deleteButton);

    tr.append(tdId, tdFirstName, tdLastName, tdEmail, tdAction);
    tbody.append(tr);
  }
}
addUser.addEventListener("click", function () {
  const newUser = {
    id: Math.floor(Math.random() * 100),
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  drawUserList();
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  modal.style.display = "none";
});
drawUserList();
