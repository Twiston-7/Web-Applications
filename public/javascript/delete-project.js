document.addEventListener("DOMContentLoaded", async function() {
    try {
        // Get the project list and populate the select element
        const response = await fetch("projects", {
            signal: AbortSignal.timeout(10000),
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            data.forEach(function(project) {
                const option = `<option value="${project.id}">${project.name}</option>`;
                document.querySelector("#project-select").insertAdjacentHTML("beforeend", option);
            });
        } else {
            throw new Error("Error fetching projects");
        }

        // Handle form submission
        document.getElementById("project-form").addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent the default form submission

            const projectId = document.querySelector("#project-select").value;

            try {
                // Make the DELETE request
                const deleteResponse = await fetch(`projects/${projectId}`, {
                    signal: AbortSignal.timeout(10000),
                    method: "DELETE"
                });

                if (deleteResponse.ok) {
                    alert("Project deleted successfully");
                    window.location.href = "http://localhost:3000/projects.html";
                } else {
                    throw new Error("Error deleting project");
                }
            } catch (error) {
                alert("Error deleting project: " + error);
            }
        });
    } catch (error) {
        console.log("Error fetching projects:", error);
    }
});
