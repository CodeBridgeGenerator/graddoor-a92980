import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


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

const UniversityCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.uniID)) {
                error["uniID"] = `UniID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.rankID)) {
                error["rankID"] = `RankID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.name)) {
                error["name"] = `Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.location)) {
                error["location"] = `Location field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.websiteLink)) {
                error["websiteLink"] = `WebsiteLink field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.specialization)) {
                error["specialization"] = `Specialization field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.profilePhoto)) {
                error["profilePhoto"] = `ProfilePhoto field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.bannerphoto)) {
                error["bannerphoto"] = `Bannerphoto field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            uniID: _entity?.uniID,rankID: _entity?.rankID,name: _entity?.name,location: _entity?.location,websiteLink: _entity?.websiteLink,specialization: _entity?.specialization,profilePhoto: _entity?.profilePhoto,bannerphoto: _entity?.bannerphoto,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("university").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info University created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in University" });
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
        <Dialog header="Create University" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="university-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="uniID">UniID:</label>
                <InputText id="uniID" className="w-full mb-3 p-inputtext-sm" value={_entity?.uniID} onChange={(e) => setValByKey("uniID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["uniID"]) ? (
              <p className="m-0" key="error-uniID">
                {error["uniID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rankID">RankID:</label>
                <InputText id="rankID" className="w-full mb-3 p-inputtext-sm" value={_entity?.rankID} onChange={(e) => setValByKey("rankID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rankID"]) ? (
              <p className="m-0" key="error-rankID">
                {error["rankID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="location">Location:</label>
                <InputText id="location" className="w-full mb-3 p-inputtext-sm" value={_entity?.location} onChange={(e) => setValByKey("location", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["location"]) ? (
              <p className="m-0" key="error-location">
                {error["location"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="websiteLink">WebsiteLink:</label>
                <InputText id="websiteLink" className="w-full mb-3 p-inputtext-sm" value={_entity?.websiteLink} onChange={(e) => setValByKey("websiteLink", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["websiteLink"]) ? (
              <p className="m-0" key="error-websiteLink">
                {error["websiteLink"]}
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
                <label htmlFor="bannerphoto">Bannerphoto:</label>
                <InputText className="w-full mb-3 p-inputtext-sm" value={_entity?.bannerphoto} onChange={(e) => setValByKey("bannerphoto", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["bannerphoto"]) ? (
              <p className="m-0" key="error-bannerphoto">
                {error["bannerphoto"]}
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

export default connect(mapState, mapDispatch)(UniversityCreateDialogComponent);
