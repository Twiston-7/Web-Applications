# Class diagram

```
+------------------------+       +-----------------------+       +-------------------------+
|        server.js       |       |    project-router.js   |       |   project-controller.js |
+------------------------+       +-----------------------+       +-------------------------+
|                        |       |                       |       |                         |
|   - Serve files        |       |   - Route endpoints   |       |   - Handle API requests |
|   - Handle requests   -------->   - Redirect to         -------->   - Perform actions     |
|                          |       |     controller        |       |                         |
+------------------------+       +-----------------------+       +-------------------------+
```

# Use case diagrams
### Index/Main page
                    +-------------------------+
                    |         User            |
                    +-------------------------+
                               |
                       +-------|-------+
                       |       |       |
    +---------------+  |       |       |  +---------------+
    |   Navigate    |  |       |       |  |   View        |
    |   to About    |  |       |       |  |   Projects   |
    |   page        |  |       |       |  |               |
    +---------------+  |       |       |  +---------------+
                       |       |       |
              +--------|-------|-------|--------+
              |        |       |       |        |
    +------------------+     +-|-+     |------------------+
    |        View          |     |     |      View         |
    |      About page      |     |     |    Contact page   |
    |                      |     |     |                   |
    +----------------------+     +     +-------------------+

### About page
                    +-------------------------+
                    |         User            |
                    +-------------------------+
                                |
                                | 
                                |
                       +--------------------+
                       |        View        |
                       |     About page     |
                       |                    |
                       +--------------------+ 
### Contact page
                    +-------------------------+
                    |         User            |
                    +-------------------------+
                                |
                                | 
                                |
                       +--------------------+
                       |        View        |
                       |     Contact page   |
                       |                    |
                       +--------------------+ 
### Projects page
                    +-------------------------+
                    |         User            |
                    +-------------------------+
                                |
                                | 
                                |
                       +--------------------+
                       |        View        |
                       |   Projects page    |
                       |                    |
                       +--------------------+ 

### Add project page
                +-------------------------+
                |         User            |
                +-------------------------+
                            |
                            | 
                            |
                   +--------------------+     +---------------------+
                   |        View        |     |         Adds        |
                   |   Projects page    | --- |     New project     |
                   |                    |     |                     |
                   +--------------------+     +---------------------+
### Remove project page
                +-------------------------+
                |         User            |
                +-------------------------+
                            |
                            | 
                            |
                   +--------------------+     +---------------------+
                   |        View        |     |       Removes       |
                   |   Projects page    | --- |  Existing project   |
                   |                    |     |                     |
                   +--------------------+     +---------------------+

# Sequence diagram
Actor: User <br>
Boundary: System <br>
<br>
User -> System: Requests index/main page <br>
System -> System: Fetches index/main page <br>
System -> User: Returns index/main page <br>
<br>
User -> System: Requests about page <br>
System -> System: Fetches about page <br>
System -> User: Returns about page <br>
<br>
User -> System: Requests contact page <br>
System -> System: Fetches contact page <br>
System -> User: Returns contact page <br>
<br>
User -> System: Requests projects page <br>
System -> System: Fetches projects page <br>
System -> User: Returns projects page <br>
<br>
User -> System: Requests add project page <br>
System -> System: Fetches add project page <br>
System -> User: Returns add project page <br>
<br>
User -> System: Submits project data <br>
System -> System: Validates project data <br>
System -> System: Adds project to database <br>
System -> User: Redirects to projects page <br>
<br>
User -> System: Requests remove project page <br>
System -> System: Fetches remove project page <br>
System -> User: Returns remove project page <br>
<br>
User -> System: Selects project to remove <br>
System -> System: Deletes selected project from database <br>
System -> User: Redirects to projects page <br>
