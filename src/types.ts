import type socialIcons from "@assets/socialIcons";

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  enable: boolean;
  linkTitle: string;
}[];

export type ShareLinkItem = {
  name: string;
  href: string;
  linkTitle: string;
  enable: boolean;
};

export type TOCItem = {
  text: string;
  slug: string;
  depth: number;
};
