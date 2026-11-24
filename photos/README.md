# Photos for new bouquets

Upload phone photos here (Add file → Upload files). Any size is fine.

Then add a block for the bouquet in `src/data/bouquets.json` with
`"photo": "<the file name>"`. When the site builds, the photo is cropped to a
square around the middle of the bouquet and shrunk for fast loading.

If the crop cuts the flowers, add `"focus": "top"` (or `"bottom"`, `"left"`,
`"right"`, `"center"`) to that bouquet's block.
