/* js for product details page (dogHarness.html) and cart.html to 
reflect user changes while editing item options and adding to cart
Task:
switch main product img based on thumbnail selection
check what color is selected and update object
check size is selected and update object
check quantity is selected and update object
add item to cart
show new cart item count above cart icon in menu
*/
//global variable for cart item count
var cartItemCount = 0;


//constructor for shoppingCartItem
function shoppingCartItem (color, size, quantity) {
	this.color = color,
	this.size = size,
	this.quantity = quantity
}

//switch picture when corresponding thumbnail is clicked
function changeMainProductImg(elementClicked) {
	var thumbnail1 = document.getElementById("alt1");
	var thumbnail2 = document.getElementById("alt2");
	var thumbnail3 = document.getElementById("alt3");

	if (elementClicked.id == "alt1") {
		document.getElementById("mainProductImg").src = "imgs/mainProductImg1.png";
		//rm boarder from previously selected img thumbnail
		if (thumbnail2.classList.contains("selectedThumbnail")) {
			thumbnail2.classList.remove("selectedThumbnail");
		}
		else if (thumbnail3.classList.contains("selectedThumbnail")) {
			thumbnail3.classList.remove("selectedThumbnail");
		}
		document.getElementById("alt1").className = "selectedThumbnail";
	}
	else if (elementClicked.id == "alt2") {
		document.getElementById("mainProductImg").src = "imgs/mainProductImg2.png";
		//rm boarder from previously selected img thumbnail
		if (thumbnail1.classList.contains("selectedThumbnail")) {
			thumbnail1.classList.remove("selectedThumbnail");
		}
		else if (thumbnail3.classList.contains("selectedThumbnail")) {
			thumbnail3.classList.remove("selectedThumbnail");
		}
		document.getElementById("alt2").className += " selectedThumbnail";
	}
	else {
		document.getElementById("mainProductImg").src = "imgs/mainProductImg3.png";
		//rm boarder from previously selected img thumbnail
		if (thumbnail2.classList.contains("selectedThumbnail")) {
			thumbnail2.classList.remove("selectedThumbnail");
		}
		else if (thumbnail1.classList.contains("selectedThumbnail")) {
			thumbnail1.classList.remove("selectedThumbnail");
		}
		document.getElementById("alt3").className += " selectedThumbnail";
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


/*add to cart
check what is selected for color, size, and quantity
update main menu cart icon with quantity of items in cart*/
function addToCart() {
	/*console.log("getColorSel strawberry: " + getColorSelected());
	console.log("getSizeSel tiny: " + getSizeSelected());
	console.log("getQntySel 1: " + getQntySelected());*/
	var color = getColorSelected();
	var size = getSizeSelected();
	var quantity = getQntySelected();
	var itemAdded = new shoppingCartItem(color, size, quantity);

	//update the number above cart icon in menu to reflect quantity of items added to it
	cartItemCount += parseInt(quantity);
	document.getElementById("shoppingCartCount").innerHTML = cartItemCount;
}

//show new cart item in shopping cart page
