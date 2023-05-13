import { menuArray } from "/data.js";

//grabbing elements from html
const ordersContainer = document.getElementById('order-container');
const orderedITems = document.getElementById('order-items');
const totalPrice = document.getElementById('total-price');
const modal = document.getElementById('modal');
const confirmPayment = document.getElementById('confirm-msg');
const feedbackArea = document.getElementsByClassName('.feedback-area')

//here is the only event listener, listening for clicks on elements that have data attributes
document.addEventListener('click', function(e){
    if(e.target.dataset.addbtn) {
        handleAddBtnClick(e.target.dataset.addbtn);
    }
    else if(e.target.id === 'complete-order'){
        modal.style.display = 'block';
    }
    else if(e.target.dataset.removebtn){
        removeItem(e.target.dataset.removebtn);
    }
    else if(e.target.id === 'paybtn'){
        completePayment();
    }
    else if(e.target.id === 'close-modal-btn'){
        closeModalBtnClick();
    }
    else if(e.target.id === 'feedback'){
        sendFeedback();
    }
})

//function to add an item from the menu to the cart
function handleAddBtnClick(itemId) {
    const targetItemObj = menuArray.filter(function(item) {
        return item.id === itemId;
    })[0];
    targetItemObj.quantity += 1;

    renderOrder();
}

//here, a similar function to remove 1 item quantity per click
function removeItem(itemId){
    const targetItemObj = menuArray.filter(function(item) {
        return item.id === itemId;
    })[0];
    targetItemObj.quantity -= 1;

    renderOrder();

}

function renderOrder() {
    orderedITems.innerHTML = ``;
    let totalCost = 0;

    menuArray.forEach(function(item){
        if(item.quantity > 0){
            totalCost += item.quantity * item.price;
            orderedITems.innerHTML += 
            `
                <div class="ordered-item">
                    <div class="ordered-item-info"    
                        <h3>${item.quantity}</h3>
                        <h3>${item.name}</h3>
                        <button class="remove-item-btn" data-removebtn="${item.id}">Remove</button>
                    </div>
                    <h3 class="item-price">$${item.quantity * item.price}</h3>
                </div>
            `
        }
        if(totalCost === 0) {
            ordersContainer.style.display = 'none';
        }
        else{
            ordersContainer.style.display = 'block';
            totalPrice.innerHTML = `$${totalCost}`;
        }
    })
}

function completePayment() {
    ordersContainer.style.display = 'none';
    modal.style.display = 'none';
    confirmPayment.style.display = 'block';
}

function closeModalBtnClick() {
    modal.style.display = 'none';
}

function sendFeedback() {
    feedbackArea.style.display = 'none';
    console.log('you clicked send feedback btn')
}

function getFeedHTml() {
    let feedHtml = ``;

    menuArray.forEach(product => {      
        feedHtml += 
            `
                <div class="products-div">
                    <div class="inner-product">
                        <div id="emoji">${product.emoji}</div>
                        <div class="menu-text">
                            <h3>${product.name}</h3>
                            <h4>${product.ingredients}</h4>
                        </div>
                        <h3>$${product.price}</h3>
                    </div>
                    <button class="add-btn" data-addbtn="${product.id}">+</button>
                </div>
            `
        });

    return feedHtml;
}

function render(){
    document.getElementById('products-container').innerHTML = getFeedHTml();
}

render();