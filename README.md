# ghost-cover-theme
Make your cover of ghost blog fancy! (for casper)

## How to
1. Login to ghost and click code injection tab.  
2. Add things in footer like this.
```html
<link rel="stylesheet" href="//cdn.rawgit.com/HelloWorld017/ghost-cover-theme/master/dist/ghost-cover.bundle.css">
<script src="//cdn.rawgit.com/HelloWorld017/ghost-cover-theme/master/dist/ghost-cover.bundle.js"></script>
<script>
  var myPattern = "fragments";
  var myTheme = "default";
  new gcCover(myPattern, myTheme).drawCover();
</script>
```

## [Demo](https://organic.murye.io)
