import './style.css';
const porductsContainer = document.querySelector(".products__container") as HTMLElement;
const selectSort = document.querySelector("#select__sort") as HTMLInputElement;

type Products = {
  id: number,
  title: string,
  price: number,
  image: string,
  description: string,
  category?: string,
  rating?: number,
}


const products = 'https://fakestoreapi.com/products'
const productsArr:Products[] = []
console.log(productsArr)

fetch(products)
            .then(res=>res.json())
            .then(json=>
              json.forEach((element:Products) => {
                productsArr.push(element)
              })
            )
            .then( () => {
              renderCardToHtml(productsArr)
            })


const renderCardToHtml = (arr:Products[]) => {
  porductsContainer.innerHTML = "";
  arr.forEach((product:Products) => {

  const card = document.createElement("div")
  card.className = "card"

  card.innerHTML = `<div class="card__img">
              <img src="${product.image}" class="img__products" alt="">
            </div>
            <h2 class="card__title">${product.title}</h2>
            <div class="price__container">
              <div class="price">${product.price.toFixed(2)}</div>
              <button class="btn">Add to cart</button>
            </div> `
    porductsContainer?.append(card)
  })
}


// renderCardToHtml(productsArr)




selectSort?.addEventListener("change", (e) => {
  const selectedValue = (e.target as HTMLSelectElement).value;

  if (selectedValue === "price-absteigend") {
    const sortPriceAbsteigend = productsArr.toSorted((a: Products, b: Products) => {
      return b.price - a.price;
    });
    renderCardToHtml(sortPriceAbsteigend);

  } else if (selectedValue === "price-aufsteigend") {
    const sortPriceAufsteigend = productsArr.toSorted((a: Products, b: Products) => {
      return a.price - b.price;
    });
    renderCardToHtml(sortPriceAufsteigend);

  } else if (selectedValue === "rating-absteigend") {
    const sortRatingAbsteigend = productsArr.toSorted((a: Products, b: Products) => {

      return (b.rating ?? 0) - (a.rating ?? 0);
    });
    renderCardToHtml(sortRatingAbsteigend);
  } else if (selectedValue === "rating-aufsteigend") {
    const sortRatingAufsteigend = productsArr.toSorted((a: Products, b: Products) => {

      return (a.rating ?? 0) - (b.rating ?? 0);
    });
    renderCardToHtml(sortRatingAufsteigend);
  }
});