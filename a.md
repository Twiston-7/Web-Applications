```js
    // On submit
    submitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        let isSuccessful = true;

        // Gather form data
        let formData = {
            name: document.getElementById("project-name").value,
            programmerID: programmerId,
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
    })
```