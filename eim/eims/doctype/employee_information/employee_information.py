# Copyright (c) 2023, mikiyas and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class EmployeeInformation(Document):
	
    def validate(self):
        self.update_full_name()

    def update_full_name(self):
        first_name = self.first_name or ''
        middle_name = ' ' + self.middle_name if self.middle_name else ''
        last_name = ' ' + self.last_name if self.last_name else ''

        full_name = first_name + middle_name + last_name

        self.set('full_name', full_name)
