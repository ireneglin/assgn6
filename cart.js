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
var localStorageCount = 0;
//global variable for subtotal calculation in cart.html page
var cartSubtotal = 0;

//constructor for shoppingCartItem
function shoppingCartItem (name, color, size, quantity, price, img) {
	this.name = name,
	this.color = color,
	this.size = size,
	this.quantity = quantity,
	this.price = price,
	this.img = img
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
			thumbnail1.classList.add("leftpImg");
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
			thumbnail1.classList.add("leftpImg");
		}
		document.getElementById("alt3").className += " selectedThumbnail";
	}
}

//check color
function getColorSelected() {
	var dropMenu = document.getElementById("colorDropMenu");
	var options = dropMenu.options;
	var selectedColor = dropMenu.selectedIndex;
	return options[selectedColor].text;
}

//check size
function getSizeSelected() {
	var dropMenu = document.getElementById("sizeDropMenu");
	var options = dropMenu.options;
	var selectedSize = dropMenu.selectedIndex;
	return options[selectedSize].text;
}

//check quantity
function getQntySelected() {
	var dropMenu = document.getElementById("qntyDropMenu");
	var options = dropMenu.options;
	var selectedQnty = dropMenu.selectedIndex;
	return options[selectedQnty].text;
}

//update main menu cart icon with quantity of items in cart
function updateCartCount(quantity) {
	cartItemCount += parseInt(quantity);
	document.getElementById("shoppingCartCount").innerHTML = cartItemCount;
}


/*add to cart
check what is selected for color, size, and quantity*/
function addToCart() {
	var name = document.getElementById("detailPageName").innerText;
	var color = getColorSelected();
	var size = getSizeSelected();
	var quantity = getQntySelected();
	var price = document.getElementById("detailPagePriceId2").innerText;
	var img = "imgs/p1.img";
	var itemAdded = new shoppingCartItem(name, color, size, quantity, price);

	//update the number above cart icon in menu to reflect quantity of items added to it
	updateCartCount(quantity);

	//add item to local storage
	window.localStorage.setItem(localStorageCount, JSON.stringify(itemAdded));
	localStorageCount += 1;
}

function calcSubtotal(variable, operator) {
	var num = parseInt(variable);
	console.log("type of num: "+typeof num);
	console.log("num: "+num);
	if (operator == 1) {
		cartSubtotal += num;
	} else {
		cartSubtotal -= num;
	}

	updateSubtotal(cartSubtotal);
}

//rm specific item if customer clicks "delete" button on that item
function removeShoppingCartItem(currRow, itemKey) {
	var parentNode = document.getElementById(currRow);

	while (parentNode.hasChildNodes()) {
		console.log("child id: "+parentNode.firstChild.id)
		if (parentNode.firstChild.classList.contains("scQnty")) {
			var price = parentNode.firstChild.firstChild.innerHTML;
			console.log("first first: "+price.substr(1,price.length-4))
			calcSubtotal(price.substr(1, price.length-4), 0);
		}
		parentNode.removeChild(parentNode.firstChild);
	}

	var mainDiv = document.getElementById("cartMainInfo");
	mainDiv.removeChild(parentNode);

	//remove item from storage
	//var itemKey = window.localStorage.key(i);
	window.localStorage.removeItem(itemKey);
	console.log("test: "+window.localStorage.length);

	removeSecondCheckoutButton();
}

function addNewDiv(divClass, divId, divParentId) {
	//create new div
	var newDiv = document.createElement("div");
	newDiv.classList.add(divClass);
	newDiv.id = divId;
	document.getElementById(divParentId).appendChild(newDiv);
	return newDiv;
}

function addProductImg(parentId) {
	//var newDiv = addNewDiv("itemCheckoutPreview", "itemCheckoutPreviewImg", parentId);

	//create new img element 
	var newImg = document.createElement("img");
	newImg.classList.add("cartleftImg");
	newImg.src = "imgs/p1.png";
	//add new img to parent div
	//document.getElementById(newDiv.id).appendChild(newImg);
	document.getElementById(parentId).appendChild(newImg);
}

function addProductHeader(name, parentId) {
	var newH3 = document.createElement("h3");
	newH3.id = "productName";
	newH3.innerText += name;
	document.getElementById(parentId).appendChild(newH3);
}

function addProductDetails(color, size, parentId) {
	//var newDiv = addNewDiv("item", "cartrtxt", parentId);
	var newPColor = document.createElement("p");
	newPColor.className += "shoppingCartTxt";
	newPColor.innerText += ("Color: " + color);
	var newPSize = document.createElement("p");
	newPSize.className += "shoppingCartTxt";
	newPSize.innerText += ("Size: " + size);
	document.getElementById(parentId).appendChild(newPColor);
	document.getElementById(parentId).appendChild(newPSize);
}

function addProductPrice(price, quantity, parentId) {
	var newH3 = document.createElement("h3");
	newH3.id = "productPrice";
	newH3.className += "shoppingCartPrice";
	newH3.innerText += ("$" + (parseInt(price)*parseInt(quantity)) + ".00");
	document.getElementById(parentId).appendChild(newH3);
}

function addDropDownMenu(currentSelection, parentId) {
	//add label for menu
	var newLabel = document.createElement("label");
	newLabel.className += "shoppingCartTxt";
	newLabel.id = "productQuantityTitle";
	newLabel.innerText = "Quantity: ";
	document.getElementById(parentId).appendChild(newLabel);

	//add selector drop down menu
	var allOpts = [1,2,3,4];
	var newMenu = document.createElement("select");
	newMenu.id = "productQuantity";
	document.getElementById(parentId).appendChild(newMenu);

	for (var i = 0; i < allOpts.length; i++) {
	    var option = document.createElement("option");
	    option.value = allOpts[i];
	    option.text = allOpts[i];
	    newMenu.appendChild(option);
	}
	//set currently selected item to quantity inputted by customer from product details page
	newMenu.options[currentSelection-1].selected = true;
}

function addProductEditDel(parentId, rowNum, parentRow, itemKey) {
	//new p 
	var newP = document.createElement("p");
	newP.className += "shoppingCartTxt";
	newP.id = "shoppingCartTxtId" + rowNum;
	document.getElementById(parentId).appendChild(newP);

	//new a for edit
	var newAEdit = document.createElement("a");
	newAEdit.className += "editDeleteOptions";
	newAEdit.id = "productEdit";
	newAEdit.innerHTML += "Edit";
	newAEdit.href = "dogHarness.html";
	//new a for delete
	var newADel = document.createElement("a");
	newADel.className += "editDeleteOptions";
	newADel.id = "productDelete";
	newADel.innerHTML += "Delete";
	newADel.href = "#";
	//newADel.onclick = "removeShoppingCartItem(" + parentRow + ")";
	//console.log("onclick: "+ newADel.onclick);
	newADel.addEventListener("click", function () {
		removeShoppingCartItem(parentRow, itemKey)
	});

	document.getElementById(newP.id).appendChild(newAEdit);
	document.getElementById(newP.id).innerHTML += " / ";
	document.getElementById(newP.id).appendChild(newADel);
}

function updateSubtotal(subtotal) {
	document.getElementById("subtotalPrice").innerHTML = "Subtotal: $" + subtotal + ".00";
}

function removeSecondCheckoutButton() {
	var childCount = (document.getElementById("cartMainInfo").childElementCount - 1);
	console.log("count: "+childCount)

	if (childCount < 3) {
		document.getElementById("secCheckoutButton").style.display = "none";
	}
}


	
//show new cart item in shopping cart page
function populateShoppingCartPage() {
	var lsc = window.localStorage.length
	console.log("lsc: "+lsc)
	//check if storage is empty
	for (i = 0; i < lsc; i++) {
		var item = JSON.parse(window.localStorage.getItem(i));
		var itemKey = window.localStorage.key(i);
		if (item === null) {
			break;
		} else {
			//each new div serves as element in flex box
			//new product img item
			addNewDiv("row", "cartRow" + i, "cartMainInfo");
			addProductImg("cartRow" + i);

			//new name and details item
			addNewDiv("item", "cartrtxt" + i, "cartRow" + i);
			addProductHeader(item.name, "cartrtxt" + i);
			addProductDetails(item.color, item.size, "cartrtxt" + i);

			//new price, quantity, and edit/delete item
			addNewDiv("scQnty", "scQntyInfo" + i, "cartRow" + i);
			addProductPrice(item.price, item.quantity, "scQntyInfo" + i);
			addDropDownMenu(item.quantity, "scQntyInfo" + i);
			addProductEditDel("scQntyInfo" + i, i, "cartRow" + i, itemKey);

			//update cartsubtotal number and display
			calcSubtotal(parseInt(item.price)*parseInt(item.quantity), 1);
			updateSubtotal(cartSubtotal);
		}
	}
	removeSecondCheckoutButton();
}


