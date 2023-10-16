//this line is most important cus it starts all the processes after page is loaded:)
document.addEventListener('DOMContentLoaded', function() {
   console.log('loaded');
   const title = document.getElementById('title');
   const login = document.getElementById('login');
   const sign_up_butt = document.getElementById("sign_up");

   login.addEventListener("click", () => {
       console.log("login");
       window.location.href= "/login/";
   })
   sign_up_butt.addEventListener("click", () => {
       window.location.href= "/sign_up/";
   })


});