frappe.ui.form.on("TEthioLeave-Application", {
    refresh: function(frm) {
        // Your code when the form is refreshed
    },

    employee: function(frm) {
        // Triggered when the employee field is changed
        fetchLeaveBalance(frm);
    },

    leave_type: function(frm) {
        // Triggered when the leave_type field is changed
        fetchLeaveBalance(frm);
    },

    validate: function(frm) {
        // Triggered before submitting the form

        // Get the selected employee
        var employee = frm.doc.employee;

        // If an employee is selected, fetch the Leave Balance document
        if (employee) {
            frappe.call({
                method: 'frappe.client.get',
                args: {
                    doctype: 'TEthioLeave-Balance',
                    filters: {
                        'employee_name': employee,
                        'leave_type': frm.doc.leave_type
                    }
                },
                callback: function(response) {
                    // Check if the Leave Balance document is found
                    if (response.message) {
                        var remainingLeaves = response.message.remaining_leaves;
                       
                        // Check if the difference between 'from' and 'to' exceeds remaining leaves
                        var fromDate = frm.doc.from;
                        var toDate = frm.doc.to;
                        var dateDifference = frappe.datetime.get_diff(toDate, fromDate);

                        if (dateDifference > remainingLeaves) {
                            // Prevent form submission
                            frappe.msgprint('Error: Leave duration exceeds remaining leaves.');
                            frappe.validated = false;
                        }
                    } else {
                        console.log('Leave Balance not found for the selected employee and leave type.');
                    }
                }
            });
        }
    }
});

function fetchLeaveBalance(frm) {
    // Get the selected employee
    var employee = frm.doc.employee;
  

    // If an employee is selected, fetch the Leave Balance document
    if (employee) {
        frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype: 'TEthioLeave-Balance',
                filters: {
                    'employee_name': employee,
                    'leave_type': frm.doc.leave_type
                }
            },
            callback: function(response) {
                // Check if the Leave Balance document is found
                if (response.message) {
                    var remainingLeaves = response.message.remaining_leaves;
                     // Set the value of the 'days' field to the calculated remaining leaves
                    frm.set_value('remaining_days', remainingLeaves);
                    console.log('Remaining Leaves:', remainingLeaves);
                } else {
                    console.log('Leave Balance not found for the selected employee and leave type.');
                }
            }
        });
    }
}
