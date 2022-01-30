const property = {
  addElement(element, block, object) {
    let id = 1;
    if (this.data.length != 0) {
      id = this.data[this.data.length - 1].id + 1;
    }

    element.id = id;
    this.data.push(element);
    this.save();
    const table = block.getElementsByTagName("tbody")[0];
    table.appendChild(renderItem(element, object));
  },

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  },

  init() {
    if (localStorage.getItem(this.key) !== null) {
      this.data = JSON.parse(localStorage.getItem(this.key));
    }
  },

  render(block, object) {
    const table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-hover");
    table.classList.add("align-middle");

    const head = document.createElement("tr");

    this.headers.forEach(function (header) {
      const th = document.createElement("th");
      th.innerText = header;
      head.appendChild(th);
    });
    table.appendChild(head);

    const tbody = document.createElement("tbody");

    this.data.forEach(function (item) {
      const tr = renderItem(item, object);
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    block.prepend(table);
  },

  getForm() {
    let form = "";
    this.getFormElements().forEach(function (element) {
      form += `<div class="mb-3"><label class="form-label">${element.label}</label>${element.html}</div>`;
    });

    form += '<input type="submit" class="btn btn-primary" value="Send" />';
    return form;
  },

  delete(id) {
    this.data = this.data.filter(function (item) {
      return item.id != id;
    });
    this.save();
  },

  update(element) {
    this.data = this.data.map(function (item) {
      if (item.id == element.id) {
        item = element;
      }

      return item;
    });
    this.save();
  },
};

function renderItem(item, object) {
  const tr = document.createElement("tr");
  for (prop in item) {
    const td = document.createElement("td");
    td.innerHTML =
      typeof item[prop] === "object"
        ? item[prop].make + " " + item[prop].model
        : item[prop];
    tr.appendChild(td);
  }
  const td = document.createElement("td");

  const edit = document.createElement("button");
  edit.innerHTML = "&#9998;";
  edit.classList.add("btn");
  edit.classList.add("btn-outline-warning");
  edit.classList.add("btn-sq");
  edit.addEventListener("click", function () {
    getInputList(item, tr, object);
  });

  const dlt = document.createElement("button");
  dlt.innerHTML = "&#x2715;";
  dlt.classList.add("btn");
  dlt.classList.add("btn-outline-danger");
  dlt.classList.add("btn-sq");
  dlt.addEventListener("click", function () {
    tr.remove();
    object.delete(item.id);
  });

  td.appendChild(edit);
  td.appendChild(dlt);
  tr.appendChild(td);

  return tr;
}

function getInputList(item, tr, object) {
  tr.innerHTML = "";
  const form = document.createElement("form");

  const td = document.createElement("td");
  td.innerHTML = item.id;
  tr.appendChild(td);

  object.getFormElements(item).forEach(function (element) {
    form.innerHTML += '<div class="col-auto">' + element.html + "</div>";
  });

  const okBtn = document.createElement("button");
  okBtn.classList.add("btn");
  okBtn.classList.add("btn-outline-success");
  okBtn.innerText = "OK";
  okBtn.type = "submit";

  form.appendChild(okBtn);
  form.innerHTML = '<div class="input-group">' + form.innerHTML + "</div>";

  form.addEventListener("submit", function () {
    const inputs = Array.from(this.elements);
    inputs.forEach(function (input) {
      if (input.name) {
        if (input.name == "car") {
          item[input.name] = carsList.getById(input.value);
        } else {
          item[input.name] = input.value;
        }
      }
    });

    object.update(item);
    tr.replaceWith(renderItem(item, object));
  });

  const formTd = document.createElement("td");
  formTd.appendChild(form);
  formTd.colSpan = object.headers.length - 1;

  tr.appendChild(formTd);
}
