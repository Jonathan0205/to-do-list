window.addEventListener("DOMContentLoaded",function(){
    
    let form = document.querySelector("form");
    let taskInput = document.getElementById("taskInput");
    taskList = document.getElementById("taskList");
    let obj = { };
    let count = 0;
  
    function killList(element){
        element.parentNode.removeChild(element);
        
    }
    function changeStatus(element){
        let countAttr = element.getAttribute("count");


                if(element.getAttribute("state") == "true"){
                    element.style="text-decoration:none;"   
                    
                    element.setAttribute("state","false")
                    obj[countAttr]={"text":element.outerHTML,"count":countAttr,"state":"false"}
                    
                    localStorage.setItem("list", JSON.stringify(obj));
                    
                }else{
                    element.style="text-decoration:line-through;"   
                    element.setAttribute("state","true")
                    obj[countAttr]={"text":element.outerHTML,"count":countAttr,"state":"true"}
                    localStorage.setItem("list", JSON.stringify(obj));
                }
    }

    function getStorage(item){
        let list = localStorage.getItem(item);
        let listParser = JSON.parse(list);
        return listParser;
    }

    function loadList(){
        let listParser = getStorage("list")
        if(listParser){
        
  
            Object.values(listParser).forEach((element,index) => {
                let tempElement = document.createElement("div");
                tempElement.innerHTML = element.text;
                let li = tempElement.firstChild;
                li.onclick = function() {
                  changeStatus(this);
                };
                li.ondblclick = function() {
                    killList(this)
                     let updatedList = { ...listParser};
                 
                    delete updatedList[this.getAttribute("count")];
                    localStorage.setItem("list", JSON.stringify(updatedList));
                    listParser = getStorage("list")
                }
                taskList.appendChild(li);
   

           

            obj[index] ={"text":element.text};   
            });
            count  = taskList.childElementCount;
        }
    }



    function createTask(value){
        let elementList = document.createElement("li");
        elementList.innerHTML = "<span>"+value+"</span> </div>"
        taskList.appendChild(elementList);
        taskInput.value ="";
        elementList.setAttribute("count",count)
      
        obj[count]={"text":taskList.children[count].outerHTML}
        localStorage.setItem("list", JSON.stringify(obj));
        count++
        return elementList;
    }


  
 
    form.addEventListener("submit",function(event){
        event.preventDefault();
        if(taskInput.value == ""){
            alert("Please check the input not can't empty")
        }else{
            let listParser = getStorage("list");
            let elementList = createTask(taskInput.value)
            location.reload()
         

        }
    })

    loadList()

})