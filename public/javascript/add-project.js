$(document).ready(function() {
    // Add a skill input field
    $('.add-skill-button').click(function() {
        var skillInput = $('<div><input type="text" class="skill-input" name="project-skills" required> <button type="button" class="remove-skill-button">-</button></div>');
        skillInput.insertAfter($(this));
    });

    // Remove a skill input field
    $(document).on('click', '.remove-skill-button', function() {
        $(this).parent().remove();
    });

    // Handle form submission
    $('#project-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        var formData = {
            name: $('#project-name').val(),
            language: $('#project-language').val(),
            skills: []
        };

        $('.skill-input').each(function() {
            formData.skills.push($(this).val());
        });

        // Make AJAX request to the server
        $.ajax({
            type: 'POST',
            url: '/projects', // Assuming the router is mounted at '/projects'
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                alert(response);
                // Optionally, you can redirect to another page or perform any other action
            },
            error: function(xhr, status, error) {
                alert('An error occurred while adding the project.');
                console.error(error);
            }
        });
    });
});
