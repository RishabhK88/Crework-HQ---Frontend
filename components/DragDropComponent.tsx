import { Clock } from "@/assets/icons/Clock";
import { Columns } from "@/assets/icons/Columns";
import { Delete } from "@/assets/icons/Delete";
import { Edit } from "@/assets/icons/Edit";
import { Plus } from "@/assets/icons/Plus";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const DragDropComponent = ({
  columns,
  setColumns,
  onDragEnd,
  setCreateInStatus,
  handleDelete,
}: {
  columns: any;
  setColumns: any;
  onDragEnd: any;
  setCreateInStatus: any;
  handleDelete: any;
}) => {
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      {Object.entries(columns).map(([columnId, column]: any, index) => {
        return (
          <div key={columnId}>
            <div className="w-full flex justify-between">
              <div className="text-[#555555] text-xl">{column.name}</div>
              <div>
                <Columns />
              </div>
            </div>
            <div className="">
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="h-72 overflow-y-auto"
                    >
                      {column.items.map((item: any, index: any) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-[#F9F9F9] rounded-lg"
                                  style={{
                                    userSelect: "none",
                                    padding: 16,
                                    margin: "0 0 8px 0",
                                    minHeight: "50px",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <div className="font-medium text-[#606060] text-base w-full justify-between flex">
                                    {item.title} &nbsp;
                                    <div className="space-x-2">
                                      <button
                                        onClick={() => {
                                          setCreateInStatus(
                                            item.status,
                                            item.title,
                                            item.priority,
                                            item.description,
                                            item.id,
                                            item.deadline,
                                            true
                                          );
                                        }}
                                      >
                                        <Edit />
                                      </button>
                                      <button
                                        onClick={() => {
                                          handleDelete(item.id);
                                        }}
                                      >
                                        <Delete />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="text-sm text-[#797979]">
                                    {item.description}
                                  </div>
                                  {item.priority === "Low" ? (
                                    <button
                                      type="button"
                                      className="text-white bg-[#0ECC5A] focus:outline-none font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-2 mb-2"
                                    >
                                      {item.priority}
                                    </button>
                                  ) : item.priority === "Urgent" ? (
                                    <button
                                      type="button"
                                      className="text-white bg-[#FF6B6B] focus:outline-none font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-2 mb-2"
                                    >
                                      {item.priority}
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="text-white bg-[#FFA235] focus:outline-none font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-2 mb-2"
                                    >
                                      {item.priority}
                                    </button>
                                  )}

                                  <div className="flex items-center">
                                    <Clock />
                                    &nbsp;
                                    <div className="text-sm font-semibold text-[#606060]">
                                      {item.deadline
                                        ? new Date(item.deadline)
                                            .toISOString()
                                            .split("T")[0]
                                        : "No Deadline"}
                                    </div>
                                  </div>
                                  <div className="text-sm font-medium text-[#797979] mt-2">
                                    1 hr ago
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
              <button
                type="button"
                className="focus:outline-none text-white bg-gradient-to-b from-[#3A3A3A] to-[#202020] w-full p-2 rounded-lg flex justify-between"
                onClick={() => {
                  setCreateInStatus(columnId);
                }}
              >
                <div>Add new</div>
                <div>
                  <Plus />
                </div>
              </button>
            </div>
          </div>
        );
      })}
    </DragDropContext>
  );
};
