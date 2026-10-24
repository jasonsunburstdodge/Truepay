# External Person schema validation

On 2026-10-24, the exact rendered profile JSON-LD in the included HTML inputs was pasted into Google Rich Results Test (CODE, smartphone).

| Profile | Result | External result |
| --- | --- | --- |
| Jon Wilson | 4 valid items; Profile page: 1 valid item, no critical or non-critical ProfilePage issues | [Google result](https://search.google.com/test/rich-results/result?id=ZnVdh5BCj1Cz0JMRjZm85w) |
| Shane Spears | 4 valid items; Profile page: 1 valid item, no critical or non-critical ProfilePage issues | [Google result](https://search.google.com/test/rich-results/result?id=hUdMElTEGy8FEthe2fAm2w) |

Expanded profile results identify the correct Person, jobTitle, alternateName where present, mainEntity binding and worksFor Organization ID. Exact result text, expanded profile text and screenshots are included. These are code-input tests of the rendered graphs, not live deployment tests; Google does not guarantee search appearance.

The shared existing Organization graph also produces a valid Local businesses item with one **non-critical** issue: `Missing field "image" (optional)`. No approved business image is supplied, so none was invented. The registered logo remains present. This optional image issue does not affect either valid Person/ProfilePage result.

The earlier terminal-browser attempts returned a generic sign-in error; the successful cloud-browser results above supersede those attempts. Schema.org was not used after its human-verification challenge. No account login or CAPTCHA solving was needed for the successful Google code tests.
