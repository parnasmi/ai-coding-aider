I need a couple quick clarifications before I make edits:

1) Output-option name
   - What exact output option string should the CLI accept for this new theme?
     Examples: "html-green", "html_green", "html:green", or a bare extension like "html-green".
   - Should it also be accepted via a file extension (e.g. ".html-green") or only as the --output-file value?

2) Output filename to save
   - When the user requests this option, what filename should we write by default?
     Current code uses `transcript_analysis.<ext>` for bare extension values (e.g. "yaml").
     Do you want: `transcript_analysis.html` (reuse .html), or `transcript_analysis-green.html`, or something else?

3) HTML styling details
   - The new function formatAsHtmlGreenGradientTheme() will mirror existing formatAsHtml(...) but apply a green gradient theme.
     Do you want the CSS inline in the HTML (recommended for a single file), or should it reference an external stylesheet?
   - Any specific colors or CSS preferences for the gradient (start/end hex values, text color)?

4) CLI behavior
   - Should the mainSpec change treat this option as an alias of ".html" (i.e., produce .html file) or as a distinct format that maps to a specific filename/extension (.html or .html-green)?
   - Confirm whether positional/non-flag usage should be supported (e.g., passing "html-green" as the 4th positional arg).

5) Tests
   - For the new test, should I assert that:
     a) the returned string contains the gradient CSS background,
     b) it contains expected HTML elements (title, quick summary paragraph, bullet list, keywords, and word counts),
     c) or a stricter exact snapshot match?
   - Which assertion style do you prefer?

Reply with answers to these points and I will produce the SEARCH/REPLACE edits for:
- let_the_code_write_itself/outputFormatSpec.ts (add formatAsHtmlGreenGradientTheme)
- let_the_code_write_itself/mainSpec.ts (map new option to saved filename)
- let_the_code_write_itself/tests/outputFormatSpec.test.ts (add unit test)
