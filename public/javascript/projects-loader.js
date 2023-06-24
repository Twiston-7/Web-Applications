// Function to load projects from the server
const loadProjects = async function() {
    try {
        const response = await fetch('http://localhost:3000/projects'); // Make a GET request to retrieve projects
        const data = await response.json(); // Parse the response data as JSON
        printProjects(data); // Call the printProjects function to display the projects
    } catch (error) {
        console.error(error); // Log any errors that occur
    }
}

// Function to print projects in the table
function printProjects(projects) {
    const projectTableBody = document.getElementById('tbody-projects');
    projectTableBody.innerHTML = ''; // Clear the table body before adding new rows

    for (const project of projects) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdLanguages = document.createElement('td');
        const tdSkills = document.createElement('td');
        tdName.innerText = project.name;

        // Add a space after each comma in the languages
        tdLanguages.innerText = project.languages.split(',').map(project => project.trim()).join(', ');

        // Add a space after each comma in the skills
        tdSkills.innerText = project.skills.split(',').map(skill => skill.trim()).join(', ');

        tr.append(tdName, tdLanguages, tdSkills);
        projectTableBody.append(tr);

        // Add an empty line
        const emptyTr = document.createElement('tr');
        const emptyTd = document.createElement('td');
        emptyTd.colSpan = 3; // Set the colspan to match the number of columns
        emptyTr.append(emptyTd);
        projectTableBody.append(emptyTr);

        tr.classList.add('blank-row');
    }
}

loadProjects(); // Call the loadProjects function to load and display projects
