import React, { useState, useEffect } from "react";
import { useLoaderData,Link } from "react-router-dom";
import { Table,Button } from "flowbite-react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import moment from "moment";
import { levelHelper } from "../../../../helpers/helper.js";
import ReactPaginate from "react-paginate";
import '../../../../assets/styles/dashboard/problem.css';
import { buttonThemes } from "../../../../assets/themes/buttonThemes.js";

function Problems() {
  document.title = "Problems List";
  const loader = useLoaderData();
  const data = loader.data;
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const n = 10;

  useEffect(() => {
    setFilterData(
      data.filter((item, index) => index >= page * n && index < (page + 1) * n)
    );
  }, [page, data]);

  return (
    <div className="flex flex-col prose lg:prose-xl">
      <div className="header flex justify-between my-4">
        <h1 className="my-3 font-bold">Problem List</h1>
        <Link to="/dashboard/problems/add"><Button size="sm" className="me-4 w-24 h-10" theme={buttonThemes} gradientMonochrome="success">Add</Button></Link>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Problem Code</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Active Date</Table.HeadCell>
          <Table.HeadCell>Level</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filterData.map((val, i) => {
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
                    href={`/dashboard/problems/${val.id}`}
                    className="font-medium hover:no-underline text-cyan-600 dark:text-cyan-500 me-2"
                  >
                    Detail
                  </a>
                  <a
                    href={`/dashboard/solutions/${val.id}`}
                    className="font-medium hover:no-underline text-green-600 dark:text-green-500"
                  >
                    Submitions
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <ReactPaginate
        containerClassName={"pagination flex items-center my-4 mx-auto"}
        pageClassName={
          "page-item p-2 font-semibold bg-gray-200 rounded-md mx-2 text-black"
        }
        activeClassName={"active"}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(data.length / n)}
        breakLabel="..."
        previousLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
      />
    </div>
  );
}

export default Problems;
