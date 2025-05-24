import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Editor } from 'primereact/editor';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const StudentCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.uID)) {
                error["uID"] = `UID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.sID)) {
                error["sID"] = `SID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.rID)) {
                error["rID"] = `RID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.fieldOfInterest)) {
                error["fieldOfInterest"] = `FieldOfInterest field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.projectID)) {
                error["projectID"] = `ProjectID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.projectTitle)) {
                error["projectTitle"] = `ProjectTitle field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.projectOverview)) {
                error["projectOverview"] = `ProjectOverview field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.projectField)) {
                error["projectField"] = `ProjectField field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.profilePhoto)) {
                error["profilePhoto"] = `ProfilePhoto field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.bannerPhoto)) {
                error["bannerPhoto"] = `BannerPhoto field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            uID: _entity?.uID,sID: _entity?.sID,rID: _entity?.rID,fieldOfInterest: _entity?.fieldOfInterest,projectID: _entity?.projectID,projectTitle: _entity?.projectTitle,projectOverview: _entity?.projectOverview,projectField: _entity?.projectField,profilePhoto: _entity?.profilePhoto,bannerPhoto: _entity?.bannerPhoto,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("student").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Student created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Student" });
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
        <Dialog header="Create Student" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="student-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="uID">UID:</label>
                <InputText id="uID" className="w-full mb-3 p-inputtext-sm" value={_entity?.uID} onChange={(e) => setValByKey("uID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["uID"]) ? (
              <p className="m-0" key="error-uID">
                {error["uID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sID">SID:</label>
                <InputText id="sID" className="w-full mb-3 p-inputtext-sm" value={_entity?.sID} onChange={(e) => setValByKey("sID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sID"]) ? (
              <p className="m-0" key="error-sID">
                {error["sID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rID">RID:</label>
                <InputText id="rID" className="w-full mb-3 p-inputtext-sm" value={_entity?.rID} onChange={(e) => setValByKey("rID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rID"]) ? (
              <p className="m-0" key="error-rID">
                {error["rID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fieldOfInterest">FieldOfInterest:</label>
                <InputText id="fieldOfInterest" className="w-full mb-3 p-inputtext-sm" value={_entity?.fieldOfInterest} onChange={(e) => setValByKey("fieldOfInterest", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fieldOfInterest"]) ? (
              <p className="m-0" key="error-fieldOfInterest">
                {error["fieldOfInterest"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectID">ProjectID:</label>
                <InputText id="projectID" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectID} onChange={(e) => setValByKey("projectID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectID"]) ? (
              <p className="m-0" key="error-projectID">
                {error["projectID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectTitle">ProjectTitle:</label>
                <InputText id="projectTitle" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectTitle} onChange={(e) => setValByKey("projectTitle", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectTitle"]) ? (
              <p className="m-0" key="error-projectTitle">
                {error["projectTitle"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="projectOverview">ProjectOverview:</label>
                    <Editor id="projectOverview" value={_entity?.projectOverview} onTextChange={(e) => setValByKey("projectOverview", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["projectOverview"]) ? (
                  <p className="m-0" key="error-projectOverview">
                    {error["projectOverview"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectField">ProjectField:</label>
                <InputText id="projectField" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectField} onChange={(e) => setValByKey("projectField", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectField"]) ? (
              <p className="m-0" key="error-projectField">
                {error["projectField"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="profilePhoto">ProfilePhoto:</label>
                <InputText id="profilePhoto" className="w-full mb-3 p-inputtext-sm" value={_entity?.profilePhoto} onChange={(e) => setValByKey("profilePhoto", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["profilePhoto"]) ? (
              <p className="m-0" key="error-profilePhoto">
                {error["profilePhoto"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="bannerPhoto">BannerPhoto:</label>
                <InputText className="w-full mb-3 p-inputtext-sm" value={_entity?.bannerPhoto} onChange={(e) => setValByKey("bannerPhoto", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["bannerPhoto"]) ? (
              <p className="m-0" key="error-bannerPhoto">
                {error["bannerPhoto"]}
              </p>
            ) : null}
          </small>
            </div>
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
