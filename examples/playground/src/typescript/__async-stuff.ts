export let count = 1;
async function asyncFunction() {
  // This Promise will reject with an error after 1 second
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`AT ZERO ·0· Something went wrong! ${count++}`));
    }, 1000);
  });
}

// Scenario 1: Catching the error locally
// This will log the error to the console and return null
async function scenario1() {
  try {
    const result = await asyncFunction();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Scenario 3: Handling the error in the caller
// This will log the error to the console and return null
async function scenario2() {
  const result = await asyncFunction().catch(error => {
    console.error(error);
    return null;
  });
  return result;
}

// Scenario 3: Catching the error locally
// This will log the error to the console and return null
async function scenario3() {
  const result = await asyncFunction();
  return result;
}

// Scenario 4: Catching the error locally
// This will log the error to the console and return null
async function scenario4() {
  const result = await asyncFunction().then(x => {
    console.log('scenarion4', x);
    return x;
  });
  return result;
}

async function callerFunction() {
  // try {
  const result1 = await scenario1(); // This will log an "unhandled promise rejection" error to the console
  console.log(result1);
  // } catch (error) {
  console.error('AT ONE ·1· scenario1 Error in callerFunction:', 'error');
  // }
  try {
    const result2 = await scenario2(); // This will log an "unhandled promise rejection" error to the console
    console.log(result2);
  } catch (error) {
    console.error('AT TWO ·2· scenario2 Error in callerFunction:', error);
  }
  try {
    const result3 = await scenario3(); // This will log an "unhandled promise rejection" error to the console
    console.log(result3);
  } catch (error) {
    console.error('AT THREE ·3· Error in callerFunction:', error);
  }
  try {
    const result4 = await scenario4(); // This will log an "unhandled promise rejection" error to the console
    console.log(result4);
  } catch (error) {
    console.error('AT FOUR ·4· scenario4 Error in callerFunction:', error);
  }
  try {
    const result5 = await asyncFunction(); // This will log an "unhandled promise rejection" error to the console
    console.log(result5);
  } catch (error) {
    console.error('AT FIVE ·5· Error in callerFunction:', error);
  }

  try {
    const result6 = await asyncFunction().catch(error => {
      console.error('AT SIX ·6· in 6 Error in asyncFunction:', error);
      return null;
    });
    console.log(result6);
  } catch (error) {
    console.error('6 Error in callerFunction:', error);
  }

  try {
    const result7 = await asyncFunction().catch(error => {
      console.error('AT SEVEN ·7· in 7 Error in asyncFunction:', error);
      throw error;
    });
    console.log(result7);
  } catch (error) {
    console.error('7 Error in callerFunction:', error);
  }
}
callerFunction();
