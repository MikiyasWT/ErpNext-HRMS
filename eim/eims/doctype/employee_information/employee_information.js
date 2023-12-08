// Copyright (c) 2023, mikiyas and contributors
// For license information, please see license.txt

frappe.ui.form.on("Employee-Information", {
	refresh(frm) {

	},

    before_save: function(frm) {
        updateFullName(frm);
    },
    after_save: function(frm) {
        frappe.msgprint(__('Full Name: {0}', [frm.doc.full_name]));
    },


    refresh: function(frm) {
        frm.fields_dict['answers_to'].get_query = function(doc, cdt, cdn) {
            return {
                query: 'frappe.desk.search.search_link',
                filters: {
                    doctype: 'Employee-Information',
                    fieldname: 'full_name',
                }
            };
        };
    }
});






function updateFullName(frm) {
    var first_name = frm.doc.first_name || '';
    var middle_name = frm.doc.middle_name ? ' ' + frm.doc.middle_name : '';
    var last_name = frm.doc.last_name ? ' ' + frm.doc.last_name : '';

    var full_name = first_name + middle_name + last_name;

    frm.set_value('full_name', full_name);
}