import { environment } from "../../../environment";
import { jobDepartmentFixture } from "../../__fixtures__/JobDepartmentFixture";
import { statesSelectDataFixtures } from "../../__fixtures__/StatesSelectDataFixtures";
import type { JobDepartment } from "../definitions/JobDepartment";
import type { USState } from "../definitions/USStates";

export default class SelectValuesService {
  public static async getJobDepartments(): Promise<JobDepartment[]> {
    if (environment.fixtureEnabled)
      return Promise.resolve(jobDepartmentFixture);

    throw new Error('Not implemented: SelectValuesService.getJobDepartments');
  }

  public static async getUsStates(): Promise<USState[]> {
    if (environment.fixtureEnabled)
      return Promise.resolve(statesSelectDataFixtures);

    throw new Error('Not implemented: SelectValuesService.getUsStates');
  }
}