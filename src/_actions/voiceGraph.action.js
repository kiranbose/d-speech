import { voiceGraphService } from '../_services';
export const voiceGraphActions = {
    getFileData    
};

function getFileData(fileName1, fileName2) {
    return dispatch => {
        voiceGraphService.getFileData(fileName1, fileName2)
            .then(
                data => {
                    dispatch(success(data));
                }
            );
    };        
}

function success(data) { return { type: voiceGraphConstants.getFileData, data } }

export const voiceGraphConstants = {
    getFileData: 'get_file_data'
}