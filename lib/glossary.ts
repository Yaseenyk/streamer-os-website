// ---------------------------------------------------------------------------
// The streamer glossary: short, sourced definitions of the words and tools a
// new streamer meets in chat. Each entry renders at /glossary/<slug> and is
// listed on /glossary; the sitemap reads this list too.
//
// Rules for an entry: the definition comes first and stands alone; dates and
// origins only when a cited source states them; nothing invented to pad the
// page. `sources` are the pages each entry was checked against on the date in
// `checked`. Product mentions, where any, are one sentence and honest about
// what streamerOS does not do.
// ---------------------------------------------------------------------------

export interface GlossarySource {
  label: string;
  url: string;
}

export interface GlossaryTerm {
  slug: string;
  /** The term as people type it. */
  term: string;
  /** Alternate spellings people search for. */
  aliases?: string[];
  /** `<title>` — the term plus the one thing people want to know. */
  title: string;
  description: string;
  /** One or two sentences. Rendered first, quoted by answer engines. */
  definition: string;
  /** Markdown-free paragraphs, rendered in order after the definition. */
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  /** Related glossary slugs. */
  related?: string[];
  /** Related site pages: label + path. */
  seeAlso?: { label: string; href: string }[];
  sources: GlossarySource[];
  checked: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'kekw',
    term: 'KEKW',
    aliases: ['KEKW emote', 'KEKW meaning'],
    title: 'KEKW Meaning — The Twitch Laughing Emote',
    description:
      'KEKW is a Twitch emote of Spanish comedian Juan Joya Borja (El Risitas) laughing. What it means, where it came from, and why some viewers only see the text.',
    definition:
      'KEKW is a Twitch chat emote that means laughter. It shows a still of the Spanish comedian Juan Joya Borja, known as El Risitas, mid-laugh, and chat types it the way other people type LOL.',
    sections: [
      {
        heading: 'Where it comes from',
        paragraphs: [
          'The image is from a June 2007 interview on the Spanish TV programme Ratones Coloraos, in which Borja breaks down laughing while telling a story about throwing kitchen pans into the sea. The clip became a meme in its own right years before the emote existed.',
          'The emote itself was submitted to FrankerFaceZ on 21 August 2019 by the user Keesual. It spread across Twitch over the following weeks after large chats such as xQc’s and AdmiralBulldog’s enabled it.',
          'The “KEK” part is older than Twitch: in World of Warcraft, a Horde player typing “LOL” appears to Alliance players as “KEK” because of the game’s cross-faction language scrambling, and the word stuck as a gamer spelling of LOL.',
        ],
      },
      {
        heading: 'Why you might see only the word',
        paragraphs: [
          'KEKW is not a Twitch-native emote. It is served by browser extensions, FrankerFaceZ and BetterTTV, that replace the text with an image for people who have them installed. Anyone without the extension, including most mobile viewers, sees the plain text “KEKW”. The same is true in chat logs and in any tool that reads chat as text.',
        ],
      },
      {
        heading: 'How it is used',
        paragraphs: [
          'As a reaction to something funny, or sarcastically to something that failed. Variants stack other emote suffixes onto the name; the base form is the one worth knowing.',
        ],
      },
    ],
    related: ['poggers', 'sadge'],
    seeAlso: [
      { label: 'Chat Archive — every stream’s chat saved and searchable', href: '/features/chat-archive' },
      { label: 'What chat velocity is', href: '/blog/what-is-chat-velocity' },
    ],
    sources: [
      { label: 'Know Your Meme: KEKW', url: 'https://knowyourmeme.com/memes/kekw' },
    ],
    checked: '2026-10-30',
  },
  {
    slug: 'poggers',
    term: 'POGGERS',
    aliases: ['Poggers', 'POGGERS emote', 'poggers meaning'],
    title: 'POGGERS Meaning — The Twitch Hype Emote',
    description:
      'POGGERS is a Twitch emote of a wide-eyed Pepe the Frog used for excitement, in the same spirit as PogChamp. Where it came from and how chat uses it.',
    definition:
      'POGGERS is a Twitch chat emote that means excitement or hype. It shows Pepe the Frog with a wide-eyed, open-mouthed expression and is used the way PogChamp is used: when something impressive or surprising just happened.',
    sections: [
      {
        heading: 'Where it comes from',
        paragraphs: [
          'POGGERS was submitted to BetterTTV on 23 February 2017. It is one of several Pepe-based emotes that took hold on Twitch through the browser extensions, alongside emotes such as monkaS. By October 2020 it was enabled in more than 160,000 Twitch channels.',
          'The name is a play on PogChamp, the Twitch-native emote that originally showed the face of fighting-game commentator Ryan “Gootecks” Gutierrez. Twitch removed that original image in January 2021; the PogChamp name now shows a Komodo dragon, the emote known as KomodoHype.',
        ],
      },
      {
        heading: 'Why you might see only the word',
        paragraphs: [
          'POGGERS is served by the BetterTTV extension, not by Twitch. Viewers without the extension, and most mobile viewers, see the plain text. “Pog” and “poggers” are also used as words in their own right, in chat and in speech, to mean that something is good.',
        ],
      },
      {
        heading: 'How it is used',
        paragraphs: [
          'A big play, a surprise reveal, a raid landing, a donation goal hit: POGGERS is the all-purpose hype reaction. A burst of it is one of the clearest signals that chat just spiked, which is what chat-velocity tools measure.',
        ],
      },
    ],
    related: ['kekw', 'sadge'],
    seeAlso: [
      { label: 'Viral Moments — hype spikes marked as they happen', href: '/features/viral-moments' },
      { label: 'What chat velocity is', href: '/blog/what-is-chat-velocity' },
    ],
    sources: [
      { label: 'Know Your Meme: POGGERS', url: 'https://knowyourmeme.com/memes/poggers' },
    ],
    checked: '2026-10-30',
  },
  {
    slug: 'sadge',
    term: 'Sadge',
    aliases: ['SADGE', 'Sadge emote', 'sadge meaning'],
    title: 'Sadge Meaning — The Twitch Sad Emote',
    description:
      'Sadge is a Twitch emote of a flattened, downcast Pepe the Frog used to express sadness or disappointment, often ironically. Origin and usage.',
    definition:
      'Sadge is a Twitch chat emote that means sadness or disappointment. It shows a squashed, downcast Pepe the Frog, and chat uses it both sincerely (a loss, a stream ending) and ironically (a mild inconvenience treated as a tragedy).',
    sections: [
      {
        heading: 'Where it comes from',
        paragraphs: [
          'The image is an edit of the much older “Feels Bad Man” sad-frog drawing, which first appeared on 4chan in January 2009. The Sadge emote was submitted to BetterTTV on 3 January 2020 and added to FrankerFaceZ on 14 January 2020.',
          'It spread through early and mid 2020, particularly in AdmiralBulldog’s and Forsen’s communities, and turned into copypasta and memes outside Twitch soon after.',
        ],
      },
      {
        heading: 'Why you might see only the word',
        paragraphs: [
          'Like KEKW and POGGERS, Sadge is an extension emote. Without BetterTTV or FrankerFaceZ installed, viewers see the word. The word has outgrown the image: “sadge” is used on its own as an adjective, on Twitch and off it.',
        ],
      },
      {
        heading: 'How it is used',
        paragraphs: [
          'As a reaction to bad news, a lost match, or a streamer saying goodnight. A wall of Sadge when a stream ends is a compliment.',
        ],
      },
    ],
    related: ['kekw', 'poggers'],
    seeAlso: [
      { label: 'How to read chat sentiment in real time', href: '/blog/how-to-read-chat-sentiment-in-real-time' },
    ],
    sources: [
      { label: 'Know Your Meme: Sadge', url: 'https://knowyourmeme.com/memes/sadge' },
    ],
    checked: '2026-10-30',
  },
  {
    slug: 'twitch-banned-words',
    term: 'Twitch banned words',
    aliases: ['banned words on Twitch', 'Twitch blocked terms', 'words you cannot say on Twitch'],
    title: 'Twitch Banned Words — What the Rules Actually Say',
    description:
      'Twitch does not publish a list of banned words. What its Community Guidelines prohibit, the one slur it names, and how Blocked Terms and AutoMod work in your own channel.',
    definition:
      'Twitch has no published list of banned words. Its Community Guidelines prohibit categories of speech, including hateful conduct, harassment, sexual harassment, threats and spam, and Twitch states that it keeps its list of prohibited slurs private so the policy cannot be gamed. Streamers add their own banned words per channel with the Blocked Terms tool.',
    sections: [
      {
        heading: 'What the Community Guidelines prohibit',
        paragraphs: [
          'The guidelines are organised by conduct, not vocabulary. The sections that govern what can be said in chat are headed “Civility and Respect”, “Hateful Conduct”, “Harassment”, “Sexual Harassment”, “Violence and Threats”, “Sexual Content” and “Spam, Scams, and Other Malicious Conduct”.',
          'Hateful conduct covers slurs and attacks based on protected characteristics. Twitch lists these as race, ethnicity, color, caste, national origin, immigration status, religion, sex, gender, gender identity, sexual orientation, disability, serious medical condition and veteran status, with certain protections also applying to age. Hateful slurs are barred whether or not they are aimed at a specific person; denouncing a slur in context is allowed.',
          'On a public list, Twitch is explicit: “We do not make our list of prohibited slurs public so as not to enable or facilitate evasion of this policy.” The one term the guidelines name outright is the N-word with a hard R, which “is never allowed under any circumstances”. Context is considered for other terms.',
          'Ordinary profanity is not listed as a violation in the guidelines. What is a violation is how words are used: wishing harm on someone, implied threats, repeated personal attacks, unwanted sexual comments, and large volumes of repetitive unwanted messages (spam) are all named as examples.',
        ],
      },
      {
        heading: 'Banned words in your own channel',
        paragraphs: [
          'Each channel sets its own words. Twitch’s moderation tools work in three layers:',
        ],
        list: [
          'Blocked Terms and Phrases: words you add on the Moderation Settings page. A message containing a blocked term is not posted. A leading or trailing asterisk is a wildcard, so “shoot*” also catches “shooting”. A multi-word term blocks only messages containing all of its words, in any order. Each term can be Public (visible to your mods) or Private.',
          'AutoMod: holds messages it judges risky for a moderator to approve or deny before anyone else sees them. Twitch describes it as machine learning over natural language, not a word list you can read.',
          'Twitch’s own global filter: a “globally banned words filter”, on by default, containing words Twitch removes most often. Twitch does not publish its contents.',
        ],
      },
      {
        heading: 'What streamers are expected to do',
        paragraphs: [
          'Twitch says streamers are expected to mitigate harassment and hateful conduct in their chat, and that it will not suspend streamers acting in good faith, using AutoMod, timeouts and bans, to remove abuse that third parties bring into the channel. Not using the tools at all, when hateful conduct appears on a channel, can lead to a suspension.',
          'A practical corollary: keep your own chat logs. Twitch’s moderation view shows recent messages; a local archive lets you check what was said in a stream weeks later when a dispute or a sponsor question comes up.',
        ],
      },
    ],
    related: ['nightbot-custom-commands'],
    seeAlso: [
      { label: 'Chat Archive — chat saved locally, searchable, redactable', href: '/features/chat-archive' },
      { label: 'How to save YouTube Live chat and Twitch chat logs', href: '/blog/how-to-save-youtube-live-chat-and-twitch-chat-logs' },
    ],
    sources: [
      { label: 'Twitch Community Guidelines', url: 'https://safety.twitch.tv/s/article/Community-Guidelines' },
      { label: 'Twitch: How to Manage Harassment in Chat', url: 'https://help.twitch.tv/s/article/how-to-manage-harassment-in-chat' },
    ],
    checked: '2026-10-30',
  },
  {
    slug: 'nightbot-custom-commands',
    term: 'Nightbot custom commands',
    aliases: ['Nightbot commands', '!commands add', 'Nightbot command list'],
    title: 'Nightbot Custom Commands — Syntax and Variables',
    description:
      'How Nightbot custom commands work: the !commands add, edit and delete syntax, user levels, cooldowns, aliases and the variables Nightbot documents.',
    definition:
      'Nightbot custom commands are chat commands a streamer or moderator creates so that Nightbot replies with a set message when a viewer types the command. They are added from chat with “!commands add !name response” or from the Nightbot control panel, and the response can include variables such as $(user), $(touser) and $(count).',
    sections: [
      {
        heading: 'The chat syntax',
        paragraphs: [
          'Nightbot documents three subcommands of its built-in !commands command:',
        ],
        list: [
          '!commands add !command_name command response',
          '!commands edit !command_name command response',
          '!commands delete !command_name',
        ],
      },
      {
        heading: 'Options when adding a command',
        paragraphs: [
          'Options go between the name and the response: “!commands add !name -ul=userlevel -cd=cooldown -a=!alias response”.',
        ],
        list: [
          '-ul= sets who can use the command: owner, moderator, twitch_vip (Twitch only), regular (your regulars list), subscriber, or everyone (the default).',
          '-cd= sets the cooldown, the minimum number of seconds between uses.',
          '-a= makes the command an alias of another command; the response text is passed to that command as its input, so put $(query) in the response to forward what the viewer typed.',
        ],
      },
      {
        heading: 'Variables worth knowing',
        paragraphs: [
          'Variables are placeholders Nightbot fills in when the command runs. Among the ones it documents:',
        ],
        list: [
          '$(user): the name of the viewer who ran the command.',
          '$(touser): the first word after the command, usually a name, so “!hug” can produce “$(user) hugs $(touser)”.',
          '$(query): everything typed after the command.',
          '$(count): a number that goes up every time the command runs (death counters, win counters).',
          '$(channel): the channel’s name.',
          '$(countdown) and $(countup): time until or since a date you set.',
          '$(time): the current time in a timezone you choose.',
          '$(urlfetch): the text returned by a URL, which is how commands pull in live data from elsewhere.',
          '$(twitch): details from a Twitch profile, such as the game a channel is playing.',
          '$(eval): runs a snippet of JavaScript, for commands that need logic.',
        ],
      },
      {
        heading: 'Who can manage commands',
        paragraphs: [
          'The streamer and the channel’s moderators manage custom commands. The -ul option controls who can trigger a command, not who can create it.',
          'Nightbot is a bot: it posts into your chat. Tools that only read chat, such as a chat archive or a chat-velocity monitor, are a different category and do not replace it.',
        ],
      },
    ],
    related: ['twitch-banned-words'],
    seeAlso: [
      { label: 'Stream automation 101', href: '/blog/stream-automation-101' },
    ],
    sources: [
      { label: 'Nightbot docs: !commands', url: 'https://docs.nightbot.tv/commands/commands' },
      { label: 'Nightbot docs: Variables', url: 'https://docs.nightbot.tv/variables' },
    ],
    checked: '2026-10-30',
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((entry) => entry.slug === slug);
}

/** Alphabetical, for the index page. */
export function glossaryAlphabetical(): GlossaryTerm[] {
  return [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));
}
