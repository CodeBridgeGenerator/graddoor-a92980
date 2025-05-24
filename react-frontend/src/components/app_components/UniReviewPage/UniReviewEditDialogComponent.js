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

const UniReviewCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            urID: _entity?.urID,
uniID: _entity?.uniID,
sID: _entity?.sID,
rating: _entity?.rating,
pros: _entity?.pros,
cons: _entity?.cons,
comment: _entity?.comment,
createdAT: _entity?.createdAT,
        };

        setLoading(true);
        try {
            
        const result = await client.service("uniReview").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info uniReview updated successfully" });
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
        <Dialog header="Edit UniReview" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="uniReview-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="urID">UrID:</label>
                <InputText id="urID" className="w-full mb-3 p-inputtext-sm" value={_entity?.urID} onChange={(e) => setValByKey("urID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["urID"]) && (
              <p className="m-0" key="error-urID">
                {error["urID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="uniID">UniID:</label>
                <InputText id="uniID" className="w-full mb-3 p-inputtext-sm" value={_entity?.uniID} onChange={(e) => setValByKey("uniID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["uniID"]) && (
              <p className="m-0" key="error-uniID">
                {error["uniID"]}
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
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="pros">Pros:</label>
                    <Editor id="pros" value={_entity?.pros} onTextChange={(e) => setValByKey("pros", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["pros"]) && (
                  <p className="m-0" key="error-pros">
                    {error["pros"]}
                  </p>
                ) }
              </small>
                </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="cons">Cons:</label>
                    <Editor id="cons" value={_entity?.cons} onTextChange={(e) => setValByKey("cons", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["cons"]) && (
                  <p className="m-0" key="error-cons">
                    {error["cons"]}
                  </p>
                ) }
              </small>
                </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="comment">Comment:</label>
                    <Editor id="comment" value={_entity?.comment} onTextChange={(e) => setValByKey("comment", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["comment"]) && (
                  <p className="m-0" key="error-comment">
                    {error["comment"]}
                  </p>
                ) }
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="createdAT">CreatedAT:</label>
                <InputText id="createdAT" className="w-full mb-3 p-inputtext-sm" value={_entity?.createdAT} onChange={(e) => setValByKey("createdAT", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["createdAT"]) && (
              <p className="m-0" key="error-createdAT">
                {error["createdAT"]}
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

export default connect(mapState, mapDispatch)(UniReviewCreateDialogComponent);
