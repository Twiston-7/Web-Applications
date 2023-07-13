const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

document.getElementById("delete-project-button").addEventListener("submit", async () => {
    console.log("Button pressed")

    try {
        // Make the DELETE request
        let deleteResponse = await fetch(`projects/${projectId}`, {
            method: 'DELETE'
        });

        if (deleteResponse.ok) {
            alert('Project deleted successfully');
            // window.location.href = 'http://localhost:3000/projects.html';
        } else {
            throw new Error(await deleteResponse.text());
        }
    } catch (error) {
        alert('Error deleting project: ' + error);
    }
});

const loadArticle = async () => {
    try {
        const response = await fetch(`http://localhost:3000/projects/article/${projectId}`);
        const data = await response.json();
        displayArticle(data);
    } catch (error) {
        console.error(error);
    }
}

const displayArticle = (article) => {
    if (!article || article.length <= 0) {
        throw new Error("Article doesnt exist or length is 0");
    }

    document.getElementById("project-article").innerText = article[0].paragraph;
}

const loadProgrammer = async () => {
    try {
        const response = await fetch(`http://localhost:3000/projects/programmer/${projectId}`);
        const data = await response.json();
        displayProgrammer(data);
    } catch (error) {
        console.error(error);
    }
}

const displayProgrammer = (programmer) => {
    if (!programmer || programmer.length <= 0) {
        throw new Error("Programmer doesnt exist or length is 0");
    }

    document.getElementById("programmer-name").append(programmer[0].name);
    document.getElementById("programmer-age").append(programmer[0].age);
}

loadArticle();
loadProgrammer();