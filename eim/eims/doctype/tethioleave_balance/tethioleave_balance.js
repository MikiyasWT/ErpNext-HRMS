// Copyright (c) 2023, mikiyas and contributors
// For license information, please see license.txt

frappe.ui.form.on("TEthioLeave-Balance", {
	refresh(frm) {

	},
    refresh: function(frm) {
        // Trigger the calculation when the form is loaded
        calculateRemainingLeaves(frm);
    },

    // Trigger the calculation when 'Total Leaves' or 'Leaves Taken' fields are updated
    total_leaves_allocated: function(frm) {
        calculateRemainingLeaves(frm);
    },

    leaves_taken: function(frm) {
        calculateRemainingLeaves(frm);
    }
});



function calculateRemainingLeaves(frm) {
    // Get the values of 'Total Leaves' and 'Leaves Taken'
    var totalLeaves = frm.doc.total_leaves_allocated || 0;
    var leavesTaken = frm.doc.leaves_taken || 0;

    // Calculate 'Remaining Leaves' and set the value
    frm.set_value('remaining_leaves', totalLeaves - leavesTaken);
}
