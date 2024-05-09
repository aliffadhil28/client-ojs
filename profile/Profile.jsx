import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { Card, Accordion, Table, Badge } from "flowbite-react";
import AuthContext from "../src/assets/context/AuthContext"

const Profile = () => {
  document.title = "Profile";
  const loader = useLoaderData();
  const { user } = useContext(AuthContext);
  const data = loader.data;
  // console.log(data);
  return (
    <div className="flex flex-col p-3">
      <div className="w-2/5 mx-auto mb-3">
        <Card className="shadow-md">
          <div className="flex flex-col items-center pb-10">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.username}
            </h5>
            <span className="text-md mb-3 text-gray-500 dark:text-gray-400">
              {user.email}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.noInduk}
            </span>
            {/* <div className="mt-4 flex space-x-3 lg:mt-6">
              <a
                href="#"
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Add friend
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Message
              </a>
            </div> */}
          </div>
        </Card>
      </div>
      <div className="w-full">
        <div className="submitions flex justify-center text-xl mb-3">
          <h2>My Submitions</h2>
        </div>
        <div className="submitions-list">
          <Accordion collapseAll>
            {data.map((val, i) => {
              const submitions = val.submitions;
              return (
                <Accordion.Panel key={i}>
                  <Accordion.Title>
                    <b>{val.title}</b> ({val.code})
                  </Accordion.Title>
                  <Accordion.Content>
                    <Table>
                      <Table.Head>
                        <Table.HeadCell>No</Table.HeadCell>
                        <Table.HeadCell>Test Pass</Table.HeadCell>
                        <Table.HeadCell>Working Time</Table.HeadCell>
                        <Table.HeadCell>Success</Table.HeadCell>
                      </Table.Head>
                      <Table.Body>
                        {submitions.map((data, i) => {
                          const time = data.workTime;
                          return (
                            <Table.Row
                              key={i}
                              className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                              <Table.Cell>{i + 1}</Table.Cell>
                              <Table.Cell>{data.testPass}</Table.Cell>
                              <Table.Cell>
                                <div className="flex">
                                  <div className="hour">
                                    {String(time.hours).padStart(2, "0")}
                                  </div>
                                  :
                                  <div className="minutes">
                                    {String(time.minutes).padStart(2, "0")}
                                  </div>
                                  :
                                  <div className="seconds">
                                    {String(time.seconds).padStart(2, "0")}
                                  </div>
                                </div>
                              </Table.Cell>
                              <Table.Cell>
                                {data.success ? (
                                  <Badge
                                    className="flex justify-center"
                                    color="success"
                                  >
                                    Success
                                  </Badge>
                                ) : (
                                  <Badge
                                    className="flex justify-center"
                                    color="failure"
                                  >
                                    Failure
                                  </Badge>
                                )}
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </Accordion.Content>
                </Accordion.Panel>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Profile;
