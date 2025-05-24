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
import { InputNumber } from 'primereact/inputnumber';


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

const LecturerCreateDialogComponent = (props) => {
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
lectID: _entity?.lectID,
rID: _entity?.rID,
rating: _entity?.rating,
description: _entity?.description,
department: _entity?.department,
specialization: _entity?.specialization,
profileLink: _entity?.profileLink,
profilePhoto: _entity?.profilePhoto,
bannerPhoto: _entity?.bannerPhoto,
        };

        setLoading(true);
        try {
            
        const result = await client.service("lecturer").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info lecturer updated successfully" });
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
        <Dialog header="Edit Lecturer" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="lecturer-edit-dialog-component">
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
                <label htmlFor="lectID">LectID:</label>
                <InputText id="lectID" className="w-full mb-3 p-inputtext-sm" value={_entity?.lectID} onChange={(e) => setValByKey("lectID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lectID"]) && (
              <p className="m-0" key="error-lectID">
                {error["lectID"]}
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
                <label htmlFor="rating">Rating:</label>
                <InputNumber id="rating" min={1} max={5} style={{width:"20rem"}} value={_entity?.rating} onChange={ (e) => setValByKey("rating", e.value)} cancel={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rating"]) && (
              <p className="m-0" key="error-rating">
                {error["rating"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="department">Department:</label>
                <InputText id="department" className="w-full mb-3 p-inputtext-sm" value={_entity?.department} onChange={(e) => setValByKey("department", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["department"]) && (
              <p className="m-0" key="error-department">
                {error["department"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="specialization">Specialization:</label>
                <InputText id="specialization" className="w-full mb-3 p-inputtext-sm" value={_entity?.specialization} onChange={(e) => setValByKey("specialization", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["specialization"]) && (
              <p className="m-0" key="error-specialization">
                {error["specialization"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="profileLink">ProfileLink:</label>
                <InputText id="profileLink" className="w-full mb-3 p-inputtext-sm" value={_entity?.profileLink} onChange={(e) => setValByKey("profileLink", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["profileLink"]) && (
              <p className="m-0" key="error-profileLink">
                {error["profileLink"]}
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

export default connect(mapState, mapDispatch)(LecturerCreateDialogComponent);
