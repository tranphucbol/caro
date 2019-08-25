export const FILTER_CHANGE = "FILTER_CHANGE";

export const change_filter = (attribute, order) => ({
    type: FILTER_CHANGE,
    attribute,
    order
});
