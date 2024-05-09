import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Accordion, Table, Badge } from "flowbite-react";

const Solutions = () => {
  document.title = "Submissions";
  const loader = useLoaderData();
  const data = loader.data;
  return (
    <div className="flex flex-col prose lg:prose-xl">
      <div className="flex justify-between">
        <h1 className="my-3 font-bold">Submitions</h1>
      </div>
      <Accordion collapseAll>
        {data.map((val, i) => {
          const submitions = val.submitions;
          return (
            <Accordion.Panel key={i}>
              <Accordion.Title>
                <b>{val.username}</b> ({val.noInduk})
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
  );
};

export default Solutions;
