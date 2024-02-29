import type { Site, SocialObjects, ShareLinkItem } from "./types";

export const SITE: Site = {
  website: "https://nusr.github.io", // replace this with your deployed domain
  author: "Steve Xu",
  desc: "Welcome to My Blog",
  title: "Steve Xu",
  ogImage: "op.jpeg",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["zh-cn"], // BCP 47 Language Tags. Set this empty [] to use the environment default
};

export const LOGO_IMAGE = {
  enable: false,
  svg: false,
  width: 100,
  height: 46,
} as const;

// comment config https://utteranc.es
export const COMMENT_CONFIG = {
  repo: "nusr/nusr.github.io",
  enable: true,
} as const;

// google-analytics
export const GA_CONFIG = {
  id: "UA-138883536-1",
  enable: true,
} as const;

export const SHARE_LINKS: ShareLinkItem[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    enable: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    enable: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/intent/tweet?url=",
    linkTitle: `Tweet this post`,
    enable: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    enable: true,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    enable: true,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    enable: true,
  },
] as const;

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/nusr/nusr.github.io",
    linkTitle: ` ${SITE.title} on Github`,
    enable: true,
  },
  {
    name: "Rss",
    href: "/rss.xml",
    linkTitle: ` ${SITE.title} RSS`,
    enable: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/stevenusr",
    linkTitle: `${SITE.title} on Twitter`,
    enable: true,
  },
  {
    name: "Mail",
    href: "mailto:stevexugc@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    enable: true,
  },
  {
    name: "Facebook",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Facebook`,
    enable: false,
  },
  {
    name: "Instagram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Instagram`,
    enable: false,
  },
  {
    name: "LinkedIn",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on LinkedIn`,
    enable: false,
  },

  {
    name: "Twitch",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitch`,
    enable: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on YouTube`,
    enable: false,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on WhatsApp`,
    enable: false,
  },
  {
    name: "Snapchat",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Snapchat`,
    enable: false,
  },
  {
    name: "Pinterest",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Pinterest`,
    enable: false,
  },
  {
    name: "TikTok",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on TikTok`,
    enable: false,
  },
  {
    name: "CodePen",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on CodePen`,
    enable: false,
  },
  {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    enable: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on GitLab`,
    enable: false,
  },
  {
    name: "Reddit",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Reddit`,
    enable: false,
  },
  {
    name: "Skype",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Skype`,
    enable: false,
  },
  {
    name: "Steam",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Steam`,
    enable: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Telegram`,
    enable: false,
  },
  {
    name: "Mastodon",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Mastodon`,
    enable: false,
  },
] as const;
