import * as blessed from 'blessed';
import { Ketting, Resource } from 'ketting';

let currentResource: Resource;
let uriBox: blessed.Widgets.BoxElement;
let contentBox: blessed.Widgets.BoxElement;
let ketting: Ketting;
let screen: blessed.Widgets.Screen;

async function main() {

  if (!process.argv[2]) {
    console.warn('Usage: %s %s [URL]', process.argv[0], process.argv[1]);
    process.exit(2);
  }

  initBoxes();
  await navigate(process.argv[2]);
  screen.render();

}

main();


async function navigate(uri: string) {

  currentResource = ketting.go(uri);
  uriBox.setContent(` ${currentResource.uri}`);
  
  const response = await currentResource.get();

  contentBox.setContent(JSON.stringify(response));

}

function initBoxes() {

  screen = blessed.screen({
  });

  screen.title = 'HyperCLI';

  ketting = new Ketting('/');

  const titleBox = blessed.box({
    width: '100%',
    top: 0,
    height: 1,
    /*
    style: {
      bg: 'green',
      fg: 'white',
    },*/
    align: 'center',
  });

  titleBox.setContent('HyperCLI');
  screen.append(titleBox);

  uriBox = blessed.box({
    width: '100%',
    bottom: 0,
    height: 1,
    /*
    style: {
      bg: 'green',
      fg: 'white',
    }*/
  });

  screen.append(uriBox);

  contentBox = blessed.box({
    top: 1,
    bottom: 1,
    left: 0,
    right: 0,

    /*
    style: {
      fg: 'green',
      bg: '#000',
    },
    */

  });

  screen.append(contentBox);

}


