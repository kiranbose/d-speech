import { audioFilesService } from '../_services';
export const audioFileActions = {
    getUserAudioFiles    
};

function getUserAudioFiles(user) {
    return dispatch => {
        audioFilesService.getUserAudioFiles()
            .then(
                files => {
                    dispatch(success(files));
                }
            );
    };        
}

function success(data) { return { type: audiFilesConstants.getUserAudioFiles, data } }

export const audiFilesConstants = {
    getUserAudioFiles: 'get_user_audio_files'
}