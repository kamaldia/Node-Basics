
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */

function onDataReceived(text) {
  if (text === 'quit\n' || text === "exit\n") {
    quit();
  }
  else if((text.slice(0,5)) === "hello"){
    hello(text);
  }
  else if(text === "help\n"){
    help();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello or hello with name
 *
 * @returns {void}
 */
function hello(text){
  var new_text = text.trim();
  new_text = new_text.replace("\n","");
  console.log('hello' + new_text.slice(5,new_text.length) + '!')
}

/*
* Displays help menu
*
* @returns {void} //void is for the function to not return a value (tried to put it out of comment but didn't work)
*/
function help(){
  console.log("1.Type \"hello\" or \"hello X\" for greeting.\n2.Type \"exit\" or \"quit\" to close the app.\n3.Type \"help\" for help menu.")
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Kamal Dia")
