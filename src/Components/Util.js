import Contents from "../Contents";

export const getBook = (bookName) => {
  if (Contents[bookName]) {
    return Contents[bookName];
  }
};

export const getBookInfo = (json) => {
  try {
    const { title, chapter_titles, chapter_exists, data: chapters } = json;
    const pages = [];
    const emotions = [];

    // 표지 페이지
    pages.push({ type: "cover", text: title, emotion: 0 });
    emotions.push(0);

    // 목차 페이지
    if (!!chapter_exists) {
      pages.push({ type: "index", text: chapter_titles, emotion: 0 });
      emotions.push(0);
    }

    // 본 내용
    chapters.forEach((chapter) => {
      // 챕터 커버 페이지
      if (chapter.chapter_name !== "") {
        pages.push({
          type: "chapterCover",
          text: [chapter.chapter_num, chapter.chapter_name],
          emotion: 0,
        });
        emotions.push(0);
      }
      // 본문 페이지
      chapter.chapter_contents.forEach((item) => {
        item.type = "content";
        pages.push(item);
        emotions.push(item.emotion);
      });
    });

    return { title, pages, emotions };
  } catch {
    return false;
  }
};
