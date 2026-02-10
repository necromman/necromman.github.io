import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Passthrough copy — 빌드 없이 그대로 복사
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("googlec582c27e9f9b3e9c.html");

  // HtmlBasePlugin — pathPrefix를 HTML 출력의 절대경로에 자동 적용
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // 커스텀 필터: <style> 블록 추출 (head에 배치용)
  eleventyConfig.addFilter("extractStyles", function (content) {
    if (!content) return "";
    const matches = content.match(/<style[^>]*>[\s\S]*?<\/style>/gi);
    return matches ? matches.join("\n") : "";
  });

  // 커스텀 필터: <style> 블록 제거 (body에 배치용)
  eleventyConfig.addFilter("stripStyles", function (content) {
    if (!content) return "";
    return content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").trim();
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
    pathPrefix: "/",
    htmlTemplateEngine: "njk",
  };
}
