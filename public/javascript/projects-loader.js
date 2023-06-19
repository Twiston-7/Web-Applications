const projectTableBody = document.getElementById('tbody-projects');

const loadProjects = async function(){
    try {
        debugger;
        const response = await fetch('http://localhost:3000/projects');
        const data = await response.json();
        printProjects(data);
    } catch (error) {
        console.error(error);
    }
}

function printProjects(projects){
    for (const project of projects) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdLanguage = document.createElement('td');
        const tdSkills = document.createElement('td');
        tdName.innerText = project.name;
        tdLanguage.innerText = project.language;

        // Add a space after each comma in the skills
        const skillsWithSpaces = project.skills.split(',').map(skill => skill.trim()).join(', ');

        tdSkills.innerText = skillsWithSpaces;
        tr.append(tdName, tdLanguage, tdSkills);
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