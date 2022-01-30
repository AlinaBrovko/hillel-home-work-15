const userBlock = document.querySelector(".users");

const userBtn = document.querySelector(".user-btn");
userBtn.addEventListener("click", function () {
  this.classList.add("active");
  carBtn.classList.remove("active");
  userBlock.classList.remove("hidden");
  carBlock.classList.add("hidden");
});

function User(name, email, phone, age, car) {
  this.id = 1;
  this.name = name;
  this.email = email;
  this.phone = phone;
  this.age = age;
  this.car = car;
}

function UserList() {
  this.data = [];
  this.key = "users";
  this.headers = ["id", "Ім'я", "Email", "Телефон", "Вік", "Автомобіль", ""];
  this.getFormElements = function (item) {
    return [
      {
        label: "Ім'я",
        html: `<input type="text" class="form-control" name="name" required pattern="[А-ЯA-Z][a-zа-я]{1,20}"
                title="Перша літера велика" placeholder="Введіть ім'я"${
                  item ? 'value="' + item.name + '"' : ""
                }/>`,
      },
      {
        label: "Номер телефону",
        html: `<input type="tel" class="form-control" name="phone" pattern="380[0-9]{9}" title="формат 380671234567" required
                placeholder="Введіть свій номер телефону" ${
                  item ? 'value="' + item.phone + '"' : ""
                }/>`,
      },
      {
        label: "Email",
        html: `<input type="email" class="form-control"  name="email" title="Валідний email" pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required
                placeholder="Введіть свій email" ${
                  item ? 'value="' + item.email + '"' : ""
                }/>`,
      },
      {
        label: "Вік",
        html: `<input name="age" class="form-control" type="text" title="не молодше 18-років"  pattern="[1-9][{1}[0-9]{1}" required
                placeholder="Введіть свій вік" ${
                  item ? 'value="' + item.age + '"' : ""
                }/>`,
      },
      {
        label: "Автомобіль",
        html: `<select class="form-select" name="car">
                  ${getOptionsCar(item)}
                </select>`,
      },
    ];
  };
}
UserList.prototype = property;

const userList = new UserList();

userList.init();
userList.render(userBlock, userList);

const usersForm = document.createElement("form");
usersForm.innerHTML = userList.getForm();
usersForm.classList.add("users-form");
usersForm.classList.add("hidden");
userBlock.appendChild(usersForm);

usersForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let user = new User(
    this.elements["name"].value,
    this.elements["email"].value,
    this.elements["phone"].value,
    this.elements["age"].value,
    carsList.getById(this.elements["car"].value)
  );
  userList.addElement(user, userBlock, userList);
});

function getOptionsCar(item) {
  let options =
    item && item.car.id ? "<option>-</option>" : "<option selected>-</option>";
  carsList.data.forEach((car) => {
    const selected =
      item && item.car.id && item.car.id == car.id ? "selected" : "";
    options += `<option ${selected} value="${car.id}">${car.make} ${car.model}</option>`;
  });
  return options;
}
