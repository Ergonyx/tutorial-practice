# [Dev Ed Todo List Tutorial YouTube Video](https://www.youtube.com/watch?v=Ttf3CEsEwMQ)

# HTML Notes

## The `preconnect` attribute
The `preconnect` attribute is designed to speed up loading of resources by letting the browser know earlier that an external request is required.  In this case, loading the Google fonts.
The `crossorigin` attribute is required as the font-face specification requires fonts to be loaded in "anonymous mode."
*"preconnects"* allow the browser to set up sockets ahead of time for requesting the resource.

`preconnect` is not compatible with the more recent versions of Firefox, IE, and Opera Mini.  Compatibility is less than 90% (89.63%) so I will likely do some more research on this later.

Sources:  
[Igvita's Eliminating roundtrips with preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/)  
[MDN - Link types: preconnect](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preconnect)  
[Can I Use](https://caniuse.com/link-rel-preconnect)  

## `defer` versus end of `body` script loading

Either way, whether using `defer` or loading a script at the end of the `body`, the scripts will all load in the order in which they appear from top to bottom.
In the past, loading at the end of `body` was better as it was supported by more browsers.  However, as of today (Jan 6, 2022) majority (96.69%) of browsers (with the exception of Opera mini and some older browser versions) now support the `defer` attribute.
Using `defer` is not limited to the `head` of the page but can be used anywhere.  I will likely start putting the code at the bottom of the page but still use the `defer` attribute.

# CSS Notes

Chose to use CSS variables for the sake of trying out different color schemes without having to find everywhere I used the colors.

Made a few design choices (a more purple/pink theme) just because I didn't like the white on yellow from the video.

## The `appearance` Property

I wondered if some of the properties such as `-webkit-appearance` and `-moz-appearance` were deprecated something as they were crossed out in intellisense.  Turns out it's just non-standard and VSCode thinks I shouldn't use it.  Seems to be required though and is supported by most browsers with some limitations.

Sources:  
[Can I Use](https://caniuse.com/css-appearance)

## The `pointer-events` Property

I'd read the MDN page for `pointer-events` but never found that I needed it for anything up to this point.  This is the first time I've come across a use for it and it seems a little like it's the opposite of `cursor: pointer` though it seems to have many more uses with SVGs.  Not sure how much I'll use this but good to have in mind when I don't want something to seem clickable.

This property seems widely supported (96.69%) across browsers.

Sources:  
[MDN - Pointer Events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)  
[Can I Use](https://caniuse.com/pointer-events)

# JavaScript Notes

I did most functions with ES6 syntax as that's what I learned early on through fCC.  I also chose to use Material Design Iconic Fonts after failing to get Font Awesome to working properly.  Will revisit Font Awesome another time but didn't want to waste too much time with something that really wasn't required.

## The `transitionend` Event Listener

The `transitionend` event listener fires is activated on both directions.  From the default to the transitioned state and from the transitioned state back to the default.

I can see myself using this instead of `setTimeout()` which was my goto for performing an action on an item after it's animation.  With `transitionend` I do not need to know the duration of the animation saving myself a little time.

There is also `transitionrun`, `transitionstart`, and `transitioncancel` which can be used for further control of the items transition state.

This event listener is widely supported across most browsers but doesn't seem widely used.

Sources:  
[MDN - HTMLElement: transitionend event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event)  
[Can I Use](https://caniuse.com/css-transitions)

## The `childNodes` Method

For some reason, when attempting to use the `childNodes` method for my nodelist, I get TypeErrors about styles being undefined.  I suspect this is due to the random text element that's added at the 0-index of the node list though I cannot understand WHY this text element exists in the node list at all.

I was originally unable to find anything that explained this issue but, after a great deal of frustration, I found out that it reads whitespace as a child node.  No idea why this is the case but at least now I know, when using the `childNodes` method, I'll be sure to enforce a strict **No whitespace** mindset.

In this particular case, having
```
<ul class="todo-list">

</ul>
```
instead of
`<ul class="todo-list"></ul>`
resulted in whitespace being detected as an additional node.  Lesson learned.

Sources:  
[Stack Overflow - What are HTML DOM #text elements?](https://stackoverflow.com/questions/21357004/what-are-html-dom-text-elements/21357034#21357034)  
[MDN - Node.childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)

## EventListeners

I'd used event listeners in the past for little incremental games, todo lists, filters, etc.  How I used them was by creating an event listener for each independant item that needed one.  Today I learned that I can put an event listener on a parent element and have it do multiple functions based on what child within that parent element I click on.  This will hopefully streamline some of my future code.

Sources:  
[A Simple Explaination of Event Delegation](https://dmitripavlutin.com/javascript-event-delegation/)  
[MDN - EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener)

# Deviation Plans

I want to take this and turn it into a NodeJS application so that I and my partner can have a syncronized Todo list.  Should (hopefully) reduce friction in getting tasks done and streamline things considerably.

Also need to save the status of whether or not something is or is not complete so it can be loaded correctly when revisting the page.  I don't need to be reminded to do the dishes if they've already been done.
