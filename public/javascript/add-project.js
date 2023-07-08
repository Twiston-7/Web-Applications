document.addEventListener('DOMContentLoaded', function() {
    // Add a skill input field
    document.querySelectorAll('.add-skill-button').forEach(function(button) {
        button.addEventListener('click', function() {
            let skillInput = document.createElement('div');
            skillInput.innerHTML = '<input type="text" class="skill-input" name="project-skills" required> <button type="button" class="remove-skill-button">-</button>';
            skillInput.querySelector('.remove-skill-button').addEventListener('click', function() {
                this.parentElement.remove();
            });
            this.insertAdjacentElement('afterend', skillInput);
        });
    });

    // Remove a skill input field
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-skill-button')) {
            event.target.parentElement.remove();
        }
    });

    // Add a language input field
    document.querySelectorAll('.add-language-button').forEach(function(button) {
        button.addEventListener('click', function() {
            let languageInput = document.createElement('div');
            languageInput.innerHTML = '<input type="text" class="language-input" name="project-language" required> <button type="button" class="remove-language-button">-</button>';
            languageInput.querySelector('.remove-language-button').addEventListener('click', function() {
                this.parentElement.remove();
            });
            this.insertAdjacentElement('afterend', languageInput);
        });
    });

    // Remove a language input field
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-language-button')) {
            event.target.parentElement.remove();
        }
    });

    // Handle form submission
    document.getElementById('project-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        let formData = {
            name: document.getElementById('project-name').value,
            programmerID: document.getElementById('programmer-id').value,
            languages: [],
            skills: []
        };

        // Push the value of the initial language input field
        let initialLanguage = document.querySelector('input[name="project-language"]').value;
        if (initialLanguage.trim() !== '') {
            formData.languages.push(initialLanguage);
        }

        // Push the values of additional language input fields
        document.querySelectorAll('.language-input').forEach(function(input) {
            let language = input.value.trim();
            if (language !== '') {
                formData.languages.push(language);
            }
        });

        // Push the value of the initial skill input field
        let initialSkill = document.querySelector('input[name="project-skills"]').value;
        if (initialSkill.trim() !== '') {
            formData.skills.push(initialSkill);
        }

        // Push the values of additional skill input fields
        document.querySelectorAll('.skill-input').forEach(function(input) {
            let skill = input.value.trim();
            if (skill !== '') {
                formData.skills.push(skill);
            }
        });

        try {
            // Make the request to the server
            let response = await fetch('/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                let responseText = await response.text();
                alert(responseText);
                window.location.href = 'http://localhost:3000/projects.html';
            } else {
                throw new Error('An error occurred while adding the project: ' + await response.text());
            }
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    });
});
