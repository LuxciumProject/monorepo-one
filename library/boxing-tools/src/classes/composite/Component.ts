import { BaseBox } from '../BaseBox';

export abstract class Component<T extends string> extends BaseBox<T> {
  protected _name: string;
  constructor(name: T) {
    super(name);
    this._name = name;
  }
  getDetails() {
    // Implementation or abstract placeholder
  }
}

export class ItemBox<T extends string> extends Component<T> {
  constructor(
    _name: T,
    protected _color: string,
    protected _cost: number
  ) {
    super(_name);
  }
  getDetails(): void {
    console.log(
      `${this._name} :: ${this._color} color, priced at INR ${this._cost}`
    );
  }
}

export class CollectionBox<T extends string> extends Component<T> {
  private items: (ItemBox<string> | CollectionBox<string>)[] = [];

  constructor(_name: T) {
    super(_name);
  }
  getDetails() {
    console.log(`\n${this._name}`);
    this.items.forEach(item => item.getDetails());
  }

  add(item: ItemBox<string> | CollectionBox<string>) {
    this.items.push(item);
    return this;
  }
}

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  // Instantiating individual items
  const iPhoneXS = new ItemBox('Apple iPhone XR', 'White', 89000);
  const galaxyM20 = new ItemBox('Samsung Galaxy M20', 'Ocean Blue', 12000);

  // Creating a collection of phones
  const phoneCollection = new CollectionBox('** Smartphones **');
  phoneCollection.add(iPhoneXS);
  phoneCollection.add(galaxyM20);

  // Creating a composite collection (e.g., for a product catalog)
  const primeProducts = new CollectionBox('*** Prime Products ***');
  primeProducts.add(phoneCollection);

  // Getting details for the composite collection
  primeProducts.getDetails();
  /*
  ❯ ts-node "/projects/monorepo-one/library/boxing-tools/src/classes/composite/Component.ts"
    at: MAIN from /projects/monorepo-one/library/boxing-tools/src/classes/composite/Component.ts

    *** Prime Products ***

    ** Smartphones **
    Apple iPhone XR :: White color, priced at INR 89000
    Samsung Galaxy M20 :: Ocean Blue color, priced at INR 12000
   */
  return void 0;
})();
