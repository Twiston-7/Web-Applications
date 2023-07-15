# How to run
To run the program, navigate to the "node" folder in command prompt, then run npm start.
The website can then be visited at [localhost:3000](http://localhost:3000).
Just clicking the index file after starting the server does not work as it should.

# Class diagram
![img_1.png](markdown-images/img_1.png)

# Database schema
![img.png](markdown-images/database.png)

# Changelog
Stopped loading the navbar with js since this is probably a reason why I didn't get points for semantic html <br>
Remade diagrams in draw.io <br>
Made css more responsive with media queries <br>
Split documentation into 2 files, a technical and functional design document <br>
Added new entities to the database: Programmers (First Name, Age) & Article (TEXT about a project) <br>
Made and added database schema to technical design <br>
No longer using AJAX in front end <br>
Fixed add-project page, project controller & router to work with new db schema <br>
Added global error handling <br>
Added router for new entities <br>
Added SOC for database, so now controllers don't directly access the database but use a helper module <br>
Add controller & database helper for the new entities <br>
Fixed the add-project page, so it works without node serving the page <br>
Added properly working PUT request for project, article and programmer <br>
Made a new page with the Programmer and Article when a project is clicked <br>
Made it so user can make a new programmer and article from the new project page. <br>
Cleaned up code, made all "let" variables that can be "const" variables into "const" variables <br>
Made ' into " wherever possible for consistency. <br>
Added functionality to delete a project from the project specific page. <br>
Allow the user to modify a project from the specification page <br>
Tried to make the modify screen look pretty, but failed <br>
