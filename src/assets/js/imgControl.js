
// Create global variable
var imgs = 
[
   new controlImg("pic1.jpg","Enjoy the moment","Contemplate the best video games"),
   new controlImg("pic2.jpg","Classic Pokemon","Remember the best games of Pokemon"),
   new controlImg("pic3.jpg","Ranking Arcade","Visit the nearest arcade to you"),
   new controlImg("pic4.jpg","Wii U","Check the best nintendo games"),
   new controlImg("pic5.jpg","Refresing","Buy new soda products"),
   new controlImg("pic6.jpg","Come back","Play the classic games")
 ];   
 
// Create a constructor function 
function controlImg(image, title, description, alt)
{
    var img = new Image();
        img.src = "assets/img/" + image;
        img.alt = title;

    this.image = img;
    this.title = title;
    this.description = description;
} 

// Create global variable to change content
    var fade = true;
    var index = 0;

// Execute the following code after the webpage has been loaded.
    window.onload = function()
    {
       showImg(index);
    };

// Change the content of the object
    function loadImg(index)
    {
        showImg(index);
    }

// Show the content of the object
    function showImg(index)
    {
        var imageC = document.getElementById("img-banner");
            imageC.src = imgs[index].image.src;
            imageC.alt = imgs[index].image.alt;
            
        document.getElementById("title-banner").innerHTML = imgs[index].title;
        document.getElementById("des-banner").innerHTML = imgs[index].description;


        for (var i = 0; i < imgs.length; i++) {
            document.getElementById("card_"+i).classList.remove('card-select');
        } 

        document.getElementById("card_"+index).classList.add('card-select');

        if(fade === true)
        {
            imageC.style.animationDirection = "normal";
            imageC.style.animationDuration  = "1s";
            imageC.style.animationName = "fade1"; 
            fade = false;
        }
        else
        {
            imageC.style.animationDirection = "normal";
            imageC.style.animationDuration  = "1s";
            imageC.style.animationName = "fade2";
            fade = true;
        }        
    }
