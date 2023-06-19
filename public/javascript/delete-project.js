$(document).ready(function() {
    // Get the project list and populate the select element
    $.ajax({
        url: 'projects', // Replace with the API endpoint to fetch projects
        type: 'GET',
        success: function(response) {
            // Assuming the response is an array of project objects
            response.forEach(function(project) {
                var option = '<option value="' + project.id + '">' + project.name + '</option>';
                $('#project-select').append(option);
            });
        },
        error: function(error) {
            console.log('Error fetching projects:', error);
        }
    });

    // Handle form submission
    $('#project-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        let projectId = $('#project-select').val();

        // Make the DELETE request
        $.ajax({
            url: 'projects/' + projectId, // Replace with the API endpoint to delete a project
            type: 'DELETE',
            success: function(response) {
                // Handle success, such as displaying a success message
                alert('Project deleted successfully');
                window.location.href = 'http://localhost:3000/projects.html';
            },
            error: function(error) {
                // Handle error, such as displaying an error message
                alert('Error deleting project: ' + error);
            }
        });
    });
});
