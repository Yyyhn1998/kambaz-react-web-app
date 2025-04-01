import { useParams } from "react-router";
import { FormControl, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

// eslint-disable-next-line
export default function Modules(props: any) {
    void props;
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");

    const deleteModuleHandler = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };

    // eslint-disable-next-line
    const updateModuleHandler = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };


    // eslint-disable-next-line
    const { modules } = useSelector((state: any) => state.modulesReducer);

    // eslint-disable-next-line
    const modulesToUse = modules.filter((module: any) => module.course === cid);

    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const addModuleHandler = async () => {
        const newModule = await coursesClient.createModuleForCourse(cid!, {
            name: moduleName,
            course: cid,
        });
        dispatch(addModule(newModule));
        setModuleName("");
    };

    const fetchModulesForCourse = async () => {
        const modules = await coursesClient.findModulesForCourse(cid!);
        dispatch(setModules(modules));
    };
    useEffect(() => {
        fetchModulesForCourse();
    }, [cid]);

    /*  const removeModule = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    }; */


    /* const saveModule = async (module: any) => {
         await modulesClient.updateModule(module);
         dispatch(updateModule(module));
     };*/

     /* const createModuleForCourse = async () => {
          if (!cid) return;
          const newModule = { name: moduleName, course: cid };
          const module = await coursesClient.createModuleForCourse(cid, newModule);
          dispatch(addModule(module));
      }; */

     /*const fetchModules = async () => {
         const modules = await coursesClient.findModulesForCourse(cid as string);
         dispatch(setModule(modules));
     };

     useEffect(() => {
         fetchModules();
     }, []); */

    return (
        <div>
            {currentUser?.role === "FACULTY" && (
                <ModulesControls
                    addModule={addModuleHandler}
                    moduleName={moduleName}
                    setModuleName={setModuleName}
                    //addModule={createModuleForCourse}
                />
            )}

            <br /><br /><br />

            <ListGroup className="rounded-0" id="wd-modules">
                {modulesToUse
                    // eslint-disable-next-line
                    .map((module: any) => (
                        <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                            <div className="d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary text-white">
                                <div>
                                    <BsGripVertical className="me-2 fs-3" />
                                    {!module.editing && module.name}
                                    {module.editing && (
                                        <FormControl
                                            className="w-50 d-inline-block"
                                            onChange={(e) =>
                                                updateModuleHandler({ ...module, name: e.target.value }) }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    updateModuleHandler({ ...module, editing: false });
                                                }
                                            }}
                                            defaultValue={module.name}
                                        />
                                    )}
                                </div>

                                {currentUser?.role === "FACULTY" && (
                                    <ModuleControlButtons
                                        moduleId={module._id}
                                        deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                                        editModule={() => dispatch(editModule(module._id))}
                                    />
                                )}
                            </div>

                            {module.lessons && (
                                <ListGroup className="wd-lessons rounded-0">
                                    {/* eslint-disable-next-line*/}
                                    {module.lessons.map((lesson: any) => (
                                        <div key={lesson._id}>
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center wd-lesson p-3 ps-1">
                                                <div>
                                                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                                                </div>
                                                <LessonControlButtons />
                                            </ListGroup.Item>

                                            <ListGroup.Item className="wd-lessons p-3 ps-4">
                                                {lesson.description}
                                            </ListGroup.Item>
                                        </div>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
}