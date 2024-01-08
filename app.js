function showErrorMsg(MSG) {
  Swal.fire({
      type: 'error',
      icon: 'error',
      title: 'Oops...',
      html: MSG,
      footer: "CodeSegment" 
  });
}

function isNullEmptyUndefinedEmptyString(val) {
  return isNullEmpty(val) || val === "undefined" || val === "";
}

function isNullEmpty(val) {
  return val === null || val === undefined || val === "";
}


let assignmentNo = document.getElementById('assignmentNo'); // Get 
let assignment_No = document.getElementById('assignment-No'); // preview 
let assignmentMarks = document.getElementById('assignmentMarks'); // Get
let assignment_Marks = document.getElementById('assignment-Marks'); // Preview
let obtain_Marks = document.getElementById('obtain'); // Preview
let taskTotal_Marks = document.getElementById('taskTotalMarks'); // Preview
var totalObtainedScore = document.getElementById('totalObtainedScore'); // In table data
var totalObtainedScoreShow = document.getElementById('totalObtainedScoreShow'); // In table data
var totalAssignmentMarks = document.getElementById('totalAssignmentMarks'); // In table data

//#region Validation
function isValidForm() {
  var errMsg = "";
  var valid = true;
  try {
      if (isNullEmptyUndefinedEmptyString(taskName)) { errMsg += "<br>Enter Name of Task"; valid = false; }
      if (isNullEmptyUndefinedEmptyString(getMarks)) { errMsg += "<br>Enter obtainable marks"; valid = false; }
      if (isNullEmptyUndefinedEmptyString(taskMarks)) { errMsg += "<br>Enter task marks"; valid = false; }
      else if(taskMarks == 0 ) { errMsg += "<br>Task marks can not be 0"; valid = false; }
      if (!valid) { showErrorMsg(errMsg); }
  } catch (error) {
      errMsg = error.message;
  } finally {
      return valid;
  }
  
}

//#endregion

var studentArray = [];

function addStudent() {
  // Get form inputs
var taskName = document.getElementById('taskName').value;
var getMarks = Number(document.getElementById('getMarks').value);
var taskMarks = Number(document.getElementById('taskMarks').value);
var errMsg = "";
  var valid = true;
  try {
      if (isNullEmptyUndefinedEmptyString(taskName)) { errMsg += "<br>Enter Name of Task"; valid = false; }
      if (isNullEmptyUndefinedEmptyString(getMarks)) { errMsg += "<br>Enter obtainable marks"; valid = false; }
      if (isNullEmptyUndefinedEmptyString(taskMarks)) { errMsg += "<br>Enter task marks"; valid = false; }
      else if(taskMarks == 0 ) { errMsg += "<br>Task marks can not be 0"; valid = false; }
      else if(taskMarks == assignmentMarks.value || taskMarks > assignmentMarks.value ) { errMsg += "<br>Task marks always lower than Total Assignment Marks."; valid = false; }
      if ( taskMarks < getMarks ) {
        Swal.fire({
          title: 'Error!',
          text: 'Obtained marks must be less than task marks',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        return;
    }
    if (!valid) { showErrorMsg(errMsg); }

      else {
        var newRow = document.createElement('tr');  // Create a new row
      
        // Add cells to the row with the same classes as the form inputs
        var taskNameCell = document.createElement('td');
        taskNameCell.textContent = taskName;
        newRow.appendChild(taskNameCell);
      
        var getMarksCell = document.createElement('td');
        getMarksCell.textContent = getMarks;
        newRow.appendChild(getMarksCell);
      
        var taskMarksCell = document.createElement('td');
        taskMarksCell.textContent = taskMarks;
        newRow.appendChild(taskMarksCell);
      
        // Append the new row to the table body
        document.getElementById('marksTable').getElementsByTagName('tbody')[0].appendChild(newRow);
        document.getElementById('clearTableBtn').classList.remove('disabled');
        // Add student info to the array
        studentArray.push({
          taskName: taskName,
          getMarks: getMarks,
          taskMarks: taskMarks
        });
      var sumGetMarks = 0, sumTotalAssignmentMarks = 0;
        studentArray.forEach(s => {
          sumGetMarks += s.getMarks;
          sumTotalAssignmentMarks += s.taskMarks;
          
          totalObtainedScore.value = sumGetMarks;
          totalAssignmentMarks.value = sumTotalAssignmentMarks;
        });
        if (assignmentMarks.value == totalAssignmentMarks.value)
        {
          const addBtn = document.getElementById('add-btn');
          addBtn.setAttribute('disabled', true);
          return;
        }
      
        reset();
        }

  } catch (error) {
      errMsg = error.message;
  } finally {
      return valid;
  }
}

function clearTable() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger me-2"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      totalObtainedScore.value = 0;
      totalAssignmentMarks.value = 0;
      totalObtainedScore.type = 'number';  // Ensure the input type remains 'number'
      totalAssignmentMarks.type = 'number';  // Ensure the input type remains 'number'
      
      document.querySelector('tbody').innerHTML = '';
      document.getElementById('clearTableBtn').classList.add('disabled');
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your table data has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
}

function reset () {
  taskName.value = '',
  getMarks.value = 0,
  taskMarks.value = 0
}

function preview () {
  if (assignmentMarks.value != totalAssignmentMarks.value)
  {
    Swal.fire({
      title: 'Error!',
      text: 'Please Insert Assignment No or Total Marks',
      icon: 'error'
    })
    return;
  }

  if(assignmentNo.value == 0 || assignmentNo.value == '' || assignmentNo.value == null  || assignmentMarks.value == 0 || assignmentMarks.value == '' || assignmentMarks.value == null)
  {
    Swal.fire({
      title: 'Error!',
      text: 'Please Insert Assignment No or Total Marks',
      icon: 'error'
    })
  }

  else if(document.querySelector('tbody').innerHTML == '' || document.querySelector('tbody').innerHTML == null)
  {
    Swal.fire({
      title: 'Error!',
      text: 'Please Insert the assignment marks table',
      icon: 'error'
    })
  }
  else {
    var modal = new bootstrap.Modal(document.getElementById('staticBackdrop')); // Get a reference to your modal element
    modal.show(); // Show the modal

    assignment_No.innerText = assignmentNo.value;
    assignment_Marks.innerText = assignmentMarks.value;
    totalObtainedScoreShow.innerText = totalObtainedScore.value;
  
  var tbody = document.getElementById('showMarksTable');

  for (let i = 0; i < studentArray.length; i++) {
    let task = studentArray[i];
    
    var row = tbody.insertRow(); // Create a new row
  
    // Insert cells with task details
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
  
    // Set cell content
    cell1.innerHTML = task.taskName;
    cell2.innerHTML = task.getMarks;
    cell3.innerHTML = task.taskMarks;
  }
}
}
  

document.getElementById('modal-close').addEventListener('click', function(){
  reset ();
  const tbody = document.getElementById('showMarksTable');
  const addBtn = document.getElementById('add-btn');
  tbody.innerHTML = '';
  addBtn.removeAttribute('disabled');
});

// Download to PDF:
function downloadPDF() {
  totalObtainedScore.value = 0;
      totalAssignmentMarks.value = 0;
      totalObtainedScore.type = 'number';  // Ensure the input type remains 'number'
      totalAssignmentMarks.type = 'number';  // Ensure the input type remains 'number'
      document.querySelector('tbody').innerHTML = '';
      document.getElementById('clearTableBtn').classList.add('disabled');
      
      let modalContent = document.querySelector('.modal-body').innerHTML; // Get the content of the modal body
      const assignmentNoPDF = assignmentNo.value;
      html2pdf().from(modalContent).save('assignment_No'+assignmentNoPDF+'.pdf');
}
 