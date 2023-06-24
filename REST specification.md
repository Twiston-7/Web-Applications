**Endpoint: GET /projects**
- Description: Retrieves all projects with their associated languages and skills.
- Request:
  - Method: GET
  - Endpoint: /projects
- Response:
  - Status Code: 200 (OK)
  - Body:
    - Format: JSON
    - Example:
      ```json
      [
        {
          "id": 1,
          "name": "Project 1",
          "languages": "JavaScript, Python",
          "skills": "Web Development, Database Management"
        },
        {
          "id": 2,
          "name": "Project 2",
          "languages": "Java",
          "skills": "Mobile App Development"
        }
      ]
      ```

**Endpoint: POST /projects**
- Description: Adds a new project with its associated languages and skills.
- Request:
  - Method: POST
  - Endpoint: /projects
  - Body:
    - Format: JSON
    - Example:
      ```json
      {
        "name": "New Project",
        "languages": ["JavaScript", "Python"],
        "skills": ["Web Development", "Database Management"]
      }
      ```
- Response:
  - Status Code: 201 (Created)
  - Body:
    - Format: Plain text
    - Example: "Project with name New Project added."
- Error Responses:
  - Status Code: 400 (Bad Request)
    - Body: "Empty request body. Please provide project details."
    - Body: "Empty project name. Please provide project name."
    - Body: "Empty languages. Please provide at least one language."
    - Body: "Empty skills. Please provide at least one skill."
  - Status Code: 500 (Internal Server Error)
    - Body: "An error occurred while updating the project: {error_message}"

**Endpoint: DELETE /projects/{id}**
- Description: Deletes a project with the specified ID.
- Request:
  - Method: DELETE
  - Endpoint: /projects/{id}
    - Replace `{id}` with the ID of the project to delete.
- Response:
  - Status Code: 200 (OK)
  - Body:
    - Format: Plain text
    - Example: "Project with ID 1 deleted."
- Error Responses:
  - Status Code: 404 (Not Found)
    - Body: "Project with ID {id} not found."
  - Status Code: 500 (Internal Server Error)
    - Body: "An error occurred while updating the project: {error_message}"

**Endpoint: PUT /projects/{id}**
- Description: Updates an existing project with the specified ID, including its associated languages and skills.
- Request:
  - Method: PUT
  - Endpoint: /projects/{id}
    - Replace `{id}` with the ID of the project to update.
  - Body:
    - Format: JSON
    - Example:
      ```json
      {
        "name": "Updated Project",
        "languages": ["Java", "Python"],
        "skills": ["Web Development", "Mobile App Development"]
      }
      ```
- Response:
  - Status Code: 200 (OK)
  - Body:
    - Format: Plain text
    - Example: "Project with ID 1 updated."
- Error Responses:
  - Status Code: 400 (Bad Request)
    - Body: "Empty request body. Please provide project details."
  - Status Code: 404 (Not Found)
    - Body: "Project with ID {id} not found."
    - Status Code: 500 (Internal Server Error)
    - Body: "An error occurred while updating the project: {error_message}"