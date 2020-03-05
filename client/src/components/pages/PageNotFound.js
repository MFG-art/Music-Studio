import React from "react";

function PageNotFound() {
  return (
    <div>
      <p>
        Error, page not found. You either entered a page address that doesn't
        exist or you are trying to access a project page without login in
      </p>
      <br />
      <br />
      <p>
        To log in, click <a href="/sign-in">here</a>
      </p>
      <br />
      <p>
        To create an account instead, click <a href="/sign-up">here</a>
      </p>
    </div>
  );
}

export default PageNotFound;
