let IMG_SIZE = 500;
let MAX_LINES = 4000; // 4000;
let N_PINS = 36 * 8;
let MIN_LOOP = 20;
let MIN_DISTANCE = 20;
let LINE_WEIGHT = 20;
let FILENAME = '';
let SCALE = 20;
let HOOP_DIAMETER = 0.625;

let img;

// set up element variables
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
inputElement.addEventListener(
  'change',
  e => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
  },
  false
);
var ctx = document.getElementById('canvasOutput').getContext('2d');
var ctx2 = document.getElementById('canvasOutput2').getContext('2d');
var ctx3 = document.getElementById('canvasOutput3').getContext('2d');
let status = document.getElementById('status');
let drawStatus = document.getElementById('drawStatus');
let showPins = document.getElementById('showPins');
let pinsOutput = document.getElementById('pinsOutput');
let incrementalDrawing = document.getElementById('incrementalDrawing');
let incrementalCurrentStep = document.getElementById('incrementalCurrentStep');
let numberOfPins = document.getElementById('numberOfPins');
let numberOfLines = document.getElementById('numberOfLines');
let lineWeight = document.getElementById('lineWeight');

let length;
var R = {};

//pre initilization
let pin_coords;
let center;
let radius;

let line_cache_y;
let line_cache_x;
let line_cache_length;
let line_cache_weight;

//line variables
let error;
let img_result;
let result;
let line_mask;

let line_sequence;
let pin;
let thread_length;
let last_pins;

let listenForKeys = false;

//*******************************
//      Line Generation
//*******************************

imgElement.onload = function () {
  listenForKeys = false;
  showStep(1);
  showPins.classList.add('hidden');
  incrementalDrawing.classList.add('hidden');
  // Take uploaded picture, square up and put on canvas
  base_image = new Image();
  base_image.src = imgElement.src;
  ctx.canvas.width = IMG_SIZE;
  ctx.canvas.height = IMG_SIZE;
  ctx2.canvas.weight = IMG_SIZE * 2;
  ctx2.canvas.height = IMG_SIZE * 2;
  ctx.clearRect(0, 0, IMG_SIZE, IMG_SIZE);

  var selectedWidth = base_image.width;
  var selectedHeight = base_image.height;
  var xOffset = 0;
  var yOffset = 0;
  // square crop  center of picture
  if (base_image.height > base_image.width) {
    selectedWidth = base_image.width;
    selectedHeight = base_image.width;
    yOffset = Math.floor((base_image.height - base_image.width) / 2);
  } else if (base_image.width > base_image.height) {
    selectedWidth = base_image.height;
    selectedHeight = base_image.height;
    xOffset = Math.floor((base_image.width - base_image.height) / 2);
  }

  ctx.drawImage(
    base_image,
    xOffset,
    yOffset,
    selectedWidth,
    selectedHeight,
    0,
    0,
    IMG_SIZE,
    IMG_SIZE
  );
  length = IMG_SIZE;

  // make grayscale by averaging the RGB channels.
  // extract out the R channel because that's all we need and push graysacle image onto canvas
  var imgPixels = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
  R = img_result = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff);
  var rdata = [];
  for (var y = 0; y < imgPixels.height; y++) {
    for (var x = 0; x < imgPixels.width; x++) {
      var i = y * 4 * imgPixels.width + x * 4;
      var avg =
        (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
      imgPixels.data[i] = avg;
      imgPixels.data[i + 1] = avg;
      imgPixels.data[i + 2] = avg;
      rdata.push(avg);
    }
  }
  R.selection.data = rdata;
  ctx.putImageData(imgPixels, 0, 0, 0, 0, IMG_SIZE, IMG_SIZE);

  //circle crop canvas
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(IMG_SIZE / 2, IMG_SIZE / 2, IMG_SIZE / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // start processing
  NonBlockingCalculatePins();
};

/**
 * Non-blocking step 1: Calculate the pins
 * @param {function} callback - Callback function to execute after completion
 * @return {void}
 * @example
 * NonBlockingCalculatePins(function(pinCoords, statusMessage) {
 *  // Update the UI with statusMessage
 * document.getElementById('status').textContent = statusMessage;
 * // Proceed with precalculating lines
 * NonBlockingPrecalculateLines(pinCoords);
 * });
 **/
function NonBlockingCalculatePins(callback) {
  // set up necessary variables
  console.log('Calculating pins...');
  let pin_coords = [];
  let center = length / 2;
  let radius = length / 2 - 1 / 2;
  let i = 0;
  function codeBlock() {
    if (i < N_PINS) {
      let angle = (2 * Math.PI * i) / N_PINS;
      pin_coords.push([
        Math.floor(center + radius * Math.cos(angle)),
        Math.floor(center + radius * Math.sin(angle)),
      ]);
      i++;
      setTimeout(codeBlock, 0);
    } else {
      console.log('Done Calculating pins');
      if (typeof callback === 'function') {
        callback(pin_coords, 'Done Calculating pins');
      }
    }
  }
  setTimeout(codeBlock, 0);
}

/**
 * Non-blocking step 2: Precalculate the lines
 * @param {Array} pinCoords - Array of pin coordinates
 * @param {function} callback - Callback function to execute after completion
 * @return {void}
 * @example
 * NonBlockingPrecalculateLines(pinCoords, function(data, statusMessage) {
 * // Update the UI with statusMessage
 * document.getElementById('status').textContent = statusMessage;
 * // Pass the calculated data to the next function in the process
 * NonBlockingLineCalculator(data);
 * });
 **/
function NonBlockingPrecalculateLines(pinCoords, callback) {
  // set up necessary variables
  console.log('Precalculating all lines...');
  let line_cache_y = Array(N_PINS * N_PINS);
  let line_cache_x = Array(N_PINS * N_PINS);
  let line_cache_length = Array(N_PINS * N_PINS).fill(0);
  let line_cache_weight = Array(N_PINS * N_PINS).fill(1);
  let a = 0;

  function codeBlock() {
    if (a < N_PINS) {
      for (let b = a + MIN_DISTANCE; b < N_PINS; b++) {
        let x0 = pinCoords[a][0];
        let y0 = pinCoords[a][1];
        let x1 = pinCoords[b][0];
        let y1 = pinCoords[b][1];
        let d = Math.floor(
          Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))
        );
        let xs = linspace(x0, x1, d);
        let ys = linspace(y0, y1, d);

        line_cache_y[b * N_PINS + a] = ys;
        line_cache_y[a * N_PINS + b] = ys;
        line_cache_x[b * N_PINS + a] = xs;
        line_cache_x[a * N_PINS + b] = xs;
        line_cache_length[b * N_PINS + a] = d;
        line_cache_length[a * N_PINS + b] = d;
      }
      a++;
      setTimeout(codeBlock, 0);
    } else {
      console.log('Done Precalculating Lines');
      if (typeof callback === 'function') {
        callback(
          {
            line_cache_y,
            line_cache_x,
            line_cache_length,
            line_cache_weight,
          },
          'Done Precalculating Lines'
        );
      }
    }
  }

  setTimeout(codeBlock, 0);
}

function NonBlockingLineCalculator() {
  // set up necessary variables
  console.log('Drawing Lines...');
  status.textContent = 'Drawing Lines...';
  error = nj
    .ones([IMG_SIZE, IMG_SIZE])
    .multiply(0xff)
    .subtract(nj.uint8(R.selection.data).reshape(IMG_SIZE, IMG_SIZE));
  img_result = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff);
  result = nj.ones([IMG_SIZE * SCALE, IMG_SIZE * SCALE]).multiply(0xff);
  result = new cv.matFromArray(
    IMG_SIZE * SCALE,
    IMG_SIZE * SCALE,
    cv.CV_8UC1,
    result.selection.data
  );
  line_mask = nj.zeros([IMG_SIZE, IMG_SIZE], 'float64');

  line_sequence = [];
  pin = 0;
  line_sequence.push(pin);
  thread_length = 0;
  last_pins = [];
  let l = 0;

  (function codeBlock() {
    if (l < MAX_LINES) {
      if (l % 10 == 0) {
        draw();
      }

      max_err = -1;
      best_pin = -1;

      for (offset = MIN_DISTANCE; offset < N_PINS - MIN_DISTANCE; offset++) {
        test_pin = (pin + offset) % N_PINS;
        if (last_pins.includes(test_pin)) {
          continue;
        } else {
          xs = line_cache_x[test_pin * N_PINS + pin];
          ys = line_cache_y[test_pin * N_PINS + pin];

          line_err =
            getLineErr(error, ys, xs) *
            line_cache_weight[test_pin * N_PINS + pin];

          if (line_err > max_err) {
            max_err = line_err;
            best_pin = test_pin;
          }
        }
      }

      line_sequence.push(best_pin);

      xs = line_cache_x[best_pin * N_PINS + pin];
      ys = line_cache_y[best_pin * N_PINS + pin];
      weight = LINE_WEIGHT * line_cache_weight[best_pin * N_PINS + pin];

      line_mask = nj.zeros([IMG_SIZE, IMG_SIZE], 'float64');
      line_mask = setLine(line_mask, ys, xs, weight);
      error = subtractArrays(error, line_mask);

      p = new cv.Point(pin_coords[pin][0] * SCALE, pin_coords[pin][1] * SCALE);
      p2 = new cv.Point(
        pin_coords[best_pin][0] * SCALE,
        pin_coords[best_pin][1] * SCALE
      );
      cv.line(result, p, p2, new cv.Scalar(0, 0, 0), 2, cv.LINE_AA, 0);

      x0 = pin_coords[pin][0];
      y0 = pin_coords[pin][1];

      x1 = pin_coords[best_pin][0];
      y1 = pin_coords[best_pin][1];

      dist = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      thread_length += (HOOP_DIAMETER / length) * dist;

      last_pins.push(best_pin);
      if (last_pins.length > 20) {
        last_pins.shift();
      }
      pin = best_pin;

      //update status
      drawStatus.textContent =
        l +
        ' Lines drawn | ' +
        Math.round((l / MAX_LINES) * 100) +
        '% complete';

      l++;
      setTimeout(codeBlock, 0);
    } else {
      console.log('Done Drawing Lines');
      Finalize();
    }
  })();
}

function draw() {
  let dsize = new cv.Size(IMG_SIZE * 2, IMG_SIZE * 2);
  let dst = new cv.Mat();
  cv.resize(result, dst, dsize, 0, 0, cv.INTER_AREA);
  cv.imshow('canvasOutput2', dst);
  dst.delete();
}

function Finalize() {
  let dsize = new cv.Size(IMG_SIZE * 2, IMG_SIZE * 2);
  let dst = new cv.Mat();
  cv.resize(result, dst, dsize, 0, 0, cv.INTER_AREA);

  console.log('complete');
  drawStatus.textContent = MAX_LINES + ' Lines drawn | 100% complete';

  cv.imshow('canvasOutput2', dst);
  console.log(line_sequence);
  status.textContent = 'Complete';
  pinsOutput.value = line_sequence;
  showPins.classList.remove('hidden');
  dst.delete();
  result.delete();
  window.scrollTo({ top: 5000, left: 0, behavior: 'smooth' });
}

function getLineErr(arr, coords1, coords2) {
  let result = new Uint8Array(coords1.length);
  for (i = 0; i < coords1.length; i++) {
    result[i] = arr.get(coords1[i], coords2[i]);
  }
  return getSum(result);
}

function setLine(arr, coords1, coords2, line) {
  for (i = 0; i < coords1.length; i++) {
    arr.set(coords1[i], coords2[i], line);
  }
  return arr;
}

function compareMul(arr1, arr2) {
  let result = new Uint8Array(arr1.length);
  for (i = 0; i < arr1.length; i++) {
    result[i] = (arr1[i] < arr2[i]) * 254 + 1;
  }
  return result;
}

function compareAbsdiff(arr1, arr2) {
  let rsult = new Uint8Array(arr1.length);
  for (i = 0; i < arr1.length; i++) {
    rsult[i] = arr1[i] * arr2[i];
  }
  return rsult;
}

function subtractArrays(arr1, arr2) {
  for (i = 0; i < arr1.selection.data.length; i++) {
    arr1.selection.data[i] = arr1.selection.data[i] - arr2.selection.data[i];
    if (arr1.selection.data[i] < 0) {
      arr1.selection.data[i] = 0;
    } else if (arr1.selection.data[i] > 255) {
      arr1.selection.data[i] = 255;
    }
  }
  return arr1;
}

function subtractArraysSimple(arr1, arr2) {
  for (i = 0; i < arr1.length; i++) {
    arr1[i] = arr1[i] - arr2[i];
  }
  return arr1;
}

function getSum(arr) {
  let v = 0;
  for (i = 0; i < arr.length; i++) {
    v = v + arr[i];
  }
  return v;
}

function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var currValue = startValue;
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(Math.round(currValue + step * i));
  }
  return arr;
}

function AddRGB(arr1, arr2, arr3) {
  for (i = 0; i < arr1.data.length; i++) {
    var avg = arr1.data[i] + arr2.data[i] + arr3.data[i];
    arr1.data[i] = avg;
  }
  return arr1;
}

function linspace(a, b, n) {
  if (typeof n === 'undefined') n = Math.max(Math.round(b - a) + 1, 1);
  if (n < 2) {
    return n === 1 ? [a] : [];
  }
  var i,
    ret = Array(n);
  n--;
  for (i = n; i >= 0; i--) {
    ret[i] = Math.floor((i * b + (n - i) * a) / n);
  }
  return ret;
}

function showStep(id) {
  let step1 = document.getElementById('step1');
  let step2 = document.getElementById('step2');
  let step3 = document.getElementById('step3');

  switch (id) {
    case 1:
      step1.classList.remove('hidden');
      step2.classList.add('hidden');
      step3.classList.add('hidden');
      break;
    case 2:
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
      step3.classList.add('hidden');
      break;
    case 3:
      step1.classList.add('hidden');
      step2.classList.add('hidden');
      step3.classList.remove('hidden');
      break;
    default:
      break;
  }
}

//********************************
//      Creation Assistant
//********************************

var pointIndex = 0;
var lastStepImage;

function startCreating() {
  window.speechSynthesis.getVoices();
  incrementalDrawing.classList.remove('hidden');

  base_image2 = new Image();
  ctx3.canvas.width = IMG_SIZE * 2;
  ctx3.canvas.height = IMG_SIZE * 2;
  ctx3.clearRect(0, 0, IMG_SIZE * 2, IMG_SIZE * 2);
  ctx3.drawImage(base_image2, 0, 0, IMG_SIZE * 2, IMG_SIZE * 2);

  line_sequence = pinsOutput.value.split(',').map(V => {
    return parseInt(V);
  });

  window.scrollTo({ top: 5000, left: 0, behavior: 'smooth' });

  incrementalCurrentStep.textContent = '';
  pointIndex = 0;
  if (pin_coords == null) {
    CalculatePins();
  }
  nextStep();
  listenForKeys = true;
}

function startDrawing() {
  incrementalDrawing.classList.remove('hidden');
  listenForKeys = false;

  base_image2 = new Image();
  ctx3.canvas.width = IMG_SIZE * 2;
  ctx3.canvas.height = IMG_SIZE * 2;
  ctx3.clearRect(0, 0, IMG_SIZE * 2, IMG_SIZE * 2);
  ctx3.drawImage(base_image2, 0, 0, IMG_SIZE * 2, IMG_SIZE * 2);

  line_sequence = pinsOutput.value.split(',').map(V => {
    return parseInt(V);
  });

  window.scrollTo({ top: 5000, left: 0, behavior: 'smooth' });

  incrementalCurrentStep.textContent = '';
  pointIndex = 0;
  if (pin_coords == null) {
    CalculatePins();
  }

  let j = 0;
  (function codeBlock() {
    if (j < MAX_LINES - 1) {
      //incrementalCurrentStep.textContent = "Current Line: " + (pointIndex + 1) + " |  Pin " + line_sequence[pointIndex] + " to " + line_sequence[pointIndex + 1];
      pointIndex++;
      ctx3.beginPath();
      ctx3.moveTo(
        pin_coords[line_sequence[pointIndex - 1]][0] * 2,
        pin_coords[line_sequence[pointIndex - 1]][1] * 2
      );
      ctx3.lineTo(
        pin_coords[line_sequence[pointIndex]][0] * 2,
        pin_coords[line_sequence[pointIndex]][1] * 2
      );
      ctx3.strokeStyle = 'black';
      ctx3.lineWidth = 0.3;
      ctx3.stroke();
      j++;
      setTimeout(codeBlock, 0);
    } else {
    }
  })();
}

function nextStep() {
  if (pointIndex > MAX_LINES - 1) {
    return;
  }
  incrementalCurrentStep.textContent =
    'Current Line: ' +
    (pointIndex + 1) +
    ' |  Pin ' +
    line_sequence[pointIndex] +
    ' to ' +
    line_sequence[pointIndex + 1];

  if (pointIndex > 0) {
    //ctx3.clearRect(0,0, IMG_SIZE * 2, IMG_SIZE * 2);
    ctx3.putImageData(lastStepImage, 0, 0);
    ctx3.beginPath();
    ctx3.moveTo(
      pin_coords[line_sequence[pointIndex - 1]][0] * 2,
      pin_coords[line_sequence[pointIndex - 1]][1] * 2
    );
    ctx3.lineTo(
      pin_coords[line_sequence[pointIndex]][0] * 2,
      pin_coords[line_sequence[pointIndex]][1] * 2
    );
    ctx3.strokeStyle = 'black';
    ctx3.lineWidth = 0.3;
    ctx3.stroke();
  }

  lastStepImage = ctx3.getImageData(0, 0, IMG_SIZE * 2, IMG_SIZE * 2);

  pointIndex++;
  ctx3.beginPath();
  ctx3.moveTo(
    pin_coords[line_sequence[pointIndex - 1]][0] * 2,
    pin_coords[line_sequence[pointIndex - 1]][1] * 2
  );
  ctx3.lineTo(
    pin_coords[line_sequence[pointIndex]][0] * 2,
    pin_coords[line_sequence[pointIndex]][1] * 2
  );
  ctx3.strokeStyle = '#FF0000';
  ctx3.lineWidth = 1;
  ctx3.stroke();

  //window.speechSynthesis.speak(new SpeechSynthesisUtterance(line_sequence[pointIndex + 1]));
}

function lastStep() {
  if (pointIndex < 2) {
    return;
  }
  pointIndex--;
  pointIndex--;
  ctx3.clearRect(0, 0, IMG_SIZE * 2, IMG_SIZE * 2);
  incrementalCurrentStep.textContent =
    'Current Line: ' +
    (pointIndex + 1) +
    ' |  Pin ' +
    line_sequence[pointIndex] +
    ' to ' +
    line_sequence[pointIndex + 1];

  for (i = 0; i < pointIndex; i++) {
    ctx3.beginPath();
    ctx3.moveTo(
      pin_coords[line_sequence[i]][0] * 2,
      pin_coords[line_sequence[i]][1] * 2
    );
    ctx3.lineTo(
      pin_coords[line_sequence[i + 1]][0] * 2,
      pin_coords[line_sequence[i + 1]][1] * 2
    );
    ctx3.strokeStyle = 'black';
    ctx3.lineWidth = 0.3;
    ctx3.stroke();
  }
  lastStepImage = ctx3.getImageData(0, 0, IMG_SIZE * 2, IMG_SIZE * 2);
  pointIndex++;
  ctx3.beginPath();
  ctx3.moveTo(
    pin_coords[line_sequence[pointIndex - 1]][0] * 2,
    pin_coords[line_sequence[pointIndex - 1]][1] * 2
  );
  ctx3.lineTo(
    pin_coords[line_sequence[pointIndex]][0] * 2,
    pin_coords[line_sequence[pointIndex]][1] * 2
  );
  ctx3.strokeStyle = '#FF0000';
  ctx3.lineWidth = 1;
  ctx3.stroke();
}

function CalculatePins() {
  console.log('Calculating pins...');
  pin_coords = [];
  center = IMG_SIZE / 2;
  radius = IMG_SIZE / 2 - 1 / 2;

  for (i = 0; i < N_PINS; i++) {
    angle = (2 * Math.PI * i) / N_PINS;
    pin_coords.push([
      Math.floor(center + radius * Math.cos(angle)),
      Math.floor(center + radius * Math.sin(angle)),
    ]);
  }
}

function onHasSteps() {
  step1.classList.add('hidden');
  step2.classList.add('hidden');
  step3.classList.add('hidden');
  showPins.classList.remove('hidden');
  window.scrollTo({ top: 5000, left: 0, behavior: 'smooth' });
}

document.body.onkeydown = function (e) {
  if (!listenForKeys) {
    return;
  }
  if (e.keyCode == 32) {
    // space bar
    nextStep();
  } else if (e.keyCode == 39) {
    //right key
    nextStep();
  } else if (e.keyCode == 37) {
    //left key
    lastStep();
  }
};
function example1() {
  // removed for simplicity
  pinsOutput.value = '';
}
function example2() {
  // removed for simplicity
  pinsOutput.value = '';
}
function example3() {
  // removed for simplicity
  pinsOutput.value = '';
}

function onOpenCvReady() {
  // even when this is called, sometimes it's still not ready, adding slight time buffer
  setTimeout(function () {
    document.getElementById('status').innerHTML = 'Generator is ready.';
  }, 1000);

  numberOfPins.value = N_PINS;
  numberOfPins.addEventListener('keyup', function (event) {
    N_PINS = parseInt(event.target.value);
  });

  numberOfLines.value = MAX_LINES;
  numberOfLines.addEventListener('keyup', function (event) {
    MAX_LINES = parseInt(event.target.value);
  });

  lineWeight.value = LINE_WEIGHT;
  lineWeight.addEventListener('keyup', function (event) {
    LINE_WEIGHT = parseInt(event.target.value);
  });
}
