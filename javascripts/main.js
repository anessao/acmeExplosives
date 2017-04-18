var categoryTypeName = [];
$(".dropdown-menu").click(function(e){
	$("#products").html("");
	var storeArray = [];
	var clickTarget =  e.target.id;
	
	function writeToDOM(){
		var categoryId = "";
		var categoryName = "";
		var categoryTypeId = [];
		
		var idCounter = 0;
		
		
			for (let x = 0; x < storeArray.length; x++){
				if (storeArray[x].value === "categories" && storeArray[x].name === clickTarget){
					categoryId = storeArray[x].id;
					categoryName = storeArray[x].name;
				}
				if (storeArray[x].value === "types" && categoryId === storeArray[x].category) {
					var typeId = storeArray[x].id;
					categoryTypeId.push(typeId);
					categoryTypeName.push(storeArray[x].name);
					console.log(categoryTypeName);
				}
			}
			for (let y = 0; y < storeArray.length; y++) {
				var newType = categoryTypeName[storeArray[y].type];
				if (storeArray[y].value === "products" && storeArray[y].type === categoryTypeId[idCounter]) {
					if (y % 3 === 1) {
						idCounter++;
					}
					
					$("#products").append(`<div class="productCard col-md-4">
											<h3>${storeArray[y].name}</h3>
											<p>${storeArray[y].description}</p>
											<p id="category">Category: ${categoryName}</p>
											<p class="type">${newType}</p>
											</div>`);
				}
			}		
	}
	
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
		writeToDOM();

	});





















});