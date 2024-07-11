import React, { useEffect } from "react";
import axios from "axios";
// import { response } from "express";  response 변수로 받는 설정에서 자동으로 import되어 오류 발생....

function LandingPage() {
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/hello")
      .then((response) => console.log(response.data));
  }, []);

  return <div>LandingPage </div>;
}

export default LandingPage;
