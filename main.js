document.getElementById("issueInputForm").addEventListener("submit", saveIssue);
function saveIssue(e) {
  let issueDesc = document.getElementById("issueDescription").value;
  let issueSeverity = document.getElementById("issueSeverity").value;
  let issueAssignedTo = document.getElementById("issueAssign").value;
  let issueId = chance.guid();
  let issueStatus = "Open";
  let issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  if (localStorage.getItem("issues") === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }
  document.getElementById("issueInputForm").reset();

  fetchIssues();
  e.preventDefault();
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem("issues"));
  var issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=
      '<div class="well jumbotron">' +
      "<h6>Issue ID: " +
      id +
      "</h6>" +
      '<p><span class="label label-info badge badge-primary">' +
      status +
      "</span></p>" +
      "<h3>" +
      desc +
      "</h3>" +
      '<p><span class="glyphicon glyphicon-time"></span> ' +
      severity +
      "</p>" +
      '<p><span class="glyphicon glyphicon-user"></span> ' +
      assignedTo +
      "</p>" +
      '<a href="#" onclick="setStatusClosed(\'' +
      id +
      '\')" class="btn btn-warning">Close</a> ' +
      '<a href="#" onclick="deleteIssue(\'' +
      id +
      '\')" class="btn btn-danger">Delete</a>' +
      `<br>` +
      `<form id="answers" onload="fetchAnswers()">` +
      `<label for="postAnswers"> Post Answer </label>` +
      `<input class="form-control" id="postAnswers">` +
      `<button class="btn btn-primary" type="submit">POST</button>` +
      `<div class="col-lg-12">` +
      `<div id="answerList"></div>` +
      `</div>` +
      `</form>` +
      "</div>";
  }
}

document.getElementById("answers").addEventListener("submit", saveAnswer);

function saveAnswer(e) {
  var postAnswer = document.getElementById("postAnswers").value;
  var postId = chance.guid();
  var post = {
    id: postId,
    answer: postAnswer,
  };
  if (localStorage.getItem("posts") === null) {
    var posts = [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
  } else {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
  }
  document.getElementById("answers").reset();

  fetchAnswers();
  e.preventDefault();
}

function fetchAnswers() {
  var posts = JSON.parse(localStorage.getItem("posts"));
  var answerList = document.getElementById("answerList");
  answerList.innerHTML = "";

  for (var i = 0; i < posts.length; i++) {
    var id = posts[i].id;
    var post = posts[i].answer;
    answerList.innerHTML =
      `<div>` +
      `<h6> Answer ID:` +
      id +
      `</h6>` +
      `<h3>` +
      post +
      `</h3>` +
      `</div>`;
  }
}
