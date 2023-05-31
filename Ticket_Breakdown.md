# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket#1

Create a column `facility_agent_id` in the `Shifts` table to include a custom agent id for each agent against the shift worked in a facility.

#### Acceptance criteria

Creating an entry in the `Shifts` table for an agent, should add a default `facility_agent_id` of the format `<facility_id>_<agent_id>`.


#### Effort estimates

2 SP


#### Implementation details

1. Add new column `facility_agent_id` in Shifts table
2. Creating a shift should add a default value of the format `<facility_id>_<agent_id>` for the field `facility_agent_id`.


### Ticket#2

Facility can have the option to update `facility_agent_id` at their own convenience. 

#### Acceptance criteria

Update operation works via the exposed API.


#### Effort estimates

3


#### Implementation details

1. Create an API to update `facility_agent_id` in the Shifts table that can be used by Facilities to update the same
2. The API should support batch updates too
3. Consider input to be of the format of an array of objects where each object has `shift_id` as the key and new `facility_agent_id` as the value: `[{ [shift_id]: facility_agent_id }]`

### Ticket#3

Modify `generateReport` to return `facility_agent_id` in each shift object instead of `agent_ id` from the Shifts table.

#### Acceptance criteria

The generated reports should show `facility_agent_id` instead of `agent_id` in the PDF report generated.

#### Effort estimates

1 SP

#### Implementation details

1. Get `facility_agent_id` from Shifts table based on `shift_id`.
2. Replace `agent_id` with `facility_agent_id` when generating the PDF.

* SP stands for Story points and my assumption is as follows:

| SP | Man days |
| - | - |
| 1 | Less than 2 hours |
| 2 | 0.5 days |
| 3 | <= 2 days |
| 5 | 3 - 5 days |
| 8 | 1 week |
| 13 | > 1 week |

