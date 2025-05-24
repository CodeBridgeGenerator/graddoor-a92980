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

const UniRankingCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.rankID)) {
                error["rankID"] = `RankID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.uniID)) {
                error["uniID"] = `UniID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.rankingType)) {
                error["rankingType"] = `RankingType field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.rankingYear)) {
                error["rankingYear"] = `RankingYear field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.position)) {
                error["position"] = `Position field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.country)) {
                error["country"] = `Country field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            rankID: _entity?.rankID,uniID: _entity?.uniID,rankingType: _entity?.rankingType,rankingYear: _entity?.rankingYear,position: _entity?.position,country: _entity?.country,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("uniRanking").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info UniRanking created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in UniRanking" });
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
        <Dialog header="Create UniRanking" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="uniRanking-create-dialog-component">
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
                <label htmlFor="rankingType">RankingType:</label>
                <InputText id="rankingType" className="w-full mb-3 p-inputtext-sm" value={_entity?.rankingType} onChange={(e) => setValByKey("rankingType", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rankingType"]) ? (
              <p className="m-0" key="error-rankingType">
                {error["rankingType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rankingYear">RankingYear:</label>
                <InputText id="rankingYear" className="w-full mb-3 p-inputtext-sm" value={_entity?.rankingYear} onChange={(e) => setValByKey("rankingYear", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rankingYear"]) ? (
              <p className="m-0" key="error-rankingYear">
                {error["rankingYear"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="position">Position:</label>
                <InputText id="position" className="w-full mb-3 p-inputtext-sm" value={_entity?.position} onChange={(e) => setValByKey("position", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["position"]) ? (
              <p className="m-0" key="error-position">
                {error["position"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="country">Country:</label>
                <InputText id="country" className="w-full mb-3 p-inputtext-sm" value={_entity?.country} onChange={(e) => setValByKey("country", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["country"]) ? (
              <p className="m-0" key="error-country">
                {error["country"]}
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

export default connect(mapState, mapDispatch)(UniRankingCreateDialogComponent);
