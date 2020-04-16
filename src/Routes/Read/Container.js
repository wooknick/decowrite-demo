import React from "react";
import { withRouter } from "react-router-dom";
import Presenter from "./Presenter";
import { getBook, getBookInfo } from "../../Components/Util";
import Forbidden from "../Forbidden";
import useTone from "../../Hooks/useTone";

const Container = withRouter(({ history, match }) => {
  const bookName = match.params.bookName;
  const book = getBook(bookName);
  const tone = useTone();

  if (book) {
    const bookInfo = getBookInfo(book);
    if (bookInfo) {
      const { title, pages, emotions } = bookInfo;
      return (
        <Presenter
          title={title}
          pages={pages}
          emotions={emotions}
          tone={tone}
        />
      );
    } else {
      return <Forbidden error={"책을 불러올 수 없습니다."} />;
    }
  } else {
    return <Forbidden error={"존재하지 않는 책입니다."} />;
  }
});

export default Container;
