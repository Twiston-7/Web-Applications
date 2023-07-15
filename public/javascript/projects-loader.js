// Function to load projects from the server
const loadProjects = async function() {
    let data;
    try {
        const response = await fetch("http://localhost:3000/projects", {
                signal: AbortSignal.timeout(10000),
                method: "GET"
            }); // Make a GET request to retrieve projects
        data = await response.json(); // Parse the response data as JSON
    } catch (error) {
        console.error(error); // Log any errors that occur
    }

    printProjects(data); // Call the printProjects function to display the projects
}

// Function to print projects in the table
function printProjects(projects) {
    const projectTableBody = document.getElementById("tbody-projects");
    projectTableBody.innerHTML = ""; // Clear the table body before adding new rows

    for (const project of projects) {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        const tdLanguages = document.createElement("td");
        const tdSkills = document.createElement("td");
        const projectLink = document.createElement("a");
        projectLink.href = `project-specification.html?id=${project.projectID}`;
        projectLink.innerText = project.name;

        tdName.append(projectLink);
        tdLanguages.innerText = project.languages;
        tdSkills.innerText = project.skills;

        tr.append(tdName, tdLanguages, tdSkills);
        projectTableBody.append(tr);

        // Add an empty line
        const emptyTr = document.createElement("tr");
        const emptyTd = document.createElement("td");
        emptyTd.colSpan = 3; // Set the colspan to match the number of columns
        emptyTr.append(emptyTd);
        projectTableBody.append(emptyTr);

        tr.classList.add("blank-row");

        // Add event listener to redirect to project specification page
        tr.addEventListener("click", () => {
            const projectId = project.id; // Assuming the project ID is available in the project object
            window.location.href = `project-specification.html?id=${projectId}`;
        });
    }
}

loadProjects(); // Call the loadProjects function to load and display projects
