const url = "https://wincacademydatabase.firebaseio.com/jørgen/tasks.json";

    // GET: 
    const getTasks = async () => {
      try {
      let response = await fetch(url);
      // console.log(response);
     let tasksObject = await response.json();
    //  console.log(tasksObject);
     let tasks = Object.keys(tasksObject).map(key => ({
            id: key,
            description: tasksObject[key].description,
            done: tasksObject[key].done
        }));
        // console.log(tasks);
        return tasks;
  }catch(error) {
      // console.log(error)
      document.getElementById('footer').innerHTML = `No tasks found. You're all done.`;
  }
  };


  // POST: 
    async function postData(url, newTaskInput = {}) {
        // Default options are marked with *
        clearFooter();
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(newTaskInput) // body data type must match "Content-Type" header
        });
       
        return response.json(); // parses JSON response into native JavaScript objects
      }
      
    

//DELETE:
    

       const deleteTaskFetch = async (id) => {
        const deleteMethod = {
          method: 'DELETE', // Method itself
          headers: {
           'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
          },
         }
         let deleteUrl = `https://wincacademydatabase.firebaseio.com/jørgen/tasks/${id}.json`

        //  console.log(deleteUrl);
       const respionse = await fetch(deleteUrl, deleteMethod);
        await (response => response.json());
        await (data => console.log(data));
       buildDOM();
       }
  
//PUT:

const updateTaskFetch = async (body) => {
 
  const putMethod = {
    method: 'PUT', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    },
    body: JSON.stringify(body) // We send data in JSON format
   }
 const response = await fetch(url, putMethod)
 .then(response => response.json())
//  .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
 .catch(err => console.log(err)) // Do something with the error
  }