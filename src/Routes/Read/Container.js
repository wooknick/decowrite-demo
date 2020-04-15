import React from "react";
import { withRouter } from "react-router-dom";
import Presenter from "./Presenter";
import { getBook, getBookInfo } from "../../Components/Util";

const Container = withRouter(({ match }) => {
  const bookName = match.params.bookName;
  const book = getBook(bookName);
  const { title, pages, emotions } = getBookInfo(book);

  return <Presenter title={title} pages={pages} emotions={emotions} />;
});

export default Container;
