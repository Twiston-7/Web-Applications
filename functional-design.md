# Rest API specification

## Class diagram
![img_1.png](markdown-images/img_1.png)

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

## Specific project
![](markdown-images/img_12.png)
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