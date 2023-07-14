document.addEventListener("DOMContentLoaded", function() {
    // Add a skill input field
    document.querySelectorAll(".add-skill-button").forEach(function(button) {
        button.addEventListener("click", function() {
            const skillInput = document.createElement("div");
            skillInput.innerHTML = "<input type='text' class='skill-input' name='project-skills' required> <button type='button' class='remove-skill-button'>-</button>";
            skillInput.querySelector(".remove-skill-button").addEventListener("click", function() {
                this.parentElement.remove();
            });
            this.insertAdjacentElement("afterend", skillInput);
        });
    });

    // Remove a skill input field
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-skill-button")) {
            event.target.parentElement.remove();
        }
    });

    // Add a language input field
    document.querySelectorAll(".add-language-button").forEach(function(button) {
        button.addEventListener("click", function() {
            const languageInput = document.createElement("div");
            languageInput.innerHTML = "<input type='text' class='language-input' name='project-language' required> <button type='button' class='remove-language-button'>-</button>";
            languageInput.querySelector(".remove-language-button").addEventListener("click", function() {
                this.parentElement.remove();
            });
            this.insertAdjacentElement("afterend", languageInput);
        });
    });

    // Remove a language input field
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-language-button")) {
            event.target.parentElement.remove();
        }
    });

    // Handle form submission
    document.getElementById("project-form").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission
        let isSuccessful = true;

        // Gather form data
        let formData = {
            name: document.getElementById("project-name").value,
            programmerID: null,
            languages: [],
            skills: []
        };

        try {
            formData.programmerID = document.getElementById("programmer-id").value
        } catch (error) {} // Throws an error if the field isn"t found, which happens when the user inputs a name and age instead of an id.

        if (!formData.programmerID) {
            try {
                const name = document.getElementById("programmer-name").value;
                const age = document.getElementById("programmer-age").value;

                // Make the request to the server
                const response = await fetch("http://localhost:3000/programmer", {
                    signal: AbortSignal.timeout(10000),
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, age })
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
        }

        // Push the value of the initial language input field
        const initialLanguage = document.querySelector("input[name='project-language']").value;
        if (initialLanguage.trim() !== "") {
            formData.languages.push(initialLanguage);
        }

        // Push the values of additional language input fields
        document.querySelectorAll(".language-input").forEach(function(input) {
            const language = input.value.trim();
            if (language !== "") {
                formData.languages.push(language);
            }
        });

        // Push the value of the initial skill input field
        const initialSkill = document.querySelector("input[name='project-skills']").value;
        if (initialSkill.trim() !== "") {
            formData.skills.push(initialSkill);
        }

        // Push the values of additional skill input fields
        document.querySelectorAll(".skill-input").forEach(function(input) {
            const skill = input.value.trim();
            if (skill !== "") {
                formData.skills.push(skill);
            }
        });

        let newProjectID;
        try {
            // Make the request to the server
            const response = await fetch("http://localhost:3000/projects", {
                signal: AbortSignal.timeout(10000),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const responseText = await response.text();
                const match = responseText.match(/Project with id (\d+) added\./);
                if (match) {
                    newProjectID = parseInt(match[1]);
                }
            } else {
                throw new Error("An error occurred while adding the project: " + await response.text());
            }
        } catch (error) {
            alert(error.message);
            console.error(error);
            isSuccessful = false;
        }

        // Create the article
        const articleParagraph = document.getElementById("article").value;
        try {
            // Make the request to the server
            const response = await fetch("http://localhost:3000/article", {
                signal: AbortSignal.timeout(10000),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ programmerID: formData.programmerID, paragraph: articleParagraph, projectID: newProjectID })
            });
            if (!response.ok) {
                throw new Error("An error occurred while adding the article: " + await response.text());
            }
        } catch (error) {
            alert(error.message);
            console.error(error);
            isSuccessful = false;
        }

        if (isSuccessful) {
            alert("Project successfully added!");
            window.location.href = "projects.html"
        }
    });

    // Made into a function mostly, so I can collapse it that way I don"t have to look at it xP
    function programmerButtonManager() {
        // Get the container element
        const programmerContainer = document.getElementById("programmer-container");

        // Create the new fields and button
        const nameField = createInputElement("text", "programmer-name", "Name", true);
        const ageField = createInputElement("number", "programmer-age", "Age", true);
        const changeIdButton = createButton("button", "change-id-button", "smallButton", "Change ID");

        // Get the create programmer button
        let createProgrammerButtonElement = document.getElementById("create-programmer-button");
        createProgrammerButtonElement.addEventListener("click", createProgrammer);

        // Add event listener to the change ID button
        changeIdButton.addEventListener("click", changeId);

        function createInputElement(type, id, placeholder, required) {
            const element = document.createElement("input");
            element.type = type;
            element.id = id;
            element.name = id;
            element.placeholder = placeholder;
            element.required = required;
            return element;
        }

        function createButton(type, id, className, text) {
            const button = document.createElement("button");
            button.type = type;
            button.id = id;
            button.className = className;
            button.innerText = text;
            return button;
        }

        function createProgrammer() {
            // Remove the number input field
            const programmerIdInputBox = document.getElementById("programmer-id");
            const createProgrammerButton = document.getElementById("create-programmer-button");
            programmerContainer.removeChild(programmerIdInputBox);
            programmerContainer.removeChild(createProgrammerButton);

            // Append the new fields and button
            programmerContainer.appendChild(nameField);
            programmerContainer.appendChild(document.createElement("br")); // New line
            programmerContainer.appendChild(ageField);
            programmerContainer.appendChild(changeIdButton);
        }

        function changeId() {
            // Remove the newly created fields
            while (programmerContainer.firstChild) {
                programmerContainer.removeChild(programmerContainer.firstChild);
            }

            const numberInput = createInputElement("number", "programmer-id", "Programmer id", true);
            const createProgrammerButton = createButton("button", "create-programmer-button", "smallButton", "Create new programmer");

            // Append the initial ID box
            programmerContainer.appendChild(numberInput);
            programmerContainer.appendChild(createProgrammerButton);
            createProgrammerButtonElement = createProgrammerButton;
            createProgrammerButtonElement.addEventListener("click", createProgrammer);
        }
    }
    programmerButtonManager();
});