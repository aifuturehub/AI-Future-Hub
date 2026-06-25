function openSidebar(){
document.getElementById("sidebar").style.width = "250px";
}

function closeSidebar(){
document.getElementById("sidebar").style.width = "0";
}



document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit", async function(e){
e.preventDefault();

const aiField = document.querySelector('input[name="ai"]:checked');

const data = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
profession: document.getElementById("profession").value,
ai: aiField ? aiField.value : "Not selected",
message: document.getElementById("message").value
};

try {
const response = await fetch("https://script.google.com/macros/s/AKfycbwtVnuiJeSDrgQzfNGrzi48DWzVlxMY0CeTsPC5rbg5iq7S7UzRVSuuO8A9ifLdTda0IQ/exec", {
method: "POST",
body: JSON.stringify(data)
});

if(response.ok){
alert("Successfully joined AI Future Hub!");
form.reset();
}
else{
alert("Something went wrong!");
}

} catch (error) {
alert("Network error!");
}

});

}

});
