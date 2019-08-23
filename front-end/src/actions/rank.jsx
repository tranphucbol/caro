import { api } from "../api/api";

export const RANK_LOAD = "RANK_LOAD";

const reload = data => ({
    type: RANK_LOAD,
    data
});

export const load_leaderboard = () => dispatch => {
    api.get(`/leader-boards`).then(res => {
        dispatch(reload(res.data));
    });
};
