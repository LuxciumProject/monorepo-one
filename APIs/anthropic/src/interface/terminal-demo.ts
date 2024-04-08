import { Readable } from 'stream';
import { StringDecoder } from 'string_decoder';

class FullScreenAwareStream extends Readable {
  private _isFullscreen = false;

  constructor(private readonly _stream: Readable) {
    super({
      objectMode: true,
      read: () => {
        // Not needed when using Node.js Console API
      },
    });
  }

  onTitleChange(title: string) {
    const inAlternate =
      title.includes('alternate screen') || title.includes('alternate buffer');

    if (inAlternate && !this._isFullscreen) {
      console.log('Entered alternate screen');
      this._isFullscreen = true;
    } else if (!inAlternate && this._isFullscreen) {
      console.log('Left alternate screen');
      this._isFullscreen = false;
    }
  }

  _read() {
    if (this._isFullscreen) {
      this.push('Alternate screen output: Data\n');
    } else {
      this._stream._read();
    }
  }
}

const originalConsole = global.console;

// Custom console that simulates the terminal behavior
const customConsole = {
  ...originalConsole,

  /**
   * Redirects output to the customFullScreenAwareStream in order to illustrate the full screen state change demonstration.
   */
  log(this: typeof console, data: any, ...args: any[]): void {
    customFullScree·nAwareStream.push(String(data) + '\n');
    originalConsole.log.apply(originalConsole, [data, ...args]);
  },
};

/**
 * Simulates the xterm.js behavior for running in a web terminal, and enables handling full screen state for the terminal demo.
 */
class CustomXterm extends Readable {
  /**
   * Creates a custom xterm.js proxy for the demonstration.
   */
  constructor() {
    super({ objectMode: true });

    this._lines = 0;
    this._onData = (data: string) => {
      if (this._lines <= 10) {
        this.push(data);
        this._lines++;
      } else {
        // Skip output upon reaching line 11 to prevent overwhelming the console
      }
    };
  }

  onTitleChange(title: string) {
    const stream = new FullScreenAwareStream(this);
    customConsole.log = (data: any, ...args: any[]) => {
      stream.push('\u001b[32m' + data + '\u001b[0m', ...args);
      stream.onTitleChange(title);
    };
    setTimeout(() => {
      customConsole.log('XTerm.js Output:');
      this._lines = 0;
      const xterm = new Terminal();
      xterm.open(document.createElement('div') as HTMLDivElement);
      xterm.attachCustomBehavior();
      const outputStream = xterm._core.transport.output.pipe(
        new StringDecoder('utf-8')
      );
      outputStream.on('data', customConsole.log);
      xterm.write('XTerm.js Output:\n');
    });
  }

  _read() {
    // Not needed when using Node.js Console API
  }
}

/**
 * Start of the demonstration code
 */

// Create an instance of the custom terminal
const customXterm = new CustomXterm();

// Attach the title listener to the custom terminal
customXterm.onTitleChange(process.title);

// Simulate a core terminal by inputting a given value
customXterm._onData('nano example\n');

// Output a core prompt after 0.5 seconds
setTimeout(() => {
  customXterm._onData('example$ ');

  // Input sample data, close to a nano usage
  customXterm._onData('echo "Hello, World!" > Hello.txt\n');
  customXterm._onData(`cat Hello.txt\n`);

  // Input a full-screen terminal action
  customXterm._onData('nano Hello.txt\n');

  // Output a core prompt after 2 seconds
  setTimeout(() => {
    customXterm._onData('example$ ');
  }, 2000);
}, 500);
