$(document).ready(function() {
    // Add a skill input field
    $('.add-skill-button').click(function() {
        let skillInput = $('<div><input type="text" class="skill-input" name="project-skills" required> <button type="button" class="remove-skill-button">-</button></div>');
        skillInput.insertAfter($(this));
    });

    // Remove a skill input field
    $(document).on('click', '.remove-skill-button', function() {
        $(this).parent().remove();
    });

    // Add a language input field
    $('.add-language-button').click(function() {
        let languageInput = $('<div><input type="text" class="language-input" name="project-language" required> <button type="button" class="remove-language-button">-</button></div>');
        languageInput.insertAfter($(this));
    });

    // Remove a language input field
    $(document).on('click', '.remove-language-button', function() {
        $(this).parent().remove();
    });

    // Handle form submission
    $('#project-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        let formData = {
            name: $('#project-name').val(),
            languages: [],
            skills: []
        };

        // Push the value of the initial language input field
        let initialLanguage = $('input[name="project-language"]').val();
        if (initialLanguage.trim() !== '') {
            formData.languages.push(initialLanguage);
        }

        // Push the values of additional language input fields
        $('.language-input').each(function() {
            let language = $(this).val().trim();
            if (language !== '') {
                formData.languages.push(language);
            }
        });

        // Push the value of the initial skill input field
        let initialSkill = $('input[name="project-skills"]').val();
        if (initialSkill.trim() !== '') {
            formData.skills.push(initialSkill);
        }

        // Push the values of additional skill input fields
        $('.skill-input').each(function() {
            let skill = $(this).val().trim();
            if (skill !== '') {
                formData.skills.push(skill);
            }
        });

        // Make AJAX request to the server
        $.ajax({
            type: 'POST',
            url: '/projects', // Assuming the router is mounted at '/projects'
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                alert(response);
                window.location.href = 'http://localhost:3000/projects.html';
            },
            error: function(xhr, status, error) {
                alert('An error occurred while adding the project. Please try again.');
                console.error(error);
            }
        });
    });
});
