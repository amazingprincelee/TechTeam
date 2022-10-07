var check = function(){
    if(document.getElementById("password").value == document.getElementById("confirm_password").value){
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerHTML = "matched";
        document.getElementById("submit-btn").disabled = false;
        
        
    }else{
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML = "not matched";
        document.getElementById("submit-btn").disabled = true;
         
    };
};


// document.getElementById("submit-btn").disabled = true;