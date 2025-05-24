import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";


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

const LecturerCreateDialogComponent = (props) => {
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
  
            if (_.isEmpty(_entity?.lectID)) {
                error["lectID"] = `LectID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.rID)) {
                error["rID"] = `RID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.description)) {
                error["description"] = `Description field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.department)) {
                error["department"] = `Department field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.specialization)) {
                error["specialization"] = `Specialization field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.profileLink)) {
                error["profileLink"] = `ProfileLink field is required`;
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
            uID: _entity?.uID,lectID: _entity?.lectID,rID: _entity?.rID,rating: _entity?.rating,description: _entity?.description,department: _entity?.department,specialization: _entity?.specialization,profileLink: _entity?.profileLink,profilePhoto: _entity?.profilePhoto,bannerPhoto: _entity?.bannerPhoto,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("lecturer").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Lecturer created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Lecturer" });
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
        <Dialog header="Create Lecturer" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="lecturer-create-dialog-component">
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
                <label htmlFor="lectID">LectID:</label>
                <InputText id="lectID" className="w-full mb-3 p-inputtext-sm" value={_entity?.lectID} onChange={(e) => setValByKey("lectID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lectID"]) ? (
              <p className="m-0" key="error-lectID">
                {error["lectID"]}
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
                <label htmlFor="rating">Rating:</label>
                <InputNumber id="rating" min={1} max={5} style={{width:"20rem"}} value={_entity?.rating} onChange={ (e) => setValByKey("rating", e.value)} cancel={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rating"]) ? (
              <p className="m-0" key="error-rating">
                {error["rating"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) ? (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="department">Department:</label>
                <InputText id="department" className="w-full mb-3 p-inputtext-sm" value={_entity?.department} onChange={(e) => setValByKey("department", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["department"]) ? (
              <p className="m-0" key="error-department">
                {error["department"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="specialization">Specialization:</label>
                <InputText id="specialization" className="w-full mb-3 p-inputtext-sm" value={_entity?.specialization} onChange={(e) => setValByKey("specialization", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["specialization"]) ? (
              <p className="m-0" key="error-specialization">
                {error["specialization"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="profileLink">ProfileLink:</label>
                <InputText id="profileLink" className="w-full mb-3 p-inputtext-sm" value={_entity?.profileLink} onChange={(e) => setValByKey("profileLink", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["profileLink"]) ? (
              <p className="m-0" key="error-profileLink">
                {error["profileLink"]}
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

export default connect(mapState, mapDispatch)(LecturerCreateDialogComponent);
