import {
    audioFilesService
} from '../_services';
export const audioFileActions = {
    getUserAudioFiles
};

function getUserAudioFiles(user) {
    return dispatch => {
        audioFilesService.getUserAudioFiles()
            .then(
                files => {
                    dispatch(success(files, audiFilesConstants.getUserAudioFiles));
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

export const audiFilesConstants = {
    getUserAudioFiles: 'get_user_audio_files'
}