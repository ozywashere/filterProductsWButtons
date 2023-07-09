//fetch the data from the data.js file or the database

import products from './data.js'
let filteredProducts = products
console.log(products)

//select the dom elements
const productsContainer = document.querySelector('[data-products]')
const searchInput = document.querySelector('[data-search-input]')
const form = document.querySelector('[data-search-form]')
const categories = document.querySelector('[data-categories]')
const preloader = document.querySelector('[data-preloader]')
//preloader
window.addEventListener('load', () => {
  preloader.classList.add('remove')
})
//create the html string showing the products rendered products
const displayProducts = () => {
  if (filteredProducts.length < 1) {
    return (productsContainer.innerHTML = `
    <div class="col ">
        <div class="card text-center" >
        <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" class="card-img-top w-100" alt="No products found">
            <div class="card-body"> 
                <h1 class="card-title">404</h1>
                <h3 class="card-title">No products found</h3>
                <p class="card-text">Sorry, no products matched your search!</p>
            </div>
            <div class="card-footer">
            <div class="d-flex align-items-center gap-3 justify-content-center">    
                <a href="/" class="btn btn-danger">Go Home</a>
                <a href="/" class="btn btn-success">Products</a>
            </div>
            </div>
        </div>
    </div>`)
  }
  let htmlString = filteredProducts
    .map((product) => {
      //destructure the product object
      const { id, title, thumbnail, price } = product
      return `<div class="col" data-id="${id}">
                <div class="card h-100">
                    <img src="${thumbnail}" alt="${title}" height="300" class="w-100 card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">$${price}</p>
                    </div>
                </div>
            </div>
    `
    })
    .join('')
  productsContainer.innerHTML = htmlString
}
displayProducts()

//filter the products search by title
form.addEventListener('keyup', () => {
  const inputValue = searchInput.value.trim().toLowerCase()
  filteredProducts = filteredProducts.filter((product) => {
    return product.title.toLowerCase().includes(inputValue)
  })
  inputValue === ''
  displayProducts()
})

//filter the products with links

//filter the products with buttons
const displayButtons = () => {
  //unique categories
  const buttons = [
    'all',
    ...new Set(products.map((product) => product.category)),
  ]
  //category buttons iteration and display
  const categoryButtons = buttons.map((btn) => {
    return `<button class=" text-uppercase btn btn-dark shadow-sm" data-id="${btn}">${btn}</button>`
  })
  //display the buttons
  categories.innerHTML = categoryButtons.join('')
}
displayButtons()

//filter the products with buttons

categories.addEventListener('click', (e) => {
  const category = e.target
  if (category.classList.contains('btn')) {
    if (category.dataset.id === 'all') {
      filteredProducts = products
      displayProducts()
    } else {
      filteredProducts = products.filter((product) => {
        return product.category === category.dataset.id
      })
      displayProducts()
    }
  }
})

//active buttons on click

categories.addEventListener('click', (e) => {
  const btn = e.target
  const active = document.querySelector('.active')
  if (active) {
    active.classList.remove('active')
  }
  btn.classList.add('active')
})
