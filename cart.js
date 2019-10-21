/* js for product details page (dogHarness.html) and cart.html to 
reflect user changes while editing item options and adding to cart
Task:
switch main img
update color
update size
update quantity
add to cart
show new cart item
*/
//global variable for cart items
var cartItemsQnty = 0;


//constructor for shoppingCartItem
function shoppingCartItem (color, size, quantity) {
	this.color = color,
	this.size = size,
	this.quantity = quantity
}

//switch picture
function changeMainProductImg(elementClicked) {
	console.log(elementClicked.id);
	if (elementClicked.id == "alt1") {
		document.getElementById("mainProductImg").src = "imgs/mainProductImg1.png";
	}
	else if (elementClicked.id == "alt2") {
		document.getElementById("mainProductImg").src = "imgs/mainProductImg2.png";
	}
	else {
		document.getElementById("mainProductImg").src = "imgs/mainProductImg3.png";
	}
}


//check color
function getColorSelected() {
	var dropMenu = document.getElementById("colorDropMenu");
	var options = dropMenu.options;
	var selectedColor = dropMenu.selectedIndex;
	console.log("Index: " + options[selectedColor].index + " is " + options[selectedColor].text);
	return options[selectedColor].text;
}

//check size
function getSizeSelected() {
	var dropMenu = document.getElementById("sizeDropMenu");
	var options = dropMenu.options;
	var selectedSize = dropMenu.selectedIndex;
	console.log("Index: " + options[selectedSize].index + " is " + options[selectedSize].text);
	return options[selectedSize].text;
}

//check quantity
function getQntySelected() {
	var dropMenu = document.getElementById("qntyDropMenu");
	var options = dropMenu.options;
	var selectedQnty = dropMenu.selectedIndex;
	console.log("Index: " + options[selectedQnty].index + " is " + options[selectedQnty].text);
	return options[selectedQnty].text;
}

//update main menu cart icon with quantity of items in cart
function updateCartIcon() {
	//check quantity
	//update existing cart number with quantity
	//update cart icon with new quantity
}

//add to cart
//check what is selected for color, size, and quantity
function addToCart() {
	/*console.log("getColorSel strawberry: " + getColorSelected());
	console.log("getSizeSel tiny: " + getSizeSelected());
	console.log("getQntySel 1: " + getQntySelected());*/
	var color = getColorSelected();
	var size = getSizeSelected();
	var quantity = getQntySelected();
	var itemAdded = new shoppingCartItem(color, size, quantity);

	/*console.log("itemAdded strawberry: " + itemAdded.color);
	console.log("itemAdded tiny: " + itemAdded.size);
	console.log("itemAdded 1: " + itemAdded.quantity);*/
	//update the number above cart icon in menu to reflect quantity of items added to it

	cartItemsQnty += parseInt(quantity);
	//console.log("cartItemsQnty: 1 " + cartItemsQnty);
	document.getElementById("shoppingCartCount").innerHTML = cartItemsQnty;
	//console.log("toString: " + cartItemsQnty);
}

//show new cart item
