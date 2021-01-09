[![License](https://img.shields.io/badge/License-GNU__v3.0-brightgreen.svg?style=flat-square)](https://www.gnu.org/licenses/gpl-3.0.en.html) 
[![Recommended Release](https://img.shields.io/github/v/release/4Source/OSC.svg?label=Latest%20Release&style=flat-square)](https://github.com/4Source/OSC/releases)
[![Latest Release](https://img.shields.io/github/v/release/4Source/OSC?include_prereleases&sort=semver)](https://github.com/4Source/OSC/releases)
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
- [data-viewSize](#data-viewSize)="3" (optional) 
- [data-loop](#data-loop)="false" (optional)
- [data-alignment](#data-alignment)="left" (optional)
- [data-ratio](#data-ratio)="0:0" (optional)
```  
<div id="YOURSlide" class="carousel-items" data-viewSize="3" data-loop="false">
    
</div>
```  
### 4. Add multible `<div>` with class "item" inside carousel-items
```  	
<div class="item">
	<!--put your stuff inside -->				
</div>
```  
You can use also other html tags with class="item".
```  	
<a href="https://www.google.com" class="item">
	<!--put your stuff inside -->				
</a>
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
			<div id="YOURSlide" class="carousel-items" data-viewSize="3" data-loop="false">
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
## Arguments explained
### data-index
Contains the index of the item currently displayed in the first position.
#### Allowed values
Accepts **positive numbers** including **0**.
#### Default value
If not specified, the value **0** is assigned.

### data-loop
Decides whether the items are in a loop and at the end the first item is displayed again.
#### Allowed values
To get a loop:	1, true, "1", **"true"**, "True", "TRUE" <br>
That it is not a loop:	0, false, "0", **"false"**, "False", "FALSE"
#### Default value
If not specified, the value **"false"** is assigned.

### data-viewSize
How many items can be displayed next to each other.
#### Allowed values
Accepts **positive numbers** and **0** whereby this counts as not set. It is also possible to specify **"auto"**.
#### Default value
If not specified, the value **"auto"** is assigned. This is overwritten during the initialization.
#### Weighting
If the value **0** or **"auto"** is assigned it is **set automatically** depending on [data-ratio](#data-ratio) or the width of the content-box element and the width of the item elements. Height of the element manuell set in style CSS, if not set to height of content-box element.
**Positive numbers** **change the width of the item** depending on the content-box element. Height set by [data-ratio](#data-ratio), with no data-ratio manuell set in style CSS or automatically get height of content-box element.

### data-ratio
Ration of item width to item height.
#### Allowed values
When formatting, the front number indicates the **width**, which is separated by a **":"** from the second number, which stands for the **height**. The numbers are only a ratio, not the true width or height. **Only** accepts **positive numbers**. Also **0** whereby this counts as not set. 
#### Default value
If not specified, the value **"0:0"** is assigned.
#### Weighting
If the ratio **"0:0"** is set then the **ratio is ignored**. If a **ratio is specified** and [**data-viewSize**](#data-viewSize) is set to **auto**, the **width is adapted to the height**. If [**data-viewSize**](#data-viewSize) has a **fixed value**, the **height is adapted to the width**.

### data-alignment
At which position the first index is displayed.
#### Allowed values
To position on the left: **"left"**, "Left", "LEFT", "l", "L" <br>
To position on the right: **"right"**, "Right", "RIGHT", "r", "R"
#### Default value
If not specified, the value **"left"** is assigned.

## License
[![License](https://img.shields.io/badge/License-GNU__v3.0-brightgreen.svg?style=flat-square)](https://www.gnu.org/licenses/gpl-3.0.en.html)
