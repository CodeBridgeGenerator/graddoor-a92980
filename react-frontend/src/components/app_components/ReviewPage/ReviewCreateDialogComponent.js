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

const ReviewCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.sID)) {
                error["sID"] = `SID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.lectID)) {
                error["lectID"] = `LectID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.rating)) {
                error["rating"] = `Rating field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.pros)) {
                error["pros"] = `Pros field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.cons)) {
                error["cons"] = `Cons field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.comment)) {
                error["comment"] = `Comment field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.createdAt)) {
                error["createdAt"] = `CreatedAt field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            rID: _entity?.rID,sID: _entity?.sID,lectID: _entity?.lectID,rating: _entity?.rating,pros: _entity?.pros,cons: _entity?.cons,comment: _entity?.comment,createdAt: _entity?.createdAt,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("review").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Review created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Review" });
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
        <Dialog header="Create Review" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="review-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rID">RID:</label>
                <InputNumber id="rID" min={1} max={5} style={{width:"20rem"}} value={_entity?.rID} onChange={ (e) => setValByKey("rID", e.value)} cancel={false}  />
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
                <label htmlFor="rating">Rating:</label>
                <InputText id="rating" className="w-full mb-3 p-inputtext-sm" value={_entity?.rating} onChange={(e) => setValByKey("rating", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rating"]) ? (
              <p className="m-0" key="error-rating">
                {error["rating"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="pros">Pros:</label>
                    <Editor id="pros" value={_entity?.pros} onTextChange={(e) => setValByKey("pros", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["pros"]) ? (
                  <p className="m-0" key="error-pros">
                    {error["pros"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="cons">Cons:</label>
                    <Editor id="cons" value={_entity?.cons} onTextChange={(e) => setValByKey("cons", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["cons"]) ? (
                  <p className="m-0" key="error-cons">
                    {error["cons"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="comment">Comment:</label>
                    <Editor id="comment" value={_entity?.comment} onTextChange={(e) => setValByKey("comment", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["comment"]) ? (
                  <p className="m-0" key="error-comment">
                    {error["comment"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="createdAt">CreatedAt:</label>
                <InputText id="createdAt" className="w-full mb-3 p-inputtext-sm" value={_entity?.createdAt} onChange={(e) => setValByKey("createdAt", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["createdAt"]) ? (
              <p className="m-0" key="error-createdAt">
                {error["createdAt"]}
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

export default connect(mapState, mapDispatch)(ReviewCreateDialogComponent);
