import { api } from "../api/api";

export const RANK_LOAD = "RANK_LOAD";
export const RANK_LOADING = "RANK_LOADING";

const reload = data => ({
    type: RANK_LOAD,
    data
});

export const load_leaderboard = () => dispatch => {
    dispatch({ type: RANK_LOADING });
    api.get(`/leader-boards`).then(res => {
        dispatch(reload(res.data));
    });
};
