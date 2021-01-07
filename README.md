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
- [data-viewSize](#data-viewSize)="3" (optional) 
- [data-loop](#data-loop)="false" (optional)
- [data-alignment](#data-alignment)="left" (optional)
- [data-ratio](#data-ratio)="0:0" (optional)
```  
<div id="YOURSlide" class="carousel-items" [data-viewSize](#data-viewSize)="3" [data-loop](#data-loop)="false" [data-alignment](#data-alignment)="left">
    
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
			<div id="YOURSlide" class="carousel-items" [data-viewSize](#data-viewSize)="3" [data-loop](#data-loop)="false" [data-alignment](#data-alignment)="left">
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

#### Allowed values

#### Default value
value: 0

### data-viewSize
How many items are placed by side.
#### Allowed values
type: number
0 -> Sets value depending on the size / item width
1 - ? -> Sets item width depending on the size / value.
#### Default value
value: 0
#### Weighting

### data-loop
Should be continued with the first after the last item.
#### Allowed values

#### Default value

#### Weighting

### data-alignment
Where active item is placed
#### Allowed values

#### Default value

#### Weighting

### data-ratio
Ration of item width to item height.
#### Allowed values
type: "width:height"
width: Takes number from 1 -?
height: Takes number from 1 -?
#### Default value
value: "0:0"
#### Weighting

## License
[![License](https://img.shields.io/badge/License-GNU__v3.0-brightgreen.svg?style=flat-square)](https://www.gnu.org/licenses/gpl-3.0.en.html)
