# Rest api specification
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

# Wireframes
## Index/Main page
![](markdown-images/index.png)
The index page, the javascript effect ended up being a typing effect.
Top right is for navigation, and the logo takes the user back to this main page.
The article explains a bit about myself.
<br><br>

## About
![](markdown-images/about.png)
This is a simple about me page, the top part is the same navigation as the main page.
The about me part is only text.
<br><br>

## Contact
![](markdown-images/contact.png)
This is a simple contact page, where the user can find places to contact me.
These places for contact are hyperlinks that can be clicked taking the user
directly to my profile.
<br><br>

## Projects
![](markdown-images/projects.png)
This page has a list of all projects present in the database, loaded using javascript.
The user can click on a button to add or remove a project, these buttons take
the user to a different page where these actions can be performed
<br><br>

## Add project
![](markdown-images/add-project.png)
This page allows the user to input data for a new project. The + buttons next to
both the language and skill input is there to add an extra input field, to allow
for more skills to be added. When one of these boxes is clicked and an extra field is there
a - button is created, when this - button is pressed, the extra field will disappear.
When the user presses the add project button, the project gets added if the input is valid,
finally the user is forwarded to the projects page.
<br><br>

## Remove project
![](markdown-images/remove-project.png)
This page allows the user to delete a project. The dropdown menu is filled
with the names of all projects present. When the user presses on delete,
the selected project will be deleted from the database
and then the user is forwarded to the projects page.

# Use case diagrams
### Index/Main page
![img.png](markdown-images/img.png)

### About page
![img_2.png](markdown-images/img_2.png)
### Contact page
![img_3.png](markdown-images/img_3.png)
### Projects & project-details page
![img_4.png](markdown-images/img_4.png)
### Add project page
![img_5.png](markdown-images/img_5.png)

# Sequence diagrams
The basic function of the system:

![img_7.png](markdown-images/img_7.png)

Project page:
![img_10.png](markdown-images/img_10.png)

Adding a project:
![img_8.png](markdown-images/img_8.png)

Removing a project:
![img_9.png](markdown-images/img_9.png)

Projects specification page:
![img_11.png](markdown-images/img_11.png)