import { map } from "recursive-methods";
import { ResponseJson } from "./types/types";
import { post } from "./utils/ajax";
import { removeAll } from "./utils/domOperate";
import { ele } from "./utils/getdom";

class OperateDatabase {
  private liContainer: HTMLElement;
  private fetchBasesBtn: HTMLButtonElement;
  constructor() {
    this.liContainer = ele("#list-container") as HTMLElement;
    this.fetchBasesBtn = ele("#fetch-bases-btn") as HTMLButtonElement;
  }

  public handleBtnClick(): void {
    this.fetchBasesBtn.onclick = e => {
      this.getBases((data: ResponseJson) => {
        this.fillContainer(this.liContainer, data.content);
      });
    };
  }

  public fillContainer(container: HTMLElement, arr: string[]): void {
    const ulContainer = removeAll(container);
    const listDoms = map(v => {
      const liDom = document.createElement("li");
      liDom.appendChild(document.createTextNode(String(v)));
      ulContainer.appendChild(liDom);
      return liDom;
    }, arr);

  }

  public getBases(cb: (v: ResponseJson) => any): void {
    post("/post/list_bases").then((data: ResponseJson) => {
      cb(data);
    });
  }

  public start(): void {
    this.handleBtnClick();
  }

}

const main = () => {
  const operateDataBases = new OperateDatabase();
  operateDataBases.start();
};

main();
