const selector = (id) => {
  return document.getElementById(id)
}

const create = (element, parent) => {
  let newElement = document.createElement(element);
  if (parent) return parent.appendChild(newElement)
  else return newElement;
}
