const BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";
let allIssues = []
issuesUrl = `${BASE_URL}/issues`;
async function fetchIssues(url){
    const response = await fetch(url);
    const res = await response.json();
    console.log(res.data)
    allIssues = res.data;
    displayIssues(allIssues);
}
fetchIssues(issuesUrl);
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
}

function getPriorityBadge(priority) {
    if (priority === "high") return "badge-error";
    if (priority === "medium") return "badge-warning";
    return "badge-info";
}

function getLabelBadge(label) {
    if (label === "bug") return "badge-error";
    if (label === "enhancement") return "badge-success";
    if (label === "documentation") return "badge-info";
    return "badge-warning";
}

document.getElementById("searchBtn").addEventListener("click", async function() {
    const text = document.getElementById("searchText").value.trim();
    if (!text) return displayIssues(allIssues); 

    const response = await fetch(`${BASE_URL}/issues/search?q=${text}`);
    const res = await response.json();
    displayIssues(res.data); s
});

function displayIssues(issues){
    const issuesContainer = document.getElementById("issuesContainer");
    const total = document.getElementById("total");
    total.textContent = issues.length;
    issuesContainer.innerHTML = '';

    issues.forEach(issue=>{
        const borderColor = issue.status === "open" ? "border-green-500" : "border-purple-500";
        
        const card = document.createElement("div");
        card.className = `onclick="openModal(${issue.id})" bg-white shadow-md flex flex-col gap-3 p-6 rounded-xl border-t-4 ${borderColor} cursor-pointer hover:shadow-xl transition-shadow`; 
        card.innerHTML = `
                <div class="flex justify-between items-center">
                    <span class="badge ${issue.status === 'open' ? 'badge-success' : 'badge-error'} badge-sm">${issue.status}</span>
                    <span class="badge ${getPriorityBadge(issue.priority)} badge-sm">${issue.priority}</span>
                </div>
                <p class="font-semibold">${issue.title}</p>
                <p class="text-gray-500 text-sm line-clamp-2">${issue.description}</p>
                <div class="flex flex-wrap gap-1">
                    ${issue.labels.map(label => `<span class="badge ${getLabelBadge(label)} badge-sm">${label}</span>`).join("")}
                </div>
                <hr>
                <p class="text-xs text-gray-400">#${issue.id} by ${issue.author}</p>
                <p class="text-xs text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>
                `
        issuesContainer.appendChild(card)
    })
}

