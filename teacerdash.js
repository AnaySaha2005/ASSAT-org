document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logoutBtn');
    const classLinks = document.querySelectorAll('.classLink');
    const attendanceInfo = document.getElementById('attendanceInfo');

    // Sample data for attendance details (replace with actual data from your backend)
    const attendanceData = {
        classA: [
            { date: '2022-01-20', status: 'Present' },
            { date: '2022-01-21', status: 'Absent' },
            // Add more attendance records as needed
        ],
        classB: [
            // Attendance data for classB
        ]
        // Add more classes as needed
    };

    // Function to display attendance details for a selected class
    function displayAttendanceDetails(className) {
        const attendanceRecords = attendanceData[className];

        if (attendanceRecords) {
            const html = attendanceRecords.map(record => {
                return `<p>${record.date}: ${record.status}</p>`;
            }).join('');

            attendanceInfo.innerHTML = html;
        } else {
            attendanceInfo.innerHTML = '<p>No attendance records available.</p>';
        }
    }

    // Add click event listeners for class links
    classLinks.forEach(classLink => {
        classLink.addEventListener('click', function (e) {
            e.preventDefault();
            const className = this.textContent.trim();
            displayAttendanceDetails(className);
        });
    });

    // Logout button click event
    logoutBtn.addEventListener('click', function () {
        // Implement logout functionality (redirect to login page, clear session, etc.)
        alert('Logout clicked. Implement logout functionality.');
    });
});
