let currentPage = 1;


async function fetchTasks(){
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;
    const completed = document.getElementById("completed").value;
    const tags = document.getElementById("tags").value;

    let url = `/tasks?page=${currentPage}&limit=5`;

    if(status) url += `&status=${status}`;
    if(priority) url += `&priority=${priority}`;
    if(completed) url += `&completed=${completed}`;
    if(tags) url += `&tags=${tags}`;

    const result = await fetch(url);
    const tasks = await result.json();

    const container = document.getElementById("task-list");
    container.innerHTML = "";

    tasks.forEach(tasks=>{
        const div = document.createElement('div');
        div.innerHTML = `<strong>${tasks.title}</strong> - ${tasks.status} - ${tasks.priority}`;
        container.appendChild(div);
    })

    document.getElementById("current-page").innerText = currentPage;
}

function changePage(step){
    currentPage += step;
    if(currentPage < 1) currentPage = 1;
    fetchTasks();
}