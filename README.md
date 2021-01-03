# OSC
Open Slide Carousel - Add Your Website an GNU Slideshow 

## How to Use
1. Add an <div> with class "content-box" inside body
   Here you can Set height/width in CSS
   
   <div class="content-box">
    
   </div>
   
1. Add an <div> inside content-box
  With arguments:
 - id="choose somting unique"
 - class="carousel-items"
 - data-viewSize="3" (number 1 - ?)(optional)
   How many items are placed by side. 
 - data-loop="loop" (true, false)(optional)
   Should be continued with the first after the last item.
  
  <div id="YOURSlide" class="carousel-items" data-viewSize="3" data-loop="false">
    
  </div>
  
1. Add an <div> with class "item" inside carousel-items
  
  <div class="item">
	    <!--put your stuff inside -->					
	</div>
  
1. Add an <div> inside content-box
  With arguments:
 - class="prev nav"
 - role="button"
 - onclick="onClickHandler(this, -1)
  
  <div class="prev nav" role="button" onclick="onClickHandler(this, -1)">
      &#10094;
  </div>
  
1. Add an <div> inside content-box
  With arguments:
 - class="next nav"
 - role="button"
 - onclick="onClickHandler(this, 1)
  
  <div class="next nav" role="button" onclick="onClickHandler(this, 1)">
      &#10095;
  </div>
  
### Complete could look like this
<div class="content-box">
		<div id="slide_StoE" class="carousel-items" data-viewSize="3" data-loop="false">
				<div class="item">
					<p>0</p>
					<!--put your stuff inside -->					
				</div>
				<div class="item">
					<p>1</p>
					<!--put your stuff inside -->
				</div>
        <!--...-->
		</div>
		<div class="prev nav" role="button" onclick="onClickHandler(this, -1)">&#10094;</div>
		<div class="next nav" role="button" onclick="onClickHandler(this, 1)">&#10095;</div>
</div>
  
