import React, { useState, useContext } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import AuthContext from "../assets/context/AuthContext.jsx";
import CodeMirror from "@uiw/react-codemirror";
import MDEditor from "@uiw/react-md-editor";
import { Tabs, Table } from "flowbite-react";
import Timer from "../assets/components/TImer.jsx";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/legacy-modes/mode/python";
import { StreamLanguage } from "@codemirror/language";
import { FaCheckCircle, FaCheck, FaTimesCircle } from "react-icons/fa";
import {
  levelHelper,
  handleContextmenu,
  parseElement,
} from "../helpers/helper.js";
import "../assets/styles/code.css";
import $ from "jquery";

const extensions = [StreamLanguage.define(python)];

const Code = () => {
  document.title = "Code";
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const loader = useLoaderData();
  const { id } = useParams();
  const timeSpent = localStorage.getItem(`timers-${id}`);
  const time = JSON.parse(timeSpent);
  const data = loader.data;
  const parser = new DOMParser();
  const level = parser.parseFromString(levelHelper(data.level), "text/html");
  const [code, setCode] = useState(`${data.baseImport}${data.baseFunction}`);
  const [result, setResult] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [allTrue, setAllTrue] = useState(false);
  const testCases = data.testCases;
  const testCaseArrays = testCases.map((testCase) => {
    const testCaseString = `[${testCase}]`;
    return JSON.parse(testCaseString).map(parseElement);
  });
  const payload = {
    code: code,
    testCases: data.testCases,
    baseMain: data.baseMain,
    workTime: time,
  };
  // .post("http://13.215.153.88:8002", payload, { withCredentials: true })
  const submitCode = async () => {
    await axios
      .post("https://ojs-gateway.localgemy.my.id/judge", payload, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async ({ data }) => {
        setResult(data.results);
        setFeedbacks(data.feedBacks);
        setAllTrue(result.every((item) => item == "True"));
        $(".feedback").removeClass("invisible");
        const hasil = data.results;
        const trueCount = hasil.filter((value) => value === "True").length;
        const totalCount = hasil.length;
        const ratio = trueCount + "/" + totalCount;
        // console.log([ratio,totalCount,trueCount,hasil]);
        const submitPayload = {
          problemId: id,
          userId: user.id,
          code: code,
          testPass: ratio,
          executeTime: data.executionTime,
          feedback: data.feedBacks.join(","),
          workTime: time,
          success: allTrue,
        };
        await axios
          .post("https://ojs-gateway.localgemy.my.id/submition", submitPayload, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
    if (allTrue) {
      setInterval(() => {
        navigate("/");
      }, 10000);
    }
    $(".response_test").removeClass("invisible");
  };
  return (
    <div className="w-screen px-5 h-screen">
      <div className="flex flex-row top-0 flex-wrap md:flex-nowrap">
        <div className="container basis-1/2 me-5 w-full overflow-auto">
          <div className="task-title">
            <h1 className="text-xl font-semibold mb-3">
              {data.code} | {data.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: level.body.innerHTML }} />
          </div>
          <div
            className="unselect task-description mt-5"
            onContextMenu={handleContextmenu}
          >
            <div
              data-tooltip-id="no-select"
              data-tooltip-variant="error"
              data-tooltip-float="false"
              className="text-md font-normal text-justify h-screen overflow-y-auto"
            >
              <MDEditor.Markdown
                source={data.description}
                style={{ background: "transparent", color: "black" }}
              />
            </div>
            <Tooltip
              id="no-select"
              variant="error"
              content="This section cannot be selected!!"
            />
          </div>
        </div>
        <div
          className="container basis-2/3
         relative"
        >
          <div className="p-2 bg-[#1e1e1e] rounded-md">
            <div className="text-left items-center" height="100vh">
              <CodeMirror
                className="text-sm rounded"
                height="70vh"
                value={code}
                theme={vscodeDark}
                extensions={extensions}
                onChange={(editor, change) => {
                  setCode(editor);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between align-middle">
            <div className="times my-auto font-mono">
              <Timer />
            </div>
            <button
              className="rounded-full bg-green-400 p-2 px-3 text-md font-semibold text-white mt-3 flex ms-auto items-center"
              onClick={submitCode}
            >
              <FaCheckCircle className="me-2" style={{ color: "#ffffff" }} />
              Submit
            </button>
          </div>
          <div className="testCases">
            <Tabs aria-label="Default tabs" style="default">
              {testCaseArrays.map((array, i) => {
                const hasil = array.pop();
                return (
                  <Tabs.Item
                    key={i}
                    title={
                      <p className="flex items-center">
                        Test {i + 1}{" "}
                        <span className="response_test invisible ms-1">
                          {result[i] === "True" ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaTimesCircle className="text-red-500" />
                          )}
                        </span>
                      </p>
                    }
                  >
                    <div>
                      <div className="grid grid-cols-4 mb-3 align-middle">
                        <p className="me-4 font-semibold w-40">Input : </p>
                        <div className="bg-stone-200 w-fit p-1 rounded-md ms-4 font-mono">
                          <pre>{JSON.stringify(array[0])}</pre>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 mb-3 align-middle">
                        <p className="me-4 font-semibold w-40">
                          Expected result :{" "}
                        </p>
                        <div className="bg-stone-200 w-fit p-1 rounded-md ms-4 font-mono">
                          <pre>{JSON.stringify(hasil)}</pre>
                        </div>
                      </div>
                      <div className="response_test grid invisible grid-cols-4 mb-3 align-middle">
                        <p className="me-4 font-semibold w-40">Result : </p>
                        <div className="bg-stone-200 w-fit p-1 rounded-md ms-4 font-mono">
                          {result[i] === "True" ? (
                            <FaCheck className="text-green-500" />
                          ) : result[i] === "False" ? (
                            <FaTimesCircle className="text-red-500" />
                          ) : (
                            result[i]
                          )}
                        </div>
                      </div>
                      <div className="feedback grid grid-cols-4 mb-3 align-middle invisible">
                        <p className="me-4 font-semibold w-40">Feedback : </p>
                        <div className="bg-stone-200 w-fit p-1 rounded-md ms-4 font-mono">
                          <pre>{feedbacks[i]}</pre>
                        </div>
                      </div>
                    </div>
                  </Tabs.Item>
                );
              })}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
