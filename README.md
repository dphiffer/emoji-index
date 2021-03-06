# Emoji Index

A developer-centric index of emoji based on information from [Emojipedia](http://emojipedia.org/) and [emoji-cheat-sheet.com](https://github.com/arvida/emoji-cheat-sheet.com)

## What’s in here?

* __emoji-index.json__: all the emojis from Unicode 1.1 to Unicode 8.0, with `:thumbsup:`-style shortcuts and reference URLs to Emojipedia
* __emoji-pretty.json__: a pretty-printed version of emoji-index.json
* __emoji-escaped.json__: emojis are escaped with hex codes (e.g., ⛵ becomes `\u26f5`)
* __emoji-lookup.json__: a barebones lookup hash for implementing emoji shortcuts

## Some examples

### emoji-index.json

```json
[{
	"emoji": "🐢",
	"title": "Turtle",
	"url": "http:\/\/emojipedia.org\/turtle\/",
	"since": "Unicode 6.0",
	"shortcuts": [
		"turtle"
	],
	"alt_names": [
		"animal",
		"tortoise",
		"slow",
		"nature"
	]
}]
```

### emoji-lookup.json

```json
{
	"cactus": "🌵"
}
```

## What is this for?

* Easily convert plain text like `:turtle:` to its emoji equivalent 🐢
* Determine how recently a given emoji was introduced based on its Unicode `since` property

## Are these shortcuts standardized?

Not as far as I know, it seems they're pretty much being invented ad-hoc by the people creating the software that supports them. It's amazing there is as much coherence among the list of compatible products listed on [emoji-cheat-sheet.com](http://emoji-cheat-sheet.com/), but you can find places where the naming conventions diverge. For example `:poop:`, `:shit:`, and `:hankey:` all map onto the same 💩 emoji symbol.

## Is this complete?

This is only as complete as Emojipedia and emoji-cheat-sheet.com. For now I’d rather downstream changes that originate from them to keep things sane. Feel free to create [GitHub issues](https://github.com/dphiffer/emoji-index/issues) if you notice anything missing.

## What about Unicode 9.0 and Unicode 10.0?

Seems too early at this point. But once [9.0](http://emojipedia.org/unicode-9.0/) starts shipping on some actual platforms I'll update this repo.

## See also

* [Unicode emoji specifications](http://www.unicode.org/Public/emoji/)
* [Matthew Rothenberg's informative *How I built Emojitracker*](https://medium.com/@mroth/how-i-built-emojitracker-179cfd8238ac#.8j2uxstql), [Emojitracker itself](http://emojitracker.com/), and [the source code](https://github.com/mroth/emojitracker)
