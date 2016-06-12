import {Page, NavController, NavParams} from 'ionic-angular';
import {createClass} from "asteroid";

@Page({
  templateUrl: 'build/pages/userList/userList.html'
})
export class UserListPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    this.items = [];

    const Asteroid = createClass();
    // Connect to a Meteor backend
    this.asteroid = new Asteroid({
        endpoint: "ws://localhost:3000/websocket"
    });

    let userId = this.navParams.get('userId');


    this.asteroid.call('getMyList', this.selectedCategory)
      .then(result => {
        this.stores = result.list;
        for(let i = 0; i < result.list.length; i++) {
          this.items.push({
            title: result.list[i].name,
            note: 'This is item #' + i,
            icon: this.icons[Math.floor(Math.random() * this.icons.length)]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  itemTapped(event, item) {
    this.nav.push(ListPage, {
      item: item
    })
  }
}