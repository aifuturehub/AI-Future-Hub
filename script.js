

/* ---------------- SIDEBAR ---------------- */
window.openSidebar = () => {
    document.getElementById("sidebar").style.width = "250px";
};

window.closeSidebar = () => {
    document.getElementById("sidebar").style.width = "0";
};



// CONTACT FORM (keep as it is)
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", async function (e) {
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

            if (response.ok) {
                alert("Message Sent Successfully to AI Future Hub!");
                form.reset();
            } else {
                alert("Something went wrong!");
            }

        } catch (error) {
            alert("Network error!");
        }
    });
}




const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.onscroll = function () {

        if (document.documentElement.scrollTop > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

    };

    topBtn.onclick = function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

}




// Counter Animation


const counters = document.querySelectorAll(".counter");


counters.forEach(counter => {


    counter.innerText = "0";


    const updateCounter = () => {


        const target = +counter.getAttribute("data-target");


        const current = +counter.innerText;


        const increment = target / 100;



        if (current < target) {


            counter.innerText =
                Math.ceil(current + increment);


            setTimeout(updateCounter, 20);


        }

        else {


            counter.innerText = target + "+";


        }


    };


    updateCounter();


});






const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {

    // load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.innerHTML = "☀️";
    }

    themeBtn.onclick = function () {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        localStorage.setItem("theme", isDark ? "dark" : "light");
        themeBtn.innerHTML = isDark ? "☀️" : "🌙";
    };
}
// Loading Screen


window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("loader-hide");
    }

});


// Favorite AI Tools


window.favoriteTool = function (button) {


    let card =
        button.parentElement;


    let toolName = card.querySelector("h2").innerText;

    let toolLink = card.querySelector(".tool-btn").href;


    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];



    if (!favorites.some(tool => tool.name === toolName)) {


        favorites.push({
            name: toolName,
            url: toolLink
        });


        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );


        button.innerHTML = "⭐ Saved";


    }


    else {


        button.innerHTML = "❤️ Favorite";


        favorites =
            favorites.filter(item => item !== toolName);


        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );


    }



}

function searchTools() {

    const input = document.getElementById("toolSearch");

    if (!input) return;

    const filter = input.value.toLowerCase();

    const cards = document.querySelectorAll(".tool-card");

    cards.forEach(card => {

        const title = card.querySelector("h2").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();

        if (
            title.includes(filter) ||
            description.includes(filter)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}

const searchInput = document.getElementById("toolSearch");

if (searchInput) {
    searchInput.addEventListener("keyup", searchTools);
}












// Newly added for live news........................

async function loadLiveNews() {
    const container = document.querySelector(".news-container");
    if (!container) return;

    const rssUrls = [
        "https://venturebeat.com/category/ai/feed/",
        "https://www.artificialintelligence-news.com/feed/",
        "https://www.marktechpost.com/feed/",
        "https://techcrunch.com/tag/artificial-intelligence/feed/"
    ];

    try {
        let allNews = [];

        for (let url of rssUrls) {
            const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(url));
            const data = await response.json();

            if (data.items) {
                data.items.forEach(item => {
                    allNews.push(item);
                });
            }
        }

        container.innerHTML = "";

        allNews.slice(0, 12).forEach(item => {
            const card = document.createElement("div");
            card.className = "news-card";

            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description ? item.description.slice(0, 120) + "..." : ""}</p>
                <a href="${item.link}" target="_blank">Read More →</a>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.log("Live news failed, using backup.");
    }
}

loadLiveNews();




async function safeLoadNews() {
    try {
        await loadLiveNews();
    } catch (e) {
        console.log("Fallback mode activated");
    }
}

safeLoadNews();





// News.............................




function createParticles() {
    const container = document.querySelector(".particles");

    for (let i = 0; i < 30; i++) {
        let particle = document.createElement("span");

        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = (5 + Math.random() * 10) + "s";
        particle.style.animationDelay = Math.random() * 5 + "s";

        container.appendChild(particle);
    }
}

createParticles();





const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});