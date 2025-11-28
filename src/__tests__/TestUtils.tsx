import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import App from "../App.tsx";
import AppMemoryRouter from "./AppMemoryRouter.tsx";
import { userEvent } from "@testing-library/user-event";

export function renderWithRouter(route: string = "/") {
  return (
    render(
      <App router={<AppMemoryRouter route={route} />} />
    )
  );
}

export function testFormLabel({ text, expectedForAttribute }: { text: string; expectedForAttribute?: string; }) {
  const formLabelNode = screen.getByText(text);
  expect(formLabelNode.tagName).toBe("LABEL");
  if (expectedForAttribute)
    expect(formLabelNode?.getAttribute("for")).toBe(expectedForAttribute);
}

export function testLabelFieldPair({ labelText, inputName, type = "text" }: { labelText: string; inputName: string; type?: string; }) {
  testFormLabel({ text: labelText, expectedForAttribute: inputName });
  const fieldNode = screen.getByTestId(inputName);
  expect(fieldNode.tagName).toBe("INPUT");
  expect(fieldNode.getAttribute("name")).toBe(inputName);
  expect(fieldNode.getAttribute("type")).toBe(type);
}

export function testLabelSelectPair({ labelText, inputName }: { labelText: string; inputName: string; }) {
  testFormLabel({ text: labelText, expectedForAttribute: inputName });
  const fieldNode = screen.getByTestId(inputName);
  expect(fieldNode.tagName).toBe("SELECT");
  expect(fieldNode.getAttribute("name")).toBe(inputName);
}

export function testSubmitButton({ text }: { text: string; }) {
  const buttonNode = screen.getByText(text);
  expect(buttonNode.tagName).toBe("BUTTON");
  expect(buttonNode.getAttribute("type")).toBe("submit");
}

export async function testInputChange({ inputName, newValue }: { inputName: string; newValue: string; }) {
  const inputNode = screen.getByTestId(inputName) as HTMLInputElement;
  await userEvent.type(inputNode, newValue);
  expect(inputNode.value).toBe(newValue);
}