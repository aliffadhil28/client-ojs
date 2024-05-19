import React, { useState, useEffect, useContext } from "react";
import { redirect } from "react-router-dom";
import { Button, Tooltip } from "flowbite-react";
import MDEditor from "@uiw/react-md-editor";
import moment from "moment";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/legacy-modes/mode/python";
import { StreamLanguage } from "@codemirror/language";
import CodeMirror from "@uiw/react-codemirror";
import { FaPlus, FaQuestionCircle } from "react-icons/fa";
import $ from "jquery";
import axios from "axios";
import AuthContext from "../assets/context/AuthContext";

const extensions = [StreamLanguage.define(python)];

const AddProblem = () => {
  document.title = "Add Problem";
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState();
  const [code, setCode] = useState();
  const [level, setLevel] = useState();
  const [description, setDescription] = useState();
  const [testCases, setTestCases] = useState([]);
  const [workTime, setWorkTime] = useState();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [startDate, setStartDate] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DDTHH:mm"));
  const [baseImport, setBaseImport] = useState();
  const [baseFunction, setBaseFunction] = useState();
  const [baseMain, setBaseMain] = useState();
  useEffect(() => {
    setTestCases(testCases);
    setWorkTime({
      hours: hour,
      minutes: minute,
    });
  }, [testCases, hour, minute]);

  const addTestCaseInput = () => {
    setTestCases([...testCases, ""]);
  };

  const handleTestCaseChange = (index, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index] = value;
    setTestCases(updatedTestCases);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title: title,
        level: level,
        description: description,
        code: code,
        testCases: testCases,
        workTime: workTime,
        baseFunction: baseFunction,
        baseMain: baseMain,
        baseImport: baseImport,
        startDate: startDate,
        endDate: endDate,
      };
      await axios
        .post(`http://13.215.153.88:8001/problems`, payload, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          redirect("/dashboard/problems");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      return error;
    }
  };
  return (
    <div>
      <div className="header my-4 flex justify-between">
        <h1 className="font-semibold text-xl">Add problem</h1>
        <div className="buttons">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="container bg-slate-100 shadow-lg rounded-lg p-3">
        <div className="grid gap-y-6">
          <div className="title">
            <h4 className="font-semibold mb-3">Title</h4>
            <input
              className="w-full rounded-xl border-none shadow-md"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="codeLevel grid grid-cols-2 gap-x-6">
            <div className="code">
              <h4 className="font-semibold mb-3">Code</h4>
              <input
                className="w-full rounded-xl border-none shadow-md"
                type="text"
                name="code"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="level">
              <div className="flex items-center mb-3">
                <h4 className="font-semibold me-2">Level</h4>
                <Tooltip
                  content="Define the problem difficulty 1-3"
                  style="light"
                  className="w-fit"
                  placement="right"
                >
                  <FaQuestionCircle className="text-gray-500" />
                </Tooltip>
              </div>
              <input
                className="w-full rounded-xl border-none shadow-md"
                type="number"
                min="1"
                max="3"
                name="level"
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>
          </div>
          <div className="description">
            <div className="flex items-center">
              <h4 className="font-semibold my-3 me-2">Description</h4>
              <Tooltip
                content="Describe the problem and the expected solution, including examples, using Markdown. This will help students understand the problem and its expected output."
                style="light"
                className="w-1/2"
                placement="right"
              >
                <FaQuestionCircle className="text-gray-500" />
              </Tooltip>
            </div>
            <div className="editor rounded-lg">
              <MDEditor
                value={description}
                onChange={setDescription}
                preview="live"
              />
            </div>
          </div>
          <div className="testCases">
            <div className="flex justify-between">
              <div className="flex items-center">
                <h4 className="font-semibold my-3 me-2">Test Cases</h4>
                <Tooltip
                  content={`Enter at least 2 values separated by commas. The last value represents the expected result of the function, while the preceding values are the input parameters for the function.\n\nFor example, for a function add(a, b) that returns a + b  . Test cases should be defined as '1,2,3' or '2,2,4', where the last value is the expected result and the preceding values are the function parameters.`}
                  style="light"
                  className="w-1/2"
                  placement="right"
                >
                  <FaQuestionCircle className="text-gray-500" />
                </Tooltip>
              </div>
              <Button
                size="sm"
                id="btn-addTest"
                className="me-4 w-16 h-10"
                color="success"
                onClick={addTestCaseInput}
              >
                <FaPlus className="mr-2 h-3 w-3" /> Test
              </Button>
            </div>
            <div id="testCasesContainer" className="flex flex-wrap">
              {testCases.map((testCase, index) => (
                <input
                  className="w-1/6 rounded-xl border-none shadow-md me-3 mb-3"
                  key={index}
                  type="text"
                  value={testCase}
                  onChange={(e) => handleTestCaseChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
          <div className="timeDueDate grid grid-cols-2">
            <div className="workTime">
              <div className="flex items-center">
                <h4 className="font-semibold my-3 me-2">
                  Work Time{" "}
                  <small className="text-gray-500">(Hours : Minutes)</small>
                </h4>
                <Tooltip
                  content="Estimated time this problem should be solved"
                  style="light"
                  className="w-fit"
                  placement="right"
                >
                  <FaQuestionCircle className="text-gray-500" />
                </Tooltip>
              </div>
              <div className="flex items-center">
                <input
                  className="rounded-xl border-none shadow-md"
                  type="number"
                  min="0"
                  name="hours"
                  id="hours"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                />
                <div className="mx-3">:</div>
                <input
                  className="rounded-xl border-none shadow-md"
                  type="number"
                  min="0"
                  name="minute"
                  id="minute"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                />
              </div>
            </div>
            <div className="dueDate">
              <div className="flex items-center">
                <h4 className="font-semibold my-3 me-2">
                  Due Date
                  <small className="text-gray-500">
                    (Start Date - End Date)
                  </small>
                </h4>
                <Tooltip
                  content="Due date this problem is assign to the students"
                  style="light"
                  className="w-fit"
                  placement="right"
                >
                  <FaQuestionCircle className="text-gray-500" />
                </Tooltip>
              </div>
              <div className="flex items-center">
                <input
                  className="w-60 rounded-xl border-none shadow-md p-2"
                  type="datetime-local"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <div className="mx-3">-</div>
                <input
                  className="w-60 rounded-xl border-none shadow-md p-2"
                  type="datetime-local"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="baseFunction">
            <div className="flex items-center">
              <h4 className="font-semibold my-3 me-2">Base Function</h4>
              <Tooltip
                content="Function with paramater for the solution to be write with"
                style="light"
                className="w-fit"
                placement="right"
              >
                <FaQuestionCircle className="text-gray-500" />
              </Tooltip>
            </div>
            <div className="p-2 bg-[#1e1e1e] rounded-md w-full">
              <div className="text-left items-center" height="100vh">
                <CodeMirror
                  className="text-sm rounded"
                  height="15vh"
                  value={baseFunction}
                  theme={vscodeDark}
                  extensions={extensions}
                  onChange={(editor, change) => {
                    setBaseFunction(editor);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="importMain flex">
            <div className="baseImport w-1/2 me-3">
              <div className="flex items-center">
                <h4 className="font-semibold my-3 me-2">Base Import</h4>
                <Tooltip
                  content="Necessary import to run the program"
                  style="light"
                  className="w-fit"
                  placement="right"
                >
                  <FaQuestionCircle className="text-gray-500" />
                </Tooltip>
              </div>
              <div className="p-2 bg-[#1e1e1e] rounded-md me-3">
                <div className="text-left items-center" height="100vh">
                  <CodeMirror
                    className="text-sm rounded"
                    height="15vh"
                    value={baseImport}
                    theme={vscodeDark}
                    extensions={extensions}
                    onChange={(editor, change) => {
                      setBaseImport(editor);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="baseMain w-1/2 ms-3">
              <div className="flex items-center">
                <h4 className="font-semibold my-3 me-2">Base Main</h4>
                <Tooltip
                  content={
                    <p>
                      Test Case handler to help run this program to get if the
                      result is as expected or not <br />
                      Pattern : print(functionName(${`test[0]`}) == ${`test[1]`}
                      ) <br />
                      Test varible use to define test cases.
                    </p>
                  }
                  style="light"
                  className="w-fit"
                  placement="right"
                >
                  <FaQuestionCircle className="text-gray-500" />
                </Tooltip>
              </div>
              <div className="p-2 bg-[#1e1e1e] rounded-md me-3">
                <div className="text-left items-center" height="100vh">
                  <CodeMirror
                    className="text-sm rounded"
                    height="15vh"
                    value={baseMain}
                    theme={vscodeDark}
                    extensions={extensions}
                    onChange={(editor, change) => {
                      setBaseMain(editor);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProblem;
