# To Do Plan
## Initial steps:
* set-up wireframe for HTML and CSS
  * header
    * logo and navigation
  * body
    * layout image placement and sizes
  * footer
    * logo and created by
* link app.js to wireframe
* update images to fit inside image layout for best quality
* develop app.js for modular functionality
  * easy DOM manipulation
  * event handlers
    * after 25 selections, turn off listener
    * provide a ranked list of percentages for each image
  * develop Objects to contain DOM manip and images
  
## Order of Operations
* Welcome and instructions
* randomly pick 3 images
* click on an image
  * event listener fires the event handler
  * check if total clicks is 25
    * stop letting the user click
    * display number and percentage of clicks
  * track which image was clicked
    * update the object
* randomly pick 3 new images

## Necessary Items
* HTML
* Constructor for the Object with all the image properties
  * {
    * name
    * clicks
    * times shown
    * url
  }
* array of all image Objects
* function to randomly pick an image{
  * Prevent last picked goats from being picked
  * Math.floor ( Math.random() * array.length)
}
