import Chat from "../../../layout/Chat";
import DocEditor from "../../../Components/ToolAddDoc/DocEditor";
import MyProjectList from "../../../layout/MyProjectList";
import DocumentList from "../../../layout/DocumentList";

const AddDocs = () => {
  return (
    <div className="w-full h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
      <div className="sm:hidden">
        <MyProjectList />
      </div>
      <div className="sm:hidden">
        <DocumentList />
      </div>
      <div className="w-[calc(100%-41rem)] h-full flex flex-col p-4 md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
        <DocEditor />
      </div>
      <Chat />
    </div>
  );
};

export default AddDocs;