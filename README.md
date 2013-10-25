Tessellate
==========

Small vanilla JavaScript module for gracefully removing floating elements from the page.

<img src="https://travis-ci.org/Wildhoney/Tessellate.png?branch=master" />
&nbsp;
<img src="https://badge.fury.io/js/tessellate-js.png" />

Install via npm: `npm install tessellate-js`.

Overview
----------

When you remove a floated element from the DOM, all the other elements simply occupy the now unallocated space immediately. However, with Tessellate, unallocated space due to removed nodes are occupied gracefully with CSS3 animations.

Getting Started
----------

First you need to create a new instance of Tessellate for each container you want this behaviour on.

```javascript
var colours     = document.querySelector('section.colours'),
    tessellate  = new Tessellate(colours);
```

And then whenever you remove an element, tell Tessellate which element you wish to remove, and the module will do the rest for you.

```javascript
tessellate.remove(event.target);
```

As a side note, it's not necessary to simply remove an element from the DOM ungracefully. You can dim its opacity or any other effect, but at the point of physical removal from the DOM, invoke `tessellate.remove`.