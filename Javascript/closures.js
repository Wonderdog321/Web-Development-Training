function outer(){
    var data = "closures are ";
    return function inner(){
        var inneData = "awesome";
        return data + inneData;
    };
}