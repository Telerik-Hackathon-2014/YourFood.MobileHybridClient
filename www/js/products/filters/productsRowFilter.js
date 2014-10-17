app.filter("productsFilter", function(){
    return function(input, columns){
        var filtered = [];
        for(var x = 0; x < input.length; x+= columns){
            filtered.push(input[x]);
        }
        return filtered;
    }
});