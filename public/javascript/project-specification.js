const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");

let programmerAge;
let programmerId;

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
        return data;
    } catch (error) {
        console.error(error);
    }
}

const displayProgrammer = (programmer) => {
    if (!programmer || programmer.length <= 0) {
        throw new Error("Programmer doesnt exist or length is 0");
    }

    document.getElementById("programmer-name").append(programmer[0].name);

    programmerAge = programmer[0].age;
    programmerId = programmer[0].programmerID;
    document.getElementById("programmer-age").append(programmer[0].age);
}

loadArticle();
loadProgrammer();

document.addEventListener("DOMContentLoaded", function() {
    document.title = "Project " + projectId; // Change title of the page

    let modifyButton = document.getElementById("modify-project-button");
    const deleteButton = document.getElementById("delete-project-button");

    deleteButton.addEventListener("click", async function (button) {
        button.preventDefault(); // Prevent the default behavior of the button
        await deleteProject();
    })

    modifyButton.addEventListener("click", async function (button) {
        button.preventDefault();

        // Remove event listeners
        const parent = modifyButton.parentNode;
        const newButton = modifyButton.cloneNode(true);
        parent.replaceChild(newButton, modifyButton);
        modifyButton = newButton;
        await modifyProject();
    })
});

let originalProgrammerName;
let originalProgrammerAge;
let originalArticle;

const modifyProject = async () => {
    const programmerNameElement = document.getElementById("programmer-name");
    const programmerAgeElement = document.getElementById("programmer-age");
    const articleElement = document.getElementById("project-article");

    // Store the original values
    originalProgrammerName = programmerNameElement.textContent;
    originalProgrammerAge = programmerAgeElement.textContent;
    originalArticle = articleElement.textContent;

    // Replace the programmer name field with a text input field
    const programmerNameInput = document.createElement("input");
    programmerNameInput.type = "text";
    programmerNameInput.value = originalProgrammerName;
    programmerNameElement.replaceWith(programmerNameInput);

    // Replace the programmer age field with a number input field
    const programmerAgeInput = document.createElement("input");
    programmerAgeInput.type = "number";
    programmerAgeInput.value = programmerAge;
    programmerAgeElement.replaceWith(programmerAgeInput);

    // Replace the article paragraph with a text area
    const articleTextarea = document.createElement("textarea");
    articleTextarea.value = originalArticle;
    articleElement.replaceWith(articleTextarea);

    let modifyButton = document.getElementById("modify-project-button");
    const deleteButton = document.getElementById("delete-project-button");

    // Disable modify and delete buttons
    deleteButton.disabled = true;

    // Create a submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";

    // Append submit button to the end of the page
    document.body.appendChild(submitButton);



    // Allow the user to undo clicking the modify button and return to the base page.
    modifyButton.addEventListener("click", async (event) => {
        event.preventDefault();

        // Remove event listeners
        const parent = modifyButton.parentNode;
        const newButton = modifyButton.cloneNode(true);
        parent.replaceChild(newButton, modifyButton);
        modifyButton = newButton;

        // Get the modified values from the input fields
        const modifiedProgrammerName = programmerNameInput.value;
        const modifiedProgrammerAge = parseInt(programmerAgeInput.value);
        const modifiedArticle = articleTextarea.value;

        // Revert the modifications back to their original form
        programmerNameInput.replaceWith(programmerNameElement);
        programmerAgeInput.replaceWith(programmerAgeElement);
        articleTextarea.replaceWith(articleElement);
        submitButton.remove();

        // Re-enable modify and delete buttons
        deleteButton.disabled = false;

        // Check if changes were made
        if (
            modifiedProgrammerName !== originalProgrammerName ||
            modifiedProgrammerAge !== originalProgrammerAge ||
            modifiedArticle !== originalArticle
        ) {
            const confirmUndo = confirm(
                "Are you sure you want to undo your changes? This will restore the original data."
            );
            if (confirmUndo) {
                // Restore the original values
                programmerNameElement.textContent = originalProgrammerName;
                programmerAgeElement.textContent = originalProgrammerAge;
                articleElement.textContent = originalArticle;
            }
        }

        modifyButton.addEventListener("click", async function (button) {
            // Remove event listeners
            const parent = modifyButton.parentNode;
            const newButton = modifyButton.cloneNode(true);
            parent.replaceChild(newButton, modifyButton);
            modifyButton = newButton;

            button.preventDefault();
            await modifyProject();
        })
    });
};


const deleteProject = async () => {
    // Display a confirmation dialog
    const confirmation = confirm(`Are you sure you want to delete this project with id ${projectId}?`);

    if (confirmation) {
        // User confirmed, perform the deletion
        try {
            // Make the DELETE request
            const deleteResponse = await fetch(`http://localhost:3000/projects/${projectId}`, {
                signal: AbortSignal.timeout(10000),
                method: "DELETE"
            });

            if (deleteResponse.ok) {
                alert("Project deleted successfully");
                window.location.href = "projects.html";
            } else {
                throw new Error(await deleteResponse.text());
            }
        } catch (error) {
            alert("Error deleting project: " + error);
        }
    } else {
        // User canceled, do nothing
        console.log("Deletion canceled.");
    }
}