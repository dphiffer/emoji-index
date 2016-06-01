# Emoji Index

A developer-centric index of emoji based on information from [Emojipedia](http://emojipedia.org/) and [emoji-cheat-sheet.com](https://github.com/arvida/emoji-cheat-sheet.com)

## What’s in here

* __emoji-max.json__: all the emojis from Unicode 1.1 to Unicode 8.0, with `:thumbsup:`-style shortcuts and reference URLs to Emojipedia
* __emoji-max-pretty.json__: a pretty-printed version of emoji-max.json
* __emoji-min.json__: a barebones lookup hash for implementing emoji shortcuts
* __emoji-min-pretty.json__: a pretty-printed version of emoji-min.json

## Examples

### emoji-max.json

```
[{
	"alt_names": [
		"animal",
		"tortoise",
		"slow",
		"nature"
	],
	"emoji": "\ud83d\udc22",
	"shortcuts": [
		"turtle"
	],
	"since": "Unicode 6.0",
	"title": "Turtle",
	"url": "http://emojipedia.org/turtle/"
}]
```

### emoji-min.json

```
{
	"cactus": "\ud83c\udf35"
}
```

## What is this for?

* Easily convert plain text emoji like `:turtle:` to their emoji equivalent using the `shortcuts` property
* Determine how widely a given emoji is supported based on its Unicode `since` property
