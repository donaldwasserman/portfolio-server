---
title: Using Media Queries to Generate SVG Transformations
description: Problems with transforming svg's at specific media queries.
date: 12-22-2014
post: true
id: 3
---

### There's only one word: "UGH"
I am working on a project using custom svg elements as part of a map on a sign-up form.

To make sign up easier on mobile, I wanted to "deconstruct" the map elements into a more mobile-friendly layout. When I finished it, I found this weird quirk:

**You can apply a transform on an element within a media query, it works great when you resize the browser, but load the page in a small viewport and the transforms won't apply at all.**

(Although, other styles applied to the svg like stroke and fill attributes will...)

[Here's a CodePen I put together.](http://codepen.io/donaldwasserman/pen/bNpvLB/?editors=011) Shrink the browser below and the the transforms will fire and the colors will change. Expand the browser and the colors will reset (at the 600px media query) but the elements won't re-animate.

The solution is to use Javascript's `.matchMedia()` method to re-add the mobile classes. This is is a limited version of what I used:

```javascript
if (window.matchMedia("(max-width: 768px)").matches) {
  var circles = document.querySelectorAll('circle');

  for (i = 0; i < divs.length; i++) {
    circles[i].setAttribute('class', 'mobile');
  }
}
```

See my whole CodePen below.

<p data-height="268" data-theme-id="4417" data-slug-hash="bNpvLB" data-default-tab="result" data-user="donaldwasserman" class='codepen'>See the Pen <a href='http://codepen.io/donaldwasserman/pen/bNpvLB/'>weird svg demo</a> by Donald Wasserman (<a href='http://codepen.io/donaldwasserman'>@donaldwasserman</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
