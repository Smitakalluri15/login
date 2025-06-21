export const saveManualProduct = (product) => {
  const current = JSON.parse(localStorage.getItem("products")) || [];
  localStorage.setItem("products", JSON.stringify([...current, product]));
};

export const saveCSVProducts = (products) => {
  const current = JSON.parse(localStorage.getItem("products")) || [];
  localStorage.setItem("products", JSON.stringify([...current, ...products]));
};

export const getProducts = () => {
  return JSON.parse(localStorage.getItem("products")) || [];
};
