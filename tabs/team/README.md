# Team Page - Adding Members

This folder powers the Team page. Team members are defined in `team.json`, and
`team.js` reads that file to render the page.

## Add a New Member

1. Open `tabs/team/team.json`.
2. Add a new object to the array (usually near similar roles).
3. Add a headshot to `tabs/team/assets/` and set `image` to that path.

Minimal example:

```json
{
  "name": "Jane Doe",
  "memberType": "PhD",
  "currentMember": "true",
  "displayed": "true",
  "role": "Vision",
  "position": "PhD Robotics",
  "affiliation": "Carnegie Mellon University",
  "image": "assets/jane_doe.jpg",
  "imageLink": "https://example.com",
  "social": [
    { "type": "linkedin", "url": "https://www.linkedin.com/in/janedoe/" }
  ]
}
```

## `memberType` Values

`memberType` controls how members are grouped and ordered. Valid values are:

- `PI`
- `Scientist`
- `Staff`
- `Postdoc`
- `PhD`
- `Master`
- `Undergrad`
- `Sponsor`

Grouping rules (from `team.js`):

- `Scientist`, `Staff`, and `Postdoc` appear under **Scientist & Staff**
- `PhD` and `Master` appear under **PhD & Master**
- `Undergrad` appears as **Amazing Undergrad**

## Field Notes

- `currentMember` and `displayed` accept `"true"`/`"false"` strings (or booleans).
  - `displayed: "false"` hides the member.
  - `currentMember: "false"` pushes the member to the end of its group.
- `imageLink` is optional; when provided, the headshot becomes a link.
- `social` supports `linkedin`, `github`, `globe`; other values show a generic link.
