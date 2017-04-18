//**********************
//EVENT LISTENER TO FIRE OFF IMPORT AND PRINT FUNCTIONS
//**********************
$(".dropdown-menu").click(function(e){
	$("#products").html(""); // RESET PRODUCTS DIV
	var storeArray = [];

//************************************************
//VARIABLES FOR LOGIC
//************************************************
var clickTarget =  e.target.id; //Listens for the id of what's chosen by user
var chosenCategoryId = "";
var chosenCategoryName = "";
var typeArray = [];
var productsArray = [];
var chosenProductsArray = [];

//WRITE TO DOM FUNCTIONALITY
function writeToDOM(){
	for (var x = 0; x < chosenProductsArray.length; x++){
		$("#products").append(`<div class="productCard col-md-4">
											<h3>${chosenProductsArray[x].name}</h3>
											<p>${chosenProductsArray[x].description}</p>
											<p id="category">Category: ${chosenCategoryName}</p>
											<p class="type">${chosenProductsArray[x].type}</p>
											</div>`);
		}
	
}

//SPLIT OBJECTS INTO RESPECTIVE ARRAYS FOR WRITING TO DOM
function seperateItems(fullArray){
	for (var a = 0; a < fullArray.length; a++) {
		if (fullArray[a].value === "categories" && fullArray[a].name === clickTarget) {
			chosenCategoryId = fullArray[a].id;
			chosenCategoryName = fullArray[a].name;
		}
		if (fullArray[a].value === "types" && chosenCategoryId === fullArray[a].category){
			typeArray.push(fullArray[a]);
		}
		if (fullArray[a].value === "products"){
			productsArray.push(fullArray[a]);
		}
	}
	for (var b = 0; b < productsArray.length; b++){
		for(var c = 0; c < typeArray.length; c++){
			if (productsArray[b].type === typeArray[c].id) {
				productsArray[b].type = typeArray[c].name;
				chosenProductsArray.push(productsArray[b]);
			}
		}
	}
	writeToDOM();
}

//LOADING JSON FILES - PROMISE STRUCTURE	
	var loadCategoriesJSON = function(){
		return new Promise(function(resolve, reject){
			$.ajax("./db/categories.json").done(function(data1){
				resolve(data1.categories);
			}).fail(function(error1){
				reject(error1);
			});
		});
	};
	var loadTypesJSON = function(){
		return new Promise(function(resolve, reject){
			$.ajax("./db/types.json").done(function(data2){
				resolve(data2.types);
			}).fail(function(error2){
				reject(error2);
			});
		});
	};
	var loadProductsJSON = function(){
		return new Promise(function(resolve, reject){
			$.ajax("./db/products.json").done(function(data3){
				resolve(data3.products);
			}).fail(function(error3){
				reject(error3);
			});
		});
	};

	loadCategoriesJSON().then(function(categoriesData){
		categoriesData.forEach(function(data){
		storeArray.push(data);
		data.value = "categories";
		});
		return loadTypesJSON();
	}).then(function(typesData){
		typesData.forEach(function(types){
			storeArray.push(types);
			types.value = "types";
		});
		return loadProductsJSON();
	}).then(function(productsData){

		productsData.forEach(function(products){
			for (var key in products) {
				if(products.hasOwnProperty(key)) {
					storeArray.push(products[key]);
					products[key].value = "products";
				}
			}
		});
		seperateItems(storeArray);

	});





















});