export const state = () => ({
    progressBar: false,
    snackBarOpen: false,
    snackBarMessage: '',
    snackBarColor: '',
    dialogOpen: false,
    dialogTitle: '',
    dialogText: '',
    dialogCallbackFunction: () => {}
});

export const mutations = {
    setProgressBar: function (state, progressBar) {
        state.progressBar = progressBar;
    },
    setSnackBar: function ( state, snackBar ) {
        state.snackBarOpen = snackBar.open;
        state.snackBarColor = snackBar.color;
        state.snackBarMessage = snackBar.message;
    },
    setDialog: function (state, dialog) {
        state.dialogOpen = dialog.open;
        state.dialogTitle = dialog.title;
        state.dialogText = dialog.text;
        state.dialogCallbackFunction = dialog.callbackFunction;
    },
};

export const actions = {
    setProgressBar({ commit }, { progressBar }) {
        commit('setProgressBar', progressBar);
    },
    setSnackBar({ commit }, { snackBar }) {
        commit('setSnackBar', snackBar);
    },
    setDialog({ commit }, { dialog }) {
        commit('setDialog', dialog);
    }
}