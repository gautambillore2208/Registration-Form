// Load stored students from localStorage on page load
window.onload = function () {
    displayStudents();
};

// Student registration form
document.getElementById('student-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    // Input validation
    if (!name || !id || !email || !contact) {
        alert('All fields must be filled!');
        return;
    }

    if (isNaN(id) || isNaN(contact)) {
        alert('Student ID and Contact Number must be numeric.');
        return;
    }

    // Create a new student record
    const student = { name, id, email, contact };

    // Store it in localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // Reset form and display updated list
    document.getElementById('student-form').reset();
    displayStudents();
});

// Display all students
function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tableBody = document.getElementById('students-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = tableBody.insertRow();

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
    });
}

// Edit student record
function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    document.getElementById('name').value = student.name;
    document.getElementById('id').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    // Delete the record before editing
    deleteStudent(index);
}

// Delete student record
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}
