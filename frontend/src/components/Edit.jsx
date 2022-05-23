import React from "react";
import { useRecoilValue } from "recoil";
import { idState } from "../recoil/id/atom";

function Edit() {
  const id = useRecoilValue(idState);
  return <div>{id}</div>;
}

export default Edit;
