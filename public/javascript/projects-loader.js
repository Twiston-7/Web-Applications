// js1.js

const loadProjects = async function() {
    try {
        const response = await fetch('http://localhost:3000/projects');
        const data = await response.json();
        printProjects(data);
    } catch (error) {
        console.error(error);
    }
}

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

loadProjects();
