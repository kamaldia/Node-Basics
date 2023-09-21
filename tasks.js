
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
var tasks_list = ["Greet","Quit","Help","List","Add","Remove"] ;

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
  else if((text.slice(0,3)) === "add" && text !== "add\n") {
    add(text);
  }
  else if((text.slice(0,6)) === "remove") {
    if (text === "remove" || text === "remove\n") {
      remove(tasks_list, 0);
    }
    else if (((text.replace(/\s+/g, "")).slice(6, text.length)) == 1) { //in the regular expression => /\s+/g <= \s is any space, + is to join \s with g which iterate over the string
      remove(tasks_list, 1);
    }
    else {
      let temp = (text.replace(/\s+/g, "")).slice(6, text.length); //to take the number
      if (temp <= tasks_list.length) {
        remove(tasks_list, temp)
      }
      else {
        console.log("The number you entered doesn't exist.") //to handle error
      }
    }
  }
  else if((text.slice(0,4)) === "list") {
    list();
  }
  else if((text.slice(0,4)) === "edit") {
    if (text === "edit" || text === "edit\n") {
      edit(tasks_list, "error");
    }
    else if (text.length > 4 && isNaN((text.replace(/\s+/g, ""))[4])) { //in the regular expression => /\s+/g <= \s is any space, + is to join \s with g which iterate over the string
      edit(tasks_list, 0, (text.replace(/\s+/g, "")).slice(4,(text.replace(/\s+/g, "")).length)); //if the 4th index of the text stripped from whitespaces is not a number we execute
    }
    else{
      edit(tasks_list, 1, (text.replace(/\s+/g, "")).slice(5,(text.replace(/\s+/g, "")).length), text[5]);
    }
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
  console.log("1.Type \"hello\" or \"hello X\" for greeting.\n2.Type \"exit\" or \"quit\" to close the app.\n3.Type \"help\" for help menu.\n4.Type \"add X\" to add task \"X\" to the list of tasks.\n5.Type \"list\" to show the list of tasks.\n6.Type \"remove\" to remove last task from the list, \"remove 1\" or \"remove 2\" to remove first or second task in the list respectively.")
}

/*
 * adds a task
 */
function add(text){
  var text = text.trim()
  text = text.slice(3, text.length)
  text = text.trim() // trim again to remove space before text
  tasks_list.push(text)
  console.log("Added " + text)
}

/*
 * lists all tasks
 */
function list() {
  var menu = "Task:\n------------\n";
  for(i=0 ; i < tasks_list.length ; i++){
    menu += i+1 + "." + tasks_list[i] + "\n" ; //lists the tasks in array, while adding a number based on task's index in the list
  }
  console.log(menu)
}

/*
 * removes tasks
 */
function remove(array, remove_argument) {
  if (remove_argument == 0) {
    array.pop();
    console.log("The last task \"" + tasks_list[tasks_list.length -1] + "\" is removed from the list.")
  }
  else if (remove_argument == 1) {
    array.shift();
    console.log("The first task \"" + tasks_list[0] + "\" is removed from the list.")
  }
  else {
    console.log("Task \"" + array[remove_argument-1] + "\" is removed from the list.")
    array.splice(remove_argument-1,1); // removes one item begining from index 1
  }
}

function edit(array, edit_argument, text, i) {
  if (edit_argument == 0) {
    array[array.length -1] = text;
  }
  else if (edit_argument == 1 && i <= array.length) {
    array[i-1] = text;
  }
  else if (edit_argument == "error") {
    console.log("Error: Please enter \"edit new text\" or \"edit 1 new text\"!")
  }
  else{
    console.log("wrong number")
  }
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
