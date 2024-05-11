const form = document.getElementById('studentForm');
console.log(form)
const studentList = document.getElementById('studentList');

// Receive existing user data from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));
const userArray = storedUser ? storedUser : [];

// Function to update localStorage with new user data
function updateLocalStorage(name, studentId, email, contact) {
    const newUser = [name, studentId, email, contact];
    userArray.push(newUser);
    localStorage.setItem('user', JSON.stringify(userArray));
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    // Validate student ID and contact number if (!/^\d+$/.test(studentId)) {: This line checks if the studentId variable contains only numbers. The regular expression /^\d+$/ ensures that the entire string consists of one or more digits (\d+). The ! in front of the test negates the result, so the condition becomes true if the studentId does not contain only numbers.  this is new thing which I have been learned
    if (!/^\d+$/.test(studentId)) {
        alert('Student ID must contain only numbers.');
        return;
    }
    if (!/^\d+$/.test(contact)) {
        alert('Contact number must contain only numbers.');
        return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Student ID:</strong> ${studentId}<br>
        <strong>Email ID:</strong> ${email}<br>
        <strong>Contact:</strong> ${contact}<br>
        <button class="edit-btn" onclick="editStudent(this)">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(this)">Delete</button>
    `;
    studentList.appendChild(listItem);

    // Update localStorage with new user data
    updateLocalStorage(name, studentId, email, contact);

    form.reset();
});

function editStudent(button) {
    const listItem = button.parentElement;
    const fields = listItem.querySelectorAll('strong');
    document.getElementById('name').value = fields[0].nextSibling.textContent.trim();
    document.getElementById('studentId').value = fields[1].nextSibling.textContent.trim();
    document.getElementById('email').value = fields[2].nextSibling.textContent.trim();
    document.getElementById('contact').value = fields[3].nextSibling.textContent.trim();

    listItem.remove();
}

function deleteStudent(button) {
    button.parentElement.remove();
}









     

