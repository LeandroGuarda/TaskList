import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ListaTareas = () => {
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [isNewTaskActive, setisNewTaskActive] = useState(false);
  const [tasksList, setTasksList] = useState(() => {
    return JSON.parse(localStorage.getItem("tasksList")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }, [tasksList]);

  return (
    <div className="py-12 w-screen h-screen bg-gray-800">
      <div className="">
        <div className="grid space-y-8 justify-center content-center">
          <h1 className="text-center text-white"> Lista de Tareas</h1>
          {tasksList.length > 0 &&
            tasksList.map((task, index) => (
              <div
                className="bg-gray-400 p-6 rounded-lg my-3 grid justify-items-stretch"
                key={index}
              >
                <div className="my-2 text-xl font-bold">{task.name}</div>
                <div className="my-2 text-lg">{task.description}</div>
                <div className="justify-self-end flex gap-2 ">
                  <button
                    className="rounded-full bg-red-200 p-2 border-none"
                    onClick={() =>
                      setTasksList(
                        tasksList.filter((task, idx) => idx !== index)
                      )
                    }
                  >
                    <FaRegTrashAlt />
                  </button>
                  <button

                    className="rounded-full bg-green-200 p-2 border-none"
                    onClick={() => {
                      setisNewTaskActive(true);
                      setNewTask({
                        name: task.name,
                        description: task.description,
                      });
                    }}
                  >
                    <MdEdit />
                  </button>
                </div>
              </div>
            ))}{" "}
          {isNewTaskActive && (
            <div className="space-y-4 rounded-lg bg-white p-4 grid grid-cols-1">
              <input
                type="text"
                className="rounded border-2 shadow p-2"
                placeholder="Nombre"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask((ts) => {
                    const nts = { ...ts };
                    nts.name = e.target.value;
                    return nts;
                  })
                }
              />
              <input
                type="text"
                className="rounded border-2 shadow p-2"
                value={newTask.description}
                placeholder="Descripción"
                onChange={(e) =>
                  setNewTask((ts) => {
                    const nts = { ...ts };
                    nts.description = e.target.value;
                    return nts;
                  })
                }
              />

              <button
                onClick={() => {
                  setTasksList((tl) => [...tl, newTask]);
                  setisNewTaskActive(false);
                  setNewTask((ts) => {
                    const copy = { ...ts };
                    copy.description = "";
                    copy.name = "";
                    return copy;
                  });
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Agregar tarea
              </button>
            </div>
          )}
        </div>
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setisNewTaskActive(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          >
            Nueva Tarea
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListaTareas;
