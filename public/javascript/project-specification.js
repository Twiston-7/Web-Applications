const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");

let articleId;

let programmerAge;
let programmerId;
let projectName;

let projectSkillsElements;
let projectLanguagesElements;

const loadArticle = async () => {
    try {
        const response = await fetch(`http://localhost:3000/projects/article/${projectId}`);
        const data = await response.json();

        if (!data || data.length <= 0) {
            throw new Error("Article doesn't exist or length is 0");
        }

        articleId = data[0].articleID;
        displayArticle(data);
    } catch (error) {
        console.error(error);
    }
};

const displayArticle = (article) => {
    if (!article || article.length <= 0) {
        throw new Error("Article doesn't exist or length is 0");
    }

    document.getElementById("project-article").innerText = article[0].paragraph;
};

const loadProgrammer = async () => {
    try {
        const response = await fetch(`http://localhost:3000/projects/programmer/${projectId}`);
        const data = await response.json();
        displayProgrammer(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};

const displayProgrammer = (programmer) => {
    if (!programmer || programmer.length <= 0) {
        throw new Error("Programmer doesn't exist or length is 0");
    }

    document.getElementById("programmer-name").innerText = programmer[0].name;

    programmerAge = programmer[0].age;
    programmerId = programmer[0].programmerID;
    document.getElementById("programmer-age").innerText = programmer[0].age;
};

const loadProject = async () => {
    try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}`);
        const data = await response.json();
        displayProject(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};

const displayProject = (project) => {
    if (!project || project.length <= 0) {
        throw new Error("Project doesn't exist or length is 0");
    }

    projectName = project[0].name;
    document.getElementById("project-name").innerText = projectName;

    const skills = project[0].skills.split(",");
    const languages = project[0].languages.split(",");

    const skillList = document.getElementById("project-skills-wrapper");
    const languageList = document.getElementById("project-languages-wrapper");

    skillList.innerHTML = "";
    languageList.innerHTML = "";

    skills.forEach((skill) => {
        const skillItem = document.createElement("li");
        skillItem.innerText = skill.trim();
        skillItem.className = "project-skills";
        skillList.appendChild(skillItem);
    });

    languages.forEach((language) => {
        const languageItem = document.createElement("li");
        languageItem.innerText = language.trim();
        languageItem.className = "project-languages";
        languageList.appendChild(languageItem);
    });

    projectSkillsElements = document.getElementsByClassName("project-skills");
    projectLanguagesElements  = document.getElementsByClassName("project-languages");
};

const handleDeleteButtonClick = async (event) => {
    event.preventDefault(); // Prevent the default behavior of the button
    await deleteProject();
};

const handleModifyButtonClick = async (event) => {
    event.preventDefault();

    await modifyProject();
};

const attachEventListeners = () => {
    const deleteButton = document.getElementById("delete-project-button");
    const modifyButton = document.getElementById("modify-project-button");

    deleteButton.addEventListener("click", handleDeleteButtonClick);
    modifyButton.addEventListener("click", handleModifyButtonClick);
};

const initializePage = () => {
    attachEventListeners();
    loadArticle();
    loadProgrammer();
    loadProject()
        .then(r => document.title = "Project " + projectName); // Change title of the page when the project name is known
};

document.addEventListener("DOMContentLoaded", initializePage);

const programmerNameElement = document.getElementById("programmer-name");
const programmerAgeElement = document.getElementById("programmer-age");
const projectNameElement = document.getElementById("project-name");
const articleElement = document.getElementById("project-article");

// Called when modify button is pressed
const modifyProject = () => {
    // Disable delete button
    const deleteButton = document.getElementById("delete-project-button");
    deleteButton.disabled = true;

    let originalProgrammerName = programmerNameElement.textContent;
    let originalProgrammerAge = parseInt(programmerAgeElement.textContent);
    let originalProjectName = projectNameElement.textContent;
    let originalProjectSkills = [];
    let originalProjectLanguages = [];
    let projectSkillsInputs = [];
    let projectLanguagesInputs = [];

    // Get all project skills, make input fields & replace the original field.
    for (const element of projectSkillsElements) {
        originalProjectSkills.push(element.textContent);

        // Create new text field with class name
        const textArea = createTextarea(element.textContent);
        textArea.className ="project-skills";
        projectSkillsInputs.push(textArea);

        // Replace the element with the text area
        element.replaceWith(textArea);
    }

    // Get all project languages, make input fields & replace the original field.
    for (const element of projectLanguagesElements) {
        originalProjectLanguages.push(element.textContent);

        // Create new text field with class name
        const textArea = createTextarea(element.textContent);
        textArea.className ="project-languages";
        projectLanguagesInputs.push(textArea);

        // Replace the element with the text area
        element.replaceWith(textArea);
    }

    let originalArticle = articleElement.textContent;

    const programmerNameInput = createTextarea(originalProgrammerName);
    const programmerAgeInput = createNumberInput(originalProgrammerAge);
    const projectNameInput = createTextarea(originalProjectName);

    // Create input fields for project skills and languages

    const articleTextarea = createTextarea(originalArticle);

    programmerNameElement.replaceWith(programmerNameInput);
    programmerAgeElement.replaceWith(programmerAgeInput);
    projectNameElement.replaceWith(projectNameInput);
    articleElement.replaceWith(articleTextarea);

    const submitButton = createButton("submit", "Submit");
    submitButton.className = "coloredButton";
    submitButton.id = "submitButton"
    document.body.appendChild(submitButton);

    // Undo button functionality (for when modify button turns into undo button)
    const handleUndo = (event) => {
        event.preventDefault();

        const modifiedProgrammerName = programmerNameInput.value;
        const modifiedProgrammerAge = parseInt(programmerAgeInput.value);
        const modifiedProjectName = projectNameInput.value;

        // Parse values for project skills and languages
        let modifiedProjectSkills = [];
        let modifiedProjectLanguages = [];

        // Get all modified project skills
        for (const element of projectSkillsInputs) {
            modifiedProjectSkills.push(element.value);
        }

        // Get all modified project languages
        for (const element of projectLanguagesInputs) {
            modifiedProjectLanguages.push(element.value);
        }

        const modifiedArticle = articleTextarea.value;

        // Checks if the user changed the info in any of the fields.
        const isModified = () => {
            return modifiedProgrammerName !== originalProgrammerName ||
                modifiedProgrammerAge !== originalProgrammerAge ||
                modifiedArticle !== originalArticle ||
                modifiedProjectName !== originalProjectName ||
                modifiedProjectSkills.toString() !== originalProjectSkills.toString() ||
                modifiedProjectLanguages.toString() !== originalProjectLanguages.toString();
        }

        let confirmUndo = true;

        // If the info got modified, ask the user if they are sure they want to undo
        if (isModified()) {
            confirmUndo = confirm("Are you sure you want to undo your changes? This will restore the original data.");
        }

        // Undo changes, return to base page... Why did I not just refresh the page?
        if (confirmUndo) {
            submitButton.remove();

            programmerNameInput.replaceWith(programmerNameElement);
            programmerAgeInput.replaceWith(programmerAgeElement);

            projectNameInput.replaceWith(projectNameElement);

            // Undo project skills, i dont care how bad this code is, it works
            for (let i = 0; i < projectSkillsElements.length; i++) {
                const skillItem = document.createElement("li");
                skillItem.innerText = originalProjectSkills[i].trim();
                skillItem.className = "project-skills";
                projectSkillsElements[i].replaceWith(skillItem);
            }

            // Undo project languages, i dont care how bad this code is, it works
            for (let i = 0; i < projectLanguagesElements.length; i++) {
                const skillItem = document.createElement("li");
                skillItem.innerText = originalProjectLanguages[i].trim();
                skillItem.className = "project-languages";
                projectLanguagesElements[i].replaceWith(skillItem);
            }

            articleTextarea.replaceWith(articleElement);

            programmerNameElement.textContent = originalProgrammerName;
            programmerAgeElement.textContent = originalProgrammerAge.toString();
            articleElement.textContent = originalArticle;

            // Turn undo button back into modify button
            modifyButton.textContent = "Modify";
            modifyButton.removeEventListener("click", handleUndo);
            modifyButton.addEventListener("click", handleModifyButtonClick);

            // Re-enable the delete button
            deleteButton.disabled = false;
        }
    };

    // Functionality for submit button
    const handleSubmit = async (event) => {
        event.preventDefault();

        const modifiedArticle = articleTextarea.value;

        const modifiedProgrammerName = programmerNameInput.value;
        const modifiedProgrammerAge = parseInt(programmerAgeInput.value);

        const modifiedProjectName = projectNameInput.value;
        let modifiedProjectSkills = [];
        let modifiedProjectLanguages = [];

        // Get all modified project skills
        for (const element of projectSkillsInputs) {
            modifiedProjectSkills.push(element.value);
        }

        // Get all modified project languages
        for (const element of projectLanguagesInputs) {
            modifiedProjectLanguages.push(element.value);
        }

        let isSuccessful = true;

        // Submit data for article
        try {
            // Make the request to the server
            const response = await fetch(`http://localhost:3000/article/${articleId}`, {
                signal: AbortSignal.timeout(10000),
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // articleID: articleId,
                    paragraph: modifiedArticle
                })
            });
            if (!response.ok) {
                throw new Error("An error occurred while adding the article: " + await response.text());
            }
        } catch (error) {
            alert(error.message);
            console.error(error);
            isSuccessful = false;
        }
        if (isSuccessful) {console.log("Successfully updated article");}

        // Submit data for programmer
        try {
            const updatedProgrammer = JSON.stringify({
                name: modifiedProgrammerName,
                age: modifiedProgrammerAge
            });

            console.log(JSON.stringify({
                // articleID: articleId,
                updatedProgrammer: updatedProgrammer
            }));

            // Make the request to the server
            const response = await fetch(`http://localhost:3000/programmer/${programmerId}`, {
                signal: AbortSignal.timeout(10000),
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: updatedProgrammer
            });

            if (response.ok) {
                const responseText = await response.text();
                const match = responseText.match(/Programmer with id (\d+) added\./);
                if (match) {
                    console.log("Match!");
                    formData.programmerID = parseInt(match[1]);
                    console.log(formData.programmerID);
                }
            } else {
                throw new Error("An error occurred while adding the project: " + await response.text());
            }
        } catch (error) {
            alert(error.message);
            console.error(error);
            isSuccessful = false;
        }
        if (isSuccessful) {console.log("Successfully updated programmer");}

        // Submit data for project
        try {
            const updatedProject = JSON.stringify({
                name: modifiedProjectName,
                skills: modifiedProjectSkills,
                languages: modifiedProjectLanguages
            });

            console.log(JSON.stringify({
                updatedProject
            }));

            // Make the request to the server
            const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
                signal: AbortSignal.timeout(10000),
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: updatedProject
            });

            if (!response.ok) {
                throw new Error("An error occurred while adding the project: " + await response.text());
            }
        } catch (error) {
            alert(error.message);
            console.error(error);
            isSuccessful = false;
        }
        if (isSuccessful) {console.log("Successfully updated project");}

        if (isSuccessful) {
            alert("Successfully updated info!");
            location.reload();
        }
    };

    // Turn modify button into an undo button
    const modifyButton = document.getElementById("modify-project-button");
    modifyButton.textContent = "Undo";
    modifyButton.removeEventListener("click", handleModifyButtonClick);
    modifyButton.addEventListener("click", handleUndo);

    // Attach submit listener
    submitButton.addEventListener("click", handleSubmit);
};

const createNumberInput = (value) => {
    const input = document.createElement("input");
    input.type = "number";
    input.value = value;
    return input;
};

const createTextarea = (value) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    return textarea;
};

const createButton = (type, text) => {
    const button = document.createElement("button");
    button.type = type;
    button.textContent = text;
    return button;
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
                method: "DELETE",
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
};
