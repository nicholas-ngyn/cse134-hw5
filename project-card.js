class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                --card-bg: #F5F5F5;
                --card-border: #B8860B;
                --card-shadow: rgba(255, 215, 0, 0.5) 0px 4px 6px;
                --primary-color: #0073e6;
                --link-hover-color: #007bff;
                display: block;
                border: 2px solid var(--card-border);
                border-radius: 20px;
                padding: 16px;
                box-shadow: var(--card-shadow);
                width: 450px;
                height: 500px;
                background: var(--card-bg);
                overflow: hidden;
            }
            :host(:hover) {
                transform: scale(1.05);
            }
            h2 {
                font-size: 1.5em;
                margin: 0 0 10px;
                color: var(--primary-color);
                text-align: center;
                margin-top: 10px;
                font-size: 2em;
            }
            picture img {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 5px;
            }
            p {
                font-size: 1em;
                margin: 10px 0;
                height: 80px;
                overflow: hidden;
                text-overflow: ellipsis;
                color: black;
                margin: 0 10px;
            }
            a {
                display: block;
                text-align: center;
                text-decoration: none;
                color: white;
                background: var(--primary-color);
                font-weight: bold;
                padding: 10px 15px;
                border: 2px solid var(--primary-color);
                border-radius: 5px;
                width: 150px;
                margin: auto;
                transition: background 0.3s, color 0.3s;
            }
            a:hover {
                background: var(--link-hover-color);
            }
            @media (max-width: 480px) {
                :host {
                    width: 100%;
                    height: auto;
                }
                h2 {
                    font-size: 1.5em;
                }
                p {
                    font-size: 1em;
                }
                picture img {
                    height: 250px;
                }
                a {
                    margin: 10px auto;
                }
            }
        `;
        this.shadowRoot.appendChild(style);

        const title = this.getAttribute("title") || "Untitled Project";
        const image = this.getAttribute("image") || "images/placeholder.png";
        const description = this.getAttribute("description") || "No description available.";
        const link = this.getAttribute("link") || "#";

        this.shadowRoot.innerHTML += `
            <h2>${title}</h2>
            <picture>
                <source srcset="${image}" media="(min-width: 100px)" />
                <img src="${image}" alt="${title}">
            </picture>
            <p>${description}</p>
            <a href="${link}" target="_blank">View Here</a>
        `;
    }
}

customElements.define("project-card", ProjectCard);

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cards-container");
    const loadLocalButton = document.getElementById("load-local");
    const loadRemoteButton = document.getElementById("load-remote");

    const renderProjects = (projects) => {
        container.innerHTML = "";
        projects.forEach(project => {
            const card = document.createElement("project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("image", project.image);
            card.setAttribute("description", project.description);
            card.setAttribute("link", project.link);
            container.appendChild(card);
        });
    };

    loadLocalButton.addEventListener("click", () => {
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        if (savedProjects.length > 0) {
            renderProjects(savedProjects);
        } else {
            alert("No local data found!");
        }
    });

    loadRemoteButton.addEventListener("click", () => {
        fetch("https://my-json-server.typicode.com/nicholas-ngyn/cse134-hw5/projects")
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("projects", JSON.stringify(data));
                renderProjects(data);
            })
            .catch(error => {
                console.error("Error fetching remote data:", error);
                alert("Failed to load remote data!");
            });
    });
});