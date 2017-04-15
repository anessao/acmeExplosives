console.log("working js file");
$(document).ready(function(){
	var storeArray = [];

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
		storeArray = categoriesData;
		console.log("first request", storeArray);
		return loadTypesJSON();
	}).then(function(typesData){
		typesData.forEach(function(types){
			storeArray.push(types);
		});
		console.log("second request", storeArray);
		return loadProductsJSON();
	}).then(function(productsData){
		productsData.forEach(function(products){
			storeArray.push(products);
		});
		console.log("final array", storeArray);
	});





















});