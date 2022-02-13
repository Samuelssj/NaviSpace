document.addEventListener("click", function(e){
    //changeScener(game);
    if(currentScener.click()){
        currentScener.click();
    };
});

document.addEventListener("mousemove", function(e){
    if(currentScener.moveNave){
         currentScener.moveNave(e);
        
    };
});