This is a breif explanation of what the project has to offer:
1. Includes a responsive design both for phone and computer.
2. The website includes filters that can be automated to target specific categories.
3. Includes sorting by name, price in ascending and descending order.
4. The categories have dynamic rendering based on filters you apply.
5. Dynamic layout loading
6. User friendly design
 
Challenges:

There were some difficulties with displaying more data and then filtering it. Instead of having separate functions for the load more button and the apply filter one. We have one generalized function that calls all the necessary components.

I wanted to make the process of filtering and sorting the data quick for the user. First I thing I though of was the page reloading. By changing the DOM you get seamless filtration without having to reload the page. 

To load the project it may be necessary to use the following command to run a local server
`npm install -g http-server`
