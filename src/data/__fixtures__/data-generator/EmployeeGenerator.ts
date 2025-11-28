import type { Employee } from "../../api/definitions/Employee.ts";
import { jobDepartmentFixture } from "../JobDepartmentFixture.ts";
import { statesSelectDataFixtures } from "../StatesSelectDataFixtures.ts";

// See https://fakerjs.dev/
export default class EmployeeGenerator {
  private static firstNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
    "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
    "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa",
    "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra"
  ];

  private static streetNames = [
    "Main", "Maple", "Oak", "Pine", "Cedar", "Elm", "Washington", "Lake", "Hill", "Sunset",
    "Park", "Ridge", "River", "Cherry", "Walnut", "Highland", "Jackson", "Jefferson", "Lincoln", "Adams"
  ];

  private static streetSuffixes = [
    "St", "Ave", "Blvd", "Rd", "Dr", "Ln", "Way", "Terrace", "Court", "Place"
  ];

  private static cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
    "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle",
    "Denver", "Washington"
  ];

  private static zipCodes = [
    "10001", "90001", "60601", "77001", "85001", "19101", "78201", "92101",
    "75201", "95101", "73301", "32201", "76101", "43201", "28201", "94101",
    "46201", "98101", "80201", "20001"
  ];

  private static getRandomFirstName() {
    return this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
  }

  private static getRandomStreet() {
    const number = Math.floor(Math.random() * 2000) + 1;
    const name = this.getRandomStreetName();
    const suffix = this.getRandomStreetSuffix();

    return `${number} ${name} ${suffix}`;
  }

  private static getRandomCity() {
    return this.cities[Math.floor(Math.random() * this.cities.length)];
  }

  private static getRandomJobDepartment() {
    return jobDepartmentFixture[Math.floor(Math.random() * jobDepartmentFixture.length)].value;
  }

  private static getRandomUsState() {
    return statesSelectDataFixtures[Math.floor(Math.random() * statesSelectDataFixtures.length)].abbreviation;
  }

  private static getRandomZipCode() {
    return this.zipCodes[Math.floor(Math.random() * this.zipCodes.length)];
  }

  private static getRandomBirthDate() {
    const date = new Date();
    date.setDate(date.getDate() - (Math.floor(Math.random() * 4000) + 22 * 365));
    return date.toISOString();
  }

  private static getRandomStartDate() {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 2000) + 1);
    return date.toISOString();
  }

  private static getRandomStreetSuffix() {
    return this.streetSuffixes[Math.floor(Math.random() * this.streetSuffixes.length)];
  }

  private static getRandomStreetName() {
    return this.streetNames[Math.floor(Math.random() * this.streetNames.length)];
  }

  public static generateRandomEmployeesData(length: number) {
    const data: Employee[] = [];

    for (let i = 0; i < length; i++) {
      data.push({
        firstName: EmployeeGenerator.getRandomFirstName(),
        lastName: EmployeeGenerator.getRandomFirstName(),
        street: EmployeeGenerator.getRandomStreet(),
        city: EmployeeGenerator.getRandomCity(),
        department: EmployeeGenerator.getRandomJobDepartment(),
        state: EmployeeGenerator.getRandomUsState(),
        zipCode: EmployeeGenerator.getRandomZipCode(),
        birthDate: EmployeeGenerator.getRandomBirthDate(),
        startDate: EmployeeGenerator.getRandomStartDate(),
      });
    }

    return data;
  }
}
