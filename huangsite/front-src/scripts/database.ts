import { ele } from './utils/getdom';
import { post } from './utils/ajax';
import { ResponseJson } from './types/types';
import { removeAll } from './utils/domOperate';
import { map,  } from 'recursive-methods'
class OperateDatabase {
  liContainer: HTMLElement
  fetchBasesBtn: HTMLButtonElement
  constructor() {
    this.liContainer = <HTMLElement>ele('#list-container');
    this.fetchBasesBtn = <HTMLButtonElement>ele('#fetch-bases-btn');
  }

  handleBtnClick(): void {
    console.log('button', this.fetchBasesBtn)
    this.fetchBasesBtn.onclick = e => {
      this.getBases((data: ResponseJson) => {
        this.fillContainer(this.liContainer, data.content);

        console.log(map(v => v + 'mm', ['sss', 3, 4, 5, 6, 7]));
      });
    }
  }

  fillContainer(container: HTMLElement, arr: string[]): void {
    let ulContainer = removeAll(container);
    console.log()
    let listDoms = map(v => {
      let liDom = document.createElement('li');
      liDom.appendChild(document.createTextNode(String(v)));
      ulContainer.appendChild(liDom);
      return liDom;
    }, arr);
    console.log(listDoms)

  }

  getBases(cb: Function): void {
    post('/post/list_bases').then((data: ResponseJson) => {
      console.log('data2', data)
      cb(data)
    })

  }


  start(): void {
    this.handleBtnClick();
  }

}

const main = () => {
  const operateDataBases = new OperateDatabase();
  operateDataBases.start();
}

main();
