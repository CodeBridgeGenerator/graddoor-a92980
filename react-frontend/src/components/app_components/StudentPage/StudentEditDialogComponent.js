import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const StudentCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            uID: _entity?.uID,
sID: _entity?.sID,
rID: _entity?.rID,
fieldOfInterest: _entity?.fieldOfInterest,
projectID: _entity?.projectID,
projectTitle: _entity?.projectTitle,
projectOverview: _entity?.projectOverview,
projectField: _entity?.projectField,
profilePhoto: _entity?.profilePhoto,
bannerPhoto: _entity?.bannerPhoto,
        };

        setLoading(true);
        try {
            
        const result = await client.service("student").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info student updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Student" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="student-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="uID">UID:</label>
                <InputText id="uID" className="w-full mb-3 p-inputtext-sm" value={_entity?.uID} onChange={(e) => setValByKey("uID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["uID"]) && (
              <p className="m-0" key="error-uID">
                {error["uID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sID">SID:</label>
                <InputText id="sID" className="w-full mb-3 p-inputtext-sm" value={_entity?.sID} onChange={(e) => setValByKey("sID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sID"]) && (
              <p className="m-0" key="error-sID">
                {error["sID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rID">RID:</label>
                <InputText id="rID" className="w-full mb-3 p-inputtext-sm" value={_entity?.rID} onChange={(e) => setValByKey("rID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rID"]) && (
              <p className="m-0" key="error-rID">
                {error["rID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fieldOfInterest">FieldOfInterest:</label>
                <InputText id="fieldOfInterest" className="w-full mb-3 p-inputtext-sm" value={_entity?.fieldOfInterest} onChange={(e) => setValByKey("fieldOfInterest", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fieldOfInterest"]) && (
              <p className="m-0" key="error-fieldOfInterest">
                {error["fieldOfInterest"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectID">ProjectID:</label>
                <InputText id="projectID" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectID} onChange={(e) => setValByKey("projectID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectID"]) && (
              <p className="m-0" key="error-projectID">
                {error["projectID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectTitle">ProjectTitle:</label>
                <InputText id="projectTitle" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectTitle} onChange={(e) => setValByKey("projectTitle", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectTitle"]) && (
              <p className="m-0" key="error-projectTitle">
                {error["projectTitle"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="projectOverview">ProjectOverview:</label>
                    <Editor id="projectOverview" value={_entity?.projectOverview} onTextChange={(e) => setValByKey("projectOverview", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["projectOverview"]) && (
                  <p className="m-0" key="error-projectOverview">
                    {error["projectOverview"]}
                  </p>
                ) }
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectField">ProjectField:</label>
                <InputText id="projectField" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectField} onChange={(e) => setValByKey("projectField", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectField"]) && (
              <p className="m-0" key="error-projectField">
                {error["projectField"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="profilePhoto">ProfilePhoto:</label>
                <InputText id="profilePhoto" className="w-full mb-3 p-inputtext-sm" value={_entity?.profilePhoto} onChange={(e) => setValByKey("profilePhoto", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["profilePhoto"]) && (
              <p className="m-0" key="error-profilePhoto">
                {error["profilePhoto"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="bannerPhoto">BannerPhoto:</label>
                <InputText className="w-full mb-3 p-inputtext-sm" value={_entity?.bannerPhoto} onChange={(e) => setValByKey("bannerPhoto", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["bannerPhoto"]) && (
              <p className="m-0" key="error-bannerPhoto">
                {error["bannerPhoto"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(StudentCreateDialogComponent);
