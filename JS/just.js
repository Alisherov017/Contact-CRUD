const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phoneNumber = document.getElementById("phoneNumber");
const photoUrl = document.getElementById("photoUrl");

// ! --- addContact
function addContact() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const photoUrl = document.getElementById("photoUrl").value;

  if (firstName && lastName && phoneNumber && photoUrl) {
    const contact = { firstName, lastName, phoneNumber, photoUrl };
                                                                
    // Добавляем контакт в localStorage                        
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Очищаем форму
    firstName.value = "";
    lastName.value = "";
    phoneNumber.value = "";
    photoUrl.value = "";

    render();
  } else {
    alert("Fill in empty fields!");
  }
}

// ! --- render
function render() {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";

  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  contacts.forEach((contact, index) => {
    const card = `
      <div class="col-md-4">
        <div class="card mb-3">
          <img src="${contact.photoUrl}" class="card-img-top" alt="${contact.firstName} ${contact.lastName}">
          <div class="card-body">
            <h5 class="card-title">${contact.firstName} ${contact.lastName}</h5>
            <p class="card-text">${contact.phoneNumber}</p>
            <button type="button" class="btn btn-primary" onclick="editContact(${index})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteContact(${index})">Delete</button>
          </div>
        </div>
      </div>
    `;
    contactList.insertAdjacentHTML("beforeend", card);
  });
}

// !  --- deleteContact
function deleteContact(index) {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  render();
}

// ! --- editContact
function editContact(index) {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contacts[index];

  // Заполняем форму данными выбранного контакта
  firstName.value = contact.firstName;
  lastName.value = contact.lastName;
  phoneNumber.value = contact.phoneNumber;
  photoUrl.value = contact.photoUrl;

  // Удаляем выбранный контакт из списка
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  render();
}

render();
