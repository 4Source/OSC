[![License](https://img.shields.io/badge/License-GNU__v3.0-brightgreen.svg?style=flat-square)](https://www.gnu.org/licenses/gpl-3.0.en.html) 
[![Latest Release](https://img.shields.io/github/v/release/4Source/OSC.svg?label=Latest%20Release&style=flat-square)](https://github.com/4Source/OSC/releases)
# OSC
Open Slide Carousel - Add Your Website an GNU Slideshow 

## How to Use
### 1. Add this Lines inside Header
`<link rel="stylesheet" title="style_OpenSlideCarousel" type="text/css" href="style\style_osc.css">`
<br>`<script src="script/osc.js"></script>`
### 2. Add an `<div>` with class "content-box" inside body
Here you can Set height/width in CSS
```
<div class="content-box">
    
</div>
```
### 3. Add an `<div>` inside content-box
With arguments:
- id="choose somting unique"
- class="carousel-items"
- data-viewSize="3" (number 1 - ?)(optional)
<br>How many items are placed by side. 
- data-loop="false" (true, false)(optional)
<br>Should be continued with the first after the last item.
- data-alignment="left" (left, right)(optional)
<br>Where active item is placed 
```  
<div id="YOURSlide" class="carousel-items" data-viewSize="3" data-loop="false" data-alignment="left">
    
</div>
```  
### 4. Add multible `<div>` with class "item" inside carousel-items
```  	
<div class="item">
	<!--put your stuff inside -->				
</div>
```  
### 5. Add an `<div>` inside content-box
With arguments:
- class="prev nav"
- role="button"
- onclick="onClickHandler(this, -1)
```  
<div class="prev nav" role="button" onclick="onClickHandler(this, -1)">
	&#10094;
</div>
```  
### 6. Add an `<div>` inside content-box
With arguments:
- class="next nav"
- role="button"
- onclick="onClickHandler(this, 1)
```  
<div class="next nav" role="button" onclick="onClickHandler(this, 1)">
	&#10095;
</div>
```  
### 7. Need to initial with this line at the end of body
```
<script>
	init("YOURSlide");			
</script>
```
### Complete Code could look like this
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Open Slide Carousel</title>
		<link rel="stylesheet" title="style_OpenSlideCarousel" type="text/css" href="style\style_osc.css">
		<script src="script/osc.js"></script>
	</head>
	<body>
		<div class="content-box">
			<div id="YOURSlide" class="carousel-items" data-viewSize="3" data-loop="false" data-alignment="left">
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
		<script>
			init("YOURSlide");
		</script>
	</body>
</html>
```
## License
[![License](https://img.shields.io/badge/License-GNU__v3.0-brightgreen.svg?style=flat-square)](https://www.gnu.org/licenses/gpl-3.0.en.html)
