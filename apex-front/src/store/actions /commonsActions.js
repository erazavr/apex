import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";
import { toast } from 'react-toastify';

export const FETCH_COMMON_SUCCESS = 'FETCH_COMMON_SUCCESS';
export const FETCH_COMMON_FAILURE = "FETCH_COMMON_FAILURE";

export const fetchCommonSuccess = com => ({type: FETCH_COMMON_SUCCESS, com});
export const fetchCommonFailure = error => ({type: FETCH_COMMON_FAILURE, error});

export const postCommon = comData => {
  return async dispatch => {
    try {
      await axiosApi.post('/commons', comData);
      dispatch(fetchCommonSuccess());
      toast.success('Добавлено');
    }catch (error) {
      dispatch(fetchCommonFailure(error))
    }
  }
};

export const getCommons = () => {
  return async dispatch => {
    try {
      let response = await axiosApi.get('/commons');
      dispatch(fetchCommonSuccess(response.data))
    }catch (error) {
      dispatch(fetchCommonFailure(error))
    }
  }
};