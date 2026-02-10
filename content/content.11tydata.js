// content 디렉토리 내 모든 HTML 파일의 permalink를 .html 확장자로 고정
// Eleventy의 pretty URL 기본 동작(file/index.html)을 방지하여 기존 URL 구조를 보존한다
export default {
  eleventyComputed: {
    permalink: (data) => `${data.page.filePathStem}.html`,
  },
};
