import React from "react";
import axios from "axios";
import { Table, Navbar, TextInput } from "flowbite-react";
import { useLoaderData } from "react-router-dom";
import moment from "moment";
import { levelHelper } from "../src/helpers/helper.js";

const Home = () => {
  document.title = "Home";
  const loader = useLoaderData();
  const data = loader.data;
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Code</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Due Date</Table.HeadCell>
          <Table.HeadCell>Level</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((val, i) => {
            const parser = new DOMParser();
            const level = parser.parseFromString(
              levelHelper(val.level),
              "text/html"
            );
            return (
              <Table.Row
                key={i}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {val.code}
                </Table.Cell>
                <Table.Cell>{val.title}</Table.Cell>
                <Table.Cell>
                  {moment(val.startDate).format("HH:mm DD-MM-YYYY")} -{" "}
                  {moment(val.endDate).format("HH:mm DD-MM-YYYY")}
                </Table.Cell>
                <Table.Cell>
                  <div
                    dangerouslySetInnerHTML={{ __html: level.body.innerHTML }}
                  />
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={`/solve/${val.id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Solve
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Home;
