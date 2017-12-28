# Dec. 27, 2017
## Now Using browserify
---
I used browserify instead of require.js to bring node repositories and code into html
the way it works is with a command like:
```
> browserify index.js -o bundle.js
```
             ^^^ the node file

then, in the html I include it like
```html
<script type="text/javascript" src="bundle.js"></script>
```
and it works with all stuff in node modules

## TODO
- [ ] Fix the stupid CORS issue
- [ ] Finalize frontend layout
- [ ] Raspberry Pi/TV setup
