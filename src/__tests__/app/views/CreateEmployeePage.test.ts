import { beforeEach, describe, expect, test } from "vitest";
import { renderWithRouter, testInputChange, testLabelFieldPair, testLabelSelectPair, testSubmitButton } from "../../TestUtils";
import { screen } from "@testing-library/dom";

describe('Given I am on the root page', () => {
  describe('When I read the page', () => {
    beforeEach(() => {
      renderWithRouter("/");
    });

    test('Then I should see the create employee page header', () => {
      const hrnetTitle = screen.getByText("HRnet");
      expect(hrnetTitle).toBeTruthy();

      const createEmployeeTitle = screen.getByText("Create Employee");
      expect(createEmployeeTitle).toBeTruthy();

      const viewEmployeesLink = screen.getByText("View Current Employees");
      expect(viewEmployeesLink).toBeTruthy();
      expect(viewEmployeesLink.getAttribute("href")).toBe("/employee-list");
    });

    test('Then I should see all of the create employee form fields', () => {
      // Input fields
      testLabelFieldPair({ labelText: "First Name", inputName: "firstName" });
      testLabelFieldPair({ labelText: "Last Name", inputName: "lastName" });
      testLabelFieldPair({ labelText: "Date of Birth", inputName: "birthDate", type: "date" });
      testLabelFieldPair({ labelText: "Start Date", inputName: "startDate", type: "date" });
      testLabelFieldPair({ labelText: "Street", inputName: "street" });
      testLabelFieldPair({ labelText: "City", inputName: "city" });
      testLabelFieldPair({ labelText: "Zip Code", inputName: "zipCode" });

      // Select fields
      testLabelSelectPair({ labelText: "State", inputName: "state" });
      testLabelSelectPair({ labelText: "Department", inputName: "department" });

      // Submit button
      testSubmitButton({ text: "Submit" });
    });
  });

  describe('When I submit the create employee form with valid data', () => {
    beforeEach(() => {
      renderWithRouter("/");
    });

    test('Then I should see the modal popup', async () => {
      await testInputChange({ inputName: 'firstName', newValue: 'John' });
      await testInputChange({ inputName: 'lastName', newValue: 'Doe' });
      await testInputChange({ inputName: 'street', newValue: '123 Main St' });
      await testInputChange({ inputName: 'city', newValue: 'New York' });
      await testInputChange({ inputName: 'zipCode', newValue: '10001' });

      // TODO : implement select and date picker input change tests
      // TODO : submit
    })

  });
});