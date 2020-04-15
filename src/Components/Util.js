import Contents from "../Contents";

export const getBookInfo = (json) => {
  const { title, chapter_exist, chapter_titles, data: chapters } = json;
  const pages = [];
  const emotions = [];

  // 표지 페이지
  pages.push({ type: "cover", text: title, emotion: 0 });
  emotions.push(0);

  // 목차 페이지
  pages.push({ type: "index", text: chapter_titles, emotion: 0 });
  emotions.push(0);

  // 본 내용
  chapters.map((chapter) => {
    // 챕터 커버 페이지
    if (chapter.chapter_name !== "") {
      pages.push({
        type: "chapterCover",
        chapterNum: chapter.chapter_num,
        text: chapter.chapter_name,
        emotion: 0,
      });
      emotions.push(0);
    }
    // 본문 페이지
    chapter.chapter_contents.map((item) => {
      item.type = "content";
      pages.push(item);
      emotions.push(item.emotion);
    });
  });

  return { title, pages, emotions };
};

export const getBook = (bookName) => {
  return Contents[bookName];
};
