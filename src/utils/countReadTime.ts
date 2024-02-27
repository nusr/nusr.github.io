function countReadTime(markdownString: string): number {
  const nonWhiteSpaceString = markdownString.replace(/\s+/g, "");
  const imageTag = "![";
  let imageCount = nonWhiteSpaceString.split(imageTag).length - 1;
  // Read time is based on the average reading speed of an adult (roughly 275 WPM).
  // We take the total word count of a post and translate it into minutes.
  // Then, we add 12 seconds for each inline image. Boom, read time.
  return Math.round(nonWhiteSpaceString.length / 275 + (12 * imageCount) / 60);
}

export default countReadTime;
