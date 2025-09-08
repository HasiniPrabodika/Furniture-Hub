window.location.href = "../../Customer/HTML/HomePage.html";
window.location.href = "../../Customer/HTML/ProductPage.html";
window.location.href = "../../Customer/HTML/Review.html";
window.location.href = "../../Customer/HTML/ContactPage.html";
window.location.href = "../../Customer/HTML/About.html";


var lblUsername=document.getElementById("lbluser");
var lblpassword=document.getElementById("lblpass");
var txtUsername=document.getElementById("username");
var txtpassword=document.getElementById("password");

lblUsername.addEventListener("click",function(){
    lblUsername.classList.add("small");
})

lblpassword.addEventListener("click",function(){
    lblpassword.classList.add("small");
})
txtUsername.addEventListener("click",function(){
    lblUsername.classList.add("small");
})

txtpassword.addEventListener("click",function(){
    lblpassword.classList.add("small");
})

txtUsername.addEventListener("blur",function(){
    if (txtUsername.value =='' ){
        lblUsername.classList.remove("small");
    }

});
  

txtpassword.addEventListener("blur",function(){
    if (txtpassword.value =='' ){
        lblpassword.classList.remove("small");
    }
   
});


