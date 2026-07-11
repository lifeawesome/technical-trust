export type ManifestoLine = {
  text: string;
  emphasized?: boolean;
};

/** A stanza is one or more lines separated by blank lines in the source. */
export type ManifestoStanza = ManifestoLine[];

/**
 * Thematic groups of stanzas. Group breaks get more vertical space than
 * stanza breaks within a group. Copy within each line is immutable.
 */
export const manifestoGroups: ManifestoStanza[][] = [
  // Opening: the scarcity shift
  [
    [{ text: "Technology has never moved faster." }],
    [
      { text: "Every day, new models are released." },
      { text: "New frameworks emerge." },
      { text: "New tools promise to change everything." },
    ],
    [{ text: "Information is no longer scarce." }],
    [{ text: "Attention is.", emphasized: true }],
    [{ text: "Judgment is.", emphasized: true }],
    [{ text: "Trust is.", emphasized: true }],
  ],

  // The AI era
  [
    [{ text: "We are entering an era where anyone can generate an answer." }],
    [{ text: "But not everyone can generate confidence." }],
    [
      {
        text: "Artificial intelligence can write code, create presentations, draft proposals, and explain almost any technical concept.",
      },
    ],
    [
      { text: "It can also be confidently wrong." },
      { text: "It can oversimplify." },
      { text: "It can hallucinate." },
      { text: "It can flood the world with convincing noise." },
    ],
    [
      {
        text: "The challenge of the next decade will not be finding information.",
      },
    ],
    [{ text: "It will be knowing what to believe.", emphasized: true }],
  ],

  // Who becomes most valuable
  [
    [
      {
        text: "Technical Trust exists because the most valuable people in technology will no longer be those who simply know the answers.",
      },
    ],
    [
      {
        text: "They will be the people who help others make confident decisions.",
      },
      {
        text: "They will know when to simplify and when to dive deeper.",
      },
      {
        text: "They will admit uncertainty instead of pretending certainty.",
      },
      { text: "They will teach before they persuade." },
      { text: "They will illuminate instead of overwhelm." },
      { text: "They will replace fear with understanding." },
    ],
  ],

  // Trust in every interaction
  [
    [
      {
        text: "We believe every technical conversation is an opportunity to build trust.",
      },
    ],
    [
      { text: "Every architecture diagram." },
      { text: "Every product demo." },
      { text: "Every API." },
      { text: "Every support ticket." },
      { text: "Every onboarding session." },
      { text: "Every line of documentation." },
      { text: "Every Slack message." },
      { text: "Every meeting." },
      { text: "Every explanation." },
    ],
    [{ text: "Trust is never built all at once.", emphasized: true }],
    [{ text: "It is accumulated, one interaction at a time." }],
  ],

  // Clarity over complexity
  [
    [
      {
        text: "We reject the idea that expertise is measured by complexity.",
      },
    ],
    [
      {
        text: "The greatest experts make difficult things understandable.",
      },
      { text: "They don't hide behind jargon." },
      { text: "They don't use confusion as proof of intelligence." },
      { text: "They create clarity." },
    ],
    [
      { text: "Because clarity creates confidence.", emphasized: true },
      { text: "And confidence creates trust.", emphasized: true },
    ],
  ],

  // Honesty as advantage
  [
    [{ text: "We believe that honesty is a competitive advantage." }],
    [
      { text: '"I don\'t know."' },
      { text: '"I\'ll find out."' },
      { text: '"Here\'s what we do know."' },
    ],
    [{ text: "These are not signs of weakness." }],
    [{ text: "They are the foundations of credibility." }],
    [
      {
        text: "Trust grows when people know they are hearing the truth, even when the truth is incomplete.",
      },
    ],
  ],

  // Human judgment + AI
  [
    [
      {
        text: "We believe technology should amplify human capability, not replace human judgment.",
      },
    ],
    [
      { text: "AI is extraordinary." },
      {
        text: "It will transform how we work, build, teach, and communicate.",
      },
    ],
    [
      { text: "But no model can replace discernment." },
      { text: "No algorithm can replace integrity." },
      { text: "No prompt can replace genuine understanding." },
    ],
    [
      {
        text: "The future belongs to people who know how to combine human wisdom with machine intelligence.",
      },
    ],
  ],

  // Roles are changing
  [
    [
      {
        text: "We believe the role of every technical professional is changing.",
      },
    ],
    [{ text: "Software engineers are becoming teachers." }],
    [{ text: "Sales engineers are becoming advisors." }],
    [{ text: "Developer advocates are becoming translators." }],
    [{ text: "Product managers are becoming storytellers." }],
    [{ text: "Customer success teams are becoming trusted partners." }],
    [{ text: "The job titles may differ." }],
    [{ text: "The mission is the same." }],
    [{ text: "Earn trust.", emphasized: true }],
  ],

  // What Technical Trust is
  [
    [{ text: "Technical Trust is not about selling software." }],
    [
      { text: "It is not about winning arguments." },
      { text: "It is not about sounding smart." },
    ],
    [
      {
        text: "It is about helping people make better technical decisions.",
      },
      { text: "It is about transforming complexity into clarity." },
      { text: "It is about separating signal from noise." },
    ],
    [{ text: "It is about earning confidence instead of demanding it." }],
  ],

  // The commitment
  [
    [{ text: "This is our commitment." }],
    [{ text: "We will seek truth over trends." }],
    [{ text: "Evidence over assumption." }],
    [{ text: "Teaching over pitching." }],
    [{ text: "Listening over talking." }],
    [{ text: "Curiosity over certainty." }],
    [{ text: "Humility over ego." }],
    [{ text: "Clarity over complexity." }],
    [{ text: "Trust over transactions." }],
  ],

  // Closing
  [
    [{ text: "Because technology will continue to evolve." }],
    [{ text: "AI will continue to improve." }],
    [{ text: "The tools will change." }],
    [{ text: "The platforms will change." }],
    [{ text: "The languages will change." }],
    [{ text: "But one thing will remain constant." }],
    [
      {
        text: "People will always choose to work with those they trust.",
        emphasized: true,
      },
    ],
    [{ text: "That is what we are building." }],
    [{ text: "That is why Technical Trust exists." }],
  ],
];
