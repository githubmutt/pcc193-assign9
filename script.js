window.onload = init;

// The contact manager as a global variable
let abm;
/**
 * Function Name: init()
 * This method creates and intializes a new instance of AddressBookManager
 */
function init() {
  // create an instance of the contact manager
  abm = new AddressBookManager();
  
}
/**
 * Class Name: Contact
 * This class takes both name and email to instantiate itself
 */
class Contact {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
// ====================================================================
//            !!! DO NOT MODIFY ABOVE THIS LINE!!!
// ====================================================================



function debug(text){
    console.log( text )
    //document.getElementById("log").innerHTML += text + "<br>"
  
  }


  /** 
 * Function Name: formSubmitted()
 * This function takes both name and email from the HTML to create 
 * an instance of Contact object for storage in the AddressBookManager
 * referenced by the global variable, abm.
 * This function returns a boolean to avoid form submission via HTTP
*/
function formSubmitted(evt ) {
    // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT
    
//   console.log( evt )
//   console.log( evt.preventDefault )

    let nameTag = document.getElementById("name")
    let emailTag = document.getElementById("email")

    // just a list of valid .com, .net et all addresses 
    const pattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[com|net|org|tv|gov|us|be]$/
    console.log("REGEXP: " + pattern.test(emailTag.value)  )    

    // console.log("REGEXP: " + pattern.test( emailTag.value) )    
    // incorrect email, so don't save
    if( !pattern.test(emailTag.value)){

        return false

      
    }


    // add Contact
    abm.add( new Contact(nameTag.value , emailTag.value)  )

    // display Contacts
    abm.displayContactTable("contacts")    

    // Clear out form
    nameTag.value = ""
    emailTag.value = ""
  
    // RETURN false to prevent refresh
    return false

}
  /** 
   * Function Name: emptyList()
   * This function empties the contact list in AddressBookManager
   * and displays the default "No contacts to display!" message. 
  */
  function emptyList() {
    // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT

    // sets length to 0 which empties the array
    abm.empty()
    
    // display again
    abm.displayContactTable("contacts")

  }
  /** 
   * Function Name: sortList()
   * This function sorts the contact list by name in descending 
   * alphabetical order, by invoking AddressBookManager's sort() and 
   * displaying the result in the table display area.
   */
  function sortList() {
    // YOUR CODE HERE
    abm.sort()
    abm.displayContactTable("contacts")

}
  /** 
   * Function Name: saveList()
   * This function saves the contact list in HTML Web Storage's
   * localStorage. You will invoke AddressBookManager's save() to
   * accomplish this.
   */
  function saveList() {
    // YOUR CODE HERE

    localStorage.setItem("contacts" , JSON.stringify(abm.listOfContacts)  )

  }
  /** 
   * Function Name: loadList()
   * This function loads the contact list from HTML Web Storage's
   * localStorage. You will invoke AddressBookManager's load() and
   * display the loaded list into the table display area.
   */
  function loadList() {
    // YOUR CODE HERE

    abm.load()
/*
    let contacts = localStorage.getItem("contacts") 

    console.log("loading contacts")
    console.log( contacts )
    
    let db = JSON.parse( contacts )
    console.log( db )
    
    abm.listOfContacts = db
    abm.displayContactTable("contacts")
    */ 

  }
  /** 
   * Class Name: AddressBookManager
   * This class initializes an empty contact list. This class has
   * THREE (3) methods:
   *    1. empty(): empty contact list.
   *    2. add(contact): add a named contact to list.
   *    3. displayContactTable(htmlId): displays the contact list in a 
   *       table format; if there is no contact in the list, print
   *       "No contacts to display!" in HTML.
  */
  class AddressBookManager {
    constructor() {
      this.listOfContacts = [];
    }
    /** 
     * Method Name: empty()
     * This method empties the contact list.
    */
    empty() {
      // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT
      this.listOfContacts.length = 0
      debug("listofContacts.length = " + this.listOfContacts.length )
  
    }
    /** 
     * Method Name: add(contact)
     * This method adds the named contact to the contact list.
    */
    add(contact) {
      // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT

      debug("CONTACT:" + contact.name + " " + contact.email)
      abm.listOfContacts.push( contact )
  
      let row = "<tr><td>" + contact.name + "N</td<td>" + contact.email + "</td></tr>"

       for(let v of abm.listOfContacts)
            debug( v.name + " " + v.email )

    }
    /** 
     * Method Name: displayContactTable(htmlId)
     * This method clears the prior table content and displays 
     * the new table content from the non-empty contact list in 
     * a correctly formatted HTML table. If the contact list is 
     * empty, this method prints a "No contacts to display!" 
     * message in HTML as depicted in the demo.
    */
    displayContactTable(htmlId) {
      // YOUR CODE HERE - FROM YOUR PREVIOUS ASSIGNMENT
      var header = "<table>  <thead>  <tr> <td>Name</td> <td>Email</td> </thead> <br>"
      var rows=""
      var contacts =  document.getElementById("contacts")   
      var arow = (name,email )  => ( "<tr><td>" + name + "</td><td>" +  email)
      
      if( abm.listOfContacts.length == 0){
          contacts.innerHTML = "No contacts"
      }else{
            for(let e in abm.listOfContacts){
                    rows +=  arow( abm.listOfContacts[e].name, abm.listOfContacts[e].email )
             }
            
             contacts.innerHTML = header + rows + "</table>"
  
            } // if else

    }
  
    /**
     * Method name: sort()
     * This method sorts the contact list elements by descending alphabetical
     * order. For example: 
     * Original list: "Joe", "Kay", "Zoe"
     * Sorted list in descending order: "Zoe", "Kay", "Joe"
     * You may want to check: https://www.w3schools.com/jsref/jsref_sort.asp
     */
    sort() {
      // YOUR CODE HERE
      // Contact.name get sorted IN-PLACE in reverse order (z-a)
      abm.listOfContacts.sort ( (a,b) => a.name < b.name ? 1:-1)

//    by email
//      abm.listOfContacts.sort ( (a,b) => a.email < b.email ? 1:-1)

      debug( this.listOfContacts)

    }
    /**
     * Method name: load()
     * This method loads the contact list string from HTML Web Storage's
     * localStorge back.
     */
    load() {
      // YOUR CODE HERE

      let contacts = localStorage.getItem("contacts") 

      console.log("loading contacts")
      console.log( contacts )
      
      let db = JSON.parse( contacts )
      console.log( db )
      console.log( db.length )

      // Only load is something in localStorage
      if( db.length > 0){
           this.listOfContacts = db
      }else{
           console.log("localStorage empty")
      }

      this.displayContactTable("contacts")

    }
    /**
     * Method name: save()
     * This method saves the contact list into a JSON string in
     * HTML Web Storage's localStorage. 
     */
    save() {
      // YOUR CODE HERE

      saveList()

    }
  
  }