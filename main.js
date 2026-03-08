const BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";
let allIssues = []
async function fetchIssues(){
    const response = await fetch(`${BASE_URL}/issues`);
    const res = await response.json();
    console.log(res.data)
    allIssues = res.data;
    displayIssues(allIssues);
}
fetchIssues()
function btnSelector(clickedBtn){
    document.querySelectorAll("#modesContainer button").forEach((btn)=>{
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline")
    });
    clickedBtn.classList.remove("btn-outline");
    clickedBtn.classList.add("btn-primary");

    const id = clickedBtn.id;

    if (id === "allBtn") {
        displayIssues(allIssues);
    } else if (id === "openBtn") {
        displayIssues(allIssues.filter(issue => issue.status === "open"));
    } else if (id === "closedBtn") {
        displayIssues(allIssues.filter(issue => issue.status === "closed")); 
}
console.log(allIssues.filter(issue => issue.status === "open"))
}

function displayIssues(issues){
    const issuesContainer = document.getElementById("issuesContainer");
    const total = document.getElementById("total");
    total.textContent = issues.length;
    issuesContainer.innerHTML = '';

    issues.forEach(issue=>{
        const borderColor = issue.status === "open" ? "border-green-500" : "border-purple-500";
        
        const card = `<div id="marginTop" class="shadow-2xl flex flex-col gap-4 p-8 rounded-xl border-t-4 ${borderColor}">
                    <p class="text-xl">Fix navigation menu on mobile devices</p>
                    <p class="text-gray-600">The navigation menu doesn't collapse properly on mobile devices...</p>
                    <div class="mb-2">
                        <button class="btn btn-error rounded-xl">BUG</button>
                        <button class="btn btn-warning rounded-xl">Help Wanted</button>
                        <hr class="mt-5">
                    </div>
                    <p>#1 by john_doe</p>
                    <p>1/15/2024</p>
                </div>`
        issuesContainer.appendChild(card)
    })
}

