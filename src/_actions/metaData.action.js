import {
    metaDataService
} from '../_services/metaData.service';

export const metaDataActions = {
    getMetaData
};

function getMetaData() {
    return dispatch => {
        metaDataService.getMetaDataService()
            .then(
                (response) => {
                    dispatch(success(response.result, metaDataConstants.getMetaData));
                }
            );
    };
}

function success(data, type) {
    return {
        type: type,
        data
    }
}

export const metaDataConstants = {
    getMetaData: 'get_meta_data'
}